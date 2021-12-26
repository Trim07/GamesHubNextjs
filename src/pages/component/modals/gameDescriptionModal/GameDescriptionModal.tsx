import { useState } from "react";
import { Button, Modal, Image, Badge } from "react-bootstrap";
import { gamesHubAPI } from "../../../../api/gamesHubAPI";
import styles from "./style.module.css";
import $ from 'jquery';
import RatingStars from "../../fragments/ratingStars/RatingStarsFragment";


export default function GameDescriptionModal(props){

  const [gameData, setGameData] = useState({
    id: '',
    capa: '',
    titulo: '',
    descricao: '',
    ano_publicacao: '',
    estilo: '',
    desenvolvedora: '',
    avaliacao: ''
  })

  const getGameData = async ()=>{
    try {
      const response = await gamesHubAPI.get('/my-account/my-games', {
        params: {
          type: 'id',
          filter: props.id
        }
      });
      if(response.status == 200){
        setGameData(response.data)
      }
    } catch (error) {
      //colocar infoModal
    }
  }

  const handleRateGame = async(e) => {
    console.log(e.target.value);
    e.preventDefault();

    const response = await gamesHubAPI.put('/rate-game', {
      id: props.id,
      rating: e.target.value
    })
    console.log(response);
    
  }

  return (
    <Modal {...props} className={styles.modal} size="lg" onShow={()=>getGameData()}>
      <Modal.Body className={styles.modal_body}>
        <div className={styles.container_image_preview}>
          <Image src={gameData[0]?.capa} id="preview_image" className={styles.preview_image} fluid={true}></Image>
        </div>
        <div className={styles.container_game_data}>
          <h2 className={styles.title_game}>{gameData[0]?.titulo}</h2>
          <p className={styles.badge}>
            <Badge bg="warning">{gameData[0]?.estilo.toUpperCase()}</Badge>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.modal_footer}>
        <div>
          <RatingStars handleRateGame={handleRateGame}/>
          <p>Publicado em {gameData[0]?.ano_publicacao}</p> 
        </div>
      </Modal.Footer>
    </Modal>
  )
}