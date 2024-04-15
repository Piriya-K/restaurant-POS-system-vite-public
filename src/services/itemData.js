const fetchItemData = async () => {
  try {
    const itemsResponse = await fetch(`${import.meta.env.VITE_API_URL}items/`);
    const itemsData = (await itemsResponse.json()).data;
    return itemsData;
  } catch (error) {
    console.error("Error fetching item data", error);
    return [];
  }
};

export default fetchItemData;
