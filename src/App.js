
import React, { Component } from 'react';
import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import ContatosList from './ContatosList';
import ContatosSave from './ContatosSave';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewContato: false,
            error: null,
            response: {},
            contato: {},
            isEditContato: false
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onCreate() {
        this.setState({
            isNewContato: true,
            error: null,
            response: {},
            contato: {},
            isEditContato: false
        });
    }

    onFormSubmit(data) {
        let apiUrl;

        if(this.state.isEditContato){
            apiUrl = 'http://localhost:8000/contatos/' + this.state.contato.id + '/edit';
        } else {
            apiUrl = 'http://localhost:8000/contatos/new';
        }

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            myHeaders
        };

        fetch(apiUrl, options)
            .then(res => res.json())
            .then(result => {
                    this.setState({
                        response: result,
                        isNewContato: false,
                        isEditContato: false
                    })
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    editContato = contatoId => {
        const apiUrl = 'http://localhost:8000/contatos/'+contatoId;

        const options = {
            method: 'GET'
        };

        fetch(apiUrl, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        contato: result,
                        isNewContato: true,
                        isEditContato: true
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    };

    render() {

        let contatoForm;
        if(this.state.isNewContato || this.state.isEditContato) {
            contatoForm = <ContatosSave onFormSubmit={this.onFormSubmit} contato={this.state.contato} />
        }

        return (
            <div className="App">
                <Container>
                    <h1 style={{textAlign:'center'}}>Teste para Red Belt</h1>
                    {!this.state.isNewContato && <Button variant="primary" onClick={() => this.onCreate()}>Novo Contato</Button>}
                    {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
                    {!this.state.isNewContato && <ContatosList editContato={this.editContato}/>}
                    { contatoForm }
                    {this.state.error && <div>Error: {this.state.error.message}</div>}
                </Container>
            </div>
        );
    }
}

export default App;

