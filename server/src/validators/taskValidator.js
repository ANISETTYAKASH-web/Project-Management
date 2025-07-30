import Joi from "joi";
import joiObjectId from "joi-objectid";

Joi.objectId = joiObjectId(Joi);

// joi.objectId = joiobjectId(joi);
export const taskSchema = Joi.object({
  name: Joi.string().required().min(1).max(30),
  status: Joi.string().valid("todo", "doing", "done").optional(),
  project_id: Joi.objectId(),
}).unknown(true);

// export { taskSchema };
