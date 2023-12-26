import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillLIst } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const New = () => {
  const navigate = useNavigate()
  const dispatch =useDispatch()
  // 1. 控制支出收入的状态
  const [billType, setBillType] = useState("pay")

  // 收集金额
  const [ money, setMoney] = useState(0.00)
  const moneyChange =(val)=>{
    setMoney(val)
  }
  // 收集账单类型
  const [useFor, setUseFor] = useState("")
  // 收集选择的时间
  const [date,setDate] = useState(new Date())
  // 2. 保存账单
  const saveBill = ()=>{
    // 收集表单数据
    const data = {
        type:billType,
        money: billType==="pay"? -money : +money,
        date,
        useFor
    }
    console.log(data)
    dispatch(addBillLIst(data))
  }
  // 3.控制时间选择器
  const  [dataVisible, setDataVisible] = useState(false)
  const onConfirm = (val)=>{
    setDataVisible(false)
    //others
    setDate(val)
  }


  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames({selected: billType==="pay"})}
            onClick={()=>setBillType("pay")}
            >
            支出
          </Button>
          <Button
            className={classNames({selected: billType==="income"})}
            shape="rounded"
            onClick={()=>setBillType("income")}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={()=>setDataVisible(true)}>{dayjs(date).format("YYYY-MM-DD")}</span>
              {/* 时间选择器 */}
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dataVisible}
                onCancel={()=>setDataVisible(false)}
                onConfirm={onConfirm}
                onClose={()=>setDataVisible(false)}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value ={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/* 数据区域 */}
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        {selected:useFor==item.type}
                      )}
                      key={item.type}
                      onClick={()=>setUseFor(item.type)}
                    >
                      <div className={classNames("icon")}>
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New