import { User } from "../../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const loginUser = async (request, response) => {
  // console.log(`in loginUser backend`);
  try {
    const { username, password } = request.body;

    const user = await User.findOne(
      { userName: username },
      { _id: 1, userName: 1, password: 1, imageFile: 1 } //use 1 to specify which field should be included in the returned document
    );

    // console.log(`loginUser backend user is ${user}`);
    // console.log(user && (await bcrypt.compare(password, user.password)));

    if (user && (await bcrypt.compare(password, user.password))) {
      //jwt token
      const jwtToken = jwt.sign(
        {
          _id: user._id,
          userName: user.userName,
          password: user.password,
          imageFile: user.imageFile,
        },
        process.env.SECRET, //secret key
        { expiresIn: `1h` } //duration until expiration (1 hour)
      );

      // console.log(`jwtToken is ${jwtToken}`);
      return response
        .status(200)
        .json({ message: `Sign-In Successful!`, token: { jwtToken } });
    } else {
      return response.status(401).json({ message: `Sign-In Unsuccessful!` });
    }
  } catch (err) {
    response.status(500).send({ message: err.message, status: 500 });
  }
};

export default loginUser;
