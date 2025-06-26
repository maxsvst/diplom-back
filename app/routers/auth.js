const Router = require("express");
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

const teacherController = require(__dir.controllers + "/teacher");
const authController = require(__dir.controllers + "/auth");

const router = new Router();

router.post('/registration', async (req, res) => {
    try {
        const { fullName, email, password, rank, position } = req.body;

        const existingUser = await teacherController.getTeacher({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exist' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        authController.registration({ fullName, email, password: hashedPassword, rank, position })

        const token = jwt.sign({ email, fullName }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

        res.status(201).json({ message: 'User created successfully', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed' });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await teacherController.getTeacher({ email })
        if (!existingUser) {
            return res.status(401).json({ message: 'Пользователя с таким email не существует' })
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password)

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Неверный пароль' });
        }

        const accessToken = jwt.sign(
            {
                teacherId: existingUser.teacherId,
                email: existingUser.email,
                fullName: existingUser.fullName,
                rank: existingUser.rank
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        const newRefreshToken = jwt.sign(
            {
                teacherId: existingUser.teacherId,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        teacherController.updateTeacher({ teacherId: existingUser.teacherId, refreshToken: newRefreshToken })

        res.status(201).json({ message: 'User created successfully', accessToken, refreshToken: newRefreshToken });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed' });
    }
})

module.exports = router;