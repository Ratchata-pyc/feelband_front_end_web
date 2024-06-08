import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "First name is required." }),
  lastName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "Last name is required." }),
  email: Joi.alternatives([Joi.string().email({ tlds: false })]).messages({
    "alternatives.match": "Invalid email address.",
  }),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "Password must be at least 6 characters and contain only alphabet and number.",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": "Confirm Password is required.",
    "any.only": "Password and confirm password did not match.",
  }),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});

    return result;
  }
};

export default validateRegister;
