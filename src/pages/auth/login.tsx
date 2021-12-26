import Router from "next/router";
import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import $ from  "jquery";

import styles from "../../../styles/RegisterAccount.module.css";
import { authBackendAPI } from "../../api/gamesHubAPI";
import Header from "../component/fragments/header/Header";
import InfoModal from "../component/modals/infoModal/InfoModal";
import Link from "next/link";


export default function LoginAccount(props?){

  const [registerAccountFormData, setRegisterAccountFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const [showInfoModal, setShowInfoModal] = useState({
    show: false,
    message: "",
  });


  const handleSubmitRegisterGameForm = async (e) => {
    e.preventDefault();

    if(registerAccountFormData.password != registerAccountFormData.confirm_password){
      $('#confirm_password_input').css({'border': '1px solid red'});
      setShowInfoModal({show: true, message: "As senhas devem ser iguais, verifique e tente novamente"})
      return
    }

    try {
      const response = await authBackendAPI.post('/register', registerAccountFormData)
      if(response.status == 200){
        setShowInfoModal({
          show: true,
          message: "Seu registro foi criado com sucesso, em alguns instantes iremos redirecionar você"
        })
        setTimeout(() => {Router.push('/')}, 3000);
      }
      
    } catch (error) {
      setShowInfoModal({
        show: true,
        message: "Opss, ocorreu algum erro ao tentarmos realizar seu cadastro, tente novamente mais tarde :("
      })
    }
  }


  return (
    <>
      <Header headerTitle="GamesHub">
        <div className="d-flex">
          <Link href="/">
            <a className="btn">Pagina inicial</a>
          </Link>
          <Link href="/auth/login">
            <a className="btn">Register</a>
          </Link>
        </div>
      </Header>

      <section className={styles.container}>
        <div className={styles.form_container}>
          <div className={styles.form_header}>
            <h2>Login</h2>
          </div>
          <div className={styles.form_body}>
            <Form>
              <FloatingLabel label="Nome" className="mb-3">
                <Form.Control 
                  type="text" 
                  placeholder="Nome" 
                  maxLength={100} 
                  onBlur={(e)=>setRegisterAccountFormData(prevState=>({...prevState, name: e.target.value}))}
                />
              </FloatingLabel>
              <FloatingLabel label="Email" className="mb-3">
                <Form.Control 
                  type="email" 
                  placeholder="Email" 
                  maxLength={100}
                  onBlur={(e)=>setRegisterAccountFormData(prevState=>({...prevState, email: e.target.value}))}
                />
              </FloatingLabel>
              <button 
                className={styles.submit_button} 
                onClick={(e)=>handleSubmitRegisterGameForm(e)}>
                  Registrar
              </button>
            </Form>
          </div>
        </div>
      </section>
      <InfoModal
        show={showInfoModal.show}
        onHide={()=>{setShowInfoModal(prevState=>({...prevState, show: false}))}}
        message={showInfoModal.message}/>
    </>
  )
}