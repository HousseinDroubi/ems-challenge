import "./TableDetailsComponent.css";

export default function TableDetailsComponent({
  icon,
  content,
  alt,
  additional_style,
}: any) {
  return (
    <div
      className={`flex a-i-c table-details-component-container ${additional_style}`}
    >
      <img src={icon} alt={alt} />
      <h4>{content}</h4>
    </div>
  );
}
