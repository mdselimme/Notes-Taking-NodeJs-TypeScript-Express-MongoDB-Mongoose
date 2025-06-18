import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import validator from 'validator';

const userSchema = new Schema<IUser>({
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
    }
});

const Users = model('Users', userSchema);

export default Users;