const {
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
} = require("../services/videos.service");

const catchAsync = require("../utilities/catchAsync");

const getVideos = catchAsync(async (req, res) => {
  const { title, genres, contentRating, sortBy } = req.query;
  // console.log({ title, genres, contentRating, sortBy });
  if (title && genres && contentRating) {
    let filteredData = await getFilteredDataWith_Title_Genre_ContentRating({
      title,
      genres,
      contentRating,
    });
    return res.json({ videos: filteredData });
  } else if (title) {
    let filteredData = await getFilteredDataWithTitle(title);
    return res.json({ videos: filteredData });
  } else if (genres) {
    let filteredData = await getFilteredDataWithGenre(genres);
    return res.json({ videos: filteredData });
  } else if (contentRating) {
    let filteredData = await getFilteredDataWithContentRating(contentRating);
    return res.json({ videos: filteredData });
  } else if (sortBy) {
    // console.log(sortBy);
    let sortedData = await getSortedData(sortBy);
    // console.log(sortedData);
    return res.json({ videos: sortedData });
  } else {
    const allVideos = await getAllVideos();
    return res.json({ videos: allVideos });
  }
});

const getVideoById = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const result = await getVideoByIdFromDb(videoId);
  return res.json(result);
});

const createVideos = catchAsync(async (req, res) => {
  const newVideo = await createAndSaveVideos(req.body);
  return res.status(201).json(newVideo);
});

const changeVotes = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const { vote } = req.body;
  await incOrDecVote({ videoId, vote });
  return res.sendStatus(204);
});

const changeViews = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  await incViews(videoId);
  return res.sendStatus(204);
});

module.exports = {
  getVideos,
  getVideoById,
  createVideos,
  changeVotes,
  changeViews,
};
