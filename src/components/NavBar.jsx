import { navLinks, navIcons } from "#constants";
import dayjs from "dayjs";

const NavBar = () => {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">MacosPortfolio</p>
        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>
          ))}
        </ul>

        <time dateTime="MMM D ddd h:mm">
          {dayjs().format("MMM D ddd h:mm")}
        </time>
      </div>
    </nav>
  );
};

export default NavBar;
