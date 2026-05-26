import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Global/Layout';
import { Home } from '@/pages/Home';
import { Mapa } from '@/pages/Mapa';
import { Comercios } from '@/pages/Comercios';
import { ComercioDetalhe } from '@/pages/ComercioDetalhe';
import { Eventos } from '@/pages/Eventos';
import { Estacionamentos } from '@/pages/Estacionamentos';
import { Culinaria } from '@/pages/Culinaria';
import { PontosTuristicos } from '@/pages/PontosTuristicos';
import { Sugestoes } from '@/pages/Sugestoes';
import { PrefeituraDashboard } from '@/pages/PrefeituraDashboard';
import { Login } from '@/pages/Login';
import { Cadastro } from '@/pages/Cadastro';
import { Dashboard } from '@/pages/Dashboard';
import Chats from '@/pages/Chats';
import Teste from '@/pages/teste';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="mapa" element={<Mapa />} />
        <Route path="comercios" element={<Comercios />} />
        <Route path="comercios/:id" element={<ComercioDetalhe />} />
        <Route path="eventos" element={<Eventos />} />
        <Route path="pontos-turisticos" element={<PontosTuristicos />} />
        <Route path="estacionamentos" element={<Estacionamentos />} />
        <Route path="culinaria" element={<Culinaria />} />
        <Route path="sugestoes" element={<Sugestoes />} />
        <Route path="prefeitura" element={<PrefeituraDashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="chats" element={<Chats />} />
        <Route path="teste" element={<Teste />} />
      </Route>
    </Routes>
  );
}


export default App;