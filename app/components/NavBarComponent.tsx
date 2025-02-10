import { Link } from "react-router";
import "./NavBarComponent.css";

export default function NavBarComponent({ pages }: any) {
  return (
    <nav className="nav-bar flex j-c-s-b w-100">
      <h3>EMS-Challenge</h3>
      <ul className="flex j-c-e">
        {pages.map((page: any) => (
          <li>
            <Link to={page.to}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
