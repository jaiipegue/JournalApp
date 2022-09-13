import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: "jaiipegue",
  api_key: "533799657539753",
  api_secret: "vv_c0kEBM6NA0JNx-ZhkYylwiKE",
  secure: true,
});

describe("Pruebas en fileUpload", () => {
  test("debe de subir el archivo correctamente a cloudynary", async () => {
    const imageUrl =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5607y4zq00lAYOZTwfJYtMgOzSIxnko91jA&usqp=CAU";
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "foto.jpg");

    const url = await fileUpload(file);
    expect(typeof url).toBe("string");
    console.log(url);

    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");

    await cloudinary.api.delete_resources(["journal/" + imageId], {
      resource_type: "image",
    });
  });

  test("debe de retornar null", async () => {
    const file = new File([], "foto.jpg");

    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
