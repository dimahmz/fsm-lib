/* eslint-disable react/prop-types */

export default function Button({text, icon, type }){
  return(
    <>
      <button 
        className="flex space-x-2 items-center text-sm px-5 py-2.5 text-center
         text-white bg-primary font-medium rounded-lg z-10"
         type={type ? type : "button" }
      >
      {icon &&  <span>{icon}</span> }
      <span>{text}</span>
      </button>
    </>
    )  
}