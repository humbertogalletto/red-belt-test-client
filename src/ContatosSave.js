import React from 'react';
import {Row, Form, Col, Button} from 'react-bootstrap';

class ContatosSave extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            id: '',
            Nome: '',
            Telefone: '',
            Email: ''
        };

        if (props.contato) {
            this.state = props.contato
        } else {
            this.state = this.initialState;
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onFormSubmit(this.state);
        this.setState(this.initialState);
    }

    routeChange() {
        window.location.href = '/';
    }

    render() {

        let pageTitle;
        if (this.state.id) {
            pageTitle = <h2>Editar Contato</h2>
        } else {
            pageTitle = <h2>Novo Contato</h2>
        }

        return (

            <div style={{textAlign: "left"}}>
                {pageTitle}
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="nomeContato">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Nome"
                                    value={this.state.Nome}
                                    onChange={this.handleChange}
                                    placeholder="Nome do contato"/>
                            </Form.Group>
                            <Form.Group controlId="telefoneContato">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Telefone"
                                    value={this.state.Telefone}
                                    onChange={this.handleChange}
                                    placeholder="Telefone do contato"/>
                            </Form.Group>
                            <Form.Group controlId="emailContato">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Email"
                                    value={this.state.Email}
                                    onChange={this.handleChange}
                                    placeholder="Email do contato"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="hidden" name="id" value={this.state.id}/>
                                <div style={{textAlign: "right"}}>
                                    <Button variant="success" type="submit">Salvar</Button>&nbsp;
                                    <Button onClick={this.routeChange}>Voltar</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ContatosSave;
