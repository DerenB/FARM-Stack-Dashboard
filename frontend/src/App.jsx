import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Pages
import { CalendarApp, Home, Todo } from './pages';

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
          <Route path='/calendar' element={<CalendarApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
