import axios from "axios";

const cloudURL = "https://api.Cloudinary.com/v1_1/dd5xvjvgk/image/upload";
const cloud_name = "dd5xvjvgk";

export const postFile = async ({ file, upload_preset = "" }) => {
  try {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", upload_preset);
    form.append("cloud_name", cloud_name);

    const response = await axios.post(cloudURL, form);

    console.log(response);

    const { data } = response;
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};
