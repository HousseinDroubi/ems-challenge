import { useState } from "react";
import "./DropFileComponent.css";

export default function DropFileComponent({ file_name }: any) {
  const [is_hovering, setIsHovering] = useState(false);

  return (
    <section className="flex-grow-1 drop-file-container">
      <label
        htmlFor="input_file"
        className={`h-100 flex j-c-c a-i-c ${is_hovering ? "hover" : ""}`}
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
        }}
      >
        <p>Drag and drop {file_name} here</p>
        <input type="file" accept="image/*" id="input_file" />
      </label>
    </section>
  );
}
