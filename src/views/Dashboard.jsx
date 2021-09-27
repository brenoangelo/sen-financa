import { useState, createContext, useEffect} from "react"


import { SpentModal } from "./SpentModal"
import { RevenueModal } from "./RevenueModal"
import { EditModal } from "./EditModal"

import { Card } from "../components/Card"
import { Transactions } from "../components/Transactions"
import { Display } from "../components/Display"

import senLogo from '../assets/images/finance-white.png'

import '../styles/dashboard.css'

function dateNow(){
    let date = new Date(),
        day  = date.getDate().toString().padStart(2, '0'),
        month  = (date.getMonth()+1).toString().padStart(2, '0'),
        year  = date.getFullYear();

    return `${day}/${month}/${year}`
}

export const FinancasContext = createContext({})

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
        <FinancasContext.Provider value={{modalEdit, allFinances, setAllFinances, handleModalSpent, handleModalEdit, handleModalRevenue, dateNow,
            deleteFinance}}> 
            <div id="dashboard-page">
    
                    {
                        modalSpent ? <SpentModal /> : ""
                    }

                    {
                        modalRevenue ? <RevenueModal /> : ""
                    }

                    {
                        modalEdit.open ? <EditModal /> : ""
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
                        </div>    
                    </main>
                
            </div>
        </FinancasContext.Provider>
    )
}