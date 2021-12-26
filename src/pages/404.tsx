import styles from '../../styles/404.module.css';


export default function PageNotFound(){

  return (
    <>

    <div className={styles.not_found_main}>
        <div className={styles.notfound}>
            <div className={styles.notfound_404}>
                <h1>4<span style={{width: "120px"}}></span>4</h1>
            </div>
            <h2>Oops!</h2>
            <p>A página não foi encontrada, tente outra ou contate o suporte.</p>
            <a id="back-page" onClick={()=>{window.history.back()}}>Voltar para a página</a>
        </div>
    </div>
    
    </>
  )


}