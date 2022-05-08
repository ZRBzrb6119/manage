import React, { useState, useEffect } from 'react'
import { Table, Space, Button, message } from 'antd';
import { ArticleListApi,ArticleDelApi } from '../request/api'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import './less/table.less'

function MyTitle(props){
  return (
    <div>
      <a className='table_title' href={"/edit/" + props.id}>{props.title}</a>
      <p style={{ color: '#999' }}>{props.subTitle}</p>
    </div>
  )
}

export default function Listtable() {

  const [arr, setArr] = useState([])
  const navigate = useNavigate()
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })

  const getArticleList = (current, pageSize) => {
    ArticleListApi({
      num: current,
      count: pageSize
    }).then(res => {
      if (res.errCode === 0) {
        let { num, count, total } = res.data
        setPagination({ current: num, pageSize: count, total })
        let newArr = JSON.parse(JSON.stringify(res.data.arr))
        let myarr = []
        newArr.forEach((item) => {
          let obj = {
            key: item.id,
            date: moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
            mytitle: <MyTitle id={item.id} title={item.title} subTitle={item.subTitle} />
          }
          myarr.push(obj)
        })
        setArr(myarr)
      }
    })
  }

  const pageChange = (pagination) => getArticleList(pagination.current, pagination.pageSize)

  const delFn=(id)=>{
    ArticleDelApi({id}).then((res)=>{
      if(res.errCode===0){
        message.success(res.message)
        getArticleList(pagination.current, pagination.pageSize)
      } else {
        message.success(res.message)
      }
    })
  }

  useEffect(() => {
    getArticleList(pagination.current, pagination.pageSize);
  }, [])// eslint-disable-line react-hooks/exhaustive-deps


  const columns = [
    {
      dataIndex: 'mytitle',
      key: 'mytitle',
      width: '60%',
      render: text => <div>{text}</div>
    },
    {
      dataIndex: 'date',
      key: 'date',
      render: text => <p>{text}</p>,
    },
    {
      key: 'action',
      render: text => (
        <Space size="middle">
          <Button type='primary' onClick={()=>navigate('/edit/'+text.key)}>编辑</Button>
          <Button type='danger' onClick={()=>delFn(text.key)}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className='list_table'>
      <Table columns={columns}
      dataSource={arr}
      pagination={pagination}
      showHeader={false}
      onChange={pageChange} />
    </div>
  )
}
