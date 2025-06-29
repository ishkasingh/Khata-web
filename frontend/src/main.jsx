import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ProductContext } from './components/Context/productContext.jsx';
import { CustomerProvider } from './components/Context/CustomerProvider.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <CustomerProvider>
     <ProductContext>
    <App />
    </ProductContext>
    </CustomerProvider>
    </BrowserRouter>


  
)
