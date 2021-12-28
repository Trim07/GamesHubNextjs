import Router from "next/router";
import Link from "next/link";
import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import $ from  "jquery";
import cookieCutter from 'cookie-cutter';

import Header from "../component/fragments/header/Header";
import InfoModal from "../component/modals/infoModal/InfoModal";

import styles from "../../../styles/RegisterAccount.module.css";

import { authBackendAPI } from "../../api/gamesHubAPI";


export default function LoginAccount(props?){

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  })

  const [showInfoModal, setShowInfoModal] = useState({
    show: false,
    message: "",
  });


  const handleSubmitLoginrGameForm = async (e) => {
    e.preventDefault();

    try {
      const response = await authBackendAPI.post('/login', loginFormData)
      if(response.status == 200){
        cookieCutter.set('accesstoken', response.data['access_token'], {
          path: '/'
        });
        setShowInfoModal({
          show: true,
          message: "Registro autenticado com sucesso, em alguns instantes iremos redirecionar você"
        });

        Router.push('/');
        setTimeout(() => {Router.push('/')}, 3000);
        
      }
      
    } catch (error) {
      console.log('as');
      
      setShowInfoModal({
        show: true,
        message: "Opss, ocorreu algum erro ao tentarmos autorizar seu cadastro, tente novamente mais tarde :("
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
          <Link href="/auth/register">
            <a className="btn">Registrar-se</a>
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
              <FloatingLabel label="Email" className="mb-3">
                <Form.Control 
                  type="email" 
                  placeholder="Email" 
                  maxLength={100} 
                  onBlur={(e)=>setLoginFormData(prevState=>({...prevState, email: e.target.value}))}
                />
              </FloatingLabel>
              <FloatingLabel label="Senha" className="mb-3">
                <Form.Control 
                  type="password" 
                  placeholder="Senha" 
                  maxLength={100}
                  onBlur={(e)=>setLoginFormData(prevState=>({...prevState, password: e.target.value}))}
                />
              </FloatingLabel>
              <button 
                className={styles.submit_button} 
                onClick={(e)=>handleSubmitLoginrGameForm(e)}>
                  Login
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