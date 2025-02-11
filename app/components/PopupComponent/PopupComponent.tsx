import { useEffect, useState } from "react";
import "./PopupComponent.css";

export default function PopupComponent({
  popup_text,
  is_popup_visible,
  setIsPopupVisible,
}: any) {
  if (!is_popup_visible) {
    return null;
  }

  return (
    <div className="popup-container flex j-c-c a-i-c">
      <main className="flex flex-column">
        <header className="flex a-i-c mt-10">
          <div className="flex j-c-c a-i-c">
            <h3>Attention</h3>
          </div>
          <div className="flex j-c-c a-i-c">
            <button onClick={() => setIsPopupVisible(false)}>X</button>
          </div>
        </header>
        <main className="flex j-c-c a-i-c">
          <h4>{popup_text}</h4>
        </main>
      </main>
    </div>
  );
}
