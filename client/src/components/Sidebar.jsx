import { useNavigate } from 'react-router-dom'
import './styles/Sidebar.css'

function Sidebar() {

    const navigate=useNavigate();
  
    return (
      <>
        <div className='sidebar-container'>
          
          <div className='pages-list'>
            <h2 onClick={()=>navigate("/dashboard")} className='page-item'>Dashboard</h2>
            <h2 onClick={()=>navigate("/investments")} className='page-item'>Investments</h2>
            <h2 onClick={()=>navigate("/investments/form")} className='page-item'>Add New</h2>
          </div>
        </div>
      </>
    )
  }
  
  export default Sidebar