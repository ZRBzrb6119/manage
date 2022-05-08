import React,{ useEffect, useState } from 'react'
import { Form, Input, Button, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {GetUserDataApi, ChangeUserDataApi} from '../request/api'
import {connect} from 'react-redux'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file){
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if(!isJpgOrPng){
    console.log('---')
    message.error('请上传JPG/PNG图片!')
  }
  const isLt2M = file.size / 1024 / 1024 / 1024  < 200
  if(!isLt2M){
    console.log('---')
    message.error('请上传小于200KB的图!')
  }
  return isJpgOrPng && isLt2M
}

function Means(props) {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(()=>{
    GetUserDataApi().then((res)=>{
      if(res.errCode===0){
        message.success(res.message)
        sessionStorage.setItem('username', res.data.username)
      }
    })
  },[])

  const onFinish=(values)=>{
    if(values.username && values.username!==sessionStorage.getItem('username') && values.password.trim() !== ""){
      ChangeUserDataApi({username: values.username,password: values.password}).then((res)=>{
        if(res.errCode===0){
          message.success(res.message)
        }else{
          message.error(res.message)
        }
      })
    }
  }

  const handleChange=info=>{
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if(info.file.status === 'done'){
      getBase64(info.file.originFileObj,(imgUrl)=>{
        setLoading(false)
        setImageUrl(imgUrl)
        localStorage.setItem('avatar', info.file.response.data.filePath)
        props.addkey()
      })
    }
  }
  
  return (
    <div style={{
      background: '#fff',
      height: '100%',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <Form
        name="basic"
        style={{ width: '400px' }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="修改用户名：" name="username">
          <Input placeholder='请输入新用户名' />
        </Form.Item>

        <Form.Item label="修 改 密 码：" name="password">
          <Input.Password placeholder='请输入新密码' />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ float: 'right' }}>提交</Button>
        </Form.Item>
      </Form>
      <p>点击下方修改头像：</p>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{ "cms-token": localStorage.getItem('cms-token') }}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  )
}

const mapDispatchToProps=(dispatch)=>{
  return {
    addkey(){
      dispatch({type:'addkeyFn'})
    }
  }
}

export default connect(null,mapDispatchToProps)(Means)