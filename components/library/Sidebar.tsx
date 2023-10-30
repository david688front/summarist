import { modalOpen } from "@/redux/modalSlice";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiHelpCircle, BiLogIn } from "react-icons/bi";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { BsBookmark } from "react-icons/bs";
import { LiaHighlighterSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";

import useAuth from "@/hooks/useAuth";
import { RootState } from "@/redux/modalStore";
import { sideBarClose, sideBarOpen } from "@/redux/sideBarSlice";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Logo from "../../assets/logo.png";
import {
  fontSizeLarge,
  fontSizeMedium,
  fontSizeSmall,
  fontSizeXLarge,
} from "@/redux/fontSizeSlice";
import Link from "next/link";

function Sidebar() {
  const audioPlayer = useSelector(
    (state: RootState) => state.audioPlayer.value
  );
  const sideBar = useSelector((state: RootState) => state.sideBar.value);
  const fontSize = useSelector((state: RootState) => state.fontSize.value);

  const dispatch = useDispatch();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const sideBarHandler = () => {
    if (sideBar === false) {
      dispatch(sideBarOpen());
    } else {
      dispatch(sideBarClose());
    }
  };

  return (
    <>
      <div
        className={`sidebar__overlay ${
          sideBar ? "" : "sidebar__overlay--hidden"
        } `}
        onClick={() => sideBarHandler()}
      ></div>
      <div
        className={`sidebar ${sideBar ? "sidebar--opened" : "sidebar--closed"}`}
      >
        <div className="sidebar__logo">
          <Link href="/for-you">
            <Image className="sidebar__logo--img" src={Logo} alt="logo" />
          </Link>
        </div>
        <div
          className={`sidebar__wrapper ${
            audioPlayer ? "sidebar__wrapper--audio" : ""
          }`}
        >
          <div className="sidebar__top">
            <Link href="/for-you" className="sidebar__link--wrapper">
              <div
                className={`sidebar__link--line ${
                  pathname === "/for-you" ? "active--tab" : ""
                }`}
              ></div>
              <div className="sidebar__icon--wrapper">
                <AiOutlineHome className="sidebar__icons" />
              </div>
              <div className="sidebar__link--text">For you</div>
            </Link>

            <Link href="/library" className="sidebar__link--wrapper">
              <div
                className={`sidebar__link--line ${
                  pathname === "/library" ? "active--tab" : ""
                }`}
              ></div>
              <div className="sidebar__icon--wrapper">
                <BsBookmark className="sidebar__icons" />
              </div>
              <div className="sidebar__link--text">My Library</div>
            </Link>

            <Link
              href=""
              className="sidebar__link--wrapper sidebar__link--not-allowed"
            >
              <div className={`sidebar__link--line`}></div>
              <div className="sidebar__icon--wrapper">
                <LiaHighlighterSolid className="sidebar__icons" />
              </div>
              <div className="sidebar__link--text">Highlights</div>
            </Link>

            <Link
              href=""
              className="sidebar__link--wrapper sidebar__link--not-allowed"
            >
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <AiOutlineSearch className="sidebar__icons" />
              </div>
              <div className="sidebar__link--text">Search</div>
            </Link>

            {pathname && pathname.startsWith("/player") && (
              <div className="sidebar__link--wrapper sidebar__font--size-wrapper">
                <div
                  className={`sidebar__link--text sidebar__font--size-icon
                    ${
                      fontSize === "16px"
                        ? "sidebar__font--size-icon--active"
                        : ""
                    }
                    `}
                  onClick={() => dispatch(fontSizeSmall())}
                >
                  <RxLetterCaseCapitalize className="sidebar__font--size-icon-small" />
                </div>
                <div
                  className={`sidebar__link--text sidebar__font--size-icon
                     ${
                       fontSize === "18px"
                         ? "sidebar__font--size-icon--active"
                         : ""
                     }
                     `}
                  onClick={() => dispatch(fontSizeMedium())}
                >
                  <RxLetterCaseCapitalize className="sidebar__font--size-icon-medium" />
                </div>
                <div
                  className={`sidebar__link--text sidebar__font--size-icon
                     ${
                       fontSize === "22px"
                         ? "sidebar__font--size-icon--active"
                         : ""
                     }
                     `}
                  onClick={() => dispatch(fontSizeLarge())}
                >
                  <RxLetterCaseCapitalize className="sidebar__font--size-icon-large" />
                </div>
                <div
                  className={`sidebar__link--text sidebar__font--size-icon
                     ${
                       fontSize === "26px"
                         ? "sidebar__font--size-icon--active"
                         : ""
                     }
                     `}
                  onClick={() => dispatch(fontSizeXLarge())}
                >
                  <RxLetterCaseCapitalize className="sidebar__font--size-icon-xlarge" />
                </div>
              </div>
            )}
          </div>

          <div className="sidebar__bottom">
            <Link href="/settings" className="sidebar__link--wrapper">
              <div
                className={`sidebar__link--line ${
                  pathname === "/settings" ? "active--tab" : ""
                }`}
              ></div>
              <div className="sidebar__icon--wrapper">
                <AiOutlineSetting className="sidebar__icons" />
              </div>
              <div className="sidebar__link--text">Settings</div>
            </Link>
            <Link
              href=""
              className="sidebar__link--wrapper sidebar__link--not-allowed"
            >
              <div className={`sidebar__link--line`}></div>
              <div className="sidebar__icon--wrapper">
                <BiHelpCircle className="sidebar__icons" />
              </div>
              <div className="sidebar__link--text ">Help & Support</div>
            </Link>

            {user ? (
              <div className="sidebar__link--wrapper" onClick={logout}>
                <div className={`sidebar__link--line `}></div>
                <div className="sidebar__icon--wrapper">
                  <BiLogIn className="sidebar__icons" />
                </div>
                <div className="sidebar__link--text">Logout</div>
              </div>
            ) : (
              <div
                className="sidebar__link--wrapper"
                onClick={() => {
                  dispatch(modalOpen());
                }}
              >
                <div className={`sidebar__link--line `}></div>
                <div className="sidebar__icon--wrapper">
                  <BiLogIn className="sidebar__icons" />
                </div>
                <div className="sidebar__link--text">Login</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
