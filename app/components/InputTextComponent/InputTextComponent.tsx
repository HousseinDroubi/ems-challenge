import { useState } from "react";
import "./InputTextComponent.css";

export default function InputTextComponent() {
  const [is_focused, setFocused] = useState(false);

  return (
    <div
      className={`input-text flex j-c-c a-i-c ${
        is_focused ? "input-text-p-focused" : ""
      }`}
    >
      <p>Name</p>
      <input
        type="text"
        required
        onFocus={() => setFocused(true)}
        onBlur={(event) => setFocused(event.target.value !== "")}
      />
    </div>
  );
}
