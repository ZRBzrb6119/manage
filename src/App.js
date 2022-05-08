import './App.less';
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import Header from './components/Header';
import Aside from './components/Aside';
import Bread from './components/Bread';

function App() {
  return (
    <div id="App">
      <Layout>
        <Header/>
        <div className='container'>
          <Aside />
          <div className='container_box'>
            <Bread />
            <div className="container_content">
              <Outlet />
            </div>
          </div>
        </div>
        <footer>Respect | Copyright &copy; 2022 钟小帅</footer>
      </Layout>
    </div>
  )
}

export default App
