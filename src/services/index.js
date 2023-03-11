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


    const { data } = response;

    return data;
    // const options = {
    //   mobile: {
    //     width: 300, // Ancho máximo de 300 píxeles para la versión móvil
    //     height: 200, // Alto máximo de 200 píxeles para la versión móvil
    //   },
    //   web: {
    //     width: 600, // Ancho máximo de 600 píxeles para la versión web
    //     height: 400, // Alto máximo de 400 píxeles para la versión web
    //   },
    // };
    // const form = new FormData();
    // form.append("file", file);
    // form.append("upload_preset", upload_preset);
    // form.append("cloud_name", cloud_name);

    // // Generar las URL de transformación
    // const { width: mobileWidth = null, height: mobileHeight = null } =
    //   options.mobile || {};
    // const { width: webWidth = null, height: webHeight = null } =
    //   options.web || {};
    // const mobileDimensions = [
    //   mobileWidth ? `w_${mobileWidth}` : "",
    //   mobileHeight ? `h_${mobileHeight}` : "",
    // ].join(",");
    // const webDimensions = [
    //   webWidth ? `w_${webWidth}` : "",
    //   webHeight ? `h_${webHeight}` : "",
    // ].join(",");
    // const mobileURL = `${cloudURL}/${mobileDimensions}/v${Date.now()}`;
    // const webURL = `${cloudURL}/${webDimensions}/v${Date.now()}`;

    // console.log(mobileURL);
    // console.log(webURL);
    // // Agregar las URL de transformación al FormData
    // form.append("file", mobileURL);
    // form.append("file", webURL);

    // const response = await axios.post(cloudURL, form);

    // console.log(response);

    // const { data } = response;
    // console.log(data);

    // return data;
  } catch (error) {
    console.error(error);
  }
};
