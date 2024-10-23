import Form from "./components/Form";
import VerifyPassowrd from "./components/VerifyPassowrd";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="Container">
          <Routes>
            <Route path="/verify/:shortCode" element={<VerifyPassowrd />} />
            <Route path="/" element={<Form />} />
          </Routes>
        </div>
      </BrowserRouter>

    </>
  );
}

export default App; 
