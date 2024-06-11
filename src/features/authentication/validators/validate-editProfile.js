import Joi from "joi";

const editProfileSchema = Joi.object({
  firstName: Joi.string().allow("").optional().messages({
    "string.empty": "First Name is required.",
  }),
  lastName: Joi.string().allow("").optional().messages({
    "string.empty": "Last Name is required.",
  }),
  contact: Joi.string().allow("").optional().messages({
    "string.empty": "Contact is required.",
  }),
  budget: Joi.alternatives()
    .try(Joi.number(), Joi.allow(null))
    .optional()
    .messages({
      "number.base": "Budget must be a number.",
    }),
  description: Joi.string().allow("").optional().messages({
    "string.empty": "Description is required.",
  }),
  roleId: Joi.number().optional().allow(null).messages({
    "number.base": "At least one role must be selected.",
  }),
  genreId: Joi.number().optional().allow(null).messages({
    "number.base": "At least one genre must be selected.",
  }),
  province: Joi.number().optional().allow(null).messages({
    "number.base": "Province must be a number.",
  }),
  district: Joi.number()
    .optional()
    .allow(null)
    .when("province", {
      is: Joi.exist().not(null),
      then: Joi.number().required().messages({
        "number.base": "District is required when Province is selected.",
      }),
      otherwise: Joi.allow(null),
    })
    .messages({
      "number.base": "District must be a number.",
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
