// export const YOUTUBE_API_KEY = "AIzaSyAjRWjNAygbrapsfcTJp-QoEn4GRkqfv1Y";
// export const YOUTUBE_API_KEY = "AIzaSyBBuw3PYmo6IsNlRZcj90Q26xEimHD7ERw";
export const YOUTUBE_API_KEY = "AIzaSyDJxGQeKdLDJvh4ePRR0L8ISVY2Ckx-3nk";
// export const YOUTUBE_API_KEY = "AIzaSyAmtUNQtDQGxzmd2NjKpYjTXUuqNOObYS4";


export const YOUTUBE_VIDEOS_API = 
"https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=" + YOUTUBE_API_KEY;
// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY]

export const videoInfo = async(query)=>{
    const data = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${query}&key=${YOUTUBE_API_KEY}`);
    const json = await data?.json();

    const channelData = await fetch(`${YOUTUBE_CHANNEL_API}${json?.items[0]?.snippet?.channelId}&key=${YOUTUBE_API_KEY}`);
      const channelJson = await channelData.json();

  
      const channelProfilePhoto = channelJson?.items[0]?.snippet?.thumbnails.default.url;
      const subsCount = channelJson?.items[0]?.statistics?.subscriberCount;
      // console.log(channelProfilePhoto)

    // return json;
    const finalData = {...json,channelProfilePhoto,subsCount};
    return finalData;
}



export const YOUTUBE_CHANNEL_API = "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=";



export const YOUTUBE_SEARCH_API ="https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q=";



export const SEARCH_API = async (query) => {
  // console.log(query);

  // Fetch videos based on the search query
  const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${YOUTUBE_API_KEY}`);
  const json = await response.json();

  // Fetch additional channel info for each video
  const videosWithChannelInfo = await Promise.all(
    json.items.map(async (video) => {
      const channelData = await fetch(`${YOUTUBE_CHANNEL_API}${video?.snippet?.channelId}&key=${YOUTUBE_API_KEY}`);
      const channelJson = await channelData.json();

      if (!channelJson?.items || channelJson.items.length === 0) {
        // console.warn(`No channel data found for video: ${video?.id}`);
        return {
          ...video,
          channelProfilePhoto: null,
          subsCount: null,
          viewCount: null,
        };
      }
  
      // console.log(channelJson)
      const channelProfilePhoto = channelJson?.items[0]?.snippet?.thumbnails?.default?.url || null;
      const subsCount = channelJson?.items[0]?.statistics?.subscriberCount || null;
      const viewCount = channelJson?.items[0]?.statistics?.viewCount || null;
      // console.log(subsCount)
      
      return {
        ...video,
        channelProfilePhoto,
        subsCount,
        viewCount,
      };
    })
  );

  // Return the array of videos with additional channel info
  return videosWithChannelInfo;
};
