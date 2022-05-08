import React, { useEffect, useState } from 'react'
import { Menu } from 'antd';
import { ReadOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom'

export default function Aside() {

  const navigate = useNavigate()
  const location = useLocation()
  const [defaultKey,setDefaultKey]=useState('')

  useEffect(() => {
    let path = location.pathname;
    let key = path.split('/')[1];
    setDefaultKey(key)
  }, [location.pathname])
  
  const handleClick = (event) => {
    navigate('/' + event.key)
    setDefaultKey(event.key)
  }

  return (
    <Menu
      onClick={handleClick}
      style={{ width: 180 }}
      selectedKeys={[defaultKey]}
      mode="inline"
      className='aside'
      theme="dark"
    >
      <Menu.Item key="list"><ReadOutlined /> 查看文章列表List</Menu.Item>
      <Menu.Item key="table"><ReadOutlined /> 查看文章列表Table</Menu.Item>
      <Menu.Item key="edit"><EditOutlined /> 文章编辑</Menu.Item>
      <Menu.Item key="means"><DatabaseOutlined /> 修改资料</Menu.Item>
    </Menu>
  )
}
