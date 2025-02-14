const convertToBase64 = (image: Buffer) => {
  return `data:image/jpeg;base64,${image.toString("base64")}`;
};

const getBlobFromBuffer = (buffer: Buffer) => {
  const array = new Uint8Array(buffer);

  const blob = new Blob([array], { type: "image/jpeg" });
  return blob;
};

const getImageSrcFromBlob = (image: Blob): string | void => {
  const reader = new FileReader();
  reader.onloadend = () => {
    if ((reader.result as string).split(",")[1] !== "") return reader.result; // Set the image as a data URL
  };
  reader.readAsDataURL(image);
};

export { convertToBase64, getBlobFromBuffer, getImageSrcFromBlob };
