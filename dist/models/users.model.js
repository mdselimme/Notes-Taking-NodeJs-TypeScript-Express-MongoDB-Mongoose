"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const addressSchema = new mongoose_1.Schema({
    city: String,
    street: String,
    zip: Number
}, { _id: false });
const userSchema = new mongoose_1.Schema({
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
        validate: [validator_1.default.isEmail, "Invalid email {VALUE}"],
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
}, { versionKey: false, timestamps: true });
userSchema.method("hashPassword", function hashPassword(plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield bcrypt_1.default.hash(plainPassword, 10);
        return password;
    });
});
userSchema.static("hashPassword", function hashPassword(plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield bcrypt_1.default.hash(plainPassword, 10);
        return password;
    });
});
const Users = (0, mongoose_1.model)('Users', userSchema);
exports.default = Users;
