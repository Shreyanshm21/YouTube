import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';



//icons
import { SiYoutubeshorts } from "react-icons/si";
import { BiSolidHome } from "react-icons/bi";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdPlaylistPlay } from "react-icons/md";


const SideBar = () => {

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const isFixed = useSelector((store) => store.app.isFixed);
  const isDarkMode = useSelector((store) => store.app.isDark);

  // Early Return Pattern 
  if(!isMenuOpen) return(
    <div className={`fixed top-[53px] ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} w-20 border-0 h-[98%] py-2`}>
        <div className="w-full flex flex-col items-center border-b-2 border-opacity-30 border-gray-400 py-4 gap-2">
        
            <div className="flex flex-col items-center p-2 h-">
                <BiSolidHome className="text-2xl" />
                <Link className="text-xs p-1" to="/">Home</Link>
            </div>
            
            <div className="flex flex-col items-center p-2 h-">
                <SiYoutubeshorts className="text-2xl" />
                <span className="text-xs p-1">Shorts</span>
            </div>
        
            <div className="flex flex-col items-center p-2 h-">
                <SiYoutubeshorts className="text-2xl" />
                <span className="text-xs p-1">Subscription</span>
            </div>
        </div>
  </div>
  
  )

  return (
    <div className={`fixed top-[53px]  w-[190px] border-0 h-[98%]  ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} p-2 `}>

        <ul className='w-full flex flex-col border-b-2 border-opacity-30 border-gray-400 py-4 '>
            <li className="flex items-center  gap-4 w-44 h-10  p-2" ><BiSolidHome className="text-2xl" /><Link to="/">Home</Link></li>
            <li className="flex items-center  gap-4 w-44 h-10  p-2"  ><SiYoutubeshorts  className="text-2xl"/> <span className="text-base">Shorts</span></li>
            <li className="flex items-center gap-4 w-44 h-10  p-2"  ><SiYoutubeshorts  className="text-2xl"/> <span className="text-base">Subscription</span></li>
        </ul>
        <ul className='w-full flex flex-col border-b-2 border-opacity-30 border-gray-400  py-4 '>
            <li className="flex items-center  gap-4 w-44 h-10  p-2" ><MdOutlineWatchLater className="text-2xl" /><span className="text-base">Watch Later</span></li>
            <li className="flex items-center  gap-3 w-44 h-10  p-2"  ><MdPlaylistPlay  className="text-3xl"/> <span className="text-base">PlayList1</span></li>
            <li className="flex items-center gap-3 w-44 h-10  p-2"  ><MdPlaylistPlay  className="text-3xl"/> <span className="text-base">PlayList2</span></li>
            <li className="flex items-center gap-3 w-44 h-10 p-2"  ><MdPlaylistPlay  className="text-3xl"/> <span className="text-base">PlayList3</span></li>
        </ul>
        {/* <h1 className="font-bold pt-5 ">Subscriptions</h1>
        <ul>
            <li>Music</li>
            <li>Sports</li>
            <li>Gaming</li>
            <li>Movies</li>
        </ul>
        <h1 className="font-bold pt-5">Saved</h1>
        <ul>
            <li>Watch Later</li>
            <li>PlayList1</li>
            <li>PlayList2</li>
            <li>PlayList3</li>
        </ul> */}
    </div>
  )
}

export default SideBar