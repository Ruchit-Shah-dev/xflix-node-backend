const mongoose = require("mongoose");

function isValidDate(dateString) {
  // Regular expression to match "DD MMM YYYY" format
  const regex =
    /^\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/;

  // Check if the string matches the format
  if (!regex.test(dateString)) {
    return false;
  }

  // Parse the date string to check if it is a valid date
  const date = Date.parse(dateString);
  return !isNaN(date);
}

const videoSchema = mongoose.Schema({
  videoLink: {
    type: String,
    required: true,
    match: [
      /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+$/,
      "Please fill a valid YouTube embed URL",
    ],
  },
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    enum: ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"],
  },
  contentRating: {
    type: String,
    required: true,
    enum: ["Anyone", "7+", "12+", "16+", "18+"],
  },
  releaseDate: {
    type: String,
    required: true,
    validate: {
      validator: isValidDate,
      message: (props) =>
        `${props.value} is not a valid date in the format "DD MMM YYYY"`,
    },
  },
  previewImage: {
    type: String,
    required: true,
  },
  votes: {
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
  },
  viewCount: {
    type: Number,
    default: 0,
  },
});

const Video = mongoose.model("video", videoSchema);

module.exports = Video;
