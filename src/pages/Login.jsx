import React from 'react'
import "./less/index.css"
import {LoginApi} from '../request/api'
import {Link, useNavigate} from 'react-router-dom'
import {message } from 'antd';

export default function Login() {

  const state={username:'',password:''}
  const navigate = useNavigate()
  const submit=()=>{
    LoginApi({
      username: state.username,
      password: state.password
    }).then(res=>{
      if(res.errCode===0){
        message.success(res.message)
        localStorage.setItem('avatar', res.data.avatar)
        localStorage.setItem('cms-token', res.data['cms-token'])
        localStorage.setItem('editable', res.data.editable)
        localStorage.setItem('player', res.data.player)
        localStorage.setItem('username', res.data.username)
        navigate('/')
      }else{
        message.error(res.message)
      }
    })
  }
  const change=(event)=>{
    if(event.target.name==='username'){
      state.username=event.target.value
    }else{
      state.password=event.target.value
    }
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
              <h2>登录</h2>
              <form>
                <div className="inputBox">
                  <input type="text" name="username" placeholder="账号" onChange={change}/>
                </div>
                <div className="inputBox">
                  <input type="password" name="password" placeholder="密码" onChange={change}/>
                </div>
                <div className="inputBox">
                  <input type="button" value="登录" onClick={submit}/>
                </div>
                <p className="forget">忘记密码?<a href="/">点击这里</a></p>
                <p className="forget"><Link to="/register">还没账号？立即注册</Link></p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
