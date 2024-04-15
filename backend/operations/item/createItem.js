import { Item } from "../../models/itemModel.js";
import verifyToken from "../middleware/verifytoken.js";

const createItem = async (request, response) => {
  try {
    verifyToken(request, response, async () => {
      if (!request.body.itemName || !request.body.itemPrice) {
        return response
          .status(400)
          .send({ message: `All fields are required: item name, item price` });
      }

      const newItem = {
        itemName: request.body.itemName,
        itemPrice: request.body.itemPrice,
        categoryId: request.body.categoryId,
      };

      const createdItem = await Item.create(newItem);

      return response.status(200).json(createdItem);
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export default createItem;
