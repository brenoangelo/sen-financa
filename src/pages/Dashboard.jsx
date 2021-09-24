import { useState, useContext, createContext } from "react"
import { useHistory } from "react-router-dom"

import { Card } from "../components/Card"
import { Category } from "../components/Category"
import { SpentModal } from "./SpentModal"
import { Transactions } from "../components/Transactions"
import { Display } from "../components/Display"

import senLogo from '../assets/images/finance-white.png'

import '../styles/dashboard.css'

export const FinancasContext = createContext()

export function Dashboard(){
    const [financas, setFinancas] = useState()
    const [modalSpent, setModalSpent] = useState(false)
    const history = useHistory()

    let financasArray = []

    if(localStorage.getItem('financas') != undefined){
        const financasStorage = localStorage.getItem('financas')
        financasArray = financasStorage
    }


    function handleModalSpent(){
        setModalSpent(true)

        if(modalSpent){
            setModalSpent(false)
        }
    }
    

    return (
        <div id="dashboard-page">
            
            {
                modalSpent ? <SpentModal handleModalSpent={handleModalSpent}/> : ""
            }

            <header>

                <div className="logo">
                    <img src={senLogo} alt="Sen Finanças" /> 
                    <span>sen<strong>finanças</strong></span>
                </div>

                
            </header>

            <main>
                <FinancasContext.Provider value={{handleModalSpent, financasArray}}>
                    <Display />
                    
                    <div className="cards">
                        <Card>
                            <h3>Transações</h3>
                            <Transactions />
                        </Card>

                        <Card>
                            <h3>Categorias</h3>
                            <Category></Category>
                        </Card>
                    </div>
                </FinancasContext.Provider>
            </main>
        </div>
    )
}