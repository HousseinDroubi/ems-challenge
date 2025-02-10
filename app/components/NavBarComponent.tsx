export default function NavBarComponent({ pages }: any) {
  return (
    <nav className="nav-bar">
      <h3>EMS-Challenge</h3>
      <ul>
        {pages.map((page: any) => (
          <li>
            <a href={page.to}>{page.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
