const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const objectiveController = require(__dir.controllers + "/objective");

const router = new Router();

router.post(
    "/add-objective",
    checkSchema({
        disciplineId: {
            isUUID: true,
            errorMessage: 'disciplineId must be a valid UUID v4',
        },
        objectiveName: {
            isString: true,
            isLength: {
                options: {
                    min: 1,
                },
            },
            // custom: {
            //     options: async (topicName, request) => {
            //         disciplineId = request.req.body.disciplineId;
            //         await checkIsTopicInDisciplineExist(disciplineId, topicName);
            //     },
            // },
        },
    }),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });


        const { disciplineId, objectiveName } = req.body;

        try {
            const objectiveId = await objectiveController.addObjective(disciplineId, objectiveName);
            res.status(201).json({ objectiveId, isAdded: true });
        } catch (error) {
            console.error("Error in /add-objective route:", error);
            res.status(500).json({ error: "Failed to add competence" });
        }
    }
);

router.get(
    "/get-all-objectives",
    checkSchema({
        disciplineId: {
            isUUID: true,
            errorMessage: 'disciplineId must be a valid UUID v4',
        },
    }),
    async (req, res) => {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const result = await objectiveController.getAllObjectives({
            disciplineId: req.query.disciplineId,
        });

        res.send(result);
    }
);

router.get("/get-objective", async (req, res) => {
    const result = await objectiveController.getObjective({
        objectiveId: req.query.objectiveId,
    });

    res.send(result);
});

router.delete("/delete-objective", async (req, res) => {
    const { objectiveId } = req.query;
    await objectiveController.deleteObjective({
        objectiveId,
    });

    res.send({ isDeleted: true });
});

module.exports = router;