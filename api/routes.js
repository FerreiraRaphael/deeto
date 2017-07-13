import { Router } from "express";
import path from "path";
import user from "./models/User/routes";
import match from "./models/Match/routes";
import path from "path";

const router = new Router();
const views = path.resolve("public", "views") + path.sep;

router.route("/").get((req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.route("/").get((req, res) => {
  res.sendFile(views + "index.html");
});

router.use("/api/users", user);
router.use("/api/matchs", match);

router.route("/entrar").get((req, res) => {
  res.sendFile(views + "login.html");
});

export default router;
