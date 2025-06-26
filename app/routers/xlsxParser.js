const xlsx = require('node-xlsx').default;
const fs = require("fs");
const path = require("path");
const multer = require('multer');
const Router = require("express");
const router = new Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'application/vnd.ms-excel') {
            cb(null, true);
        } else {
            req.fileValidationError = 'Неподдерживаемый тип файла';
            cb(null, false);
        }
    }
});

// async function parseWorkPlan(filePath = 'workPlan2.xlsx') {
async function parseWorkPlan(fileBuffer) {
    try {
        const workSheetsFromBuffer = xlsx.parse(fileBuffer);

        const data = workSheetsFromBuffer[0].data;

        let studyFieldCode = null;
        let studyField = null;

        if (data.length > 26 && data[26].length > 3) {
            studyFieldCode = data[26][3];
        }

        if (data.length > 28 && data[28].length > 3) {
            let fieldData = data[28][3];
            if (typeof fieldData === 'string') {
                fieldData = fieldData.replace(/[\r\n]+/g, '');
                studyField = fieldData.replace(studyFieldCode, '').trim();
            }
        }

        return {
            studyFieldCode: studyFieldCode,
            studyField: studyField
        };

    } catch (error) {
        console.error(`Error parsing work plan: ${error.message}`);
        throw new Error(`Failed to parse work plan: ${error.message}`);
    }
}

const getHours = (fileBuffer) => {
    try {
        const workSheetsFromBuffer = xlsx.parse(fileBuffer);
        const data = workSheetsFromBuffer[3].data;

        const [headerRow1, headerRow2, headerRow3, ...dataRows] = data;

        const courses = [1, 2, 3, 4];
        const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
        const semesterKeys = semesters.map(s => `semestr_${s}`);
        const courseKeys = courses.map(c => `kurs_${c}`);

        const result = [];

        for (const row of dataRows) {
            const obj = {
                schitat_v_plane: row[0],
                indeks: row[1],
                naimenovanie: row[2],
                formy_prom_att: {
                    ekzamen: row[3],
                    zachet: row[4],
                    zachet_s_ots: row[5],
                    kp: row[6],
                    kr: row[7],
                    rgr: row[8],
                },
                ze: {
                    ekspertnoe: row[9],
                    fakt: row[10],
                },
                itogo_akadchasov: {
                    ekspertnoe: row[11],
                    po_planu: row[12],
                    kont_rab: row[13],
                    sr: row[14],
                    kontrol: row[15],
                },
                kurs_1: {},
                kurs_2: {},
                kurs_3: {},
                kurs_4: {},
                zakreplennaya_kafedra: {
                    kod: row[64],
                    naimenovanie: row[65],
                    kompetentsii: row[66],
                }
            };

            let colIndex = 16;
            for (let k = 0; k < courseKeys.length; k++) {
                const course = courseKeys[k];
                obj[course] = {};
                for (let s = 0; s < semesters.length / courses.length; s++) {
                    const semKey = semesterKeys[k * (semesters.length / courses.length) + s];
                    const semObj = {
                        ze: row[colIndex++],
                        lek: row[colIndex++],
                        lab: row[colIndex++],
                        pr: row[colIndex++],
                        sr: row[colIndex++],
                        kontrol: row[colIndex++],
                    };

                    const hasData = Object.values(semObj).some(v => v !== null && v !== undefined);
                    obj[course][semKey] = hasData ? semObj : null;
                }
            }

            result.push(obj);
        }

        return result;
    } catch (error) {
        console.error(`Error parsing work plan: ${error.message}`);
        throw new Error(`Failed to parse work plan: ${error.message}`);
    }
}

router.post('/upload-xlsx', upload.single('file'), (req, res, next) => {
    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    }
    next();
}, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileBuffer = req.file.buffer;
        const workPlanData = getHours(fileBuffer);
        res.json(workPlanData);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

// router.get('/get-xlsx', async (req, res) => {
//     try {
//         // const workPlanData = await parseWorkPlan();
//         const workPlanData = getHours()
//         // const workPlanData = xlsx.parse(fs.readFileSync(path.resolve('workPlan2.xlsx')));
//         res.json(workPlanData);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

