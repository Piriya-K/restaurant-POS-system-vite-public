const fetchCategoryData = async () => {
  try {
    const catResponse = await fetch(
      `${import.meta.env.VITE_API_URL}categories`
    );
    const categoryData = (await catResponse.json()).data;
    return categoryData;
  } catch (error) {
    console.error("Error fetching category data", error);
    return [];
  }
};

export default fetchCategoryData;
