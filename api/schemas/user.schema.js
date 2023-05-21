const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const lastName = Joi.string().min(3).max(20);
const sex = Joi.string();

const createUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
});
const updateUserSchema = Joi.object({
  id: id.required(),
  name: name.optional(),
  lastName: lastName.optional(),
  sex: sex.optional(),
});

const getUserSchema = Joi.object({
  id: id.required(),
});
const deleteUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  deleteUserSchema,
};
