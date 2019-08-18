const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 8080;

const projectRouter = require("./routers/project");
const usersRouter = require("./routers/user");
const devRouter = require("./routers/developers");
const seedRouter = require("./routers/seed"); // comment out in production

app.use(cors());
app.use(express.json());

app.use(projectRouter);
app.use(usersRouter);
app.use(devRouter);
app.use(seedRouter);

app.listen(port, () => console.log(`Server is up on port ${port}`));
