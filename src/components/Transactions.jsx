import { useContext } from "react"
import { FinancasContext } from "../pages/Dashboard"

export function Transactions(){

    const { allFinances, deleteFinance, handleModalEdit } = useContext(FinancasContext)

    return (
        <div className="transactions">
            
            <table>
                <tr>
                    <th><i className="fas fa-cog"></i></th>
                    <th>Titulo</th>
                    <th>Tipo</th>
                    <th>Categoria</th>
                    <th>Data</th>
                    <th>Valor</th>
                </tr>

                {
                    allFinances.map((finance) => {
                        return (
                            <tr key={finance.id}>
                                <td>
                                    <span onClick={() => deleteFinance(finance.id)}>
                                        <i className="far fa-trash-alt"></i>
                                    </span>
                                    <span onClick={() => handleModalEdit(finance.id)}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </span>
                                </td>
                                <td>{finance.title}</td>
                                <td>{finance.type}</td>
                                <td>{finance.category}</td>
                                <td>{finance.date}</td>
                                <td className={finance.type==="saida"?
                                    "saida" : "entrada"}>
                                    {finance.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}