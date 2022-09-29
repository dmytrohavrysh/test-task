import {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from './components/Header';
import Home from './pages/Home';
import './App.css';
import LiveData from "./pages/LiveData";
import { useAppDispatch } from './app/hooks';
import { getCurrenciesAsync } from './features/currency/currencySlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrenciesAsync())
  }, [])
  

  return (
    <Router basename='/'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/live-data" element={<LiveData />}/>
      </Routes>
      
    </Router>
  );
}

export default App;