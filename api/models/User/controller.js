import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./schema";
import config from "../../../tools/config";

class UserController {
  static async find(req, res) {
    const result = await User.findById(
      req.user._id,
      "name email images description"
    ).catch(e => res.json({ e }));
    res.json(result);
  }

  static async create(req, res) {
    const user = await User.create(req.body).catch(e => res.json({ e }));
    res.json(user);
  }

  static async findById(req, res) {
    const result = await User.findById(
      req.params.id,
      "name email images"
    ).catch(e => res.json({ e }));
    if (!result) {
      res.sendStatus(404);
    }
    res.status(200).json(result);
  }

  static async update(req, res) {
    const result = await User.update({ _id: req.user._id }, req.body).catch(e =>
      res.json({ e })
    );
    if (result.n < 1) {
      res.sendStatus(404);
    }
    if (result.nModified < 1) {
      res.sendStatus(304);
    }
    res.sendStatus(204);
  }

  static async remove(req, res) {
    const result = await User.remove({ _id: req.user._id }).catch(e =>
      res.json({ e })
    );
    if (!result) {
      res.sendStatus(404);
    }
    res.sendStatus(204);
  }

  static async auth(req, res) {
    try {
      debugger;
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        res.json({ sucess: false, message: "Wrong password or email" });

      const valid = await bcrypt.compare(req.body.password, user.password);

      if (!valid) {
        res.json({ sucess: false, message: "Wrong password or email" });
      }

      const token = jwt.sign(user, config.SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
      });

      res.json({
        success: true,
        message: "Enjoy the token",
        token
      });
    } catch (error) {
      res.json({ error });
    }
  }
}

export default UserController;
