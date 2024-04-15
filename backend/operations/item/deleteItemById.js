import { Item } from "../../models/itemModel.js";
import verifyToken from "../middleware/verifytoken.js";

const deleteItemById = async (request, response) => {
  try {
    verifyToken(request, response, async () => {
      try {
        const { id } = request.params;

        const item = await Item.findByIdAndDelete(id);

        if (!item) {
          return response.status(401).json({ message: `Item is not found.` });
        } else {
          return response
            .status(200)
            .send({ message: `Item deleted.`, status: 200 });
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

export default deleteItemById;
