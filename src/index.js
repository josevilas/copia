import React from 'react'
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Sobre from './routes/Sobre';
import Contato from './routes/Contato';
import Home from './routes/Home';
import Editar from './routes/Editar';
import App from './App';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },

            {
                path: '/:id',
                element: <Editar />
            },
            {
                path: '/: sobre',
                element: <Sobre />

            },
            {
                path: '/contato',
                element: <Contato />
            }
        ]
    }


])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

    <RouterProvider router={router} />

);