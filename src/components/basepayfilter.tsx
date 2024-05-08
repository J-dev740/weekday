import { useEffect, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import React from 'react';
import Chip from './chip';
 function BasePayFilter({onupdate}:{
    onupdate:(filters:Number|undefined)=>void;
 }) 
 {
  const [selectedChips, setSelectedChips] = useState<String>('');

    useEffect(()=>{
     onupdate(Number(selectedChips));
    },[selectedChips])

    const [searchQuery, setSearchQuery] = useState("");
  const [category,setCategory]=useState("");
  const [range,setRange]=useState<String[]>([
    '1','2','3','4','5','6','7','8','9','10'
  ]
  )
  const [list,setList]=useState(false);
  const handleChipSelect = (R:String) => {
    const updatedRange=range.filter((r)=> r!==R)
    setSelectedChips(R);
    setRange(updatedRange);
      setSearchQuery('');
    
  }
  const handleChipDelete = (chip:any) => {
    setSelectedChips('');
    const updatedRange=[...range,chip];
    setRange(updatedRange);

  }
   return (
    <div 
    onBlur={()=>setList(false)}
    className='flex flex-row focus-within:ring-2 focus-within:ring-blue-500  min-w-[150px] max-w-full w-fit  min-h-[38px] h-fit items-center  ring-[1px]  ring-[#8b8b8b] rounded-[4px]'>
    {/* roles section */}
    <div className=' relative flex flex-row min-w-[100px] h-fit w-fit max-w-full  rounded-md  gap-[1px]    '>
      {/* chipset and search section */}
      <div className='flex w-fit   flex-row items-center justify-start max-w-full flex-wrap  h-fit gap-1  '>
      {selectedChips!==''? 
          <Chip 
          chip={selectedChips} index={0} chipdelete={(chip:String)=>handleChipDelete(chip) }/>:''}
      <input
  placeholder='Minimum Base Pay'
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onFocus={()=>setList(true)}
  onKeyDown={(e) => {
    if (e.key == 'Backspace' && searchQuery == '' && selectedChips!==''  ) {

    const updatedRange=[...range];
    updatedRange.push(selectedChips);
    setRange(updatedRange);
      setSelectedChips('');
    }
  }}
  className='  flex items-center outline-none min-w-[10px] w-fit min-h-[30px]  text-black font-normal ml-2  text-[12px] rounded-r-[10px] bg-transparent appearance-none self-center '>

      </input>
      {
        list && (
          <div className={'absolute  z-10 -bottom-[300px] w-full max-h-[400px] min-h-[100px] min-w-[50px] mr-2  h-[300px] bg-white overflow-auto no-scrollbar shadow-md rounded-md ring-[1px] ring-[#8b8b8b]'}>
            <ul className='flex flex-col w-full h-fit p-2 gap-3 text-black font-bold  '>

                <div 
                // key={index}
                className='flex flex-col w-full items-start justify-center text-black text-bold'>
                  {/* header  */}
                  {/* subsection */}
                  <ul className='flex flex-col w-full  items-start justify-center text-start gap-2 text-slate-400 '>
                    {range.filter((range:String)=>range.includes(searchQuery)).map((range:String,idx:number)=>(
                      <li 
                      key={idx}
                      onMouseDown={() => {
                        
                        handleChipSelect(range);
                        setList(false);
                      }}
                      className='flex w-full min-w-fit h-fit flex-row items-center bg-white rounded-md  hover:cursor-pointer justify-start  hover:bg-blue-300 '>
                       <span className='text-start text-[12px] tracking-widest text-black font-lex  font-light mx-2 mt-1 uppercase '>{range}L</span>

                      </li>
                    ))}

                  </ul>
                </div>
            </ul>
          </div>

        )
      }

      </div>
      {/* search section */}
      {/* clear all icon section */}
    </div>
    {/* down arrow section */}
    <div
    className='flex flex-row items-center justify-center h-full min-h-[10px] w-fit px-1'>
      <span
        onClick={()=>{
            if(selectedChips!==''){
                let updatedRange=[...range,selectedChips];
                setRange([...updatedRange])
              setSelectedChips('');
            }

        }}
       className='flex flex-row  items-center justify-center text-slate-600 hover:text-black text-[13px] font-extrabold '>
      <CgClose  
      className='self-center ml-[2px] ' />
      </span>
      <div className='flex w-[1px] text-black text-[2px] min-h-[32px] bg-[#8b8b8b] h-full mx-2   rounded-full'>{`.`}</div>
      <span 
      onClick={()=>setList(!list)}
      className='flex flex-row  items-center justify-center text-slate-600 hover:text-black text-[13px] font-extrabold '>
      <FaChevronDown className='self-center mr-[2px] ' />
      </span>
    </div>

  </div>
   )
 }
 
 export default BasePayFilter