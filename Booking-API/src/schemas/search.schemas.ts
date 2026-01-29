import Joi from 'joi';

export const bookingSearchItemSchema = Joi.object({
  bookingid: Joi.number().integer().required(),
});

export const bookingSearchResponseSchema = Joi.array().items(bookingSearchItemSchema).min(1);
