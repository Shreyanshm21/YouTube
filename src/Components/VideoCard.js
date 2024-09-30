import React from 'react';
import { useSelector } from 'react-redux';

const VideoCard = ({ info }) => {

  function formatSubscriberCount(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  }

  function truncateTitle(title, length) {
    return title.length > length ? title.substring(0, length) + '...' : title;
  }

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const { snippet, statistics, channelProfilePhoto } = info;
  const { channelTitle, title, thumbnails } = snippet;
  // console.log(info);

  return (
    <div className={`" my-2 w-88 h-[19rem]  flex flex-col ${isMenuOpen ? 'w-[98%] h-[21rem]' : ''} "`}>
      
      
      <img className="rounded-lg h-[70%] object-cover w-full" alt="thumbnail" src={thumbnails?.medium?.url} />

      <div className="h-1/2 flex flex-row ">

        <div className="flex  items-center justify-around w-14 h-14">
          <img
              src={channelProfilePhoto}
              alt="Channel Profile"
              className="rounded-full h-10 w-10 "
            />
        </div>


        <div className={`flex flex-col  p-2 h-auto w-[82%] ${isMenuOpen ? 'w-[90%]' : ''} `}>
          <h3 className="font-bold py-  text-base h-auto text-wrap">{truncateTitle(title, 45)}</h3>
          <p className="flex items-center pt-1 text-sm">{channelTitle}</p>
          <p className="font-light  text-sm">{formatSubscriberCount(statistics?.viewCount)} views</p>
        </div>


      </div>



    </div>
  );
};

export default VideoCard;
