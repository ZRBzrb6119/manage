import React, { useState, useEffect } from 'react'
import { List, Skeleton, Button, message } from 'antd';
import { ArticleListApi,ArticleDelApi } from '../request/api'
import {useNavigate} from 'react-router-dom'
import moment from 'moment'

export default function Listlist() {

  const [list, setList] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()

  const getList = (num) => {
    ArticleListApi({
      num,
      count:pageSize
    }).then(res => {
      if (res.errCode === 0) {
        let { arr, num, count,total} = res.data;
        setList(list.concat(arr))
        setCurrent(num+=1);
        setPageSize(count);
        setTotal(total)
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    getList(current)
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const onLoadMore=()=>{
    if(list.length===total){
      return ;
    }
    setLoading(true)
    getList(current)
  }

  const delitem=(id)=>{
    ArticleDelApi({id}).then((res)=>{
      if(res.errCode===0){
        message.success(res.message)
        setTotal(total=>total--)
        setList([])
        getList(1)
      }else{
        message.error(res.message)
      }
    })
  }

  const loadMore =
    !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <div className='list_table' style={{ padding: '20px' }}>
      <List
        className="demo-loadmore-list"
        loadMore={loadMore}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type='primary' onClick={()=>navigate('/edit/'+item.id)}>编辑</Button>,
              <Button type='danger' onClick={()=>delitem(item.id)}>删除</Button>
            ]}
          >
            <Skeleton loading={false}>
              <List.Item.Meta
                title={<a href={"/edit/"+item.id}>{item.title}</a>}
                description={item.subTitle}
              />
              <div>{moment(item.date).format("YYYY-MM-DD hh:mm:ss")}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}
