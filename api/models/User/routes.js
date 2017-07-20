import { Router } from "express";
import passport from "passport";
import controller from "./controller";

/**
 * @swagger
 * definition:
 *   Puppy:
 *     properties:
 *       name:
 *         type: string
 *       breed:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 */

const router = new Router();
router
  .route("/")
  /**
   * @swagger
   * /api/users/:
   *   get:
   *     tags:
   *       - Puppies
   *     description: Returns a single puppy
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Puppy's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single puppy
   *         schema:
   *           $ref: '#/definitions/Puppy'
   */
  .get([passport.authenticate("bearer", { session: false }), controller.find])
  .post(controller.create)
  .put([passport.authenticate("bearer", { session: false }), controller.update])
  .delete([
    passport.authenticate("bearer", { session: false }),
    controller.remove
  ]);

// router
//   .route("/:id")
//   .get(controller.findById)
//   .delete(controller.remove);

router.route("/auth").post(controller.auth);

export default router;
