import { useEffect, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import React from 'react';

function SearchFilter({ onupdate }: {
    onupdate: (searchtext: String) => void;
}) {

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        onupdate(searchQuery);
    }, [searchQuery])

    return (
        <div
            className='flex flex-row  focus-within:ring-2 focus-within:ring-blue-500 min-w-[150px] max-w-full w-fit  min-h-[38px] h-fit items-center border-[1px]  border-[#8b8b8b] rounded-[4px]'>
            {/* roles section */}
            <div className=' relative flex  flex-row min-w-[100px] h-fit w-fit max-w-full  rounded-md  gap-[1px]    '>
                {/* chipset and search section */}
                <div className='flex w-fit   flex-row items-center justify-start max-w-full flex-wrap  h-fit gap-1  '>
                    <input
                        placeholder='Search Company By Name'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='  flex items-center outline-none min-w-[20px]  w-fit min-h-[30px]  text-black font-medium ml-2  text-[12px] rounded-r-[10px] bg-transparent appearance-none self-center '>

                    </input>
                </div>
                {/* search section */}
                {/* clear all icon section */}
            </div>
        </div>
    )
}

export default SearchFilter