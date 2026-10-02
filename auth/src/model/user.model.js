import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "must be unique"],
        required:[true,"username is required"]
    },
    email: {
        type: String,
        unique: [true, "must be unique"],
        required:[true,"email is required"]
    },
    password: {
        type: String,
        required:[true,"password is required"]
    },
    verified: {
        type: Boolean,
        default:false
        }
     
}, {
    timestamps:true
})

userSchema.pre("save", async function () {
     if (this.isModified("password")) {
       this.password = await bcrypt.hash(this.password, 10);
     }
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("users", userSchema);

export default userModel