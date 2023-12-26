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
        },
        addBill(state,action){
            state.billList.push(action.payload)
        }

    }
})

const {setBillList,addBill} = billStore.actions
const billReducer = billStore.reducer
// async
const getBillList = ()=>{
    return async (dispatch)=>{
       const res = await axios.get("http://localhost:12888/ka")
       dispatch(setBillList(res.data))
    }
}
const addBillLIst = (data)=>{
    return async (dispatch)=>{
        const res = await axios.post("http://localhost:12888/ka",data)
        dispatch(addBill(res.data))
    }
}

export { getBillList, setBillList, addBillLIst}
export default billReducer