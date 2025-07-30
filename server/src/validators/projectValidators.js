import joi from "joi";

export const projectSchema = joi.object({
  name: joi.string().min(1).max(50).required(),
  description: joi.string().optional(),
  budget: joi.number().positive().greater(0),
});
