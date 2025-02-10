import { useState } from "react";
import "./InputTextComponent.css";

export default function InputTextComponent({
  text,
  title,
  type,
  hint,
  onTextChange,
}: any) {
  const [is_focused, setFocused] = useState(false);

  return (
    <>
      <h4 className="title">{title}</h4>
      <div
        className={`input-text flex a-i-c ${
          is_focused ? "input-text-p-focused" : ""
        }`}
      >
        <p>{hint}</p>
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
    </>
  );
}
