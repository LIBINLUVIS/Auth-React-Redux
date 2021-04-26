import React,{useState,Fragment} from 'react'
import axios from 'axios'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL
} from './types'

const url="http://127.0.0.1:8000/auth/jwt/create/";
const api="http://127.0.0.1:8000/auth/users/me/";
const api1="http://127.0.0.1:8000/auth/jwt/verify/";
const api2="http://127.0.0.1:8000/auth/users/";
const api3="http://127.0.0.1:8000/auth/users/activation/"





export const load_user = () => async dispatch => {   
    if (localStorage.getItem('access')) {
        const config = {                       //doubt
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json' 
            }
        }; 

        try {
            const res = await axios.get(api, config); //passing back the current user auth details
            console.log(res.data)
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const checkAuthenticated=() => async dispatch => {  //checking the state of the user returning a boolean value
                                                           //is auth or not 
       
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'
            }
        };
        const body=JSON.stringify({token:localStorage.getItem('access')});
        
        try{
           const res= await axios.post(api1,body,config);
           if(res.data.code!=="token_not_valid"){
              
            dispatch({
                type:AUTHENTICATED_SUCCESS
            });
              
           }
           
        }catch(err){
            dispatch({
                type:AUTHENTICATED_FAIL
            })
        }
    }
        else{
            dispatch({
                type:AUTHENTICATED_FAIL
            });
        }

};

export const login = (email, password) => async dispatch => {
  

  
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });
    

    try {
        const res = await axios.post(url, body, config);

        dispatch({
            type: LOGIN_SUCCESS,  //connecting with the reducer auth !!!
            payload: res.data
        });

      dispatch(load_user()); 
    } catch (err) {
        console.log(err.error)
        dispatch({
            type: LOGIN_FAIL
        })
    }
};

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, email, password, re_password });

    try {
        const res = await axios.post(api2, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(api3, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};

