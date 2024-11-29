// Array para armazenar os títulos dos livros
let livros = [];

// Mapa para armazenar os autores dos livros (chave: título, valor: autor)
let autores = new Map();

// Conjunto para armazenar os gêneros dos livros
let generos = new Set();

// Função para adicionar um livro
function adicionarLivro(titulo, autor, genero) {
  // Adiciona o título à lista de livros
  livros.push(titulo);
  
  // Associa o autor ao título no mapa
  autores.set(titulo, autor);
  
  // Adiciona o gênero ao conjunto
  generos.add(genero);
}

// Função para remover um livro
function removerLivro(titulo) {
  // Remove o livro da lista de livros
  const index = livros.indexOf(titulo);
  if (index !== -1) {
    livros.splice(index, 1);
  }

  // Remove o autor do mapa
  autores.delete(titulo);

  // Verifica se o gênero do livro removido ainda está associado a outros livros
  // Se não estiver mais, o gênero será removido do conjunto
  let generoRemovido = false;
  generos.forEach(genero => {
    // Se o livro removido for do gênero, tentamos encontrar outro livro do mesmo gênero
    if (!livros.some(titulo => autores.get(titulo) === genero)) {
      generos.delete(genero);
      generoRemovido = true;
    }
  });
}

// Função para listar todos os livros
function listarLivros() {
  if (livros.length === 0) {
    console.log("Não há livros cadastrados.");
    return;
  }
  livros.forEach(titulo => {
    console.log(`Título: ${titulo}, Autor: ${autores.get(titulo)}`);
  });
}

// Função para verificar a disponibilidade de um livro
function verificarDisponibilidade(titulo) {
  return livros.includes(titulo);
}

// Função para buscar livros por gênero
function buscarLivrosPorGenero(genero) {
  // Retorna todos os livros que pertencem ao gênero especificado
  const livrosGenero = [];
  livros.forEach(titulo => {
    if (generos.has(genero)) {
      livrosGenero.push(titulo);
    }
  });
  return livrosGenero;
}

// Teste do programa
adicionarLivro("O Senhor dos Anéis", "J.R.R. Tolkien", "Fantasia");
adicionarLivro("O Hobbit", "J.R.R. Tolkien", "Fantasia");
adicionarLivro("1984", "George Orwell", "Distopia");
adicionarLivro("A Revolução dos Bichos", "George Orwell", "Distopia");

console.log("Livros cadastrados:");
listarLivros();

console.log("\nBuscar livros do gênero 'Fantasia':");
console.log(buscarLivrosPorGenero("Fantasia"));

console.log("\nVerificar disponibilidade de '1984':");
console.log(verificarDisponibilidade("1984"));

removerLivro("O Senhor dos Anéis");

console.log("\nLivros após remoção:");
listarLivros();