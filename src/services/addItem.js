const addItem = async (newItemName, categoryId, newItemPrice, userToken) => {
  try {
    const itemResponse = await fetch(`${import.meta.env.VITE_API_URL}items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        itemName: `${newItemName}`,
        itemPrice: `${newItemPrice}`,
        categoryId: `${categoryId}`,
      }),
    });
    const response = await itemResponse.json();
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching item data", error);
    return [];
  }
};

export default addItem;
