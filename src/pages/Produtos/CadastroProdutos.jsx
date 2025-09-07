
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

function CadastroProdutos() {
  const { id } = useParams(); // pega o id da rota se for edição
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: "",
    preco: "",
    descricao: "",
    imagem: "",
  });

  // Se for edição, buscar os dados do produto
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/produtos/${id}`)
        .then((response) => {
          setProduto(response.data);
        })
        .catch((error) => {
          console.error("Erro ao carregar produto:", error);
        });
    }
  }, [id]);

  // Atualizar estado conforme usuário digita
  function handleChange(e) {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  }

  // Salvar (POST ou PUT)
  function handleSubmit(e) {
    e.preventDefault();

    if (id) {
      // Edição → PUT
      axios
        .put(`http://localhost:3001/produtos/${id}`, produto)
        .then(() => {
          alert("Produto atualizado com sucesso!");
          navigate("/produtos/lista");
        })
        .catch((error) => {
          console.error("Erro ao atualizar produto:", error);
        });
    } else {
      // Cadastro → POST
      axios
        .post("http://localhost:3001/produtos", produto)
        .then(() => {
          alert("Produto cadastrado com sucesso!");
          navigate("/produtos/lista");
        })
        .catch((error) => {
          console.error("Erro ao cadastrar produto:", error);
        });
    }
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        {id ? "Editar Produto" : "Novo Produto"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Nome"
          name="nome"
          value={produto.nome}
          onChange={handleChange}
          required
        />
        <TextField
          label="Preço"
          name="preco"
          type="number"
          value={produto.preco}
          onChange={handleChange}
          required
        />
        <TextField
          label="Descrição"
          name="descricao"
          multiline
          rows={3}
          value={produto.descricao}
          onChange={handleChange}
          required
        />
        <TextField
          label="URL da Imagem"
          name="imagem"
          value={produto.imagem}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
      </Box>
    </Container>
  );
}

export default CadastroProdutos;

