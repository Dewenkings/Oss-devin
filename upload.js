const OSS = require('ali-oss');
const fs = require('fs');
const path = require('path');

const client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: 'LTAI5tM1CJRgpz6GSRYotwM9',
  accessKeySecret: 'xwPDaK2JjdUB2eFE8MlZo5f9D3nOmS',
  bucket: 'devin-study',
});

// 上传文件
async function uploadFile(localFilePath) {
  try {
    const fileName = path.basename(localFilePath); 
    const result = await client.put(fileName, localFilePath);
    console.log('文件上传成功:', result.url); 
  } catch (error) {
    console.error('文件上传失败:', error);
  }
}

uploadFile('./example.png'); 