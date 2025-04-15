import { Routes, Route } from 'react-router-dom';
import './App.css'
import Account from './pages/Account';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/account" />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}
export default App;