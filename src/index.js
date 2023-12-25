import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App"
import { RouterProvider } from 'react-router-dom';
import router from './router';
// 导入定制主题
import '@/theme.css'
// redux
import { Provider } from 'react-redux';
import store from './store';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store = {store}>
     <RouterProvider router={router}> </RouterProvider>
   </Provider>
)
