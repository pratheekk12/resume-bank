import React from 'react'
import Login from './Login'
import Header from './Header'
import Dashboard from './Dashboard/view'
import {useSelector} from 'react-redux'


const Home = (props)=>{
    const login = useSelector(state => state.log)

  

    return (<div>
        {
            login ? (
                <div>
               <Dashboard />
               </div>
            ):(<div>
                <Header/>
                <Login />
                </div>
            )
        }
       
    </div>)
}

export default Home