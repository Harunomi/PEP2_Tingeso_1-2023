import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import GrasaSolidoService from '../services/GrasaSolidoService'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class SubirArchivoGComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            file: null,
        };

        this.onFileChange = this.onFileChange.bind(this);
    }

    onFileChange(event){
        this.setState({file: event.target.files[0]});
    }

    onFileUpload = () => {
        if (this.state.file){
            const formData = new FormData();
            formData.append("file",this.state.file);

            GrasaSolidoService.subirGrasaSolido(formData)
            .then((res) => {
                this.props.history.push("/");
                toast.success("Archivo Subido.");
            });
        }else{
            toast.error("Seleccione un archivo antes de cargarlo.");
        }
    }

    render(){
        return (
            <div className= "f">
                <div className="container">
                <h1><b>Cargar el archivo de datos</b></h1>
                    <Row className="mt-4">
                        <Col col="12">
                            <Form.Group className="mb-3" controlId="formFileLg">
                                <Form.Control type="file" size="lg" onChange={this.onFileChange} />
                            </Form.Group>
                            <Button variant="primary" onClick={this.onFileUpload}>
                                Cargar el archivo a la Base de Datos
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
    
}
export default withRouter(SubirArchivoGComponent);