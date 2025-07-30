import joi from "joi";
import AppError from "../utils/AppError.js";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    // console.log("eq", req.query);
    const data = { ...req.body, ...req.query };
    // console.log(data);
    const { error } = schema.validate(data, {
      abortEarly: false,
      stripUnkown: true,
    });
    if (error) {
      error.message = error.details;
      return next(new AppError("Validation error ", 400, error));
    }
    next();
  };
};
