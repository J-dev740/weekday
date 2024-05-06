 import React from 'react'
 import { RxCross2 } from "react-icons/rx";
 function Chip({chip, index,chipdelete}:{
  chip:String, 
  index:Number,
  chipdelete:(chip:String)=>void
}) {
   return (
    <div
    // key={index}
    className={
      // ((highlight==true && index==selectedChips.length-1)?'ring-2  ring-lime-500':'ring-0')+
    'w-fit  h-fit flex flex-row justify-between items-center mx-1 pl-1 my-1  bg-slate-300 rounded-sm text-black '}>
    <div className='flex flex-row items-center w-fit mx-1 gap-[10px]'>
      <span>{chip}</span>
        </div>
      <p
        className='flex w-fit h-fit text-black  hover:bg-red-400 hover:text-red-800 p-1 rounded-sm   font-extrabold hover:cursor-pointer '
        onClick={() => chipdelete(chip)}>
          <RxCross2 className=' font-extrabold font-lex  tracking-widest' />
        </p>
    </div>
   )
 }
 
 export default Chip