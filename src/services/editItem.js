const editItem = async (itemName, categoryId, itemPrice, itemId, userToken) => {
  try {
    const itemResponse = await fetch(
      `${import.meta.env.VITE_API_URL}items/${itemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          _id: `${itemId}`,
          itemName: `${itemName}`,
          itemPrice: `${itemPrice}`,
          categoryId: `${categoryId}`,
        }),
      }
    );
    const response = await itemResponse.json();
    console.log(response.message);
    return response;
  } catch (error) {
    console.error("Error fetching item data", error);
    return [];
  }
};

export default editItem;
