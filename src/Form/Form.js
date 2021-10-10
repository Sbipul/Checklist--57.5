import { Button, Card, CardActions, CardContent, CardMedia,TextField, Typography } from '@mui/material';
import initAuth from '../FIrebase/init';
import { GoogleAuthProvider,signInWithPopup,getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,OAuthProvider,updateProfile  } from "firebase/auth";
import { useState } from 'react';
import { InputGroup } from 'react-bootstrap';

import { Avatar } from '@mui/material';
import React from 'react';
import {Container,Navbar,Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';



initAuth()

const auth = getAuth();
const yahooProvider = new OAuthProvider('yahoo.com');
const googleProvider = new GoogleAuthProvider();




const Form = () => {
    const [error,setError] = useState('')
    const [email,setEmail] = useState('')
    const [isregistered,setIsregistered] = useState(false)
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [user,setUser] = useState({})

    const handleChecked = e => {
        setIsregistered(e.target.checked)
    }


    const emailUse = e => {
        setEmail(e.target.value)

    }
    const nameUse = e => {
        setName(e.target.value)
    }
    const passwordUse = e => {
        setPassword(e.target.value)
    }


    const handleYahoo = () => {
        signInWithPopup(auth, yahooProvider)
            .then(res => { 
                console.log(res.user)
            })
            .catch((err) => {
               setError(err.message)
        });
    }


    const handleGoogle = () => {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
          const {displayName,email,photoURL} = result.user;
          const newUser = {
              name : displayName,
              img : photoURL,
              mail : email
          }
          setUser(newUser)
        }).catch((err) => {
          setError(err.message)
        });
    }



    const signUp = (email,password) => {
        createUserWithEmailAndPassword(auth,email,password)
        .then(res => { 
            updateName()
            setError('successfully signed Up')
        })
        .catch((err) => {
            setError(err.message)
          });
    }

    const updateName = () => {
        updateProfile(auth.currentUser, {
            displayName: name
          }).then(() => {
          }).catch((err) => {
            setError(err.message)
          });
    }

    const logIn = (email,password) => {
        signInWithEmailAndPassword(auth,email,password)
        .then(res => {
            setError('successfully Login')
        })
        .catch(err => {
            setError(err.message)
        }) 
    }

    const handleEnterance = () => {
        isregistered ? logIn(email,password) : signUp(email,password)

    }




    return (
        <>
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand href="#">FireBase Auth</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="ms-auto my-2 my-lg-0 align-items-center"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <NavLink id="UserName" className="mx-3 text-light text-decoration-none" to="/home">Home</NavLink>
                <NavLink id="UserName" className="mx-3 text-light text-decoration-none" to="/user">{user.name ? user.name : 'User Name'}</NavLink>
                <NavLink id="UserEmail" className="mx-3 text-light text-decoration-none" to="/email">{user.name ? user.mail : 'User Mail'}</NavLink>
                <NavLink className="mx-3 text-light text-decoration-none" to="/home">
                <Avatar alt="Remy Sharp" src={user.name && user.img} />
                </NavLink>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>



        <div className="container p-5">
                <div className="row align-items-center">
                <div className="col-12 col-md-6">
                        <img className="w-100" src="https://pro2-bar-s3-cdn-cf2.myportfolio.com/ec4657434c011e1a856a01752ef5f2f5/df4cced1864491068565a9ef_rw_1200.gif?h=f6d0aee62a35c711106f89f861dfb19a" alt="" />
                    </div>
                    <div className="col-12 col-md-6">
                        <Card maxwidth="sm">
                        <CardMedia
                        component="img"
                        height="140"
                        image="https://graphicriver.img.customer.envatousercontent.com/files/295952058/preview.jpg?auto=compress%2Cformat&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=b1871fdb9a68760f95e3622b8540e381"
                        alt="green iguana"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Please {isregistered ? 'Log in' : 'Sign up'} First
                        </Typography>
                        {
                            !isregistered && <TextField onBlur={nameUse} className="mb-3 w-100" id="standard-basic" label="Your Name" variant="standard" />
                        }
                        
                        <TextField onBlur={emailUse} className="mb-3 w-100" id="standard-basic" label="Your Email" variant="standard" />
                        <TextField onBlur={passwordUse} className="mb-3 w-100" id="standard-basic" label="Your password" type="password" variant="standard" />
                        <div className="mb-3 d-flex align-items-center">
                            <InputGroup.Checkbox onClick={handleChecked} aria-label="Checkbox for following text input" />
                            <p className="p-0 mx-3 my-0">Already registered</p>
                        </div>
                        <p className="text-danger">{error}</p>
                        <Button onClick={handleEnterance} type="submit" className="mb-3 bg-success text-light">{isregistered ? 'Log in' : 'Sign up'}</Button>
                        </CardContent>
                        <CardActions className="d-flex justify-content-around">
                            <Button onClick={handleGoogle} className="bg-primary text-light">Google in</Button>
                            <Button onClick={handleYahoo} className="bg-primary text-light">Yahoo in</Button>
                        </CardActions>
                        </Card>
                    </div>
                    
                </div>
            </div>
        
        </>
            
    );
};
export default Form;
