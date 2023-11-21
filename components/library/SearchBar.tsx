import { RootState } from "@/store/modalStore";
import { sideBarClose, sideBarOpen } from "@/store/sidebar";
import { BookObject } from "@/BookObject";
import requests from "@/request/requests";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import SearchBookCard from "../book/SearchBookCard";
import Logo from "../../public/assets/logo.png";
import Image from "next/image";

function SearchBar() {
  const [userInput, setUserInput] = useState<string>("");
  const [books, setBooks] = useState<BookObject[]>([]);
  const [loading, setLoading] = useState(false);
  const shouldRenderSearchBookCard = userInput.trim() !== "";
  const sideBar = useSelector((state: RootState) => state.sideBar.value);
  const dispatch = useDispatch();
  async function fetchSearchBook(search: string) {
    setLoading(true);
    try {
      const searchBookResponse = (
        await axios.get(requests.fetchSearchBook(search as string))
      ).data;
      setBooks(searchBookResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const sideBarHandler = () => {
    if (sideBar === false) {
      dispatch(sideBarOpen());
    } else {
      dispatch(sideBarClose());
    }
  };
  useEffect(() => {
    if (userInput.trim() === "") {
      setBooks([]);
      return;
    }
    const getData = setTimeout(() => {
      fetchSearchBook(userInput);
    }, 400);
    return () => clearTimeout(getData);
  }, [userInput]);

  return (
    <div className="search__background">
      <div className="search__wrapper">
      <figure></figure>
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                className="search__input"
                placeholder="Search for books"
                id="user__input"
                type="text"
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)}
              />
              <div className="search__icon">
                <AiOutlineSearch className="search__icon--svg" />
              </div>
            </div>
          </div>
          <div
            className="sidebar__toggle--btn"
            onClick={() => sideBarHandler()}
          >
            <AiOutlineMenu className="menu__icon--svg" />
          </div>
        </div>
        {shouldRenderSearchBookCard && <SearchBookCard {...{ books }} />}
      </div>
    </div>
  );
}
export default SearchBar;
