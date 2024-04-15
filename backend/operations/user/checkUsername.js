import { User } from "../../models/userModel.js";

const checkUsername = async (request, response) => {
  // console.log(`entered updateUser backend`);

  try {
    // console.log(`body is ${request.body}`);
    // console.log(`Object body is ${Object.keys(request.body)}`);
    // console.log(`id is ${id}`);

    try {
      const user = await User.findOne({ userName: request.body.userName });

      console.log(`new user is ${user}`);

      if (!user) {
        return response.status(404).json(user);
      } else {
        // console.log(`user updated`);
        return response.status(200).json(user);
      }
    } catch (err) {
      response.status(404).json({ message: err });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export default checkUsername;
