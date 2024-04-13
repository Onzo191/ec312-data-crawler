const htmlMinifier = require("html-minifier");
const axios = require("axios");

axios.defaults.responseEncoding = "utf8";
const minifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  minifyJS: true,
  minifyCSS: true,
};

const delay = async (index, interations = 50, time = 10000) => {
  if (index % interations === 0 && index) {
    console.log(`Pausing for ${time / 1000} seconds...`);
    await new Promise((resolve) => setTimeout(resolve, time));
  }
};

const fetchProductTiki = async (productIds) => {
  let productData = [];

  try {
    for (const [index, productId] of productIds.entries()) {
      //Delay 10s/50sp tránh bị giới hạn
      await delay(index);

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
          sku: String(sku),
          name,
          price,
          description: cleanedDescription,
          image_urls,
          brand_name,
          category,
        });

        console.log(`#${index + 1} Product's SKU: ${sku}`);
      } catch (error) {
        console.log(`#${index + 1} Error: ${error}`);
      }
    }

    return productData;
  } catch (error) {
    console.log("An error occurred:", error);
  }
};

const fetchProductSendo = async (productIds) => {
  let productData = [];

  try {
    for (const [index, productId] of productIds.entries()) {
      //Delay 10s/50sp tránh bị giới hạn
      await delay(index);

      const url = `https://detail-api.sendo.vn/full/${productId.url}`;
      try {
        const { data: responseData } = await axios.get(url);

        const {
          id: sku,
          name,
          price,
          description_info: { description: description },
          media: images,
          brand_info: { name: brand_name },
          category_info: [, , { title: category }],
        } = responseData.data;

        // Lấy các link ảnh, minify description (html)
        const image_urls = images.map((item) => item.image).join(",");
        const cleanedDescription = htmlMinifier.minify(
          description,
          minifyOptions
        );

        productData.push({
          sku: String(sku),
          name,
          price,
          description: cleanedDescription,
          image_urls,
          brand_name,
          category,
        });

        console.log(`#${index + 1} Product's SKU: ${sku}`);
      } catch (error) {
        console.log(`#${index + 1} Error: ${error}`);
      }
    }

    return productData;
  } catch (error) {
    console.log("An error occurred:", error);
  }
};

module.exports = { fetchProductTiki, fetchProductSendo };
