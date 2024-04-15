import { User } from "../../models/userModel.js";
import verifyToken from "../middleware/verifytoken.js";

const updateUser = async (request, response) => {
  try {
    verifyToken(request, response, async () => {
      if (
        !request.body.userName ||
        !request.body.password ||
        !request.body.imageFile
      ) {
        return response
          .status(400)
          .send({ message: `All fields are required.` });
      }

      const { id } = request.params;

      try {
        const user = await User.findByIdAndUpdate(id, request.body, {
          new: true,
        });

        if (!user) {
          return response.status(404).json({ message: `User not found.` });
        } else {
          return response
            .status(200)
            .send({ message: `User updated.`, user: user });
        }
      } catch (err) {
        response.status(404).json({ message: err });
      }
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export default updateUser;
