import "./ButtonComponent.css";

export default function ButtonComponent({ title, name }: any) {
  return (
    <button type="submit" className="button-submit mt-20" name={name}>
      {title}
    </button>
  );
}
