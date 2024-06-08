import Joi from "joi";

const editProfileSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.empty": "First Name is required.",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "Last Name is required.",
  }),
  contact: Joi.string().required().messages({
    "string.empty": "Contact is required.",
  }),
  budget: Joi.number().required().messages({
    "number.base": "Budget must be a number.",
    "any.required": "Budget is required.",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required.",
  }),
  role: Joi.string().required().messages({
    "string.empty": "At least one role must be selected.",
  }),
  genre: Joi.string().required().messages({
    "string.empty": "At least one genre must be selected.",
  }),
  province: Joi.string().required().messages({
    "string.empty": "Province is required.",
  }),
  district: Joi.string().required().messages({
    "string.empty": "District is required.",
  }),
});

const validateEditProfile = (input, inputCheckbox, province, district) => {
  const data = {
    ...input,
    role: inputCheckbox.role || "",
    genre: inputCheckbox.genre || "",
    province: province ? province.label : "",
    district: district ? district.label : "",
  };

  const { error } = editProfileSchema.validate(data, { abortEarly: false });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});

    return result;
  }
};

export default validateEditProfile;
