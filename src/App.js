import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=> {
    api.get('repositories').then(response =>{
      setRepositories(response.data);
      console.log(response);
    });
  },[]);


  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title:`Novo Repositoiro ${Date.now()}`,
      url:"github.com/meurepositorio",
      techs: ["Node","Express","TypeScript"],
      likes:0,
    });
    console.log(response);
    const repository = response.data;
    setRepositories([...repositories,repository]);
  }

  async function handleRemoveRepository(id) {
    try{
      await api.delete(`repositories/${id}`);
      setRepositories(repositories.filter(repository => repository.id !== id));
    }catch(err){
      alert('erro ao deletar o repositório, tente novamente');
    }
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => 
          <li key = {repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
