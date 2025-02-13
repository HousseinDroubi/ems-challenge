const convertToBase64 = (image: Buffer) => {
  return `data:image/jpeg;base64,${image.toString("base64")}`;
};

const getBlobFromBuffer = (buffer: Buffer) => {
  const array = new Uint8Array(buffer); // Convert Buffer to Uint8Array

  // Create a Blob from the array
  const blob = new Blob([array], { type: "image/jpeg" });
  return blob;
};

export { convertToBase64, getBlobFromBuffer };
