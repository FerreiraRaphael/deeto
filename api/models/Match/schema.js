import mongoose, { Schema } from "mongoose";

mongoose.Promise = global.Promise;

const schema = Schema({
  user: { type: String, required: true },
  interrest: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isMutual: { type: Boolean }
});

schema.pre("save", async function checkExistingMatch(next) {
  try {
    const match = await Match.findOne({
      user: this.user,
      interrest: this.interrest
    });
    if (match && this.isNew) {
      next(new Error("Match already exist"));
    }
    next();
  } catch (e) {
    next({ message: new Error("Error saving match"), error: e.toString() });
  }
});

const Match = mongoose.model("Match", schema);

export default Match;
