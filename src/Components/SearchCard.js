import React from 'react';
import { useSelector } from 'react-redux';
const SearchCard = ({ info }) => {
    // console.log(info);
    const { snippet } = info;
    const { title, channelTitle, publishedAt, thumbnails ,description } = snippet ;
    const {statistics} = info;
    const isDarkMode = useSelector((store) => store.app.isDark);
    
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
        <div className={`grid grid-cols-2 gap-2 h-[235.375px] w-[855px]    ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <div className="w-[855px]  h-full">
                <img
                    className=" h-full rounded-lg"
                    alt="thumbnail"
                    src={info?.snippet?.thumbnails?.medium?.url}
                />
            </div>

            <div className="flex flex-col  ">
                <div>
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className={`flex items-center font-medium text-xs gap-2 ${isDarkMode ? 'text-gray-400':''}`}>{formatSubscriberCount(info?.viewCount)} views<span>●</span> <span>{new Date(publishedAt).toLocaleDateString()}</span> </p>
                </div>

                <div className="py-3 flex items-center gap-2">
                    <img
                    src={info?.channelProfilePhoto}
                    alt="Channel Profile"
                    className="rounded-full h-5 w-5 "
                    />
                    <p className={`text-sm   ${isDarkMode ? 'text-gray-50':''}`}>{channelTitle}</p>
                </div>
                <div className="w-">
                    <p className={`text-xs font-medium   ${isDarkMode ? 'text-gray-400':''}`}>{description}</p>
                </div>
            
            </div>

        </div>
    );
};

export default SearchCard;
