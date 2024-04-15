const deleteItem = async (itemId, userToken) => {
  try {
    const itemResponse = await fetch(
      `${import.meta.env.VITE_API_URL}items/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          _id: `${itemId}`,
        }),
      }
    );
    const response = await itemResponse.json();
    return response;
  } catch (error) {
    console.error("Error deleting item", error);
    return [];
  }
};

export default deleteItem;
