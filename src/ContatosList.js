
import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

class ContatosList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            contatos: [],
            response: {}
        }
    }

    componentDidMount() {
        const apiUrl = 'http://localhost:8000/contatos';

        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        contatos: result
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    deleteContato(contatoId) {
        const apiUrl = 'http://localhost:8000/contatos/' + contatoId;

        const options = {
            method: 'DELETE'
        };

        fetch(apiUrl, options)
            .then(
                () => {
                    this.setState({
                        error: null,
                        contatos: [],
                        response: {}
                    });
                    window.location.href = '/';
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    render() {
        const { error, contatos} = this.state;

        if(error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {
            return(
                <div style={{textAlign:"left"}}>
                    <h2>Contatos</h2>
                    {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
                    <Table>
                        <thead>
                        <tr>
                            <th>#ID</th>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contatos.map(contato => (
                            <tr key={contato.id}>
                                <td>#{contato.id}</td>
                                <td>{contato.Nome}</td>
                                <td>{contato.Telefone}</td>
                                <td>{contato.Email}</td>
                                <td>
                                    <Button variant="info" onClick={() => this.props.editContato(contato.id)}>Editar</Button>
                                    &nbsp;<Button variant="danger" onClick={() => this.deleteContato(contato.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            )
        }
    }
}

export default ContatosList;
