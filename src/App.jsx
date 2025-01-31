// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadImage from './components/UploadImage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadImage />} />
      </Routes>
    </Router>
  );
}

export default App;
