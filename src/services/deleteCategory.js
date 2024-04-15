const deleteCategory = async (categoryId, userToken) => {
  try {
    const catResponse = await fetch(
      `${import.meta.env.VITE_API_URL}categories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          _id: `${categoryId}`,
        }),
      }
    );
    const response = await catResponse.json();
    return response;
  } catch (error) {
    console.error(`Error deleting category`, error);
    return [];
  }
};

export default deleteCategory;
