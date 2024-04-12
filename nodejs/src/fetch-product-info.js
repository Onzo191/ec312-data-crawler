const htmlMinifier = require("html-minifier");
const axios = require("axios");

axios.defaults.responseEncoding = "utf8";
const minifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  minifyJS: true,
  minifyCSS: true,
};

const fetchProductInfo = async (productIds) => {
  let productData = [];

  try {
    for (const [index, productId] of productIds.entries()) {
      //Delay 10s/50sp tránh bị giới hạn
      if (index % 50 === 0) {
        console.log("Pausing for 10 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }

      const url = `https://tiki.vn/api/v2/products/${productId.id}?spid=${productId.spid}`;

      try {
        const { data: responseData } = await axios.get(url);
        const {
          sku,
          name,
          original_price: price,
          description,
          images,
          brand: { name: brand_name },
          categories: { name: category },
        } = responseData;

        // Lấy các link ảnh, minify description (html)
        const image_urls = images.map((image) => image.base_url).join(",");
        const cleanedDescription = htmlMinifier.minify(
          description,
          minifyOptions
        );

        productData.push({
          sku,
          name,
          price,
          description: cleanedDescription,
          image_urls,
          brand_name,
          category,
        });
        
        console.log(`#${index + 1} Product's SKU: ${sku}`);
      } catch (error) {
        console.log(`#${index + 1} Error`);
      }
    }

    return productData;
  } catch (error) {
    console.log("An error occurred:", error);
  }
};

module.exports = fetchProductInfo;
