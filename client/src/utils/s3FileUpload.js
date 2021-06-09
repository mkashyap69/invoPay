import S3FileUpload from 'react-s3';

const config = {
  bucketName: 'testbucket671326',
  dirName: '/',
  region: 'ap-south-1',
  accessKeyId: 'AKIAXNK27U7OTNWUM2GC',
  secretAccessKey: '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',
};

const uploadToS3 = (pdfBuffer) => {
  S3FileUpload.uploadFile(pdfBuffer, config)
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
};

export default uploadToS3;
