const Joi = require("joi");

const availableGenres = [
  "Education",
  "Sports",
  "Movies",
  "Comedy",
  "Lifestyle",
  "All",
];

const querySchema = Joi.object({
  genres: Joi.string()
    .custom((value, helpers) => {
      const genreArray = value.split(",");
      const invalidGenre = genreArray.find(
        (item) => !availableGenres.includes(item)
      );
      if (invalidGenre) {
        return helpers.message(
          `Invalid Genre: ${invalidGenre} must be one of ${availableGenres}`
        );
      }
      return value;
    })
    .optional(),
  sortBy: Joi.string().valid("viewCount", "releaseDate").optional(),
  contentRating: Joi.string()
    .valid("Anyone", "7+", "12+", "16+", "18+")
    .optional(),
  title: Joi.string().optional(),
});

const paramSchema = Joi.object({
  videoId: Joi.string().custom((value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
  }),
});

module.exports = { querySchema, paramSchema };
