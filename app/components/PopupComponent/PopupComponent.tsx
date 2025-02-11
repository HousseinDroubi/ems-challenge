import { useEffect, useState } from "react";
import "./PopupComponent.css";

export default function PopupComponent({ text, is_popup_visible }: any) {
  const [is_visibile, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(is_popup_visible);
  }, [is_popup_visible]);

  if (!is_visibile) {
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
            <h3>X</h3>
          </div>
        </header>
        <main className="flex j-c-c a-i-c">
          <h4>{text}</h4>
        </main>
      </main>
    </div>
  );
}
