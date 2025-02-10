import { useState } from "react";
import "./InputTextComponent.css";

export default function InputTextComponent({ text, type, onTextChange }: any) {
  const [is_focused, setFocused] = useState(false);

  return (
    <div
      className={`input-text flex a-i-c ${
        is_focused ? "input-text-p-focused" : ""
      }`}
    >
      <p>Name</p>
      <input
        className="w-100 h-80"
        type={type}
        value={text}
        required
        onChange={(e) => onTextChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={(event) => setFocused(event.target.value !== "")}
      />
    </div>
  );
}
