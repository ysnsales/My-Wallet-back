import joi from "joi"

const operationSchema = joi.object({
    description: joi.string().required(),
    value: joi.number().positive().precision(2).strict().required()
  });

  export default operationSchema;