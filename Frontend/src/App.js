import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import your components
import Login from './component/Login';
import Register from './component/Register';
import Dashboard from './component/Dashboard';
import Projects from './component/Projects'; // Import the new Projects component
import Contact from './component/Contact'; // Import the new Contact component
import FAQ from './component/FAQ'; // Import the new FAQ component
import ProtectedRoute from './component/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* This route group is protected */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} /> {/* The default protected route */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} /> {/* The new protected projects route */}
            <Route path="/contact" element={<Contact />} /> {/* The new protected contact route */}
            <Route path="/faq" element={<FAQ />} /> {/* The new protected FAQ route */}
          </Route>

          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;