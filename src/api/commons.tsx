import axios from "axios";

export const uploadImage = async (
  imageUrl: string,
  image: Blob
): Promise<any> => {
  try {
    const response = await axios.put(imageUrl, image);
    return response.data;
  } catch (error) {
    console.error("Error uploading the image:", error);
    return null;
  }
};

export const getExtension = (mimeType: string): string | null => {
  const parts = mimeType.split("/");

  // Si el mimeType no tiene el formato esperado, devolvemos null
  if (parts.length !== 2) {
    return null;
  }

  return parts[1];
};
