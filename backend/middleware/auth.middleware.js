import jwt from "jsonwebtoken"

const tokenMiddleware = async (req, res, next) => {
  try {
    const getToken = req.headers.authorization;
    if (!getToken) {
      return res.status(401).json({
        success: false,
        message: "Token tidak ditemukan",
      });
    }
    const token = getToken.split(" ")[1];
    const checkToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = checkToken;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token tidak valid atau sudah expired",
    });
  }
};


export default tokenMiddleware