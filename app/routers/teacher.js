const Router = require("express");
const teacherController = require(__dir.controllers + "/teacher");

const router = new Router();

router.post("/add-teacher", (req, res) => {
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

router.get("/get-teacher", async (req, res) => {
  const { teacherId } = req.query;
  const result = await teacherController.getTeacher({ teacherId });

  res.send(result);
});

router.delete("/delete-teacher", async (req, res) => {
  const { teacherId } = req.query;
  await teacherController.deleteTeacher({
    teacherId,
  });

  res.send({ isDeleted: true });
});

router.put("/update-teacher", async (req, res) => {
  const { teacherId, fullName, email, password, rank, position } = req.body;

  const result = await teacherController.updateTeacher({
    teacherId,
    fullName,
    email,
    password,
    rank,
    position,
  });

  res.send(result);
});

router.patch("/update-teacher", async (req, res) => {
  try {
    const { teacherId, field, value } = req.body;

    // 1. Валидация запроса
    if (!teacherId || !field || value === undefined) {  // Проверяем, что все необходимые параметры переданы
      return res.status(400).json({ message: "Missing required parameters: teacherId, field, value" });
    }

    // 2. Валидация поля (ограничение обновляемых полей - защита!)
    const allowedFields = ['fullName', 'email', 'password', 'rank', 'position']; // Список разрешенных полей
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ message: `Invalid field: ${field}` });
    }

    // 3. Поиск преподавателя по ID
    const existingTeacher = await teacherController.getTeacherById({ teacherId }); // Предполагаем наличие getTeacherById в teacherController

    if (!existingTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // 4. Обновление поля
    // Создаем объект, содержащий только поле для обновления
    const updateData = { [field]: value };

    // Если обновляется пароль, нужно его хешировать
    if (field === 'password') {
      const hashedPassword = await bcrypt.hash(value, 10);
      updateData.password = hashedPassword;
    }

    const updatedTeacher = await teacherController.updateTeacher(
      { teacherId, ...updateData }
    ); // Передаем teacherId и объект updateData

    if (!updatedTeacher) {
      return res.status(500).json({ message: "Failed to update teacher" }); // Обработка ошибки обновления
    }

    res.status(200).json({
      message: "Teacher field updated successfully",
      updatedTeacher: updatedTeacher,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update teacher field" });
  }
});

module.exports = router;
