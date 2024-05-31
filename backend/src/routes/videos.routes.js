const router = require("express").Router();
const {
  getVideos,
  getVideoById,
  createVideos,
  changeVotes,
  changeViews,
} = require("../controllers/videos.controller");

const { validateParam, validateQuery } = require("../middlewares/validate");

const { querySchema, paramSchema } = require("../validations/video.validation");

router.get("/videos", validateQuery(querySchema), getVideos);

router.get("/videos/:videoId", validateParam(paramSchema), getVideoById);

router.post("/videos", createVideos);

router.patch("/videos/:videoId/votes", changeVotes);

router.patch("/videos/:videoId/views", validateParam(paramSchema), changeViews);

module.exports = router;
