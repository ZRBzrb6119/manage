import React, { useEffect, useState } from 'react'
import { Menu, Dropdown, message } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import defaultAvatar from '../assets/defaultAvatar.png'
import logoImg from '../assets/logo.png'
import { connect } from 'react-redux';


function Header(props) {

  const navigate = useNavigate()
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [username, setUsername] = useState('游客')
  const [msg, setMsg] = useState(1)

  const logout=()=>{
    message.success('退出成功，即将返回登录页')
    localStorage.clear()
    navigate('/login ')
  }
  const changeMsg=()=>{
    setMsg(msg=>msg+=1)
  }

  const menu = (
    <Menu>
      <Menu.Item key={1}>修改资料</Menu.Item>
      <Menu.Divider />
      <Menu.Item key={2} onClick={logout}>退出登录</Menu.Item>
    </Menu>
  );

  useEffect(() => {
    let username1 = localStorage.getItem('username')
    let avatar1 = localStorage.getItem('avatar')
    if (username1) {
      setUsername(username1)
    }
    if (avatar1) {
      setAvatar('http://47.93.114.103:6688/' + avatar1)
    }
  }, [props.mykey])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <header>
      <img src={logoImg} alt="" className="logo" />
      <div onClick={changeMsg}>{msg}</div>
      <div className="right">
        <Dropdown overlay={menu}>
          <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <img src={avatar} className="avatar" alt="" />
            <span>{username}</span>
            <CaretDownOutlined />
          </div>
        </Dropdown>
      </div>
    </header>
  )
}

const mapDispatchToProps=(state)=>{
  return {
    mykey: state.mykey
  }
}

export default connect(mapDispatchToProps)(Header)