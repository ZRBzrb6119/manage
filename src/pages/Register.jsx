import React from 'react'
import './less/index.css'
import {RegisterApi} from '../request/api'
import { Link, useNavigate } from 'react-router-dom'
import {message } from 'antd';

export default function Register() {

  const state={username:'',password:'',emil:''}
  const navigate = useNavigate()

  const change=(event)=>{
    if(event.target.name==='username'){
      state.username=event.target.value
    }else if(event.target.name==='password'){
      state.password=event.target.value
    }else state.emil=event.target.value
  }

  const submit=()=>{
    RegisterApi({
      username: state.username,
      password: state.password
    }).then(res=>{
      if(res.errCode===0){
        message.success(res.message)
        navigate('/login')
      }else{
        message.error(res.message)
      }
    })
  }

  return (
    <div>
      <section>
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
          <div className="container">
            <div className="form">
              <h2>注册</h2>
              <form>
                <div className="inputBox">
                  <input type="text" name="username" placeholder="账号" onChange={change}/>
                </div>
                <div className="inputBox">
                  <input type="password" name="password" placeholder="密码" onChange={change}/>
                </div>
                <div className="inputBox">
                  <input type="text" name="emil" placeholder="邮箱" onChange={change}/>
                </div>
                <div className="inputBox">
                  <input type="button" value="注册" onClick={submit}/>
                </div>
                <p className="forget"><Link to="/login">已有账号？前往登录</Link></p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
