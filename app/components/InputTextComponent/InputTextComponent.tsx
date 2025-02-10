import "./InputTextComponent.css";

export default function InputTextComponent() {
  return (
    <p>
      <label htmlFor="full_name">Full Name</label>
      <input type="text" name="full_name" id="full_name" required />
    </p>
  );
}
