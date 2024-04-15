import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  imageFile: { type: String, required: false },
});

//Encrypting user's input password before saving to the database. Explanation of the pre-hook: https://www.youtube.com/watch?v=pIb7lCJCDgs
userSchema.pre(`save`, async function (next) {
  if (this.isModified(`password`)) {
    this.password = await bcrypt.hash(this.password, 10);
    this.set(`password`, this.password);
  }
  next();
});

export const User = mongoose.model("User", userSchema);
