const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const { checkIsLectionInTopicExist } = require("../helpers/utils");
const lectionController = require(__dir.controllers + "/lection");

const router = new Router();

router.post(
  "/add-lection",
  checkSchema({
    topicId: {
      isUUID: true,
      errorMessage: 'topicId must be a valid UUID v4',
    },
    lectionName: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
      custom: {
        options: async (lectionName, request) => {
          topicId = request.req.body.topicId;
          await checkIsLectionInTopicExist(topicId, lectionName);
        },
      },
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { topicId, lectionName } = req.body;
    lectionController.addLection(topicId, lectionName);

    res.send({ isAdded: true });
  }
);

router.get("/get-all-lections", async (req, res) => {
  const { topicId } = req.query;
  const result = await lectionController.getAllLection({
    topicId,
  });

  res.send(result);
});

router.get(
  "/get-lection",
  checkSchema({
    lectionId: {
      isUUID: true,
      errorMessage: 'lectionId must be a valid UUID v4',
    },
  }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const result = await lectionController.getLection({
      lectionId: req.query.lectionId,
    });

    res.send(result);
  }
);

router.delete("/delete-lection", async (req, res) => {
  const { lectionId } = req.query;
  await lectionController.deleteLection({
    lectionId,
  });

  res.send({ isDeleted: true });
});

router.put("/update-lection", async (req, res) => {
  const { id, disciplineId, lectionName } = req.body;

  const result = await lectionController.updateLection({
    id,
    disciplineId,
    lectionName,
  });

  res.send(result);
});

module.exports = router;
