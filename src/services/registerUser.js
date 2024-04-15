const registerUser = async (username, pass1, imageFilePath) => {
  try {
    const userResponse = await fetch(`${import.meta.env.VITE_API_URL}users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: username,
        password: pass1,
        imageFile: imageFilePath,
      }),
    });
    const response = await userResponse.json();
    console.log(response.message);
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

export default registerUser;
