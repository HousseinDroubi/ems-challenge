import { useState } from "react";
import "./InputTextComponent.css";

export default function InputTextComponent({
  text,
  title,
  type,
  hint,
  name,
  onTextChange,
}: any) {
  const [is_focused, setFocused] = useState(text);

  return (
    <>
      <h4 className="title mt-10">{title}</h4>
      <div
        className={`input-text flex a-i-c mt-5 ${
          is_focused ? "input-text-p-focused" : ""
        }`}
      >
        <p>{hint}</p>
        <input
          name={name}
          className="w-100 h-80"
          type={type}
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={(event) => setFocused(event.target.value !== "")}
        />
      </div>
    </>
  );
}
