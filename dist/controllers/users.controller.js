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
const express_1 = __importDefault(require("express"));
const users_model_1 = __importDefault(require("../models/users.model"));
const zod_1 = require("zod");
const usersRouter = express_1.default.Router();
const CreateUserZodSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    age: zod_1.z.number(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.string().optional(),
    address: zod_1.z.object({
        city: zod_1.z.string(),
        street: zod_1.z.string(),
        zip: zod_1.z.number()
    })
});
usersRouter.post('/create-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userBody = req.body;
        const userValidateBody = yield CreateUserZodSchema.parseAsync(userBody);
        // console.log(userValidateBody)
        const password = yield users_model_1.default.hashPassword(userValidateBody.password);
        userValidateBody.password = password;
        const user = yield users_model_1.default.create(userValidateBody);
        /*  const user = new Users(userValidateBody);
         const password = await user.hashPassword(userValidateBody.password);
         user.password = password;
         await user.save(); */
        res.status(201).send({ message: "User Created Successfully", success: true, user });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
}));
exports.default = usersRouter;
