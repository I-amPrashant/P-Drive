import React, {useEffect, useState} from 'react'
// import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { auth , provider} from './Firebase';
import { Link } from 'react-router-dom';

export default function SignUp(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  // const navigate=useNavigate();//this can be used to navigate to another route based on certain criteria.
  const centerTheme={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:'600px',
    paddingX:'20px'
  }
  const formTheme={
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    gap:'15px',
    alignItems:'center',
    width:'100%',
    maxWidth:'300px',
    position:'relative',
  }
  useEffect(()=>{
    onAuthStateChanged(auth, (currentUser)=>{
      currentUser?props.setIsAuth(true):props.setIsAuth(false);
      })
  }, [])

  const handleEmailSubmit=async(e)=>{
    e.preventDefault();
      try{
        const user=await createUserWithEmailAndPassword(auth, email, password)
        props.setIsAuth(true);
        setError("")
      }catch(err){
        setError(err.message)
      }
  }
  const handleGoogleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const value=await signInWithPopup(auth, provider)
      setError("")
      props.setIsAuth(true)
    }catch(err){
        setError(err.message)
    }
  }

  return (
    <div style={centerTheme}>
      <form className='login-info-container' style={formTheme}>
      <h1>Sign In</h1>
      <h3 style={{color:'gray', textAlign:'center', fontSize:'16px', fontWeight:'normal'}}>Make sure you have the right info!</h3>
      {error && <p style={{fontSize:'14px', color:'red'}}>{error}</p>}
      <div className='form-item'>
      <label htmlFor="Email">Email</label><br/>
      <input id="Email" type="text" value={email} placeholder='enter your email...' 
      onChange={(e)=>setEmail(e.target.value)}
      />
      </div>
      <div className='form-item'>
      <label htmlFor="Password">Password</label><br/>
      <input id="Password" type="password" value={password} placeholder='enter your password...' 
      onChange={(e)=>setPassword(e.target.value)}
      />
      </div>
      <button onClick={handleEmailSubmit} type='submit' id='Sign_with_email' >Sign In</button>
      <button onClick={handleGoogleSubmit} id="Sign with google">Sign In With Google</button>
      <p style={{marginTop:'40px'}}>Already have an account? <Link to="/login" style={{textDecoration:'none', color:'blue'}}>Login</Link></p>
      </form>
    </div>
  )
}
