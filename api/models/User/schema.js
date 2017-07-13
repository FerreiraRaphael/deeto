import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

mongoose.Promise = global.Promise;

const schema = Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  images: [String],
  description: String
});

schema.path("images").validate(images => images.length <= 4);

schema.pre("save", async function hashPassword(next) {
  try {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    // hash the password along with our new salt
    const hash = await bcrypt.hash(this.password, salt);

    // override the cleartext password with the hashed one
    this.password = hash;
    return next();
  } catch (e) {
    return next(e);
  }
});

schema.methods.validPassword = async password => {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

const User = mongoose.model("User", schema);

export default User;
