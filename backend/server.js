require("dotenv").config();
console.clear();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

/** Middleware */
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV === "development") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

/** Connection to mongo db */
const port = process.env.PORT || 5000;
const connectToDatabase = require("./config/dbConfig");
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`App is running on port : ${port}`);
    });
});

/** Routes */
app.use("/api/auth", require("./router/auth"));
app.use("/api/profile", require("./router/profile"));
app.use("/api/question", require("./router/question"));
app.use("/api/ticket", require("./router/ticket"));
app.use("/api/leaderboard", require("./router/leaderboard"));

app.use("/", (_, res) => {
    res.status(200).json({
        message: "API Running",
    });
});
