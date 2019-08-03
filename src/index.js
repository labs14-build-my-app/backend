const express = require("express");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

const projectRouter = require("./routers/project");
const usersRouter = require("./routers/user");

app.use(express.json());
app.use(projectRouter);
app.use(usersRouter);

app.listen(port, () => console.log(`Server is up on port ${port}`));
