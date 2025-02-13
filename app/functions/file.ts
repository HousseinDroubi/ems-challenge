const convertToBase64 = (image: any) => {
  return `data:image/jpeg;base64,${image.toString("base64")}`;
};

export { convertToBase64 };
