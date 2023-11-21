import { useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { modalOpen } from "@/store/modalSlice";
import Logo from "../../public/assets/logo.png";

function Header() {
  const dispatch = useDispatch();

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Link href="/for-you">
            <Image className="nav__img" src={Logo} alt="logo" />
          </Link>
        </figure>
        <ul className="nav__list--wrapper">
          <li
            className="nav__list nav__list--login"
            onClick={() => {
              dispatch(modalOpen());
            }}
          >
            Login
          </li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
}
export default Header;
