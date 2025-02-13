import { useEffect, useRef, useState } from "react";
import "./DropFileComponent.css";
import EyeIconImage from "../../assets/icons/eye.png";

export default function DropFileComponent({
  file_name,
  file,
  setFile,
  file_image_base64,
  updateFaceImage,
  can_view,
}: any) {
  const [is_hovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFile = (file: FileList) => {
    if (fileInputRef.current) {
      fileInputRef.current.files = file;
      const changeEvent = new Event("change", { bubbles: true });
      fileInputRef.current.dispatchEvent(changeEvent);
    }
  };

  const showFile = (event: any) => {
    event.preventDefault();
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(
        `<img src="${file_image_base64}" alt="Image" />`
      );
    }
  };

  return (
    <section className="flex-grow-1 drop-file-container h-100">
      <label
        htmlFor={file_name.toLowerCase().replaceAll(" ", "_")}
        className={`h-100 flex flex-column j-c-c a-i-c ${
          is_hovering ? "hover" : ""
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsHovering(true);
        }}
        onDragLeave={() => {
          setIsHovering(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsHovering(false);
          if (event.dataTransfer.files.length > 0) {
            setFile(event.dataTransfer.files[0]);
            if (!can_view) updateFaceImage(event.dataTransfer.files[0]);
            handleFile(event.dataTransfer.files);
          }
        }}
      >
        <p>Drag and drop or choose {file_name} here</p>
        {file && <p>{file_name} added</p>}
        {can_view && (
          <img
            src={EyeIconImage}
            alt="eye_icon"
            title={`View ${file_name}`}
            onClick={showFile}
          />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          name={file_name.toLowerCase().replaceAll(" ", "_")}
          id={file_name.toLowerCase().replaceAll(" ", "_")}
          onChange={(event) => {
            if (event.target.files?.[0]) {
              setFile(event.target.files[0]);
              if (!can_view) updateFaceImage(event.target.files[0]);
            }
          }}
        />
      </label>
    </section>
  );
}
