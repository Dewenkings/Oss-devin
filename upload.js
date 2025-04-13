const OSS = require("ali-oss");
const fs = require("fs");
const path = require("path");

require('dotenv').config();

const accessKeyId = process.env.ACCESS_KEY_ID;
const accessKeySecret = process.env.ACCESS_KEY_SECRET
const client = new OSS({
  region: "oss-cn-shenzhen",
  accessKeyId: accessKeyId,
  accessKeySecret: accessKeySecret,
  bucket: "devin-study",
});

// 上传文件
async function uploadFile(localFilePath, times = 0) {
  if (times >= 5)
    throw new Error(`upload ${path.basename(localFilePath)} failed.`);

  if (!fs.existsSync(localFilePath)) {
    console.error(`文件不存在: ${localFilePath}`);
    return;
  }

  try {
    const fileName = path.basename(localFilePath);
    const result = await client.put(fileName, localFilePath);
    console.log("文件上传成功:", result.url);
  } catch (error) {
    console.error("文件上传失败:", error);
    await uploadFile(localFilePath, times + 1);
  }
}

uploadFile("./example.png");
