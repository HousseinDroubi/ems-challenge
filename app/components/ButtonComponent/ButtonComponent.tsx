import "./ButtonComponent.css";

export default function ButtonComponent({ title }: any) {
  return (
    <button type="submit" className="button-submit mt-20">
      {title}
    </button>
  );
}
