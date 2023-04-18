const Router = require("express");
const topicController = require(__dir.controllers + "/topic");

const router = new Router();

router.post("/addTopic", (req, res) => {
  const { topicName } = req.body;
  topicController.addTopic(topicName);

  res.send({ isAdded: true });
});

router.get("/getTopic", async (req, res) => {
  const result = await topicController.getTopic({
    id: req.query.id,
  });

  res.send(result);
});

router.delete("/deleteTopic", async (req, res) => {
  const { id } = req.query;
  await topicController.deleteTopic({
    id,
  });

  res.send({ isDeleted: true });
});

router.put("/updateTopic", async (req, res) => {
  const { id, topicName } = req.body;

  const result = await topicController.updateTopic({
    id,
    topicName,
  });

  res.send(result);
});

module.exports = router;
