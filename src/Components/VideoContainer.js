import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API, YOUTUBE_CHANNEL_API, YOUTUBE_API_KEY } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ShimmerVideoCard from "./Shimmer";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data?.json();

    const videosWithChannelInfo = await Promise.all(
      json.items.map(async (video) => {
        const channelData = await fetch(`${YOUTUBE_CHANNEL_API}${video?.snippet?.channelId}&key=${YOUTUBE_API_KEY}`);
        const channelJson = await channelData.json();
    
        const channelProfilePhoto = channelJson.items[0].snippet.thumbnails.default.url;
        const subsCount = channelJson.items[0].statistics.subscriberCount;
        
        return {
          ...video,
          channelProfilePhoto,
          subsCount,
        };
      })
    );

    setVideos(videosWithChannelInfo);
  };
  // videos.length = 0;
  if (videos.length === 0) {
    return (
      <div className={`grid ${isMenuOpen ? 'grid-cols-3' : 'grid-cols-4'} gap-2`}>
        {Array.from({ length: 50 }).map((_, index) => (
          <ShimmerVideoCard key={index} />
        ))}
      </div>
    );
  }
  

  return (
    <div className={`grid ${isMenuOpen ? 'grid-cols-3' : 'grid-cols-4'} gap-2 `}>
      {videos.map((video) => (
        <Link to={`/watch?v=${video.id}`} key={video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
