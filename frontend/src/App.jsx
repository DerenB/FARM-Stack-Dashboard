import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Pages
import { Home, Todo } from './pages';

// Import Components
import { Sidebar } from './components';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
