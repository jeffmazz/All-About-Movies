import React from "react"
import styles from "./Home.module.css"
const Home = () => {

    return (

        <>

            <div className={styles.container}>

                <section className={styles.infos}>
                    <h3 className={styles.title}> Wall-e </h3>
                    <p className={styles.sinopse}> Após entulhar a Terra de lixo e poluir a atmosfera com gases tóxicos, a humanidade deixou o planeta e passou a viver em uma gigantesca nave. O plano era que o retiro durasse alguns poucos anos, com robôs sendo deixados para limpar o planeta. WALL-E é o último destes robôs, e sua vida consiste em compactar o lixo existente no planeta. Até que um dia surge repentinamente uma nave, que traz um novo e moderno robô: Eva. A princípio curioso, WALL-E se apaixona e resolve segui-la por toda a galáxia. </p>
                </section>

                <section className={styles.carousel}>
                    <div className={styles.carousel_item}>
                        
                    </div>
                    <div className={styles.carousel_item}>

                    </div>
                    <div className={styles.carousel_item}>

                    </div>
                </section>

            </div>
            
        </>
    )
}

export default Home