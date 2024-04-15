const defaultRoute = async (request, response) => {
  console.log(request);
  return response
    .status(299) //Code from 200 - 299 are for successful responses
    .send(`This is the backend of Piriya's POS system project`);
};

export default defaultRoute;
