import "./App.css";
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
