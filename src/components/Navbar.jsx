import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { showToast } from '../utils/toast';

const Navbar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch()

    function handleLogout() {
        dispatch(logout())
        showToast("Logged out successfully", "success");
    }
    return (
        <>
            <div className='sticky-top z-3'>
                <AppBar position="static" sx={{ backgroundColor: "rgb(0, 0, 68)" }}>
                    <Toolbar sx={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Typography variant="h3" className='app-logo'>
                            Task Manager
                        </Typography>
                        {
                            isAuthenticated && <Button aria-label='login' variant='contained' className='btn'
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        </>
    )
}

export default Navbar