import Match from "./schema";

class MatchController {
  static async find(req, res) {
    try {
      const result = await Match.find({
        user: req.params.id
      }).populate("interrest", ["name", "email"]);
      res.json(result);
    } catch (e) {
      res.json({ message: "Error finding match", error: e.toString() });
    }
  }

  static async create(req, res) {
    try {
      // TODO: Can be done on a service
      const { user, interrest } = req.body;
      const interrestMatch = await Match.findOne({
        user: interrest,
        interrest: user
      });
      const isMutual = !!interrestMatch;
      const result = await Match.create({ user, interrest, isMutual });
      if (interrestMatch && !interrestMatch.isMutual) {
        interrestMatch.isMutual = true;
        await interrestMatch.save();
      }
      res.json(result);
    } catch (e) {
      res.json({ error: e.toString() });
    }
  }
}

export default MatchController;
