const { createObjectCsvWriter } = require("csv-writer");
const getProjectDir = require("./get-project-directory");

const generateCsv = (productData) => {
  const timestamp = Date.now();
  const fileName = `product-${productData.length}-${timestamp}.csv`;
  const filePath = `${getProjectDir()}\\src\\data\\${fileName}`;

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: "sku", title: "SKU" },
      { id: "name", title: "Name" },
      { id: "price", title: "Price" },
      { id: "description", title: "Description" },
      { id: "image_urls", title: "Image URLs" },
      { id: "brand_name", title: "Brand Name" },
      { id: "category", title: "Category" },
    ],
    encoding: "utf8",
  });

  csvWriter
    .writeRecords(productData)
    .then(() =>
      console.log(
        `CSV file (${productData.length} lines) has been written successfully`
      )
    )
    .catch((error) => console.error("Error writing CSV:", error));

  return fileName;
};

module.exports = generateCsv;
