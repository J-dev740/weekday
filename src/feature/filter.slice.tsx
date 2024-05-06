import {createSlice,PayloadAction} from '@reduxjs/toolkit'
interface IFilterData{
    roles:String[],
    searchText:String
    basePay:any
    location:String[],
    experience:Number,
}

const initialState:IFilterData={
    roles:[],
    basePay:null,
    searchText:"",
    location:[],
    experience:0
}
const filterReducer=createSlice({
    name:'filter',
    initialState,
    reducers:{
        updatefilters:{
           reducer: (state,action:PayloadAction<{category:any,filters:any}>)=>{
            const {category,filters}=action.payload;
            state[category]=filters;
            return state;
        },
         prepare:(category:String,filters:any)=>{
            return {payload:{category,filters}}
        }
    },
        clearAll:(state,action)=>{
            return {...state};
        }
    }
})

export default filterReducer.reducer;
export const {updatefilters,clearAll}=filterReducer.actions;