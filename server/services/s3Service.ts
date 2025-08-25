import AWS from "aws-sdk";

// S3 client (uses EC2 IAM Role automatically, no keys needed)
const s3 = new AWS.S3({ region: "eu-north-1" }); // replace with your bucket region

const BUCKET_NAME = "olive-tracker-data"; // your bucket name

export async function uploadToS3(key: string, data: Buffer | string) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: data
  };

  try {
    const result = await s3.upload(params).promise();
    console.log("✅ File uploaded to:", result.Location);
    return result.Location;
  } catch (err) {
    console.error("❌ Upload error:", err);
    throw err;
  }
}

export async function downloadFromS3(key: string) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key
  };

  try {
    const result = await s3.getObject(params).promise();
    console.log("✅ File downloaded");
    return result.Body?.toString();
  } catch (err) {
    console.error("❌ Download error:", err);
    throw err;
  }
}
