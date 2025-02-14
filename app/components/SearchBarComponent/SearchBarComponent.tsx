import "./SearchBarComponent.css";
import SearchIcon from "~/assets/icons/search.png";
import CloseIcon from "~/assets/icons/exit.png";
import EnterIcon from "~/assets/icons/enter.png";
import { useEffect, useState } from "react";

export default function SearchBarComponent() {
  const [is_hovering, setIsHovering] = useState(false);
  const [text, setText] = useState("");

  return (
    <article className="search-bar-container mt-20 flex j-c-c">
      <section className="flex height-100">
        <div className="flex j-c-c a-i-c h-100">
          <img src={SearchIcon} alt="Search" />
        </div>
        <div className="flex flex-column j-c-c">
          <hr className="h-80" />
        </div>
        <div className="h-100">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="w-100"
            onFocus={() => {
              setIsHovering(true);
            }}
            onBlur={() => {
              setIsHovering(false);
            }}
          />
        </div>
        <div className="flex j-c-s-e a-i-c">
          <img
            src={CloseIcon}
            alt="Close"
            onClick={() => {
              setText("");
            }}
          />
        </div>
      </section>
    </article>
  );
}
