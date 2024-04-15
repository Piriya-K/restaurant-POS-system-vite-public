import { User } from "../../models/userModel.js";

const createUser = async (request, response) => {
  try {
    const newUser = {
      userName: request.body.userName,
      password: request.body.password,
      imageFile: request.body.imageFile,
    };

    const createdUser = await User.create(newUser);

    return response
      .status(200)
      .send({ message: `User registered succesfully!` });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export default createUser;
