import { Router } from "express";
import passport from "passport";
import controller from "./controller";

const router = new Router();
router
  .route("/")
  .get([passport.authenticate("bearer", { session: false }), controller.find])
  .put([passport.authenticate("bearer", { session: false }), controller.update])
  .delete([passport.authenticate("bearer", { session: false }), controller.remove])
  .post(controller.create);

// router
//   .route("/:id")
//   .get(controller.findById)
//   .delete(controller.remove);

router.route("/auth").post(controller.auth);

export default router;
