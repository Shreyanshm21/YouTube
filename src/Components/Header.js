import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/image/logo.jpg";
import logo3 from "../assets/image/logo2.jpg";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, isScroll, isDarky } from "../utils/appSlice";
import { Link } from "react-router-dom";

//Icons
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { cacheResults } from "../utils/SearchSlice";
import { IoSunny } from "react-icons/io5";
import { BsFillMoonFill } from "react-icons/bs";

const Header = () => {
  const dispatch = useDispatch();
  // This is chatgpt useRef
  const inputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  //SliderBar Function
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  //Scroll Option
  const toggleisfixed = (value) => {
    dispatch(isScroll(value));
  };

  const searchCache = useSelector((store) => store.search);
  const isFixed = useSelector((store) => store.app.isFixed);
  const isDarkMode = useSelector((store) => store.app.isDark);
  const [dark, setDark] = useState(false);

  const darkMode = () => {
    setDark(!dark);
    dispatch(isDarky(!dark));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (inputRef.current) {
        inputRef.current.blur(); // Remove focus from input when scrolling
      }
      setShowSuggestions(false);

      const currentScrolly = window.scrollY;

      if (currentScrolly > 1 && isFixed == false) {
        toggleisfixed(true);
      } else if (currentScrolly == 0 && isFixed == true) {
        toggleisfixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFixed]);

  useEffect(() => {
    console.log(searchQuery);
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      //Unmounting remeber in class 8 class based component lecture
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    // console.log("API CALL -" + searchQuery)

    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data?.json();
    setSuggestions(json[1]);

    //Update Cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const handleBlur = () => {
    // console.log("Blur event triggered"); // Check if this logs when the input loses focus
    setTimeout(() => {
      // console.log("Timeout triggered"); // Check if this logs after the delay
      setShowSuggestions(false);
    }, 400);
  };
  
  return (
    <div
      className={`Main grid grid-flow-col  items-center p-4 z-50 fixed top-0 left-0 w-full ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      } `}
    >
      <div className="left flex col-span-1 gap-2 items-center px-1">
        <RxHamburgerMenu
          onClick={() => toggleMenuHandler()}
          className="h-8 text-xl cursor-pointer"
        />
        <a href="/">
          <img
            className={`h-8 ${
              isDarkMode ? "h-8 w-[105px] object-cover p-1" : ""
            }  `}
            src={isDarkMode ? logo3 : logo}
          />
        </a>
      </div>

      <div className="middle col-span-10 flex justify-center">
        <div className="w-full flex items-center justify-center  relative">
          <input
            className={`w-[52%] ml-9 border border-gray-400 p-1.5 px-4 rounded-l-full focus:outline-none focus:border-blue-400
                ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} `}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={handleBlur}
            ref={inputRef}
            placeholder="Search"
          />

          <button className="border border-gray-400 rounded-r-full p-2 px-4 bg-gray-200 bg-opacity-25 ">
            <IoSearch className="text-xl" />
          </button>

          {showSuggestions && suggestions.length > 0 && (
            <div
              className={`absolute top-full z-40 p-2 pb-4 px-0 w-[51%] border-1 border-bg-gray-100 rounded-lg  ${
                isDarkMode ? "bg-[#25252b] text-white" : "bg-white text-black"
              }`}
            >
              <div>
                {suggestions.map((s, index) => (
                    <a
                      href={`/search?q=${s}`}
                      key={index}
                      className={`py-2 px-4 shadow-sm   hover:bg-gray-200 flex items-center gap-2 ${
                        isDarkMode
                          ? "bg-[#25252b] text-white  hover:bg-opacity-5"
                          : "bg-white text-black  hover:bg-opacity-"
                      }`}
                    >
                      <>
                        <IoSearch className="text-xl" />
                        <p>{s}</p>
                      </>
                    </a>
                
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="right col-span-1 flex justify-end px-2 gap-2 h-8 items-center">
        <div>
          <FaUserCircle className="text-3xl" />
        </div>

        <button className=" border-2 rounded-full p-1 hover:space-x-4" onClick={darkMode} >
          {isDarkMode ? (
            <IoSunny className="text-lg" />
          ) : (
            <BsFillMoonFill className="text-lg" />
          )}
          {/* // <IoSunny className="text-xl" /> */}
        </button>
      </div>
    </div>
  );
};

export default Header;
