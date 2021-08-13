import React, { useState,useEffect} from 'react'
import {AppBar,Avatar,Button,Toolbar,Typography} from '@material-ui/core'
import {Link,useHistory,useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import useStyles from './style'
import mario from '../../images/mario.png'

const Navbar = () => {
    const classes=useStyles()
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch=useDispatch()
    const history=useHistory()
    const location=useLocation()
    const logout=()=>{
            dispatch({type:'LOGOUT'})
            history.push('/')
            setUser(null)
    }
    useEffect(()=>{
        const token=user?.token
        //jwt
        if(token){
            const decodedToken=decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    return(
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
                Mario
            </Typography>
            <img className={classes.image} src={mario} alt="mario" height="60"/>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (<Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </div>
    </AppBar>
    )
}

export default Navbar
