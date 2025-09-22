// require('dotenv').config();
// // require('express-async-errors');
// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const connectDB = require('./config/db');
// const errorHandler = require('./middleware/errorHandle');


// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/user');
// const postRoutes = require('./routes/posts');
// const commentRoutes = require('./routes/comments');
// const leaderboardRoutes = require('./routes/leaderboard');


// const app = express();
// app.use(helmet());
// app.use(cors());
// app.use(express.json());


// // connect db
// connectDB();


// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/comments', commentRoutes);
// app.use('/api/leaderboard', leaderboardRoutes);


// app.get('/', (req, res) => res.send({ ok: true }));


// app.use(errorHandler);


// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// backend/server.js
// backend/server.js






require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandle');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const leaderboardRoutes = require('./routes/leaderboard');

const app = express();
app.use(helmet());
app.use(express.json());

// ✅ Allow React frontend
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));

// connect db
connectDB();

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.get('/', (req, res) => res.send({ ok: true }));

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/posts", require("./routes/posts"));
// app.use("/api", require("./routes/comments")); // <-- important

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
