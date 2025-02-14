import "./SearchBarComponent.css";
import SearchIcon from "~/assets/icons/search.png";
import CloseIcon from "~/assets/icons/exit.png";
import { useState } from "react";

export default function SearchBarComponent({
  placeholder,
  search_bar_text,
  setSearchBarText,
}: any) {
  const [is_hovering, setIsHovering] = useState(false);

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
            value={search_bar_text}
            onChange={(e) => setSearchBarText(e.target.value)}
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
              setSearchBarText("");
            }}
          />
        </div>
      </section>
      {is_hovering && (
        <section className="search-bar-hint flex a-i-c j-c-s-e mt-5 search-bar-container-hint">
          <div className="flex a-i-c">
            <p>Search</p>
            <img src={SearchIcon} alt="Search" />
          </div>
          <div className="flex a-i-c">
            <p>Close</p>
            <img src={CloseIcon} alt="Close" />
          </div>
        </section>
      )}
    </article>
  );
}
