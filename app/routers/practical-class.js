const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const { checkIsPracticalClassInTopicExist } = require("../helpers/utils");
const practicalClassController = require(__dir.controllers + "/practical-class");

const router = new Router();

router.post(
  "/add-practical-class",
  checkSchema({
    topicId: {
      isUUID: true,
      errorMessage: 'topicId must be a valid UUID v4',
    },
    practicalClassName: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
      custom: {
        options: async (practicalClassName, request) => {
          topicId = request.req.body.topicId;
          await checkIsPracticalClassInTopicExist(topicId, practicalClassName);
        },
      },
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { topicId, practicalClassName } = req.body;
    practicalClassController.addPracticalClass(
      topicId,
      practicalClassName
    );

    res.send({ isAdded: true });
  }
);

router.get("/get-all-practical-classes", async (req, res) => {
  const { topicId } = req.query;
  const result = await practicalClassController.getAllPracticalClass({
    topicId,
  });

  res.send(result);
});

router.get(
  "/get-practical-class",
  // checkSchema({
  //   practicalClassName: {
  //     isString: true,
  //     isLength: {
  //       options: {
  //         min: 1,
  //       },
  //     },
  //   },
  // }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const result = await practicalClassController.getPracticalClass({
      practicalClassId: req.query.practicalClassId,
    });

    res.send(result);
  }
);

router.delete("/delete-practical-class", async (req, res) => {
  const { practicalClassId } = req.query;
  await practicalClassController.deletePracticalClass({
    practicalClassId,
  });

  res.send({ isDeleted: true });
});

router.put("/update-practical-class", async (req, res) => {
  const { practicalClassId, disciplineId, practicalClassName } = req.body;

  const result = await practicalClassController.updatePracticalClass({
    practicalClassId,
    disciplineId,
    practicalClassName,
  });

  res.send(result);
});

module.exports = router;
