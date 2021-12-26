import styles from './styles.module.css'


export default function Header(props){
    
  return (
    <>
      <header>
        <div className={styles.header_title}>
          <p>{props.headerTitle}</p>
        </div>
        <div className={styles.header_options}>
          <ul>
            <li>
              {props.children}
            </li>
          </ul>
        </div>
      </header>
      
      

    </>
  )
}
