import { Routes, Route } from "react-router-dom";

import EnvioForm from "./pages/Envios/EnvioForm/EnvioForm";
import EnvioList from "./pages/Envios/EnviosList/EnviosList";
import CadastroProdutos from "./pages/Produtos/CadastroProdutos";
import ListaProdutos from "./pages/Produtos/ProdutoList";


function App() {
  return (
    <Routes>
  <Route path="/" element={<EnvioList />} />
  <Route path="/envios/novo" element={<EnvioForm />} />
  <Route path="/envios/editar/:id" element={<EnvioForm />} />
  <Route path="/produtos/cadastro" element={<CadastroProdutos />} />
  <Route path="/produtos/lista" element={<ListaProdutos />} />
  <Route path="/produtos/editar/:id" element={<CadastroProdutos />} />
</Routes>
  );
}

export default App;
