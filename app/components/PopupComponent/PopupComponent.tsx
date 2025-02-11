import "./PopupComponent.css";

export default function PopupComponent({ popup_data, setPopupData }: any) {
  if (!popup_data.is_visible) {
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
            <button
              onClick={() => setPopupData({ ...popup_data, is_visible: false })}
            >
              X
            </button>
          </div>
        </header>
        <main className="flex j-c-c a-i-c">
          <h4>{popup_data.text}</h4>
        </main>
      </main>
    </div>
  );
}
