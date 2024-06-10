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
  description: Joi.string().allow("").messages({
    "string.empty": "Description is required.",
  }),
  roleId: Joi.number().required().messages({
    "number.base": "At least one role must be selected.",
    "any.required": "Role is required.",
  }),
  genreId: Joi.number().required().messages({
    "number.base": "At least one genre must be selected.",
    "any.required": "Genre is required.",
  }),
  province: Joi.number().required().messages({
    "number.base": "Province is required.",
    "any.required": "Province is required.",
  }),
  district: Joi.number().required().messages({
    "number.base": "District is required.",
    "any.required": "District is required.",
  }),
});

const validateEditProfile = (input, inputCheckbox, province, district) => {
  const data = {
    ...input,
    province: province ? province.id : null,
    district: district ? district.id : null,
    roleId: inputCheckbox.role ? inputCheckbox.role.id : null,
    genreId: inputCheckbox.genre ? inputCheckbox.genre.id : null,
  };

  const { error } = editProfileSchema.validate(data, { abortEarly: false });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});

    return result;
  }
  return null;
};

export default validateEditProfile;
