const express = require("express");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 8080;

const projectRouter = require("./routers/project");
const usersRouter = require("./routers/user");
const devRouter = require("./routers/developers");

app.use(express.json());
app.use(projectRouter);
app.use(usersRouter);
app.use(devRouter);

app.listen(port, () => console.log(`Server is up on port ${port}`));
