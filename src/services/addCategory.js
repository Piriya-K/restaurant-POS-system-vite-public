const addCategory = async (newCategoryName, userToken) => {
  try {
    const catResponse = await fetch(
      `${import.meta.env.VITE_API_URL}categories/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          categoryName: `${newCategoryName}`,
        }),
      }
    );
    const response = await catResponse.json();
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching category data", error);
    return [];
  }
};

export default addCategory;
