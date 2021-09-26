import { useContext } from "react"
import { FinancasContext } from "../pages/Dashboard"

export function Display(){
    const { handleModalSpent, handleModalRevenue, allFinances} = useContext(FinancasContext)

    let total
    let saidas
    let entradas
    if(allFinances){
        entradas = allFinances.reduce(getEntradas, 0)
        saidas = allFinances.reduce(getSaidas, 0)

        function getTotal(entradas, saidas){
            return saidas + entradas
        }

        total = getTotal(entradas, saidas)

        function getEntradas(total, item){
            if(item.type === "entrada"){
                return total + item.value
            }

            return total
        }

        function getSaidas(total, item){
            if(item.type === "saida"){
                return total - item.value
            }

            return total
        }

    }


    return (
        <div className="display">
            <span>{total?.toLocaleString('pt-BR', {style:'currency', currency: "BRL"})}</span>
            <div className="footer-display">
                <span>{saidas?.toLocaleString('pt-BR', {style:'currency', currency: "BRL"})} 
                    <button onClick={handleModalSpent}>
                        <i className="fas fa-minus-circle"></i>
                    </button>
                </span>

                <span>{entradas?.toLocaleString('pt-BR', {style:'currency', currency: "BRL"})} 
                    <button onClick={handleModalRevenue}>
                        <i className="fas fa-plus-circle"></i>
                    </button>
                </span>
            </div>
        </div>
    )
}