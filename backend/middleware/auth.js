import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const bearerToken =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : "";
  const token = req.headers.token || bearerToken;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Login again." });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ success: false, message: "Session expired. Login again." });
  }
};

export default authMiddleware;
