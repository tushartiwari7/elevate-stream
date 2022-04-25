import axios from "axios";
export const getImageLink = async (e) => {
  const file = e.target.files[0];
  console.log(file);
  if (file) {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/projectbytushar/image/upload",
      { file, upload_preset: "testingbytushar" }
    );
    console.log(response);
    dispatch({ type: "SET_IMAGE", payload: file });
  }
};
