import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get("repositories");
      setRepositories(response.data);
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Desafio React.js ${Date.now()}`,
      url: "http://github.com/saulomedeirosguerreiro/teste",
      techs: ["Node.js", "Angular"],
    };

    const response = await api.post("repositories", repository);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const results = repositories.filter((repo) => repo.id !== id);

    setRepositories(results);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
