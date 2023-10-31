import { useEffect, useState } from "react";

import personService from "../services/phonebook";

import Table from "../layout/Table";
import Input from "../layout/Input";

function Home() {
  const [persons, setPersons] = useState([]);
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(); // Carrega os dados iniciais
  }, []);

  const fetchData = () => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data);
        setShowForm(false);
      })
      .catch((error) => {
        if (error.response) {
          // O servidor respondeu com um status de erro
          console.error("Erro na requisição:", error.response);
        } else if (error.request) {
          // A requisição foi feita, mas não houve resposta do servidor
          console.error("Não foi possível se conectar ao servidor.");
          setError(
            "Não foi possível se conectar ao servidor. Verifique sua conexão de rede."
          );
        } else {
          // Algo aconteceu na configuração da requisição que causou o erro
          console.error("Erro na configuração da requisição:", error.message);
        }
      });
  };

  const addPerson = async (event) => {
    event.preventDefault();
    const personObject = {
      nome: nome,
      numero: numero,
      email: email,
      endereco: endereco,
      dataDeNascimento: dataDeNascimento
    };

    await personService.create(personObject);

    setNome("");
    setNumero("");
    setEmail("");
    setEndereco("");
    setDataDeNascimento("");

    // Após a criação, atualize a lista de persons chamando fetchData novamente
    fetchData();
  };

  const handleNomeChange = (event) => {
    // console.log(event.target.value);
    setNome(event.target.value);
  };

  const handleNumeroChange = (event) => {
    // console.log(event.target.value);
    setNumero(event.target.value);
  };

  const handleEmailChange = (event) => {
    // console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handleEnderecoChange = (event) => {
    // console.log(event.target.value);
    setEndereco(event.target.value);
  };

  const handleDataDeNascimentoChange = (event) => {
    // console.log(event.target.value);
    setDataDeNascimento(event.target.value);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleDelete = async (id) => {
    await personService.remove(id);
    // Após a exclusão, atualize a lista de persons chamando fetchData novamente
    fetchData();
  };

  return (
    <div className="container">
      <h2 className="mt-2">Listar e Cadastrar Pessoas</h2>
      {error ? (
        <p className="alert alert-warning" role="alert">
          {error}
        </p>
      ) : (
        <>
          <button onClick={toggleForm} className="btn btn-success">
            {showForm ? "Voltar para a Tabela" : "Cadastrar Pessoa"}
          </button>

          {showForm ? (
            <>
              <hr />
              <form onSubmit={addPerson} className="bg-success-subtle p-2">
                <Input
                  textLabel="nome"
                  text="Nome"
                  inputType="text"
                  textPlaceholder="Digite o seu nome..."
                  handleChange={handleNomeChange}
                />

                <Input
                  textLabel="telefone"
                  text="Telefone"
                  inputType="text"
                  textPlaceholder="Digite o seu telefone..."
                  handleChange={handleNumeroChange}
                  isPhone={true}
                />

                <Input
                  textLabel="email"
                  inputType="Email"
                  text="email"
                  textPlaceholder="Digite o seu Email..."
                  handleChange={handleEmailChange}
                  
                />

                <Input
                  textLabel="endereco"
                  text="Endereco"
                  inputType="text"
                  textPlaceholder="Digite o seu Endereço..."
                  handleChange={handleEnderecoChange}
                  
                />

                <Input inputType="date"
                   placeholder="dd-mm-yyyy"
                  value = "dd/mm/yy"
                  textLabel="dataDeNascimento"
                  text="Data de Nascimento"
                  textPlaceholder="Digite o sua Data de nascimento..."
                  handleChange={handleDataDeNascimentoChange}
                 
                />



                <button className="btn btn-success mt-4">Cadastrar</button>
              </form>
            </>
          ) : (
            <div>
              <hr />
              <Table persons={persons} handleDelete={handleDelete} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
