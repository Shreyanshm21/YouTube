import React from 'react';
import ButtonList from './ButtonList';
import VideoContainer from './VideoContainer';
import { useSelector } from 'react-redux';


const MainContainer = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  
  return (
    <div className={`mt-28 ml-0  p-4 ${isMenuOpen ? "ml-[190px]":"ml-[90px]"}`}>
      <ButtonList className=""/>
      <VideoContainer />
    </div>
  );
}

export default MainContainer;
