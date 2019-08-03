const express = require("express");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

const projectRouter = require("./routers/project");

app.use(express.json());
app.use(projectRouter);

app.listen(port, () => console.log(`Server is up on port ${port}`));
