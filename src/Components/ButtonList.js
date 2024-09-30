import React from 'react'
import Button from './Button'
import { useSelector } from 'react-redux';
function ButtonList() {
  const isDarkMode = useSelector((store) => store.app.isDark);
  return (
    <div className={`flex  fixed top-14 w-full z-30 py-2 pt-5 ${isDarkMode ? 'bg-black text-white':'bg-white text-black'}`} >
      <Button name ="All"/>
      <Button name ="Gaming"/>
      <Button name ="Songs"/>
      <Button name ="Live"/>
      <Button name ="Soccer"/>
      <Button name ="Cricket"/>
      <Button name ="Cooking"/>
      <Button name ="Valentines"/>

    </div>
  )
}

export default ButtonList