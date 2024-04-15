const loginUser = async (username, password) => {
  try {
    const loginResponse = await fetch(
      `${import.meta.env.VITE_API_URL}users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );
    const response = await loginResponse.json();
    // console.log(`loginUser response is ${response}`);

    return response;
  } catch (err) {
    console.error("Error fetching user data", err);
    return [];
  }
};

export default loginUser;
