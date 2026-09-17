import express from "express";
import bodyParser from "body-parser";
import router from "./routers";

export const app = express();
const PORT = Number(process.env.PORT || 3000);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(router);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
