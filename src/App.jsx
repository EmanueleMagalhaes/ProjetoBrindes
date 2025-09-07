import { Routes, Route } from "react-router-dom";

import EnvioForm from "./pages/Envios/EnvioForm/EnvioForm";
import EnvioList from "./pages/Envios/EnviosList/EnviosList";
import CadastroProdutos from "./pages/Produtos/CadastroProdutos";
import ListaProdutos from "./pages/Produtos/ProdutoList";
import EditarProduto from "./pages/Produtos/EditarProduto";
import ProdutoForm from "./pages/Produtos/ProdutoForm";

function App() {
  return (
    <Routes>
      <Route path="/" Component={EnvioList} />
      <Route path="/envios/novo" Component={EnvioForm} />
      <Route path="/envios/editar/:id" Component={EnvioForm} />
      <Route path="/produtos/cadastro" Component={CadastroProdutos} />
      <Route path="/produtos/lista" Component={ListaProdutos} />
      <Route path="/produtos/editar/:id" Component={ProdutoForm} />
    </Routes>
  );
}

export default App;
