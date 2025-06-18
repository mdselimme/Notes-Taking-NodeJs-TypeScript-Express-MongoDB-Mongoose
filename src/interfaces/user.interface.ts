import { Model } from "mongoose"

export interface IUAddress {
    city: string,
    street: string,
    zip: number
}

export interface IUser {
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    password: string,
    role: "USER" | "ADMIN" | "SUPERADMIN",
    address: IUAddress
};

export interface UserInstanceMethods {
    hashPassword(password: string): string
}

export interface UserStaticsMethod extends Model<IUser> {
    hashPassword(password: string): string
}