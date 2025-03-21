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
import ActualGraphScreen from './screens/ActualGraphScreen';
import PredGraphScreen from './screens/PredGraphScreen';
import ComparisonScreen from './screens/ComparisonScreen';
import TotalRevenueGraph from './screens/graphs/TotalRevenueGraph';

function App() {
  return (

      <Routes>
        <Route path='/' element={<LoginScreen/>}/>
        <Route path='/dashboard' element={<HomeScreen/>}/>
        <Route path='/resetpass' element={<ResetPassScreen/>}/>
        <Route path='/investments' element={<InvestorScreen/>}/>
        <Route path='/investments/form' element={<InvestorForm/>}/>
        <Route path='/actual-graphs' element={<ActualGraphScreen/>}/>
        <Route path='/pred-graphs' element={<PredGraphScreen/>}/>
        <Route path='/analytics/comparison' element={<ComparisonScreen/>}/>
        <Route path='/investments/update/:id' element={<UpdateInvestor/>}/>
        <Route path='/graph' element={<TotalRevenueGraph/>}/>
      </Routes>
  );
}

export default App;
