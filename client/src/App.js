import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom";

//screens
import InvestorScreen from './screens/InvestorScreen';
import HomeScreen from './screens/HomeScreen';
import InvestorForm from './screens/InvestorForm';
import UpdateInvestor from './screens/UpdateInvestor';
import LoginScreen from './screens/LoginScreen';
import ResetPassScreen from "./screens/ResetPassScreen";
import AnalyticScreen from './screens/AnalyticScreen';


function App() {
  return (

      <Routes>
        <Route path='/' element={<LoginScreen/>}/>
        <Route path='/dashboard' element={<HomeScreen/>}/>
        <Route path='/resetpass' element={<ResetPassScreen/>}/>
        <Route path='/analytics' element={<AnalyticScreen/>}/>
        <Route path='/investments' element={<InvestorScreen/>}/>
        <Route path='/investments/form' element={<InvestorForm/>}/>
        <Route path='/investments/update/:id' element={<UpdateInvestor/>}/>
      </Routes>
  );
}

export default App;
