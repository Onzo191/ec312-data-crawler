const getProjectDir = require("../utils/get-project-directory");

const download = (req, res) => {
  const { fileName } = req.query;
  const filePath = `${getProjectDir()}\\src\\data\\${fileName}`;
  res.download(filePath, (err) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ message: "An unexpected error occurred when download CSV." });
    } else {
      console.log("Download CSV completed!");
    }
  });
};

module.exports = download;
