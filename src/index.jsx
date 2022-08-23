import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './components/Feed';
import Login from './components/Login';
import { Provider } from 'react-redux';
import { CookiesProvider } from "react-cookie";
import store from './redux/store';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </Provider>
);


