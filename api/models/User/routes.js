import { Router } from "express";
import passport from "passport";
import controller from "./controller";

const router = new Router();
router.route("/").get([passport.authenticate('bearer', { session: false }), controller.find]).post(controller.create);
// router.route("/").get(controller.find).post(controller.create);

router
  .route("/:id")
  .put(controller.update)
  .get(controller.findById)
  .delete(controller.remove);

router.route("/auth").post(controller.auth);

export default router;
