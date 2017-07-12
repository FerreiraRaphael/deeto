import { Router } from "express";
import user from "./models/User/routes";
import match from "./models/Match/routes";

const router = new Router();

router.route("/").get((req, res) => {
  res.json({ message: "Welcome to api-test API!" });
});

router.use("/api/users", user);
router.use("/api/matchs", match);

export default router;
