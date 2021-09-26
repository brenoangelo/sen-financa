import { useState, useContext, useEffect} from 'react'
import { FinancasContext } from './Dashboard'

import { Modal } from "../components/Modal"

export function EditModal(){
    const [title, setTitle] = useState('')
    const [value, setValue] = useState(0)
    const [category, setCategory] = useState()
    const [type, setType] = useState('')
    const { allFinances, setAllFinances, handleModalEdit, modalEdit , dateNow} = useContext(FinancasContext)

    useEffect(()=> {  
        setTitle(getThisFinance()[0].title)
        setValue(getThisFinance()[0].value)
        setType(getThisFinance()[0].type)
        let categoryCurrent = (getThisFinance()[0].category).toLowerCase()
        setCategory(categoryCurrent)
    },[])

    function getThisFinance(){
        let financesCopy = Array.from(allFinances)
        let currentId = modalEdit.id
        let currentFinance = financesCopy.filter((el) => {
            return el.id === currentId
        })
        return currentFinance
    }

    function editThisFinance(event){
        event.preventDefault()

        const thisFinanceId = getThisFinance()[0].id
        
        const findFinanceIndex = allFinances.findIndex((finance, index, array) => {
            return finance.id === thisFinanceId
        })
        let thisFinanceElement = allFinances.find((finance) => {
            return finance.id === thisFinanceId
        })

        const allFinancesEdit = Array.from(allFinances)

        thisFinanceElement = {
            ...thisFinanceElement, 
            title: title,
            value: Number(value),
            category: category
        }

        allFinancesEdit.splice(findFinanceIndex, 1, thisFinanceElement) 
        setAllFinances(allFinancesEdit)

        handleModalEdit()
    }

    function handleChange(event){
        setCategory(event.target.value)
    }

    

    return (
        <Modal>
            <form>
                <h3>Edit: {title}</h3>
                <input type="text" placeholder="Titulo"
                    value={title} onChange={(event) => setTitle(event.target.value)}
                />

                <div className="row-form">
                    <select name="categoria" value={category} onChange={handleChange}>
                        { type === 'entrada' ? (
                            <>
                                <option value="trabalho">Trabalho</option>
                                <option value="freelancer">Freelancer</option>
                                <option value="outros">Outros</option>
                            </>
                            
                        ) : (
                            <>
                                <option value="alimentacao">Alimentação</option>
                                <option value="transporte" >Transporte</option>
                                <option value="saude">Saúde</option>
                                <option value="lazer">Lazer</option>
                                <option value="outros">Outros</option>
                            </>
                        )}
                    </select>
                    <input type="number" placeholder="Valor"
                        value={value} onChange={(event) => setValue(event.target.value)}
                    />
                </div>

                <div className="form-buttons">
                    <button onClick={editThisFinance}>Confirmar</button>
                    <button onClick={handleModalEdit}>Cancelar</button>
                </div>

            </form>
        </Modal>
    )
}