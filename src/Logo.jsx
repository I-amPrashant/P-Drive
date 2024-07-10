import React from 'react'
import logo from "./assets/—Pngtree—google drive app vector_12256699.png"
import { signOut } from 'firebase/auth';
import {auth} from "./Firebase"

export default function Logo(props) {
  const handleLogOut=async()=>{
    await signOut(auth);
  }
  const logOutButtonStyle={
    display:'inline',
    width:'max-content'

  }
  return (
    <div className='Logo' style={{display:'flex',justifyContent:'space-between',alignItems:'center', fontSize:'24px', padding:'10px 20px'}}>
      <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
            <img src={logo} alt="Logo" style={{height:'50px'}}/>
            <span>P-Drive</span>
      </div>
            {props.isAuth && <button onClick={handleLogOut} style={logOutButtonStyle}>Log out</button>}
    </div>
  )
}
