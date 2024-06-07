import Joi from "joi";

const profileSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "First name is required." }),
  lastName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "Last name is required." }),
  contact: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "Line ID is required." }),
  budget: Joi.number()
    .required()
    .messages({
      "number.base": "Budget must be a number.",
      "any.required": "Budget is required.",
    }),
  description: Joi.string()
    .optional()
    .allow("")
    .messages({ "string.empty": "Description is required." }),
  roles: Joi.array()
    .items(
      Joi.string().valid(
        "Guitar",
        "Bass",
        "Piano",
        "Voice",
        "Drum",
        "Saxophone"
      )
    )
    .required()
    .min(1)
    .messages({
      "array.min": "At least one role is required.",
      "any.only": "Invalid role selected.",
    }),
  genres: Joi.array()
    .items(Joi.string().valid("Pop", "Rock", "Jazz", "Blues"))
    .required()
    .min(1)
    .messages({
      "array.min": "At least one genre is required.",
      "any.only": "Invalid genre selected.",
    }),
});

const validateProfile = (input) => {
  const { error } = profileSchema.validate(input, { abortEarly: false });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});

    return result;
  }
};

export default validateProfile;
