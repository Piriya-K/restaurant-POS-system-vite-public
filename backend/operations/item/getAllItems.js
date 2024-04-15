import { Item } from "../../models/itemModel.js";

const getAllItems = async (request, response) => {
  try {
    const items = await Item.find({}).sort({ categoryId: 1 }); // pass an empty object {} in .find() to get a list of all items from the database and assign the list to the items variable
    return response.status(200).json({
      //return a successful response and send the an object with the count of all items and an array of all item objects back to the client using the .json middleware
      count: items.length,
      data: items,
    }); //return a successful response and send the item objects back to the client using the .json middleware
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export default getAllItems;
