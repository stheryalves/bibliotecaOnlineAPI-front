import { useState } from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'

const LivrosCadastro = () => {

  const [livro, setLivro] = useState({
    id: '',
    titulo: '',
    num_paginas: '',
    isbn: '',
    editora: ''
  });

  async function createLivro() {
    try {
      const body = {
        id: Number(livro.id),
        titulo: livro.titulo,
        paginas: Number(livro.num_paginas),
        codigoISBN: livro.isbn,
        editora: livro.editora
      };
      if (livro.id !== '' && livro.titulo !== '' && livro.num_paginas !== '' && livro.isbn !== '' && livro.editora !== '') {
        await LivrosService.createLivro(body);
        alert('Livro cadastrado com sucesso!');
        // Limpar o formulário após o cadastro
        setLivro({
          id: '',
          titulo: '',
          num_paginas: '',
          isbn: '',
          editora: ''
        });
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    } catch (error) {

      alert('O livro já está cadastrado');
    }
  }

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario">
            <div className='form-group'>
              <label>Id</label>
              <input type="text" id='id' required onChange={(event) => { setLivro({ ...livro, id: event.target.value }) }} value={livro.id}></input>
            </div>
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" id='titulo' required onChange={(event) => { setLivro({ ...livro, titulo: event.target.value }) }} value={livro.titulo}></input>
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text" id='num' required onChange={(event) => { setLivro({ ...livro, num_paginas: event.target.value }) }} value={livro.num_paginas}></input>
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" id='isbn' required onChange={(event) => { setLivro({ ...livro, isbn: event.target.value }) }} value={livro.isbn}></input>
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" id='editora' required onChange={(event) => { setLivro({ ...livro, editora: event.target.value }) }} value={livro.editora}></input>
            </div>
            <div className='form-group'>
              <button onClick={(e) => {
                e.preventDefault();
                createLivro();
              }}>Cadastrar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LivrosCadastro;
