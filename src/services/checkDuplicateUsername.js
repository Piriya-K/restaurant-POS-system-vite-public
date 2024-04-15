const checkDuplicateUsername = async (name) => {
  try {
    const checkResponse = await fetch(
      `${import.meta.env.VITE_API_URL}users/regis`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: name }),
      }
    );
    const response = await checkResponse.json();

    return response;
  } catch (err) {
    console.error("Error fetching user data", err);
    return [];
  }
};

export default checkDuplicateUsername;
