import './styles/Topbar.css'

import { logout } from "../Firebase";
import { useNavigate } from 'react-router-dom';

function Topbar() {
  const navigate=useNavigate();

  const logoutUser =async ()=>{
    await logout();
    navigate('/');

  }
  
    return (
      <>
        <div className='topbar-container'>
        <h1 className='Logo'>
            TECH ASIA
          </h1> 
        <button onClick={logoutUser} className='logout-button'>hello</button>
        </div>
      </>
    )
  }
  
  export default Topbar