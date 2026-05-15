import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import prisma from "../prisma/client.js";

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const checkIsUserExisted = await prisma.user.findUnique({where: {email}});
    if (checkIsUserExisted) {
      res.status(400).json({
        success: false,
        message: "User sudah terdaftar",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUser = await prisma.user.create({data: {
        username: username,
        email: email,
        password: hashedPassword,
      }});
      if (!createUser) {
        res.status(400).json({
          success: false,
          message: "Gagal Menambahkan User",
        });
      } else {
        res.status(201).json({
          success: true,
          message: "User berhasil ditambahkan",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await prisma.user.findUnique({where: {email}});
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Email atau password salah",
      });
    } else {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        res.status(404).json({
          success: false,
          message: "Email atau password salah",
        });
      } else {
        const token = jwt.sign(
          { id: user.id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "7d" },
        );
        res.status(200).json({
          success: true,
          message: "Login berhasil",
          token: token
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export {register, login}