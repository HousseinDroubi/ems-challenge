import { useState } from "react";
import "./InputTextComponent.css";

export default function InputTextComponent({ text, onTextChange }: any) {
  const [is_focused, setFocused] = useState(false);

  return (
    <div
      className={`input-text flex a-i-c ${
        is_focused ? "input-text-p-focused" : ""
      }`}
    >
      <p>Name</p>
      <input
        type="text"
        value={text}
        required
        onChange={(e) => onTextChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={(event) => setFocused(event.target.value !== "")}
      />
    </div>
  );
}
