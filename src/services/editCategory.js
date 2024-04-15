const editCategory = async (newCategoryName, categoryId, userToken) => {
  try {
    const catResponse = await fetch(
      `${import.meta.env.VITE_API_URL}categories/${categoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          _id: `${categoryId}`,
          categoryName: `${newCategoryName}`,
        }),
      }
    );
    const response = await catResponse.json();
    return response;
  } catch (error) {
    console.error("Error fetching category data", error);
    return [];
  }
};

export default editCategory;
