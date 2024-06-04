import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import router from './util/routes.jsx';

import '../style/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
