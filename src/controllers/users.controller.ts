import express, { Request, Response, Router } from 'express';
import Users from '../models/users.model';
import { z } from "zod";
const usersRouter: Router = express.Router();

const CreateUserZodSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    email: z.string(),
    password: z.string(),
    role: z.string().optional(),
    address: z.object({
        city: z.string(),
        street: z.string(),
        zip: z.number()
    })
});

// Create An User 
usersRouter.post('/create-user', async (req: Request, res: Response) => {
    try {
        const userBody = req.body;
        const userValidateBody = await CreateUserZodSchema.parseAsync(userBody);
        // console.log(userValidateBody)
        const password = await Users.hashPassword(userValidateBody.password);
        userValidateBody.password = password;
        const user = await Users.create(userValidateBody);
        /*  const user = new Users(userValidateBody);
         const password = await user.hashPassword(userValidateBody.password);
         user.password = password;
         await user.save(); */
        res.status(201).send({ message: "User Created Successfully", success: true, user });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message })
        }
    }
});

// Get All Users 
usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const userEmail = req.query.email;
        // const usersData = await Users.find({}).sort({ email: -1 });
        // const usersData = await Users.find({}).limit(1);
        let usersData;
        if (userEmail) {
            usersData = await Users.find({ email: userEmail }).skip(1);
        }
        usersData = await Users.find({}).skip(1);

        res.status(201).send({ message: "Users data", success: true, usersData })
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message })
        }
    }
})


// Delete An User 
usersRouter.delete('/delete-user/:userId', async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const user = await Users.findOneAndDelete({ _id: userId })
        res.status(201).send({ message: "User Deleted Successfully", success: true, user });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message })
        }
    }
});





export default usersRouter;