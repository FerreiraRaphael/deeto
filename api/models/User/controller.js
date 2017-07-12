import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./schema";

class UserController {
  async find(req, res) {
    const users = await User.find({}).catch(e => res.json({ e }));
    res.json(users);
  }

  async create(req, res) {
    const user = await User.create(req.body).catch(e => res.json({ e }));
    res.json(user);
  }

  async findById(req, res) {
    const result = await User.findById(req.params.id).catch(e =>
      res.json({ e })
    );
    if (!result) {
      res.sendStatus(404);
    }
    res.status(200).json(result);
  }

  async update(req, res) {
    const result = await User.update({ _id: req.params.id }, req.body).catch(e => res.json({ e }));
    if (result.n < 1) {
      res.sendStatus(404);
    }
    if (result.nModified < 1) {
      res.sendStatus(304);
    }
    res.sendStatus(204);
  }

  async remove(req, res) {
    const result = await User.remove({ _id: req.params.id }).catch(e => res.json({ e }));
    if (!result) {
      res.sendStatus(404);
    }
    res.sendStatus(204);
  }

  async auth(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        res.json({ sucess: false, message: "Wrong password or email" });

      const valid = await bcrypt.compare(req.body.password, user.password);

      if (!valid) {
        res.json({ sucess: false, message: "Wrong password or email" });
      }

      const token = jwt.sign(user, req.app.get("superSecret"), {
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

export default new UserController();