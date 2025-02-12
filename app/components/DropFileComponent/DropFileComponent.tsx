import { useState } from "react";
import "./DropFileComponent.css";

export default function DropFileComponent({ file_name, file, setFile }: any) {
  const [is_hovering, setIsHovering] = useState(false);

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
          }
        }}
      >
        <p>Drag and drop or choose {file_name} here</p>
        {file && <p>{file_name} added</p>}
        <input
          type="file"
          accept="image/*"
          id={file_name.toLowerCase().replaceAll(" ", "_")}
          onChange={(event) => {
            if (event.target.files?.[0]) {
              setFile(event.target.files[0]);
            }
          }}
        />
      </label>
    </section>
  );
}
