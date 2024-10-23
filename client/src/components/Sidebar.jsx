import { useNavigate } from 'react-router-dom'
import './styles/Sidebar.css'

function Sidebar() {

    const navigate=useNavigate();
  
    return (
      <>
        <div className='sidebar-container'>
          <h1 className='Logo'>
            TECH ASIA
          </h1>

          <h2 onClick={()=>navigate("/")}>home</h2>
          <h2 onClick={()=>navigate("/investments")}>investment</h2>
          <h2 onClick={()=>navigate("/investments/form")}>add investment</h2>
        </div>
      </>
    )
  }
  
  export default Sidebar