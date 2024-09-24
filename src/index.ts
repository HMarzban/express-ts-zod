import "tsconfig-paths/register";
import express from "express";
import bodyParser from "body-parser";
import router from "@router";

const app = express();
const PORT = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
