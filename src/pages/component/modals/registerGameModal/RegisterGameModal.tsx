import { useState, createRef } from "react";
import $ from 'jquery';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { Button, Col, FloatingLabel, Form, Modal, Row, Image } from "react-bootstrap";
import cookieCutter from 'cookie-cutter';

import { gamesHubAPI } from "../../../../api/gamesHubAPI";
import InfoModal from "../infoModal/InfoModal";
import { urlsAPI } from "../../../../../app.config";
import styles from "./styles.module.css";


export default function RegisterGameModal(props){

  const [gameData, setGameData] = useState({ 
    titulo: '',
    estilo: '',
    ano_publicacao: new Date().getFullYear(),
    desenvolvedora: '',
    capa: '',
  });

  const [showInfoModal, setShowInfoModal] = useState({
    show: false,
    message: ""
  });

  const [selectedYear, setSelectedYear] = useState(new Date());
  

  const handleSubmitForm = async (e) =>{
    e.preventDefault()
    console.log(gameData);

    try {
      Object.keys(gameData).map((index, key) => {
        if(gameData[index].length == 0){
          setShowInfoModal({show: true, message: `Hey! você esqueceu de preencher o campo ${index.toUpperCase()}!`})
          throw "exit";
        }      
      })
    } catch (error) {
      console.log(error);
      
      return
    }
    
    try {
      
      const response = await gamesHubAPI.post(urlsAPI.user_account.register_game, gameData, {
        headers: {
          'Authorization': `Bearer ${cookieCutter.get('accesstoken')}`
        }
      })
      console.log(response);
      
      if(response.status == 200){
        setShowInfoModal({show: true, message: "Parabens! Seu jogo acaba de ser registrado com sucesso :)"})
      }else{
        setShowInfoModal({show: true, message: "Opss :(, parece que ocorreu algum erro."})
      }
    } catch (error) {
      setShowInfoModal({show: true, message: "Opss :(, parece que ocorreu algum erro."})
    }
  
  }

  const handlePreviewImage = (e) =>{
    
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", 'jyfm2d6t')
    
    try {
      axios.post("https://api.cloudinary.com/v1_1/dkdedto9s/image/upload/", formData).then((response)=>{
        $('#preview_image').attr('src', response.data.secure_url)
        $('#preview_image').show()
        setGameData(prevState=>({...prevState, capa: response.data.secure_url}))
      })

    } catch (error) {
      setShowInfoModal({show: true, message: "Opss :(, parece que ocorreu algum erro"})
    }
  }
    

  return (  
    <>
      <Modal {...props} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar jogo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.container}>
            <Form>
              <div className={styles.container_image_preview}>
                <label htmlFor="abcdai" >
                  <p>
                    <span className="material-icons">
                      image 
                    </span>
                    <small>Selecionar capa</small>
                  </p>
                </label>
                
                <Form.Control type="file" size="lg" accept="image/*" id="abcdai" onChange={(e)=>handlePreviewImage(e)} />
                <Image id="preview_image" className={styles.preview_image} fluid={true}></Image>
              </div>
    
              <Row>
                <Col>
                  <FloatingLabel controlId="floatingInput" label="Titulo" className="mb-3">
                    <Form.Control type="text" placeholder="Titulo" maxLength={45} onBlur={(e)=>setGameData(prevState=>({...prevState, titulo: e.target.value}))}/>
                  </FloatingLabel>
                </Col>
                <Col>
                  <Form.Select aria-label="Default select example" size="lg" onChange={(e)=>setGameData(prevState=>({...prevState, estilo: e.target.value}))}>
                    <option>Estilo</option>
                    <option value="acao">Ação</option>
                    <option value="aventura">Aventura</option>
                    <option value="estrategia">Estratégia</option>
                    <option value="rpg">RPG</option>
                    <option value="esporte">Esporte</option>
                    <option value="corrida">Corrida</option>
                    <option value="jogo_online">Jogo on-line</option>
                    <option value="simulacao">Simulação</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                
                <Col>
                  <FloatingLabel controlId="floatingInput" label="Desenvolvedora/Publicadora" className="mb-3">
                    <Form.Control type="text" placeholder="desenvolvedora" onBlur={(e)=>setGameData(prevState=>({...prevState, desenvolvedora: e.target.value}))} />
                  </FloatingLabel>
                </Col>
                <Col className={styles.container_datepicker}>
                  <DatePicker
                    className="form-control"
                    selected={selectedYear}
                    onChange={(date) => (setSelectedYear(date), setGameData(prevState=>({...prevState, ano_publicacao: new Date(date).getFullYear()})))}
                    showYearPicker
                    dateFormat="yyyy"
                    placeholderText="Ano de publicação"
                  />
                </Col>
              </Row>
              <button type="submit" className={styles.registerGameBtn} onClick={(e)=>{handleSubmitForm(e)}}>Registrar</button>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="close-modal" onClick={props.onHide}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      <InfoModal
        show={showInfoModal.show}
        onHide={()=>{setShowInfoModal(prevState=>({...prevState, show: false}))}}
        message={showInfoModal.message}/>
    </>
  )
}