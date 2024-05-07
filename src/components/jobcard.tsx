import React from 'react'
import { listdata } from '../assets/dummydata'
import { IJob } from '../App';
import { GiSandsOfTime } from "react-icons/gi";
import { FaRegSquareCheck } from "react-icons/fa6";
import { FaSquareCheck } from "react-icons/fa6";
import { BsLightningCharge } from "react-icons/bs";
import { BsLightningChargeFill } from "react-icons/bs";
import {motion} from 'framer-motion'

function JobCard({job,index}:{
    job:IJob,
    index:number
}) {
    const variants={
        hidden:{opacity:0},
        visible:{opacity:1}
    }
  return (
    <motion.div

    variants={variants}
    initial="hidden"
    animate="visible"
    transition={
        {
            delay:index*0.03,
            ease:"easeInOut",
            duration:0.5
        }
    }
    viewport={{amount:0}}
     className='flex font-lex flex-col items-start shadow-md hover:shadow-lg transition-all  duration-150 ease-linear hover:translate-x-1 hover:-translate-y-0.5 justify-start p-[16px] gap-2 w-[320px] h-[500px] bg-white rounded-3xl'>
        {/* posted number of days ago */}
        <div className='flex flex-row items-center justify-start gap-x-1 rounded-md shadow-lg ring-[1px] ring-slate-200 text-black bg-slate-10  px-[6px] py-[4px] text-[9px] font-lex min-w-[90px] w-fit'>
          <span className='flex w-[10px] h-[10px'><GiSandsOfTime /></span>  Posted 10 days ago</div>
        {/* company header */}
        <div className='flex flex-row w-fit h-fit justify-start gap-2 items-center '>
            {/* logo */}
            <div className='flex flex-row items-start justify-start  w-fit h-full '>
            <div 
            style={{backgroundImage:`url(${job.logoUrl})`}}
            className='flex w-[25px] h-[40px] bg-contain bg-center bg-no-repeat'/>

            </div>
            {/* headers */}
            <div className='flex flex-col gap-y-[2px] items-start justify-center gap-[1px]  text-[12px] text-black  '>
                <span className='text-[#8b8b8b] font-lex  text-[13px] font-semibold text-wrap leading-tight tracking-widest '> {job.companyName}</span>
                <span className='text-black font-lext text-[14px] font-light text-wrap text-start leading-tight tracking-wide'>{job.jobRole}</span>
                <span className='text-black font-bold font-lex  text-[10px]  mt-[2px] leading-tight text-start text-wrap'>{job.location} | {job.minExp!==null && job.maxExp!==null?`Exp ${job.minExp}-${job.maxExp} years`:(job.minExp!==null || job.maxExp!==null)?`Exp ${(job.minExp || job.maxExp)} years`:`Exp not specified `}</span>
            </div>
        </div>
        {/* estimated salary */}
        <div className='flex w-fit h-fit text-[14px] text-gray-600 font-lex font-semibold leading-tight flex-row items-center justify-start gap-x-1 my-[8px] tracking-normal '>Estimated Salary {job.salaryCurrencyCode=='USD'?`$`:`₹`}{job.minJdSalary!==null?String(job.minJdSalary):`__`}-{job.maxJdSalary!==null?String(job.maxJdSalary):'__'} {job.salaryCurrencyCode=='USD'?`K`:`LPA`} 
        <span><FaSquareCheck  className='border-1 border-black text-green-600'/></span> </div>
        {/* about company */}
        <div className=' font-lex  relative flex w-full h-[200px]  overflow-hidden flex-col items-start justify-start p-1 text-[14px] '>
            <div className='font-semibold leading-tight'>About Company:</div>
            <div className='text-[12px] font-bold font-lex '>About us</div>
            <div className='flex h-fit w-full text-wrap text-start text-[10px] font-lex '>{job.jobDetailsFromCompany}</div>
            <div className='absolute text-center   flex flex-row items-center justify-center w-full h-[50px] bg-gradient-to-t from-white  to-transparent -bottom-2  text-blue-600 '>
                <span className='hover:cursor-pointer font-lex  font-medium'>view job</span>
                </div>
        </div>
        {/* view job */}
        {/* last section */}
        <div className='flex flex-col w-full  items-start justify-start gap-[2px]'>
            {/* min exp */}
            <div className='font-bold font-lex text-[#8b8b8b] tracking-wide text-[10px]'>Minimum Experience </div>
            <div className='font-light text-[10px]'>{job.minExp!==null?`${job.minExp} years`:`Not specified`}</div>
            {/* easy apply */}
            <div className='flex flex-row h-[45px]  items-center gap-1 justify-center m-1 bg-[#55efc4] text-black font-bold rounded-lg w-full hover:cursor-pointer '>
                <span><BsLightningChargeFill className=' text-yellow-200' /></span>
                <span className='text-[16px] font-lex font-light text-black text-center tracking-wide '>Easy Apply</span>
            </div>
              <div className='flex flex-row h-[45px]  items-center gap-1 justify-center m-1 bg-[#4943da] text-black hover:cursor-pointer font-bold rounded-lg w-full '>

                  <div className="flex relative  -space-x-1 w-fit h-fit ">
                      <img className="inline-block h-4 w-4 rounded-full " src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      <img className="inline-block h-4 w-4 rounded-full " src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      <div className=' absolute inset-0  bg-transparent backdrop-blur-[1px]'></div>
                  </div>
                <span className='text-[14px] font-light tracking-wide leading-tight  font-lex text-white  text-center '>Unlock referals by ask</span>
            </div>
            
            {/* unlock referals */}
        </div>
    </motion.div>
  )
}

export default JobCard