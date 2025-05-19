const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const { checkIsLaboratoryClassInTopicExist } = require("../helpers/utils");
const laboratoryClassController = require(__dir.controllers +
  "/laboratory-class");

const router = new Router();

router.post(
  "/add-laboratory-class",
  checkSchema({
    topicId: {
      isUUID: true,
      errorMessage: 'topicId must be a valid UUID v4',
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
    const { topicId, laboratoryClassName } = req.body;
    laboratoryClassController.addLaboratoryClass(
      topicId,
      laboratoryClassName
    );

    res.send({ isAdded: true });
  }
);

router.get("/get-all-laboratory-classes", async (req, res) => {
  const { topicId } = req.query;
  const result = await laboratoryClassController.getAllLaboratoryClass({
    topicId,
  });

  res.send(result);
});

router.get(
  "/get-laboratory-class",
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

router.delete("/delete-laboratory-class", async (req, res) => {
  const { laboratoryClassId } = req.query;
  await laboratoryClassController.deleteLaboratoryClass({
    laboratoryClassId,
  });

  res.send({ isDeleted: true });
});

router.put("/update-laboratory-class", async (req, res) => {
  const { laboratoryClassId, disciplineId, laboratoryClassName } = req.body;

  const result = await laboratoryClassController.updateLaboratoryClass({
    laboratoryClassId,
    disciplineId,
    laboratoryClassName,
  });

  res.send(result);
});

module.exports = router;
