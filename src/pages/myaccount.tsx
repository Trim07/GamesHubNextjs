import $ from 'jquery';
import { useState } from "react";
import { Card } from "react-bootstrap";

import Header from "./component/fragments/header/Header";
import RegisterGameModal from "./component/modals/registerGameModal/RegisterGameModal";
import GameDescriptionModal from "./component/modals/gameDescriptionModal/GameDescriptionModal";

import styles from "../../styles/Myaccount.module.css";

import { gamesHubAPI } from "../api/gamesHubAPI";


export default function UserHub(props){

  const [userGamesData, setUserGamesData] = useState(props?.data);
  const [showGameDescriptionModal, setShowGameDescriptionModal] = useState({
    show: false,
    id: null
  });
  
  const [showRegisterGameModal, setShowRegisterGameModal] = useState(false);
  

  const handleSearchGame = async (e)=>{
    
    e.preventDefault();
    const input_value = $(e.target).parent().parent().find('input').val()
    const userGamesFiltered = await gamesHubAPI.get('/my-account/my-games', {
      params: {
        filter: input_value
      }
    })
  }

  const handleShowDescriptionGame = (e) => {
    console.log($(e.target).data('value'));
    
    setShowGameDescriptionModal({
      show: true,
      id: $(e.target).data('value')
    })
  }



  return (
    <>

      <Header headerTitle="Minha biblioteca">
        <div className="form-group">
          <div className="input-group mb-3">
            <input type="text" className={`form-control ${styles.search_game_input}`} placeholder="Pesquisar jogos"/>
            <div className="input-group-append">
              <button 
                className={`btn btn-outline-secondary 
                ${styles.search_game_button}`} 
                onClick={(e)=>handleSearchGame(e)}>
                  <i className="material-icons">search</i>
              </button>
            </div>
          </div>
        </div>
        <a className={styles.registerGameBtn} onClick={()=>{setShowRegisterGameModal(true)}}>
          Registrar jogo
        </a>
      </Header>

        

      <div className="container">
        {props.status == 500 &&( 
          <>
            <h4 style={{textAlign: 'center'}}>Ocorreu um erro ao carregar os dados, contate o suporte</h4>
          </>
        )}
        <div className={styles.games_container}>

          {userGamesData.length == 0 && (
            <>
              <p>Nenhum jogo encontrado, que tal adicionar algum °-°?</p>
            </>
          )}
        
          {props.status == 200 && userGamesData.map(data =>{
            return (
              <div key={data.id} id={data.id} className={styles.game_container}>
                <Card style={{ width: '21rem'}}>
                  {data.capa.length > 0 && (
                    <>
                      <Card.Img 
                        src={data.capa}
                        width={"21rem"}
                        height={200}
                        className={styles.cardGameImg}
                        onClick={(e)=>{handleShowDescriptionGame(e)}}
                        data-value={data.id}/>
                    </>
                  )}
                  {data.capa.length == 0 && (
                    <>
                      <Card.Img
                        width={"21rem"}
                        height={200}
                        onClick={(e)=>{handleShowDescriptionGame(e)}}/>
                    </>
                    
                  )}
                  </Card>
              </div>
            )
          })}
        </div>

        <RegisterGameModal
          show={showRegisterGameModal}
          onHide={()=>setShowRegisterGameModal(false)}/>
        <GameDescriptionModal 
          show={showGameDescriptionModal.show}
          onHide={()=>setShowGameDescriptionModal(prevState=>({...prevState, show: false}))}
          id={showGameDescriptionModal.id}/>

      </div>
    </>
  )

}

export async function getServerSideProps() {


  try {
    
    const userGamesData =  await gamesHubAPI.get('/my-account/my-games')
    console.log(userGamesData);
    
    
    if (userGamesData.status == 200){
      console.log('s');
      
      return {
        props: {status: userGamesData.status, data: userGamesData.data}
      }
    }else{
      return {
        props: {status: 500}
      }
    }
      
  } catch (error) {
    
    
    return {
      props: {status: 500}
    }
  }


}