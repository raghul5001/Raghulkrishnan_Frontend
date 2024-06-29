
import './App.css';
import CreateProductForm from './Pages/CreateProductForm';
import RetrieveProductList from './Pages/RetrieveProductList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
         <CreateProductForm/>
         <RetrieveProductList/>
         <ToastContainer />
    </div>
  );
}

export default App;
