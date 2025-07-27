import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name "],
    },
    email: {
      type: String,
      required: [true, "please enter your email address"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "please enter your password"],
      minlength: [6, "password mustbe at least 6 charaters long "],
    },
    cartItems: [
      {
        quantity: {
          type: Number,
          defualt: 1,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: product,
        },
      },
    ],
    role: {
      type: string,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

//per save to the hook before save to the database
//This is a Mongoose middleware function that runs before saving a user document to the MongoDB database. It's used to hash the password before storing it.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;
