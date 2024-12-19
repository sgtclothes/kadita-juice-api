const Joi = require("joi");
const { image } = require("../utils/cloudinary.util");

const juiceSchema = Joi.object({
    name: Joi.string().required().min(3).max(100).trim().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name cannot exceed 100 characters",
    }),

    description: Joi.string().required().min(10).trim().messages({
        "string.empty": "Description is required",
        "string.min": "Description must be at least 10 characters long",
    }),

    active: Joi.string().required().messages({
        "string.empty": "Active is required",
    }),

    price: Joi.number().integer().min(0).required().messages({
        "number.base": "Price must be a number",
        "number.min": "Price cannot be negative",
    }),

    category: Joi.string().required().valid("Jus Buah", "Jus Sayur", "Jus Campuran").messages({
        "any.only": "Category must be either Jus Buah, Jus Sayur, Jus Campuran",
    }),

    quantity: Joi.number().integer().min(0).required().messages({
        "number.base": "Quantity must be a number",
        "number.min": "Quantity cannot be negative",
    }),
});

module.exports = {
    juiceSchema,
};
