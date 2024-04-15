import { Item } from "../../models/itemModel.js";

const getItemById = async (request, response) => {
  try {
    const { id } = request.params;

    const item = await Item.findById(id); // pass an empty object {} in .find() to get a list of all categories from the database and assign the list to the categories variable
    return response.status(200).json(item);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export default getItemById;
