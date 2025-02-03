import { S3Client, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!;
const REGION_NAME = process.env.NEXT_PUBLIC_AWS_REGION!;
const ACCESS_KEY_ID = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!;
const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!;

const s3Client = new S3Client({
  region: REGION_NAME,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

// Generate S3 Key
export const generateS3Key = (folder: string, fileName: string): string => {
  return `${folder}/${Date.now()}-${fileName.replace(/\s+/g, '_')}`;
};

// Upload File to S3 using Upload from @aws-sdk/lib-storage
export const uploadFileToS3 = async (key: string, file: File): Promise<string> => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: file.type,
  };

  try {
    const upload = new Upload({
      client: s3Client,
      params,
    });

    upload.on("httpUploadProgress", (progress) => {
      console.log("Upload Progress:", progress);
    });

    await upload.done();
    console.log("File uploaded successfully");
    return `https://${BUCKET_NAME}.s3.${REGION_NAME}.amazonaws.com/${key}`;
  } catch (error) {
    console.error("Error uploading file", error);
    throw new Error("Failed to upload file to S3");
  }
};

// Delete File from S3
export const deleteFileFromS3 = async (key: string): Promise<void> => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
  };

  try {
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file", error);
    throw new Error("Failed to delete file from S3");
  }
};

// Generate Presigned Upload URL
export const generatePresignedUploadUrl = async (key: string, fileType: string, expiration: number = 3600): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  try {
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: expiration });
    console.log("Presigned URL generated successfully", presignedUrl);
    return presignedUrl;
  } catch (error) {
    console.error("Error generating presigned URL", error);
    throw new Error("Failed to generate presigned URL");
  }
};
