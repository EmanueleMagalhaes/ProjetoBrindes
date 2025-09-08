import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
  Input,
  InputAdornment,
} from "@mui/material";
import SearchOffOutlined from "@mui/icons-material/SearchOffOutlined";

function ProdutoList() {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [termo, setTermo] = useState("");
  const navigate = useNavigate();

  // Buscar produtos da API com useEffect
  useEffect(() => {
    buscarProdutos();
  }, []);

  function buscarProdutos() {
    axios
      .get("http://localhost:3001/produtos") // ajuste a URL da sua API
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }

  //Função para deletar produto
    function deletarProduto(id) {
        const confirmacao = window.confirm("Tem certeza que deseja deletar este produto?");
         if (confirmacao) {
      axios
        .delete(`http://localhost:3001/produtos/${id}`)
        .then(() => {
          alert("Produto deletado com sucesso!");
          buscarProdutos(); // recarrega a lista
        })
        .catch((error) => {
          console.error("Erro ao deletar produto:", error);
          alert("Erro ao deletar produto.");
        });
        }
    }

    //função para filtrar produtos buscar
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

    const filtrarProdutos = (termoBusca) => {
    const t = String(termoBusca || "").trim().toLowerCase();
    if (!t) {
      setProdutosFiltrados(produtos);
      return;
    }

    const filtrados = produtos.filter((produto) => {
      const nome = String(produto.nome || "");
      const descricao = String(produto.descricao || "");
      const preco = String(produto.preco ?? "");

      return (
        nome.toLowerCase().includes(t) ||
        descricao.toLowerCase().includes(t) ||
        preco.toLowerCase().includes(t)
      );
    });

    setProdutosFiltrados(filtrados);
  };

  const debouncedFiltrarProdutos = useDebounce(filtrarProdutos, 600);

  function lidarComPesquisa(event) {
    const value = event.target.value;
    setTermo(value);
    debouncedFiltrarProdutos(value);
  }
  // ----------------------------------------------------------

  // Navegar para edição
  function editarProduto(id) {
    navigate(`/produtos/editar/${id}`);
  }

  // Helper para formatar preço
  function formatarBRL(valor) {
    const n = Number(valor);
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(isNaN(n) ? 0 : n);
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Produtos cadastrados
      </Typography>

       {/* Campo de pesquisa */}
      <form style={{ marginBottom: "20px" }} onSubmit={(e) => e.preventDefault()}>
        <Input
          id="search"
          placeholder="Pesquisar produto por nome, descrição ou preço..."
          startAdornment={
            <InputAdornment position="start">
              <SearchOffOutlined />
            </InputAdornment>
          }
          value={termo}
          onChange={lidarComPesquisa}
          fullWidth
        />
      </form>

      {/* Grid de cards */}
      <Grid container spacing={3}>
        {produtosFiltrados.length === 0 ? (
          <Grid item xs={12}>
            <Typography color="text.secondary">
              {produtos.length === 0 ? "Nenhum produto cadastrado." : "Nenhum produto corresponde à pesquisa."}
            </Typography>
          </Grid>
        ) : (
          produtosFiltrados.map((produto) => {
            const imgSrc = produto.imagem || produto.imagemUrl || "https://via.placeholder.com/400x300?text=Sem+imagem";
            return (
              <Grid item xs={12} sm={6} md={4} key={produto.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia component="img" height="160" image={imgSrc} alt={produto.nome} />
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {produto.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {produto.descricao}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      {formatarBRL(produto.preco)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="outlined" color="error" onClick={() => deletarProduto(produto.id)}>
                      Deletar
                    </Button>
                    <Button size="small" variant="contained" color="primary" onClick={() => editarProduto(produto.id)}>
                      Editar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </Container>
  );
}

export default ProdutoList;