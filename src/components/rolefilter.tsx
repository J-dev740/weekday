import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { IoIosArrowDown } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
// import './App.css'
import React from 'react';
import Chip from './chip';
 function RoleFilter({onupdate}:{
    onupdate:(filters:String[])=>void;
 }) 
 {
  const [selectedChips, setSelectedChips] = useState<String[]>([]);

    useEffect(()=>{
     onupdate(selectedChips);
    },[selectedChips])

    const [searchQuery, setSearchQuery] = useState("");
  // const [category,setCategory]=useState<categ | null>(null);
  const [category,setCategory]=useState("");
  const [roles,setRoles]=useState({
    Engineering:['frontEnd','backend','fullstack','android','flutter','react Native','Dev-Ops','Data Engineer','Data Science ','tech lead','ios','Computer Vision','NLP','Deep learning','Web3','Test/QA','SRE','Data-Infrastructure'],
    Design:['Designer','Design Manager','Graphic Designer','Product Designer'],
    Product:['Product Manager'],
    Operations:['Operations Manager',`Founder's Office/Chief of Staff`,],
    Sales:['Sales Development Representative','Account Executive','Account Manager'],
    Marketing:['Digital Marketing Manager','Growth Hacker','Marketing','Product Marketing Manager'],
    OtherEngineering:['HardWare','Mechanical','Systems'],
    BusinessAnalyst:['Business Analyst'],
    DataAnalyst:['Data Analyst'],
    ProjectManager:['Project Manager'],
    Management:['Management'],
    Legal:['Legal'],
    Hr:['Hr'],
    Finance:['Finance']
  })
  // let category='';
  const [list,setList]=useState(false);
//   const [highlight,setHighlight]=useState(false);
//   const [count,setCount] =useState(false);
  const handleChipSelect = (role: String,cat:any) => {
    // const updatedItems = selectedChips.length > 0 ? [...selectedChips, data] : [data];
    // console.log(cat);
    if(category=="") 
      {
        setSelectedChips([role]);
      }
   else  if(category===cat)
      { 
        console.log('here',selectedChips)
        let updatedlist=[...selectedChips];
        updatedlist.push(role);
        // setSelectedChips([...selectedChips,role])
        setSelectedChips(updatedlist);
        console.log(category)
        console.log('selectedchips',selectedChips)
      }
      else{
    // setCategory(cat);
      let updatedroles=roles;
      updatedroles[category]=[...roles[category],...selectedChips];
      setRoles(updatedroles);
      setSelectedChips([role]);
    }
    let updatedroles=roles;
      updatedroles[cat]=updatedroles[cat].filter((val:String)=>val!==role);
      setRoles(updatedroles);
      setSearchQuery('');
    
  }
  const handleChipDelete = (chip:any) => {
    const updatedItems = selectedChips.filter((data) => data!==chip )
    setSelectedChips(updatedItems);
    let updatedroles=roles;
     updatedroles[category]=[...updatedroles[category],chip]
    setRoles(updatedroles)
  }
   return (
    <div
    onBlur={()=>setList(false)}

     className='flex flex-row focus-within:ring-2 focus-within:ring-blue-500   min-w-[150px] max-w-full w-fit  min-h-[38px] h-fit items-center   ring-[1px]  ring-[#8b8b8b] rounded-[4px]'>
    {/* roles section */}
    <div className=' relative flex flex-row min-w-[100px] h-fit w-fit max-w-full  rounded-md  gap-[1px]    '>
      {/* chipset and search section */}
      <div className='flex w-fit   flex-row items-center justify-start max-w-full flex-wrap  h-fit gap-1  '>
      {selectedChips.length>0? selectedChips.map((chip:String,index:number)=>{
        return (
          <Chip 
          key={index}
          chip={chip} index={index} chipdelete={(chip:String)=>handleChipDelete(chip) }/>
        )
      }):''}
      <input
  placeholder='Roles.'
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onFocus={()=>setList(true)}
  // onBlur={()=>setList(false)}
  // onMouseLeave={()=>setList(false)}
  onKeyDown={(e) => {
    if (e.key == 'Backspace' && searchQuery == '' && selectedChips.length > 0  ) {

      let  updatedroles=roles;
      roles[category]=[...roles[category],selectedChips[selectedChips.length-1]]
      // setUsers(updatedUsers);
      setRoles(updatedroles)
      const updatedItems = selectedChips.filter((item, index) => index !== selectedChips.length - 1);
      setSelectedChips(updatedItems);
    }
  }}
  className='  flex items-center outline-none ml-[8px] min-w-[10px] w-fit min-h-[30px]  text-black font-normal  text-[12px] rounded-r-[10px] bg-transparent appearance-none self-center '>

      </input>
      {
        list && (
          <div 
          className={'absolute  z-10 -bottom-[400px] w-full max-h-[400px] min-h-[100px] min-w-[150px] mr-2  h-[400px] bg-white overflow-auto no-scrollbar shadow-md rounded-md ring-[1px] ring-[#8b8b8b]'}>
            <ul className='flex flex-col w-full h-fit p-2 gap-3 text-black font-bold   '>
              {
               Object.keys(roles).filter((key)=>{
                // console.log(key);
                let res= roles[key].some((role: String | String[])=>role.includes(searchQuery))
                // console.log(res);
                return res;
              }
              ).map((cg,index)=>
                {

                   return (
                <div 
                key={index}
                className='flex flex-col w-full items-start justify-center text-black text-bold'>
                  {/* header  */}
                  <span className='text-[14px] text-[#8b8b8b] font-bold uppercase tracking-widest'>{cg}</span>
                  {/* subsection */}
                  <ul className='flex flex-col w-full  items-start justify-center text-start gap-2 text-slate-400 '>
                    {roles[cg].filter((role:String)=>role.includes(searchQuery)).map((role:String,idx:number)=>(
                      <li 
                      key={idx+index}
                      onMouseDown={() => {
                        
                        handleChipSelect(role,cg);
                        setCategory(cg);
                        setList(false);
                        // setHighlight(false);
                      }}
                      className='flex w-full min-w-fit h-fit flex-row items-center justify-start bg-white rounded-md  hover:cursor-pointer hover:bg-blue-300 '>
                        <span className='text-start text-[12px] tracking-widest text-black font-lex  font-light mx-2 mt-1 uppercase '>{role}</span>
                      </li>
                    ))}

                  </ul>
                </div>
              )}
            )
              }
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
          let updatedroles=roles;
          updatedroles[category]=[...updatedroles[category],...selectedChips];
          setRoles(updatedroles);
          setCategory('');
          setSelectedChips([]);

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
 
 export default RoleFilter