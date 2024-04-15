const editUser = async (username, pass1, userId, imageFilePath, userToken) => {
  // console.log(`entered editUser`);
  // console.log(`userToken is ${userToken}`);
  // console.log(`password is ${pass1}`);

  try {
    const userResponse = await fetch(
      `${import.meta.env.VITE_API_URL}users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        }, // Include JWT token in the headers
        body: JSON.stringify({
          userName: username,
          password: pass1,
          imageFile: imageFilePath,
        }),
      }
    );
    const response = await userResponse.json();
    // console.log(`exiting editUser`);
    return response;
  } catch (err) {
    // console.log(`error from editUser ${err.message}`);
  }
};

export default editUser;
