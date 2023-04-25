import joi from "joi";
import dayjs from "dayjs";

export const operationSchema = joi.object({
    description: joi.string().required(),
    value: joi.number().positive().precision(2).strict().required()
  })