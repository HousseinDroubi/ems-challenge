import "./PopupComponent.css";

export default function PopupComponent({ text, is_visible }: any) {
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
          <h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
            minima!
          </h4>
        </main>
      </main>
    </div>
  );
}
