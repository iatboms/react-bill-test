import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from './components/DailyBill'

const Month = () => {
    // 按月做数据分组
    const {billList} =  useSelector(state=>state.bill)
    // useMemo类似 计算属性
    const monthGroup = useMemo(()=>{
        return _.groupBy(billList,(item)=>dayjs(item.date).format("YYYY-MM"))
        // return 计算之后的值
        // return billList
    },[billList])


    // 控制弹框的打开和关闭
    const [dateVisible , setDateVisible] = useState(false)

    // 控制时间显示
    const [currentDate , setCurrentDate] = useState(()=>{
        return new Date()
    })

    const [currentMonthList, setCurrentMonthList] = useState([])

    const moneyGroup = useMemo(()=>{
        // 支出 / 收入 / 结余
      const pay =  currentMonthList.filter(item=>item.type==='pay').reduce((a,c)=>a+c.money,0)
      const income =  currentMonthList.filter(item=>item.type==='income').reduce((a,c)=>a+c.money,0)

      return {
        pay,
        income,
        total: pay + income
      }
    },[currentMonthList])

    // 初始化的时候把当前月的统计数据显示出来
    useEffect(()=>{
        const formatDate = dayjs(currentDate).format("YYYY-MM")
        console.log(monthGroup);
        // 数据是异步取的。 要保证数据存在
        if(monthGroup[formatDate]){
            setCurrentMonthList(monthGroup[formatDate])
        }
       
    },[monthGroup])

    // 确认逻辑
    const onConfirm = (date) =>{
        setDateVisible(false)
        const formatDate = dayjs(date).format("YYYY-MM")
        // others
        if(monthGroup[formatDate]){}
        setCurrentMonthList(monthGroup[formatDate])
        setCurrentDate(date)
    }

    // 当前月 按照 日 进行分组
    const dayGroup = useMemo(()=>{
        const groupData =  _.groupBy(currentMonthList,(item)=>dayjs(item.date).format("YYYY-MM-DD"))
        const keys = Object.keys(groupData)

        return{
            groupData,
            keys
        }

    },[currentMonthList])
    
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date"  onClick={()=>setDateVisible(true)}>
            <span className="text">
              {dayjs(currentDate).format("YYYY-MM月账单")}
            </span>
            {/* 控制expand有无来决定箭头方向 */}
            <span className={classNames("arrow",dateVisible && "expand")}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{moneyGroup.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{moneyGroup.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{moneyGroup.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={()=>setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={()=>setDateVisible(false)}
            max={new Date()}
          />
        </div>
        {/* 单日列表统计 */}
        {
            dayGroup.keys.map(key=>{
                return <DailyBill  key={key} date={key} billList={dayGroup.groupData[key]}></DailyBill>
            })
        }
      </div>
    </div >
  )
}

export default Month