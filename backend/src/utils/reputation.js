const User = require('../models/User');

/**
 * Update reputation scores based on vote changes
 * @param {Object} params
 * @param {String} params.voterId - ID of user who voted
 * @param {String} params.targetId - ID of user whose post/comment was voted
 * @param {String} params.oldType - 'up' | 'down' | null (previous vote)
 * @param {String} params.newType - 'up' | 'down' | null (new vote)
 * @param {Boolean} params.isComment - true if the vote is on a comment
 */
async function changeScores({ voterId, targetId, oldType, newType, isComment = false }) {
  let targetDelta = 0;
  let voterDelta = 0;

  const addForUp = isComment ? 5 : 10;

  // no previous vote -> new vote applied
  if (!oldType && newType === 'up') {
    targetDelta += addForUp;
    if (voterId && voterId.toString() !== targetId.toString()) voterDelta += 2;
  }
  if (!oldType && newType === 'down') {
    targetDelta += -2;
  }

  // undo up
  if (oldType === 'up' && !newType) {
    targetDelta += -addForUp;
    if (voterId && voterId.toString() !== targetId.toString()) voterDelta += -2;
  }
  // undo down
  if (oldType === 'down' && !newType) {
    targetDelta += 2; // reversing the -2
  }

  // change up -> down
  if (oldType === 'up' && newType === 'down') {
    targetDelta += -addForUp; // remove previous up
    targetDelta += -2; // apply down
    if (voterId && voterId.toString() !== targetId.toString()) voterDelta += -2; // remove +2 they got
  }

  // change down -> up
  if (oldType === 'down' && newType === 'up') {
    targetDelta += 2; // remove previous -2
    targetDelta += addForUp; // apply up
    if (voterId && voterId.toString() !== targetId.toString()) voterDelta += 2; // voter now gets +2
  }

  const ops = [];
  if (targetDelta !== 0) ops.push(User.findByIdAndUpdate(targetId, { $inc: { score: targetDelta } }));
  if (voterDelta !== 0) ops.push(User.findByIdAndUpdate(voterId, { $inc: { score: voterDelta } }));

  if (ops.length) await Promise.all(ops);
}

module.exports = { changeScores };
