import { Router } from "express";
import path from "path";
import user from "./models/User/routes";
import match from "./models/Match/routes";

const router = new Router();

router.route("/").get((req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.use("/api/users", user);
router.use("/api/matchs", match);

export default router;
