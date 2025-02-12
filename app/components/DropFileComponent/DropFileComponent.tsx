import "./DropFileComponent.css";

export default function DropFileComponent({ file_name }: any) {
  return (
    <section className="flex-grow-1 drop-file-container">
      <label htmlFor="input_file" className="h-100 flex j-c-c a-i-c">
        <p>Drag and drop {file_name} here</p>
        <input type="file" accept="image/*" id="input_file" />
      </label>
    </section>
  );
}
