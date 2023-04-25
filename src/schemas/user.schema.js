import joi from "joi";
import dayjs from "dayjs";

export const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(3)
})