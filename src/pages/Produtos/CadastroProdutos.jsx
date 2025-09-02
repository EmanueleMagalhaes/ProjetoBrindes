
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

function CadastroProdutos() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newProduct = {
            nome: name,
            descricao: description,
            preco: parseFloat(price),
            imagem: imageUrl
        };

        try {
            const response = await axios.post('http://localhost:3001/produtos', newProduct);
            console.log("Produto cadastrado:", response.data);
            alert("Produto cadastrado com sucesso!");
        
        // Limpar os campos do formulário
            setName("");
            setDescription("");
            setPrice(0);
            setImageUrl("");

        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
            alert("Erro ao cadastrar produto: " + error.message);
        }
    };

    return (
        <Container maxWidth="sm">
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Cadastro de produto
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Preço do produto"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
          />
        </Box>

        <TextField
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />

        <TextField
          label="URL da imagem"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#7C4DFF" }}
        >
          Cadastrar
        </Button>
      </Box>
    </Container>
    )
}


export default CadastroProdutos;

