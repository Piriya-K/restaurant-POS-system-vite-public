import { User } from "../../models/userModel.js";

const getUsers = async (request, response) => {
  try {
    const users = await User.find({}); // pass an empty object {} in .find() to get a list of all items from the database and assign the list to the items variable
    return response.status(200).json({
      //return a successful response and send the an object with the count of all users and an array of all user objects back to the client using the .json middleware
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export default getUsers;
