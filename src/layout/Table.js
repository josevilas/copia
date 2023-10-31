import { Link } from "react-router-dom";


function Table ({persons, handleDelete}){
    return(
        <table className="table table-striped">
        <thead>
            <tr>
                <th scope='col'>#</th>
                <th scope='col'>Nome</th>
                <th scope='col'>Telefone</th>
                <th scope='col'>Email</th>
                <th scope='col'>Endereço</th>
                <th scope='col'>Data de Nascimento</th>

                <th scope='col'>Ações</th>
            </tr>
        </thead>
        <tbody>
            {persons.map((person, index) => (
                <tr key={person.id} >
                    <td>{index + 1}</td>
                    <td>{person.nome}</td>
                    <td>{person.numero}</td>
                    <td>{person.email}</td>
                    <td>{person.endereco}</td>
                    <td>{person.dataDeNascimento}</td>
                    <td>

                        <Link to={`/${person.id}`} className="btn btn-success">
                            <i className="bi bi-pencil"></i> Editar
                        </Link>
                        <button className="btn btn-danger mx-2 "
                            onClick={() => handleDelete(person.id)} >
                            <i className="bi bi-trash3"></i>Excluir</button>

                    </td>
                </tr>
            ))}
        </tbody>
    </table>

);
}

export default Table;