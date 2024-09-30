import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentContainer from './CommentContainer';
import { videoInfo } from '../utils/constants';

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [videoData, setVideoData] = useState();
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const isDarkMode = useSelector((store) => store.app.isDark);
  const limit =110;
  const formattedText = (text)=>{
    return text?.replace(/\n/g, '<br />');
    
  } 

  const toggleShowMore = () => {
    setIsExpanded(!isExpanded);
  };
  
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  useEffect(() => {
    dispatch(closeMenu());
    getTheData();
  }, [searchParams, dispatch]);

  const getTheData = async () => {
    const response = await videoInfo(searchParams.get("v"));
    setVideoData(response);
  };

  function formatSubscriberCount(num) {
    
    let number = parseInt(num);
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    // console.log(statistics);
    return number.toString();
}




  return (
    <div className="flex justify-around mt-10 bg -red-200">
      <div className="flex flex-col bg-gray -400 w-[860px] ml-24  mt-14">
        <div>
          <iframe
            className="rounded-lg  w-[860px]"
            width=""
            height="540"
            src={`https://www.youtube.com/embed/${searchParams.get("v")}?autoplay=0&mute=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>

        </div>
        {videoData && (
          <div className="mt-2 w-[860px] ">
            {/* Render video details like title, channel, etc. */}
            <h1 className="text-xl font-bold"  >{videoData?.items[0]?.snippet?.title}</h1>

            <div className="channel flex p-2 pl-0 items-center gap-2">

              <div>
                <img
                  src={videoData?.channelProfilePhoto}
                  alt="Channel Profile"
                  className="rounded-full h-10 w-10 "
                />
              </div>

              <div className="flex flex-col justify-start ">
                <h2 className='font-bold' >{videoData?.items[0]?.snippet?.channelTitle}</h2>
                <p className='text-sm' >{formatSubscriberCount(videoData.subsCount)} subscribers</p>
              </div>

            </div>

            <div className={`  ${isDarkMode ? "bg-[#373636]" :"bg-gray-200 bg-opacity-70"} 
            flex flex-col    rounded-lg p-2 mt-2`}>
              <p className='text-sm font-semibold p-1 '>{formatSubscriberCount(videoData?.items[0]?.statistics.viewCount)} views  <span className='ml-1'>{new Date(videoData?.items[0]?.snippet?.publishedAt).toLocaleDateString()}</span>    </p>
              <br/>

              <div className='description-box-text flex flex-col p-1 items-start  '>
                <p
                  className="w-[830px]  text-wrap flex flex-wrap"
                  // this is used inside the p tag so that we can render html inside it 
                  dangerouslySetInnerHTML={{
                    __html: isExpanded
                      ? formattedText(videoData?.items[0]?.snippet?.description)
                      : `${formattedText(videoData?.items[0]?.snippet?.description).slice(0, limit)}...`
                  }}
                ></p>
                <button className=" mt-1 font-bold" onClick={toggleShowMore}>
                {isExpanded ? 'Show less' : 'Show more'}
                </button>
              </div>
            </div>

          </div>
        )}
        <div >
          <CommentContainer />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
