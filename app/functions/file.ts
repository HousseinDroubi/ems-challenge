const convertToBase64 = (image: Buffer) => {
  return `data:image/jpeg;base64,${image.toString("base64")}`;
};

export { convertToBase64 };
