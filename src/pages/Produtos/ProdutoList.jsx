import {
  Button,
  Card,
  CardContent,
  Input,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import SearchOffOutlined from "@mui/icons-material/SearchOffOutlined";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./ProdutoList.module.css";

function ProdutoList() {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const navigate = useNavigate();
  const [termo, setTermo] = useState("");

  // Busca os produtos na API
  function buscarProdutos() {
    axios
      .get("http://localhost:3001/produtos")
      .then((response) => {
        setProdutos(response.data);
        setProdutosFiltrados(response.data);
      })
      .catch(() => alert("Houve um erro"));
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  // Deleta um produto
  function deletarProduto(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja deletar este produto?"
    );
    if (confirmar) {
      axios
        .delete(`http://localhost:3001/produtos/${id}`)
        .then(() => {
          alert("Produto deletado com sucesso");
          buscarProdutos();
        })
        .catch(() => alert("Houve um erro ao deletar o produto"));
    }
  }

  //Redireciona para a página de edição
  function editarProduto(id) {
    navigate(`/produtos/editar/${id}`);
  }

  // Debounce para o campo de busca
  function useDebounce(callback, delay) {
    const timeoutRef = useRef();

        function debounced(...args) {
          clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }
    return debounced;
}

// Função que filtra os produtos
function filtrarProdutos(termo) {
  const filtrados = produtos.filter((produto) =>
    produto.id.toString().includes(termo) ||
    produto.nome.toUpperCase().includes(termo.toUpperCase()) ||
    produto.preco.toFixed(2) === termo
  );
  setProdutosFiltrados(filtrados);
};

const debouncedFiltrarProdutos = useDebounce(filtrarProdutos, 300);

function lidarComPesquisa(event) {
  setTermo(event.target.value);
  debouncedFiltrarProdutos(event.target.value);
}

return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Listagem de produtos
        </Typography>
        {/* Campo de pesquisa */}
        <form className={styles.containerSearch}>
          <Input
            id="search"
            placeholder="Pesquisar produto..."
            startAdornment={
              <InputAdornment position="start">
                <SearchOffOutlined />
              </InputAdornment>
            }
            value={termo}
            onChange={lidarComPesquisa}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "10px" }}
            onClick={() => navigate("/produtos/novo")}
          >
            Novo Produto
          </Button>
        </form>

        {/* Tabela */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtosFiltrados.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell>{produto.id}</TableCell>
                  <TableCell>{produto.nome}</TableCell>
                  <TableCell>R$ {produto.preco.toFixed(2)}</TableCell>
                  <TableCell>
                    <DeleteIcon
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => deletarProduto(produto.id)}
                    />

                    <EditIcon
                      style={{ color: "blue", cursor: "pointer", marginLeft: "10px" }}
                      onClick={() => editarProduto(produto.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default ProdutoList;