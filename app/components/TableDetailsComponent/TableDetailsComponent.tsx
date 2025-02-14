import "./TableDetailsComponent.css";

export default function TableDetailsComponent({ icon, content, alt }: any) {
  return (
    <div className="flex a-i-c table-details-component-container">
      <img src={icon} alt={alt} />
      <h4>{content}</h4>
    </div>
  );
}
