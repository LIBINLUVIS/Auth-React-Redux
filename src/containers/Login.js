import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import { login } from '../actions/auth';


function Login({login,isAuthenticated}) {
     const [formdata,setFormdata]=useState({
         email:"",
         password:""
     });

    


     const { email, password } = formdata;

     const onChange = e => setFormdata({ ...formdata, [e.target.name]: e.target.value });

     const onSubmit = e => {
        e.preventDefault();

       login(email, password);
    };

    if(isAuthenticated){
        return <Redirect to='/' />
    }

    return(
            <div className="container mt-5">

            <h1>Sign In</h1>
            <p>Sign into your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Login</button>
            </form>
            </div>
    );


};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
   
});



export default connect(mapStateToProps,{login}) (Login);
