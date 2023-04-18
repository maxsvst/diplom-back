const Router = require("express");
const teacherController = require(__dir.controllers + "/teacher");

const router = new Router();

router.post("/addTeacher", (req, res) => {
  const { fullName, email, password, rank, position } = req.body;
  teacherController.registration(
    fullName,
    email,
    password,
    rank,
    position
  );
  res.send({ isAdded: true });
});

router.get("/getTeacher", async (req, res) => {
  const { id } = req.query;
  const result = await teacherController.getTeacher({ id: id });

  res.send(result);
});

router.delete("/deleteTeacher", async (req, res) => {
  const { id } = req.query;
  await teacherController.deleteTeacher({
    id,
  });

  res.send({ isDeleted: true });
});

router.put("/updateTeacher", async (req, res) => {
  const { id, fullName, email, password, rank, position } = req.body;

  const result = await teacherController.updateTeacher({
    id,
    fullName,
    email,
    password,
    rank,
    position,
  });

  res.send(result);
});

module.exports = router;
