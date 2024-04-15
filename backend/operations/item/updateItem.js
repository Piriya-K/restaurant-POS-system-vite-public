import { Item } from "../../models/itemModel.js";
import verifyToken from "../middleware/verifytoken.js";

const updateItem = async (request, response) => {
  try {
    verifyToken(request, response, async () => {
      if (
        !request.body.itemName ||
        !request.body.itemPrice ||
        !request.body.categoryId
      ) {
        return response
          .status(400)
          .send({ message: `All fields are required.` });
      }

      const { id } = request.params;

      const item = await Item.findByIdAndUpdate(id, request.body);

      if (!item) {
        return response.status(404).json({ message: `item not found.` });
      }

      return response.status(200).send({ message: `Item updated.` });
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export default updateItem;
