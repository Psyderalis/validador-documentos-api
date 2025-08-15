import path from "path";
import { fromPath } from "pdf2pic";

const pdfToImgConverter = async (pdfPath) => {

  const options = {
    density: 300,
    saveFilename: path.basename(pdfPath, path.extname(pdfPath)),
    savePath: path.dirname(pdfPath),
    format: "png",
    width: 1200,
    height: 1200
  };
  const convert = fromPath(pdfPath, options)
  const pageToConvert = 1

  try {
    const result = await convert(pageToConvert, { responseType: "image" })
    console.log("Page 1 is now converted as image:", result.path)
    return result
  } catch (err) {
    console.error("Error convirtiendo PDF:", err);
    throw err
  }
}

export { pdfToImgConverter }

