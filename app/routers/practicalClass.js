const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const { checkIsPracticalClassInTopicExist } = require("../helpers/utils");
const practicalClassController = require(__dir.controllers + "/practicalClass");

const router = new Router();

router.post(
  "/addPracticalClass",
  checkSchema({
    topicId: {
      isNumeric: { min: 0 },
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
    const { disciplineId, topicId, practicalClassName } = req.body;
    practicalClassController.addPracticalClass(
      disciplineId,
      topicId,
      practicalClassName
    );

    res.send({ isAdded: true });
  }
);

router.get(
  "/getAllPracticalClasses",
  checkSchema({
    disciplineId: {
      isNumeric: { min: 0 },
    },
    topicId: {
      isNumeric: { min: 0 },
    },
  }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const result = await practicalClassController.getAllPracticalClasses({
      disciplineId: req.query.disciplineId,
      topicId: req.query.topicId,
    });

    res.send(result);
  }
);

router.get(
  "/getPracticalClass",
  checkSchema({
    practicalClassName: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
    },
  }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const result = await practicalClassController.getPracticalClass({
      practicalClassName: req.query.practicalClassName,
    });

    res.send(result);
  }
);

router.delete("/deletePracticalClass", async (req, res) => {
  const { practicalClassId } = req.query;
  await practicalClassController.deletePracticalClass({
    practicalClassId,
  });

  res.send({ isDeleted: true });
});

router.put("/updatePracticalClass", async (req, res) => {
  const { practicalClassId, disciplineId, practicalClassName } = req.body;

  const result = await practicalClassController.updatePracticalClass({
    practicalClassId,
    disciplineId,
    practicalClassName,
  });

  res.send(result);
});

module.exports = router;
