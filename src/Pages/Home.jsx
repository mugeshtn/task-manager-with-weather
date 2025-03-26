import React, { useState } from 'react'
import TaskInput from '../components/TaskInput'
import TaskList from '../components/TaskList'
import { Button } from '@mui/material'

const Home = () => {
    const [showInput, setShowInput] = useState(false)
    return (
        <>
            <div className='d-block d-md-flex container'>
                <div style={{ marginRight: "15px", textAlign: "right" }} className='d-block d-md-none'>
                    {
                        showInput
                            ? (
                                <Button sx={{ marginTop: "35px", backgroundColor: "red" }} variant='contained'
                                    onClick={() => setShowInput(!showInput)}
                                >
                                    Close
                                </Button>
                            )
                            : (
                                <Button sx={{ marginTop: "35px" }} variant='contained' color='success'
                                    onClick={() => setShowInput(!showInput)}
                                >
                                    Add Tasks
                                </Button>
                            )
                    }
                </div>
                <div className='w-100  z-1 align-self-start md-block d-none d-md-block' >
                    <TaskInput />
                </div>
                {
                    showInput && (
                        <div className='w-100 position-sticky  z-1 align-self-start md-block d-block d-md-none' style={{ top: "60px" }}>
                            <TaskInput />
                        </div>
                    )
                }
                <TaskList />
            </div >
        </>
    )
}

export default Home