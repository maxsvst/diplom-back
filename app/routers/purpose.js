const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const purposeController = require(__dir.controllers + "/purpose");

const router = new Router();

router.post(
    "/add-purpose",
    checkSchema({
        disciplineId: {
            isUUID: true,
            errorMessage: 'disciplineId must be a valid UUID v4',
        },
        purposeName: {
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


        const { disciplineId, purposeName } = req.body;

        try {
            const purposeId = await purposeController.addPurpose(disciplineId, purposeName);
            res.status(201).json({ purposeId, isAdded: true });
        } catch (error) {
            console.error("Error in /add-purpose route:", error);
            res.status(500).json({ error: "Failed to add competence" });
        }
    }
);

router.get(
    "/get-all-purposes",
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
        const result = await purposeController.getAllPurposes({
            disciplineId: req.query.disciplineId,
        });

        res.send(result);
    }
);

router.get("/get-purpose", async (req, res) => {
    const result = await purposeController.getPurpose({
        purposeId: req.query.purposeId,
    });

    res.send(result);
});

router.delete("/delete-purpose", async (req, res) => {
    const { purposeId } = req.query;
    await purposeController.deletePurpose({
        purposeId,
    });

    res.send({ isDeleted: true });
});

module.exports = router;