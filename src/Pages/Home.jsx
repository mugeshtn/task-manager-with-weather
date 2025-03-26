import React from 'react'
import TaskInput from '../components/TaskInput'
import TaskList from '../components/TaskList'

const Home = () => {
    return (
        <>
            <div className='d-block d-md-flex container'>
                <div className='w-100 position-sticky  z-1 align-self-start md-block' style={{top: "60px"}}>
                    <TaskInput />
                </div>
                <TaskList />
            </div>
        </>
    )
}

export default Home