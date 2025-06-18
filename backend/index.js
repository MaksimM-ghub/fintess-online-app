import express, { json } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors"
import cookieParser from "cookie-parser";
import { JSONFilePreset } from "lowdb/node";
import { v4 as uuidv4 } from "uuid";
import { dbExercises } from "./exerceses.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

const JWT_SECRET = "W91G8$%t4hLk@123qweZXCASD!jklm,./";

const defaultUser = { user: [] };
const dbUser = await JSONFilePreset("user.json", defaultUser);

async function writeDbUser() {
  await dbUser.write();
}

await dbExercises.write();

function generateToken(user) {
  return jwt.sign(
    {
      email: user.email,
      name: user.name,
      surname: user.surname
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
}

function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    // Проверяем валидность токена и извлекаем payload
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // сохраняем данные пользователя
    next();
  } catch (err) {
    return res.status(401).json({ message: "Неверный токен" });
  }
}

app.post("/register", async (req, res) => {
  const { email, name, surname, password } = req.body;

  if (dbUser.data.user.find((item) => item.email === email)) {
    return res
      .status(400)
      .json({ message: "Пользователь с данной почтой уже зарегестрирован" });
  }

  const hashedPassword = await bcrypt.hash(password, 10); //Хэшируем пароль с целью безопасность (защита данных пользователя)
  dbUser.data.user.push({
    id: uuidv4(),
    email,
    name,
    surname,
    password: hashedPassword,
  });
  await writeDbUser();
  res.status(200).json({ message: "successful registration" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = dbUser.data.user.find((item) => item.email === email);

  if (!user) {
    return res
      .status(400)
      .json({ message: "Пользователь с данной почтой отсутствует" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password); // Сравниваем введённый пароль с хэшем

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Неверный пароль" });
  }

  const token = generateToken(user);
  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "Успешный вход" });
});

app.get("/me", authMiddleware, (req, res) => {
  res
    .status(200)
    .json({
      email: req.user.email,
      name: req.user.name,
      username: req.user.username,
    });
});

app.post("/logout", (req, res) => {
  res.clearCookie("email");
  res.status(200).json({ message: "Выход выполнен" });
});

app.listen(3000, () => console.log("Server started"));
