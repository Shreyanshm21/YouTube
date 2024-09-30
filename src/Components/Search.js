import React, { useEffect, useState } from "react";
import { SEARCH_API } from "../utils/constants";
import SearchCard from "./SearchCard";
import { data } from "../utils/constants";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ButtonList from "./ButtonList";
import ShimmerCard2 from "./ShimmerCard2";

const Search = () => {
  const [searchParams] = useSearchParams();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const isDarkMode = useSelector((store) => store.app.isDark);
  const [videos, setVideos] = useState([]);
 


  useEffect(() => {
    getSearchSuggestions();
  }, [searchParams]);

  const getSearchSuggestions = async () => {
    const response = await SEARCH_API(searchParams.get("q"));
    // console.log("The data")
    // console.log(response);
    // console.log('API Response:', response); // Log the response to see the data structure
    setVideos(response || []);
  };
  
  if (videos.length === 0) {
    return (
      <div className={`flex flex-col gap-y-4 pb-9 pl-20   mt-28 ml-0  ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}   ${isMenuOpen ? "ml-[190px]":"ml-[90px]"}`}>
        {Array.from({ length: 10 }).map((_, index) => (
          <ShimmerCard2 key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
    <div className={`flex flex-col gap-y-4 pb-9 pl-20   mt-36 ml-0  ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}   ${isMenuOpen ? "ml-[190px]":"ml-[90px]"}`} >
    <ButtonList className=""/>
    {/* <div className="pl-10"> */}

      {videos.map((video) =>
        video?.id?.videoId ? (
            <Link
            to={`/watch?v=${video.id.videoId}`}
            key={video.id.videoId}
            className=""
            >
            <SearchCard info={video} />
          </Link>
        ) : null
    )}

    </div>

    </>
  );
};

export default Search;
