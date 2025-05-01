import { Routes, Route } from 'react-router-dom';
import './App.css'
import Account from './pages/Account';
import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Browse from './pages/Browse';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/books/:bookId" element={<BookDetails />} />
        <Route path="/account" element={<Account />} />
        <Route path="/" element={<Home />} />
        {/* Add a fallback route for undefined paths */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}
export default App;