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
} from "@mui/material";

function ProdutoList() {
  const [produtos, setProdutos] = useState([]);
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

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Produtos cadastrados
      </Typography>

      <Grid container spacing={3}>
        {produtos.map((produto) => (
          <Grid item xs={12} sm={6} md={4} key={produto.id}>
            <Card sx={{ maxWidth: 345 }}>
              {/* Imagem */}
              <CardMedia
                component="img"
                height="160"
                image={produto.imagem}
                alt={produto.nome}
              />

              {/* Conteúdo */}
              <CardContent>
                <Typography variant="h6" component="div">
                  {produto.nome} - R$ {Number(produto.preco).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {produto.descricao}
                </Typography>
              </CardContent>

              {/* Botões */}
              <CardActions>
                <Button size="small" variant="outlined" color="error" onClick={() => deletarProduto(produto.id)}>
                  Deletar
                </Button>
                <Button size="small" variant="contained" color="primary" onClick={() => navigate(`/produtos/editar/${produto.id}`)}>
                  Editar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProdutoList;