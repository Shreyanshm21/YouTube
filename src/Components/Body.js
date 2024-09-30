import React from 'react'
import SideBar from './SideBar'
import MainContainer from './MainContainer'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Body = () => {
  const isDarkMode = useSelector((store) => store.app.isDark);
  return (
    <div className={`flex ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}  `}>
        <SideBar/>
        <Outlet/>
    </div>
  )
}

export default Body