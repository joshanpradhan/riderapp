import axios from "axios";
const GetData = async ({url}) => {
	console.log(url)
    await axios
      .get(url)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
export default GetData;