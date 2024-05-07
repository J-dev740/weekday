import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { IoIosArrowDown } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import React from 'react';
import Chip from './components/chip';
import RoleFilter from './components/rolefilter';
import { UseDispatch, useDispatch, useSelector, } from 'react-redux';
import { listdata } from './assets/dummydata';
import { updatefilters, clearAll } from './feature/filter.slice';
import SearchFilter from './components/searchfilter';
import EmployeeFilter from './components/employeeFilter';
import BasePayFilter from './components/basepayfilter';
import JobCard from './components/jobcard';
import ExperienceFilter from './components/experienceFilter';
import LocationFilter from './components/locationfilter';
import { useInView } from 'react-intersection-observer'
import Loader from './components/loader';
// job interface 
export interface IJob {
  jdUid: String,
  jdLink: String,
  jobDetailsFromCompany: String,
  maxJdSalary: Number | null,
  minJdSalary: Number | null,
  salaryCurrencyCode: String,
  location: String,
  minExp: Number | null,
  maxExp: Number | null,
  jobRole: String,
  companyName: String,
  logoUrl: String,
}
// filter interface 
interface IFilter {
  roles: String[],
  // range: String[],
  location: String[],
  basepay: Number | null | undefined
  searchText: String,
  experience: Number
}
function App() {

  const { ref, inView } = useInView()
  // for laz[y ] loading feature 
  const [page, setPage] = useState(3)
  // 
  // for setting loading when necessary 
  const [loaderactive, setLoaderActive] = useState(true);
  useEffect(() => {
    if (inView) {
      let start = page;
      setPage(page + 4);
      if (page >= filteredData.length) setLoaderActive(false);
    }
  }, [inView])
  const filters: IFilter = useSelector((state: any) => state.filter)
  console.log('filterstate', filters);
  const shouldDisplay = (job: IJob) => {
// roles filter
    let roles = filters.roles.length > 0 ? filters.roles.some((role: String) => role.toLowerCase() == job.jobRole.toLowerCase()) : true;
    // searches filter 
    let searches = filters.searchText !== '' ? job.companyName.toLowerCase().includes(String(filters.searchText.toLowerCase())) : true;
    // location filter 
    let location = filters.location.length > 0 ? filters.location.some((loc: String) => {
      if (loc.toLowerCase() == 'in-office' && job.location.toLowerCase() !== 'hybrid' && job.location.toLowerCase() !== 'remote') return true;
      else return loc.toLowerCase() == job.location.toLowerCase();
    }) : true;

    // experience filter
    let experience = true;
    if (filters.experience !== 0) {
      if (!job.minExp && !job.maxExp) experience = false;
      else if (!job.minExp && job.maxExp !== null) {
        if (filters.experience <= job.maxExp) experience = true;
        else experience = false;
      }
      else if (!job.maxExp && job.minExp !== null) {
        if (filters.experience >= job.minExp) experience = true;
        else experience = false;
      } else if (job.minExp && job.maxExp) {
        experience = (filters.experience >= job.minExp && filters.experience <= job.maxExp);
      }
    }

    // basepayfilter 
    let basepay = true;
    if (filters.basepay) {
      if (job.minJdSalary !== null && job.maxJdSalary !== null) {
        basepay = (filters.basepay >= job.minJdSalary && filters.basepay <= job.maxJdSalary);
      } else if (job.minJdSalary !== null && filters.basepay < job.minJdSalary) basepay = false;
      else if (job.maxJdSalary !== null && filters.basepay > job.maxJdSalary) basepay = false;
      else if (job.maxJdSalary == null && job.minJdSalary == null) basepay = false;
    }
    return roles && searches && basepay && experience && location;
  }
  // filtered data from dummy data provided in the api
  const filteredData: IJob[] = listdata.filter((job: any) => {
    return shouldDisplay(job);
  })
  const dispatch = useDispatch();
  const updaterole = (filters: String[]) => {
    dispatch(updatefilters('roles', filters));
  }
  const updatesearch = (searchtext: String) => {
    dispatch(updatefilters('searchText', searchtext));
  }
  const updateEmployeeRange = (filters: String[]) => {
    dispatch(updatefilters('employeeNumber', filters))
  }
  const updateBasePay = (filter: Number | undefined) => {
    dispatch(updatefilters('basepay', filter));
  }
  const updatelocation = (filter: String[]) => {
    dispatch(updatefilters('location', filter))
  }
  const updateExperince = (filter: Number) => {
    dispatch(updatefilters('experience', filter))
  }

  return (
    <div className="flex self-start flex-row items-start justify-start w-full   max-w-[2000px] min-h-screen   min-w-fit  h-full overflow-scroll  gap-[10px] p-3  bg-slate-200">
      <div className='flex  h-fit flex-col flex-wrap items-start justify-start w-full  gap-6'>
        {/* filter section */}
        <div className='flex flex-row w-fit  h-fit min-h-fit max-h-fit  flex-wrap   items-center justify-start gap-2 md:gap-4'>
          {/* filter 1 */}
          <RoleFilter onupdate={updaterole} />
          {/* filter 2 */}
          {/* <EmployeeFilter onupdate={updateEmployeeRange} /> */}
          {/* employee filter not implemented because data not provided in the api */}
          {/* filter 3 */}
          <SearchFilter onupdate={updatesearch} />
          <BasePayFilter onupdate={updateBasePay} />
          <ExperienceFilter onupdate={updateExperince} />
          {/* location filter */}
          <LocationFilter onupdate={updatelocation} />

        </div>
        {/* job cards section */}
        <div className=' grid min-[1080px]:grid-cols-3 min-[1280px]:grid-cols-4 md:grid-cols-2 self-start min-[1280px]:gap-x-6 gap-x-4 max-w-fit gap-y-4 w-full h-fit text-black '>
          {
            filteredData.length > 0 ? filteredData.slice(0, page).map((job: IJob, idx: number) => (
              <JobCard
                key={idx}
                index={idx}
                job={job} />
            )) : ''

          }

        </div>
        {loaderactive && <div
          ref={ref}

          className='flex self-center '>
          <Loader />

        </div>}
      </div>

    </div>
  )
}

export default App