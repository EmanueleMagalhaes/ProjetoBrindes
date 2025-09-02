import { Routes, Route } from "react-router-dom";

import EnvioForm from "./pages/Envios/EnvioForm/EnvioForm";
import EnvioList from "./pages/Envios/EnviosList/EnviosList";
import CadastroProdutos from "./pages/Produtos/CadastroProdutos";

function App() {
  return (
    <Routes>
      <Route path="/" Component={EnvioForm} />
      <Route path="/envios" Component={EnvioList} />
      <Route path="/produtos/cadastro" Component={CadastroProdutos} />
    </Routes>
  );
}

export default App;
