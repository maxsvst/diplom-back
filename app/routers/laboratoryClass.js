const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const { checkIsLaboratoryClassInTopicExist } = require("../helpers/utils");
const laboratoryClassController = require(__dir.controllers +
  "/laboratoryClass");

const router = new Router();

router.post(
  "/addLaboratoryClass",
  checkSchema({
    topicId: {
      isNumeric: { min: 0 },
    },
    laboratoryClassName: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
      custom: {
        options: async (laboratoryClassName, request) => {
          topicId = request.req.body.topicId;
          await checkIsLaboratoryClassInTopicExist(
            topicId,
            laboratoryClassName
          );
        },
      },
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { disciplineId, topicId, laboratoryClassName } = req.body;
    laboratoryClassController.addLaboratoryClass(
      disciplineId,
      topicId,
      laboratoryClassName
    );

    res.send({ isAdded: true });
  }
);

router.get(
  "/getAllLaboratoryClasses",
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
    const result = await laboratoryClassController.getAllLaboratoryClasses({
      disciplineId: req.query.disciplineId,
      topicId: req.query.topicId,
    });

    res.send(result);
  }
);

router.get(
  "/getLaboratoryClass",
  checkSchema({
    laboratoryClassName: {
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
    const result = await laboratoryClassController.getLaboratoryClass({
      laboratoryClassName: req.query.laboratoryClassName,
    });

    res.send(result);
  }
);

router.delete("/deleteLaboratoryClass", async (req, res) => {
  const { laboratoryClassId } = req.query;
  await laboratoryClassController.deleteLaboratoryClass({
    laboratoryClassId,
  });

  res.send({ isDeleted: true });
});

router.put("/updateLaboratoryClass", async (req, res) => {
  const { laboratoryClassId, disciplineId, laboratoryClassName } = req.body;

  const result = await laboratoryClassController.updateLaboratoryClass({
    laboratoryClassId,
    disciplineId,
    laboratoryClassName,
  });

  res.send(result);
});

module.exports = router;
