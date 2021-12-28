import $ from 'jquery';
import { useState } from "react";
import { Card } from "react-bootstrap";
import cookieCutter from 'cookie-cutter';
import Link from 'next/link';

import Header from "../component/fragments/header/Header";
import RegisterGameModal from "../component/modals/registerGameModal/RegisterGameModal";
import GameDescriptionModal from "../component/modals/gameDescriptionModal/GameDescriptionModal";
import styles from "./style.module.css";
import { gamesHubAPI } from "../../api/gamesHubAPI";


export default function MinhaBiblioteca(props){

  
  const [gamesData, setGamesData] = useState(props?.data);
  const [searchGameData, setSearchGameData] = useState('');
  const [showGameDescriptionModal, setShowGameDescriptionModal] = useState({
    show: false,
    id: null
  });
  
  const [showRegisterGameModal, setShowRegisterGameModal] = useState(false);

  const handleSearchGame = async (e)=>{
    e.preventDefault();

    const response = await gamesHubAPI.get('/', {
      headers: {
        'Authorization': `Bearer ${cookieCutter.get('accesstoken')}`
      },
      params: {
        filter: searchGameData
      }
    });
    setGamesData(response.data)
  }

  const handleShowDescriptionGame = (e) => {
    setShowGameDescriptionModal({
      show: true,
      id: $(e.target).data('value')
    });
  }

  return (
    <>
      <Header headerTitle="GamesHub">
       <div>
         <Link href="/minha-conta/minha-biblioteca">
            <a className="btn">
              Minha biblioteca
            </a>
         </Link>

       </div>
       <div className={`form-group ${styles.search_game_container}`}>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Pesquisar jogos" onChange={(e)=>setSearchGameData(e.target.value)}/>
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
      </Header>

      <div className="container">
        {props.status == 500 &&( 
          <>
            <h4 style={{textAlign: 'center'}}>Ocorreu um erro ao carregar os dados, contate o suporte</h4>
          </>
        )}
        <div className={styles.games_container}>
          {gamesData == undefined || gamesData.length == 0 && (
            <>
              <h4 style={{textAlign: 'center'}}>Nenhum jogo encontrado, que tal adicionar algum °-°?</h4>
            </>
          )}

          {props.status == 200 && gamesData.map(data =>{
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

export async function getServerSideProps(context) {
  
  try {
    if (context.req.cookies){
      const response = await gamesHubAPI.get('/',{
        headers: {
          'Authorization': `Bearer ${context.req.cookies['accesstoken']}`
        }
      });
      
      if (response.status == 200){
        if(response.data.status){  
          return {
            redirect: {
              permanent: false,
              destination: "/auth/login",
            },
            props:{},
          };
        }
        return {
          props: {status: response.status, data: response.data}
        }
      }else if(response.status == 401){
        return {
          redirect: {
            permanent: false,
            destination: "/auth/login",
          },
          props:{},
        };
      }else{
        return {
          props: {status: 500}
        }
      }
    }  
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
      props:{},
    };
  }
}