import { Category } from "../../models/categoryModel.js";
import { Item } from "../../models/itemModel.js";
import verifyToken from "../middleware/verifytoken.js";

const deleteCategoryById = async (request, response) => {
  try {
    verifyToken(request, response, async () => {
      const { id } = request.params;

      const categoryHasItems = await Item.findOne({ categoryId: id });

      if (categoryHasItems) {
        return response.status(501).json({
          message: `There is an item(s) in the category. Please reassign the item to a different category before deleting.`,
          status: 501,
        });
      } else {
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
          return response
            .status(401)
            .json({ message: `Category is not found.`, status: 502 });
        } else {
          return response
            .status(200)
            .send({ message: `Category deleted.`, status: 200 });
        }
      }
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message, status: 500 });
  }
};

export default deleteCategoryById;
