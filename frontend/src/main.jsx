
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter ,RouterProvider} from 'react-router'
import Layout from './components/Layout.jsx';
import Dashboard from './components/Dashboard.jsx';
import About from './components/About.jsx';
import { Provider } from 'react-redux';
import store from './app/store.js';

const router = createBrowserRouter([
 {
  path: "/",
  Component: Layout,
  children:[
    {
      path: "dashboard",
      Component: Dashboard
    },
    {
      path: "about",
      Component: About
    }
    
  ]
 }
]);
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} /> 
  </Provider>

)
