export default function NavBarComponent({ pages }: any) {
  return (
    <nav className="nav-bar">
      <h2>EMS-Challenge</h2>
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
