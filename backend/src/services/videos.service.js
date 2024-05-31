const Video = require("../models/videos.model");
const ApiError = require("../utilities/apiError");

const getAllVideos = async () => {
  const result = await Video.find({});
  return result;
};

const getFilteredDataWith_Title_Genre_ContentRating = async ({
  title,
  genres,
  contentRating,
}) => {
  const titleRegex = new RegExp(title, "i");
  const genresArray = genres.split(",");
  if (genresArray.find((item) => item.toString() === "All")) {
    genresArray = [
      "Education",
      "Sports",
      "Movies",
      "Comedy",
      "Lifestyle",
      "All",
    ];
  }

  // const contentRatingArray = ["Anyone", "7+", "12+", "16+", "18+"];
  // const index = contentRatingArray.indexOf(contentRating);
  // const reqContentRatingArray = contentRatingArray.slice(0, index + 1);
  // { $in: reqContentRatingArray }
  const result = await Video.find({
    title: titleRegex,
    genre: { $in: genresArray },
    contentRating: contentRating,
  });
  return result;
};

const getFilteredDataWithTitle = async (title) => {
  const titleRegex = new RegExp(title, "i");
  // console.log(titleRegex);
  const result = await Video.find({
    title: titleRegex,
  });
  // console.log(result);
  return result;
};

const getFilteredDataWithGenre = async (genres) => {
  let genresArray = genres.split(",");
  if (genresArray.find((item) => item.toString() === "All")) {
    genresArray = [
      "Education",
      "Sports",
      "Movies",
      "Comedy",
      "Lifestyle",
      "All",
    ];
  }
  const result = await Video.find({
    genre: { $in: genresArray },
  });
  return result;
};

const getFilteredDataWithContentRating = async (contentRating) => {
  // const contentRatingArray = ["Anyone", "7+", "12+", "16+", "18+"];
  // const index = contentRatingArray.indexOf(contentRating);
  // const reqContentRatingArray = contentRatingArray.slice(0, index + 1);

  // const result = await Video.find({
  //   contentRating: { $in: reqContentRatingArray },
  // });
  const result = await Video.find({
    contentRating: contentRating,
  });
  return result;
  can;
};

const getSortedData = async (sortBy) => {
  const result = await Video.find();
  // console.log(sortBy, result[0][sortBy], typeof result[0][sortBy]);
  if (sortBy.toString() === "releaseDate") {
    result.sort((a, b) => {
      const dateA = new Date(a.releaseDate);
      const dateB = new Date(b.releaseDate);
      return dateB - dateA;
    });
  } else {
    result.sort((a, b) => b.viewCount - a.viewCount);
  }
  return result;
};

const getVideoByIdFromDb = async (id) => {
  const result = await Video.findById(id);
  if (!result) throw new ApiError(400, "No video found with matching id");
  return result;
};

const createAndSaveVideos = async (videoData) => {
  const result = await Video.create(videoData);
  return result;
};

const incOrDecVote = async ({ videoId, vote }) => {
  const result = await Video.findById(videoId);
  // console.log(result);
  // console.log((result.votes.upVotes += 1));
  if (!result) throw new ApiError(404, "No video found with matching id");
  if (vote.toString() === "upVote") result.votes.upVotes += 1;
  else if (vote.toString() === "downVote") result.votes.downVotes += 1;

  await result.save();
  // console.log(result);
};

const incViews = async (id) => {
  const result = await Video.findById(id);
  // console.log(result);
  if (!result) throw new ApiError(404, "No video found with matching id");
  console.log(typeof result.viewCount);
  // result.viewCount = (Number(result.viewCount) + 1).toString();
  result.viewCount += 1;
  console.log(typeof result.viewCount);
  await result.save();
  // console.log(result);
};

module.exports = {
  getAllVideos,
  getFilteredDataWith_Title_Genre_ContentRating,
  getFilteredDataWithTitle,
  getFilteredDataWithGenre,
  getFilteredDataWithContentRating,
  getSortedData,
  getVideoByIdFromDb,
  createAndSaveVideos,
  incOrDecVote,
  incViews,
};
