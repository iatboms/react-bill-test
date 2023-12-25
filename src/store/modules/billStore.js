// 帐单列表相关store

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
    name:'bill',
    initialState:{
        billList:[]
    },
    reducers:{
        setBillList(state,action){
            state.billList = action.payload
        }
    }
})

const {setBillList} = billStore.actions
const billReducer = billStore.reducer
// async
const getBillList = ()=>{
    return async (dispatch)=>{
       const res = await axios.get("http://localhost:12888/ka")
       dispatch(setBillList(res.data))
    }
}

export { getBillList, setBillList}
export default billReducer