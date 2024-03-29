import styles from './styles.module.css';

export default function RatingStars(props){
  return (
    <>
      <div className={styles.rate}>
        <input type="radio" id="star5" name="rate" value="5" onClick={(e)=>props.handleRateGame(e)} />
        <label htmlFor="star5" title="text">5 stars</label>
        <input type="radio" id="star4" name="rate" value="4" onClick={(e)=>props.handleRateGame(e)}/>
        <label htmlFor="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3" onClick={(e)=>props.handleRateGame(e)}/>
        <label htmlFor="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2" onClick={(e)=>props.handleRateGame(e)}/>
        <label htmlFor="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1" onClick={(e)=>props.handleRateGame(e)}/>
        <label htmlFor="star1" title="text">1 star</label>
      </div>
    </>
  )
}