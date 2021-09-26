import { useState, createContext, useEffect } from "react"

import { Card } from "../components/Card"
import { SpentModal } from "./SpentModal"
import { RevenueModal } from "./RevenueModal"
import { EditModal } from "./EditModal"
import { Transactions } from "../components/Transactions"
import { Category } from "../components/Category"
import { Display } from "../components/Display"

import senLogo from '../assets/images/finance-white.png'

import '../styles/dashboard.css'

export const FinancasContext = createContext({})

function dateNow(){
    let date = new Date(),
        day  = date.getDate().toString().padStart(2, '0'),
        month  = (date.getMonth()+1).toString().padStart(2, '0'),
        year  = date.getFullYear();

    return `${day}/${month}/${year}`
}

export function Dashboard(){
    const [modalEdit, setModalEdit] = useState({open: false, id: 0})
    const [modalSpent, setModalSpent] = useState(false)
    const [modalRevenue, setModalRevenue] = useState(false)
    const [allFinances, setAllFinances] = useState([])

    useEffect(()=>{
        setAllFinances(JSON.parse(localStorage.getItem('@sen-finance/finances')))
        
    },[])

    useEffect(()=>{

        if(!allFinances){
            setAllFinances(JSON.parse(localStorage.getItem('@sen-finance/finances')))
            
        }else{
            localStorage.setItem('@sen-finance/finances', JSON.stringify(allFinances))
        }
    },[allFinances])

    function handleModalSpent(){
        setModalSpent(true)

        if(modalSpent){
            setModalSpent(false)
        }
    }

    function handleModalRevenue(){
        setModalRevenue(true)

        if(modalRevenue){
            setModalRevenue(false)
        }
    }

    function handleModalEdit(id){
        setModalEdit({open: true, id: id})
        if(modalEdit.open){
            setModalEdit({...modalEdit,open: false})
        }
    }

    

    function deleteFinance(id){
        let resp = prompt('Quer mesmo excluir essa Financa ? [s/n]')?.toLowerCase() 
        if(resp != 's'){
            return;
        }

        let financesCopy = Array.from(allFinances)
        let financesFilt = financesCopy.filter((el) => {
            return el.id !== id
        })
        localStorage.setItem('@sen-finance/finances', JSON.stringify(allFinances))
        setAllFinances(financesFilt)
    }


    return (
        <div id="dashboard-page">
            <FinancasContext.Provider 
                value={{allFinances, setAllFinances, modalEdit,handleModalSpent, handleModalEdit, handleModalRevenue, dateNow,
                deleteFinance}}>
                
                {
                    modalSpent ? <SpentModal /> : ""
                }

                {
                    modalRevenue ? <RevenueModal /> : ""
                }

                {
                    modalEdit.open == true ? <EditModal /> : ""
                }

                <header>

                    <div className="logo">
                        <img src={senLogo} alt="Sen Finanças" /> 
                        <span>sen<strong>finanças</strong></span>
                    </div>

                    
                </header>

                <main>
                    <Display />

                    <div className="cards">
                        
                        <Card>
                            
                            <h3>Transações</h3>
                            <Transactions />
                        </Card>

{/*                         <Card>
                            <h3>Categorias</h3>
                            <Category />
                        </Card> */}
                    </div>    
                </main>
            </FinancasContext.Provider>
        </div>
    )
}