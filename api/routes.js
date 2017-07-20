import { Router } from "express";
import user from "./models/User/routes";
// import match from "./models/Match/routes";
import swaggerSpec from "./tools/swagger";

const router = new Router();

// serve swagger
router.route("/swagger.json").get((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// router.route("/").get((req, res) => {
//   res.sendFile(`${views}index.html`);
// });

router.use("/api/users", user);

export default router;
