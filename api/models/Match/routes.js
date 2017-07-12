import { Router } from "express";
import passport from "passport";
import controller from "./controller";

const router = new Router();
router.route("/").post(controller.create);

router.route("/:id").get(controller.find);

export default router;
