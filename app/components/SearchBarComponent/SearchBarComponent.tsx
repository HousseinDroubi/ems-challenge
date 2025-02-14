import "./SearchBarComponent.css";
import SearchIcon from "~/assets/icons/search.png";
import CloseIcon from "~/assets/icons/exit.png";
import EnterIcon from "~/assets/icons/enter.png";
import { useEffect, useState } from "react";

export default function SearchBarComponent({ searchFor, placeholder }: any) {
  const [is_hovering, setIsHovering] = useState(false);
  const [text, setText] = useState("");

  return (
    <article className="search-bar-container mt-20 flex flex-column a-i-c j-c-c">
      <section className="flex height-100">
        <div className="flex j-c-c a-i-c h-100">
          <img src={SearchIcon} alt="Search" />
        </div>
        <div className="flex flex-column j-c-c">
          <hr className="h-80" />
        </div>
        <div className="h-100">
          <input
            placeholder={placeholder}
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
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                searchFor(text);
              }
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
      {is_hovering && (
        <section className="search-bar-hint flex a-i-c j-c-s-e mt-5">
          <div className="flex a-i-c">
            <p>Search</p>
            <img src={SearchIcon} alt="Search" />
          </div>
          <div className="flex a-i-c">
            <p>Close</p>
            <img src={CloseIcon} alt="Close" />
          </div>
          <div className="flex a-i-c">
            <p>Enter</p>
            <img src={EnterIcon} alt="Enter" />
          </div>
        </section>
      )}
    </article>
  );
}
