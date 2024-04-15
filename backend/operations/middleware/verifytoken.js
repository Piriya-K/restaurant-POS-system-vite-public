import jwt from "jsonwebtoken";

const verifyToken = (request, response, next) => {
  const authorizationHeader =
    request.headers["authorization"] || request.headers["Authorization"];

  // console.log(`authHeader is ${authorizationHeader}`);
  // console.log(`request contains ${Object.keys(request)}`);

  if (!authorizationHeader) {
    return response
      .status(401)
      .json({ message: "Unauthorized: Missing token." });
  }

  const token = authorizationHeader.split(" ")[1];

  // console.log(`token is ${token}`);

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    // console.log(`decoded is ${decoded}`);
    // console.log(`Object decoded is ${Object.keys(decoded)}`);
    request._id = decoded._id;
    // console.log(`request._id is ${request._id}`);
    // console.log(`decoded._id is ${decoded._id}`);
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    return response
      .status(403)
      .json({ message: "Unauthorized: Invalid token." });
  }
};

export default verifyToken;
