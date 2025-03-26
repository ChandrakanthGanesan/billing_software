import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BillingSoftware from './billing_software';
import Invoice from './invoice';
import Admin from './admin'
import { ItemProvider } from "./ItemContext";
function App() {
  return (
    <ItemProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BillingSoftware />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ItemProvider>   
  );
}

export default App;
