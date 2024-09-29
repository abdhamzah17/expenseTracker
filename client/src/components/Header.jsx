import { Link } from "react-router-dom";
import { BiSolidDollarCircle } from "react-icons/bi";
function Header() {
  return (
    <header className="text-bold mb-4 w-full p-4 text-lg font-bold text-white">
      <nav>
        <ul className="flex justify-between px-4 md:px-16">
          <li>
            <Link className="flex items-center gap-1">
              <BiSolidDollarCircle />
              <span>PaisaSaver</span>
            </Link>
          </li>
          <li>
            <Link to="/expenses">My Expenses</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
