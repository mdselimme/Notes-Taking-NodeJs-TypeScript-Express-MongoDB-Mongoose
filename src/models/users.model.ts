import { Model, model, Schema } from "mongoose";
import { IUAddress, IUser, UserInstanceMethods, UserStaticsMethod } from "../interfaces/user.interface";
import bcrypt from 'bcrypt'
import validator from 'validator';
import Note from "./notes.model";


const addressSchema = new Schema<IUAddress>({
    city: String,
    street: String,
    zip: Number
}, { _id: false })


const userSchema = new Schema<IUser, Model<IUser>, UserInstanceMethods>({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "First Name Must Be at least 3 character, got {VALUE}"],
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "last Name Must Be at least 3 character, got {VALUE}"],
        maxlength: 50
    },
    age: {
        type: Number,
        required: true,
        min: [12, "Age minimum at least 18, got {VALUE}"],
        max: 60
    },
    email: {
        type: String,
        required: true,
        // validate: {
        //     validator: (v) => {
        //         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        //     },
        //     message: props => `Email ${props.value} is not valid email`
        // },
        validate: [validator.isEmail, "Invalid email {VALUE}"],
        unique: [true, "Email Duplicate please try Unique"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: {
            values: ["USER", "ADMIN", "SUPERADMIN"],
            message: "Role is not valid. got value {VALUE}"
        },
        default: "USER"
    },
    address: {
        type: addressSchema,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.method("hashPassword", async function hashPassword(plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10);
    return password;
})

userSchema.static("hashPassword", async function hashPassword(plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10);
    return password;
})

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

userSchema.post("findOneAndDelete", async function (doc, next) {
    if (doc) {
        await Note.deleteMany({ user: doc._id });
    }
    next()
})

userSchema.pre("find", function (next) {
    next();
})

userSchema.post("save", async function (doc) {
    console.log(`${doc.email} has been saved.`);
})

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
})

const Users = model<IUser, UserStaticsMethod>('Users', userSchema);

export default Users;