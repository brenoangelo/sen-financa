import { useContext, useState, useEffect } from "react"
import { FinancasContext } from '../views/Dashboard'

export function Transactions(){
    const [ type, setType ] = useState('todos')
    const [ category, setCategory ] = useState('todos')
    const { allFinances, deleteFinance, handleModalEdit } = useContext(FinancasContext)

    let allFinancesTransactions = []
    if(allFinances !== null){
        allFinancesTransactions = Array.from(allFinances)
    }
    
    function Desc(a, b){
        if(a.id > b.id){
            return -1
        }
        if(a.id < b.id){
            return 1
        }
    }

    useEffect(()=>{
        type === 'todos' ? setCategory('todos') : setCategory('todos')
    },[type])

    
    function filterType(type){
        let financesFiltered
        financesFiltered = allFinancesTransactions.filter((element) => {
            return element.type === type
        })

        if(financesFiltered.length < 1){
            financesFiltered = allFinancesTransactions
        }

        allFinancesTransactions = financesFiltered
        return financesFiltered
        
    }

    function handleChangeType(event){
        setType(event.target.value)
    }
    

    function filterCategory(category, type){

        if(category === 'todos' && type === 'todos'){
            return allFinancesTransactions
        }

        if(type === 'todos'){
            let financesFiltered
            financesFiltered = allFinancesTransactions.filter((element) => {
                return element.category === category
            })

            allFinancesTransactions = financesFiltered

            return financesFiltered
        }

        let financesDoubleFiltered = allFinancesTransactions.filter((element) => {
            return element.type === type
        }).filter((element) => {
            if(category === 'todos'){
                return true
            }
            return element.category === category
        })
        allFinancesTransactions = financesDoubleFiltered
        return allFinancesTransactions 
    }
    

    function handleChangeCategory(event){
        setCategory(event.target.value)
    }

    filterType(type)
    filterCategory(category, type)
    return (
        <div className="transactions">
    
        {
            allFinances?.length > 0 ? (
        <>
            <div className="filters">
                <div className="type">
                    <i className={`fas ${type === 'entrada' ? 'fa-long-arrow-alt-up' : type==='todos'? 'fa-retweet': 'fa-long-arrow-alt-down'}`}></i>
                    <select name="tipo" value={type} onChange={handleChangeType}>
                        <option value="todos">Todos</option>
                        <option value="entrada">Entradas</option>
                        <option value="saida">Saídas</option>
                    </select>
                </div>

                <div className="category">
                    <i className="fas fa-list"></i>
                    <select name="category" value={category} onChange={handleChangeCategory}>
                        {type === 'saida' || type === 'todos' ? (
                            <>
                                <option value="todos">Todos</option>
                                <option value="alimentacao">Alimentação</option>
                                <option value="transporte">Transporte</option>
                                <option value="saude">Saúde</option>
                                <option value="contas">Contas</option>
                                <option value="lazer">Lazer</option>
                                <option value="outras despesas">Outras despesas</option>
                            </>
                        ): ('')
                        }
                        {type === 'entrada' || type === 'todos' ? (
                            <>
                                <option value="todos">Todos</option>
                                <option value="trabalho">Trabalho</option>
                                <option value="freelancer">Freelancer</option>
                                <option value="outras receitas">Outras Receitas</option>
                            </>
                        ) : ('')}

                    </select>
                </div>
            
            </div>

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
                allFinancesTransactions.sort(Desc).map((finance) => {
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
        </>
        ) : ( 
            <span><i class="fas fa-exclamation-circle"></i> Você ainda não tem finanças</span> 
            )
        }
        </div>
    )
}