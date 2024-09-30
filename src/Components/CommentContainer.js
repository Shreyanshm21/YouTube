import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';

const commentsData =[
  {
    name : "Shensha",
    text : "Valorant , Allaaaaaaaaaaaaaaaaaaaaaaaah",
    replies :[
      {
        name : "Shensha",
        text : "Valorant , Allaaaaaaaaaaaaaaaaaaaaaaaah",
        replies :[
          {
            name : "Shensha",
            text : "Valorant , Allaaaaaaaaaaaaaaaaaaaaaaaah",
            replies :[
              {
                name : "Shensha",
                text : "Valorant , Allaaaaaaaaaaaaaaaaaaaaaaaah",
                replies :[
                  {
                    name : "Shensha",
                    text : "Valorant , Allaaaaaaaaaaaaaaaaaaaaaaaah",
                    replies :[
                      {
                        name : "Shensha",
                        text : "Valorant , Allaaaaaaaaaaaaaaaaaaaaaaaah",
                        replies :[
                    
                        ]
                      },
                    ]
                  },
                ]
              },
            ]
          },
        ]
      },
    ]
  },
  {
    name : "Shensha",
    text : "Valorant , Allaaaaaaaaaaaaaaaaaaaaaaaah",
    replies :[

    ]
  },
  {
    name : "Shensha",
    text : "Valorant , Allaaaaaaaaaaaaaaaaaaaaaaaah",
    replies :[

    ]
  },
  {
    name : "Shensha",
    text : "Valorant , Allaaaaaaaaaaaaaaaaaaaaaaaah",
    replies :[

    ]
  },
  {
    name : "Shensha",
    text : "Valorant , Allaaaaaaaaaaaaaaaaaaaaaaaah",
    replies :[

    ]
  },
  {
    name : "Shensha",
    text : "Valorant , Allaaaaaaaaaaaaaaaaaaaaaaaah",
    replies :[

    ]
  },
  {
    name : "Shensha",
    text : "Valorant , Allaaaaaaaaaaaaaaaaaaaaaaaah",
    replies :[

    ]
  },
  {
    name : "Shensha",
    text : "Valorant , Allaaaaaaaaaaaaaaaaaaaaaaaah",
    replies :[

    ]
  },
]

const Comment =({data}) => {
  const isDarkMode = useSelector((store) => store.app.isDark);
  const{name,text,replies} =data;
  return(
    <>
      <div className={`flex items-center p-2 rounded-lg shadow-sm my-2  ${isDarkMode ? "bg-[#373636]" :"bg-gray-200 bg-opacity-70"} `}>
        <FaUserCircle className="text- w-9 h-9" /> 
        <div className='px-3'>
          <p className="font-bold">{name}</p>
          <p className="">{text}</p>
        </div>
      </div>
    </>
  )
}

const CommentList = ({comments}) =>{

  return comments.map((comment , index) =>(
    <div>

    <Comment key={index} data={comment}/>

      <div className="pl-4 border border-l ml-5">
        <CommentList  comments={comment.replies} />
      </div>
    </div>
  ))
}

const CommentContainer = () => {
  return (
    <div className="m-1 my-2 py-2">
        <h1 className="text-2xl font-bold">Comments:</h1>
        <div className="p-2">
          <CommentList comments={commentsData}/>
        </div>
    </div>
  )
}

export default CommentContainer 