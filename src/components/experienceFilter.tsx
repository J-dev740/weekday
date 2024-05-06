import { useEffect, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
// import './App.css'
import React from 'react';
import Chip from './chip';
 function ExperienceFilter({onupdate}:{
    onupdate:(filters:Number)=>void;
 }) 
 {
  const [selectedChips, setSelectedChips] = useState<String>('');

    useEffect(()=>{
        if(selectedChips=='') onupdate(0);
      else 
      onupdate(Number(selectedChips));
    },[selectedChips])

    const [searchQuery, setSearchQuery] = useState("");
  // const [category,setCategory]=useState<categ | null>(null);
  const [category,setCategory]=useState("");
  const [range,setRange]=useState<String[]>([
    '1','2','3','4','5','6','7','8','9','10'
  ]
  )
  // let category='';
  const [list,setList]=useState(false);
//   const [highlight,setHighlight]=useState(false);
//   const [count,setCount] =useState(false);
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
    className='flex flex-row   min-w-[150px] max-w-full w-fit  min-h-[38px] h-fit items-center  ring-[1px]  ring-[#8b8b8b] rounded-[4px]'>
    {/* roles section */}
    <div className=' relative flex flex-row min-w-[100px] h-fit w-fit max-w-full  rounded-md  gap-[1px]    '>
      {/* chipset and search section */}
      <div className='flex w-fit   flex-row items-center justify-start max-w-full flex-wrap  h-fit gap-1  '>
      {selectedChips!==''? 
          <Chip 
        //   key={index}
          chip={selectedChips} index={0} chipdelete={(chip:String)=>handleChipDelete(chip) }/>:''}
      <input
  placeholder='Experience'
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onFocus={()=>setList(true)}
  // onBlur={()=>setList(false)}
  // onMouseLeave={()=>setList(false)}
  onKeyDown={(e) => {
    if (e.key == 'Backspace' && searchQuery == '' && selectedChips!==''  ) {

    //   let  updatedroles=roles;
    //   roles[category]=[...roles[category],selectedChips[selectedChips.length-1]]
      // setUsers(updatedUsers);
    //   setRoles(updatedroles)
    const updatedRange=[...range];
    updatedRange.push(selectedChips);
    setRange(updatedRange);
    //   const updatedItems = selectedChips.filter((item, index) => index !== selectedChips.length - 1);
      setSelectedChips('');
    }
  }}
  className='  flex items-center outline-none min-w-[10px] w-fit min-h-[30px]  text-black font-normal ml-2  text-[12px] rounded-r-[10px] bg-transparent appearance-none self-center '>

      </input>
      {
        list && (
          <div className={'absolute  z-10 -bottom-[300px] w-full max-h-[400px] min-h-[100px] min-w-[50px] mr-2  h-[300px] bg-white overflow-auto no-scrollbar shadow-md rounded-md ring-[1px] ring-[#8b8b8b]'}>
            <ul className='flex flex-col w-full h-fit p-2 gap-3 text-black font-bold  '>
              {/* {
               Object.keys(roles).filter((key)=>{
                // console.log(key);
                let res= roles[key].some((role: String | String[])=>role.includes(searchQuery))
                // console.log(res);
                return res;
              }
              ).map((cg,index)=>
                {

                   return ( */}
                <div 
                // key={index}
                className='flex flex-col w-full items-start justify-center text-black text-bold'>
                  {/* header  */}
                  {/* <span className='text-[16px] text-black font-bold'>{cg}</span> */}
                  {/* subsection */}
                  <ul className='flex flex-col w-full  items-start justify-center text-start gap-2 text-slate-400 '>
                    {range.filter((range:String)=>range.includes(searchQuery)).map((range:String,idx:number)=>(
                      <li 
                      key={idx}
                      onMouseDown={() => {
                        
                        handleChipSelect(range);
                        setList(false);
                        // setHighlight(false);
                      }}
                      className='flex w-full min-w-fit h-fit flex-row items-center bg-white rounded-md  hover:cursor-pointer justify-start  hover:bg-blue-300 '>
                       <span className='text-start text-[12px] tracking-widest text-black font-lex  font-light mx-2 mt-1 uppercase '>{range}</span>

                      </li>
                    ))}

                  </ul>
                </div>
              {/* )}
            )
              } */}
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
 
 export default ExperienceFilter