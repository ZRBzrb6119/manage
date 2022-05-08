import React, { useEffect, useState } from 'react'
import { PageHeader, Button, Modal, Form, Input, message } from 'antd';
import { useParams,useLocation,useNavigate  } from 'react-router-dom'
import moment from 'moment'
import E from 'wangeditor'
import { ArticleAddApi, ArticleSearchApi, ArticleUpdateApi } from '../request/api'

let editor = null

export default function Edit() {

  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState('')

  useEffect(() => {
    editor = new E('#div1')
    editor.config.onchange = (newHtml) => {
      setContent(newHtml)
    }
    editor.create()
    if(params.id){
      ArticleSearchApi({ id: params.id }).then((res)=>{
        if(res.errCode===0){
          editor.txt.html(res.data.content)
          setTitle(res.data.title)
          setSubTitle(res.data.subTitle)
        }
      })
    }
    return () => {
      // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
      editor.destroy()
    }
  }, [location.pathname])// eslint-disable-line react-hooks/exhaustive-deps

  const dealData=(errcode,msg)=>{
    setIsModalVisible(false)
    if(errcode===0){
      message.success(msg)
      navigate('/list')
    }else{
      message.error(msg)
    }
  } 

  const handleOk=()=>{
    form.validateFields().then((values) => {
        let { title, subTitle } = values
        if (params.id) {
          ArticleUpdateApi({ title, subTitle, content, id: params.id }).then(res => dealData(res.errCode, res.message))
        } else {
          ArticleAddApi({ title, subTitle, content }).then(res => dealData(res.errCode, res.message))
        }
      })
      .catch(() => false)
  }

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title="文章编辑"
        subTitle={"当前日期：" + moment(new Date()).format("YYYY-MM-DD")}
        extra={<Button key="1" type="primary" onClick={() => setIsModalVisible(true)}>提交文章</Button>}
      ></PageHeader>
      <div id="div1" style={{ padding: '0 20px 20px', background: '#fff' }}></div>
      <Modal zIndex={999} 
      title="填写文章标题"
      visible={isModalVisible} 
      okText="提交" 
      cancelText="取消"
      onCancel={() => setIsModalVisible(false)} 
      onOk={handleOk}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          autoComplete="off"
          initialValues={{ title, subTitle }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请填写标题' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="副标题"
            name="subTitle"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
