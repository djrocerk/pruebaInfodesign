import { Routes, Route } from 'react-router-dom';
import Layout  from "./pages/Layout";
import Tramos  from "./pages/Tramos";
import Cliente  from "./pages/Cliente";
import Tramoscliente  from "./pages/Tramoscliente";

function App() {

  return (
    <div>
     <Routes>
        <Route path="/" element={<Layout />}>
           <Route path="tramos" element={<Tramos />} />
           <Route path="cliente" element={<Cliente />} />
           <Route path="tramoscliente" element={<Tramoscliente />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
