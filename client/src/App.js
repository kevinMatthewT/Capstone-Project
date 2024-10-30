import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";

//screens
import InvestorScreen from './screens/InvestorScreen';
import HomeScreen from './screens/HomeScreen';
import InvestorForm from './screens/InvestorForm';
import UpdateInvestor from './screens/UpdateInvestor';
import LoginScreen from './screens/LoginScreen';
import ResetPassScreen from "./screens/ResetPassScreen";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<HomeScreen/>}/>
        <Route path='/' element={<LoginScreen/>}/>
        <Route path='/resetpass' element={<ResetPassScreen/>}/>
        <Route path='/investments' element={<InvestorScreen/>}/>
        <Route path='/investments/form' element={<InvestorForm/>}/>
        <Route path='/investments/update/:id' element={<UpdateInvestor/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
