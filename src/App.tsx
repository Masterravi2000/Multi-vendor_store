import { Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog';

function App() {
  return (
    <div className="bg-white shadow-xl min-h-screen relative">
      <Routes>
        <Route path="/" element={<Catalog />} />
        {/* We will add the /cart route later */}
      </Routes>
    </div>
  );
}

export default App;