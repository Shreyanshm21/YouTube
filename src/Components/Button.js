import React from 'react'

export default function Button({name}) {
  return (
      <div className="flex">
        <button className="px-3 py-1 m-2 bg-gray-400 bg-opacity-25 rounded-lg">{name}</button>

    </div>
  )  
}
