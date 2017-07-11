import { Router } from "express";
import user from "./models/User/routes";

const router = new Router();

router.route("/").get((req, res) => {
  res.json({ message: "Welcome to api-test API!" });
});

router.use("/api/users", user);

export default router;
