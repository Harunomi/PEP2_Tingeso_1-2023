import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AcopioService from "../services/AcopioService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class SubirArchivoAComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
        this.onFileChange = this.onFileChange.bind(this);
    }

    onFileChange(event) {
        this.setState({ file: event.target.files[0] });
    }

    onFileUpload = () => {
        const formData = new FormData();
        formData.append("file", this.state.file);

        AcopioService.subirArchivo(formData)
            .then((res) => {
                this.props.history.push('/');  // Redirigir al componente HomeComponent
            });
    }

    render() {
        return (
            <div className="f">
                <div className="container">
                    <h1><b>Cargar el archivo de datos</b></h1>
                    <Row className="mt-4">
                        <Col col="12">
                            <Form.Group className="mb-3" controlId="formFileLg">
                                <Form.Control type="file" size="lg" onChange={this.onFileChange} />
                            </Form.Group>
                            <Button variant="primary" href="/" onClick={this.onFileUpload}>
                                Cargar el archivo a la Base de Datos
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default withRouter(SubirArchivoAComponent);


