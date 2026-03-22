import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { Mapa } from '@/pages/Mapa';
import { Comercios } from '@/pages/Comercios';
import { ComercioDetalhe } from '@/pages/ComercioDetalhe';
import { Eventos } from '@/pages/Eventos';
import { Estacionamentos } from '@/pages/Estacionamentos';
import { Login } from '@/pages/Login';
import { Cadastro } from '@/pages/Cadastro';
import { Dashboard } from '@/pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="mapa" element={<Mapa />} />
        <Route path="comercios" element={<Comercios />} />
        <Route path="comercios/:id" element={<ComercioDetalhe />} />
        <Route path="eventos" element={<Eventos />} />
        <Route path="estacionamentos" element={<Estacionamentos />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;