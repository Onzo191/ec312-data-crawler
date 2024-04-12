const { createObjectCsvWriter } = require("csv-writer");

const generateCsv = (path, productData) => {
  const timestamp = Date.now();
  const newFilePath = `${path.replace(".csv", `-${timestamp}.csv`)}`;

  const csvWriter = createObjectCsvWriter({
    path: newFilePath,
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
};

module.exports = generateCsv;
