import { useState, useContext} from 'react'
import { FinancasContext } from './Dashboard'

import { Modal } from "../components/Modal"

export function EditModal(){
    const [title, setTitle] = useState('')
    const [value, setValue] = useState(0)
    const [category, setCategory] = useState()
    const { allFinances, setAllFinances, handleModalEdit, modalEdit , dateNow} = useContext(FinancasContext)

    function editFinance(){
        let financesCopy = Array.from(allFinances)
        let currentId = modalEdit.id
        let currentFinance = financesCopy.filter((el) => {
            return el.id === currentId
        })

        return currentFinance

    }
    
    if(title === '' && value === 0){
        console.log(editFinance())
        setTitle(editFinance()[0].title)
        setValue(editFinance()[0].value)
        let categoryCurrent = (editFinance()[0].category).toLowerCase()
        setCategory(categoryCurrent)
    }

    function handleChange(event){
        setCategory(event.target.value)
    }

    return (
        <Modal>
            <form>
                <h3>Edit</h3>
                <input type="text" placeholder="Titulo"
                    value={title} onChange={(event) => setTitle(event.target.value)}
                />

                <div className="row-form">
                    <select name="categoria" value={category} onChange={handleChange}>
                        <option value="alimentacao">Alimentação</option>
                        <option value="alimentacao">Transporte</option>
                        <option value="alimentacao">Saúde</option>
                        <option value="alimentacao">Lazer</option>
                        <option value="alimentacao">Outros</option>
                    </select>
                    <input type="number" placeholder="Valor"
                        value={value} onChange={(event) => setValue(event.target.value)}
                    />
                </div>

                <div className="form-buttons">
                    <button>Confirmar</button>
                    <button onClick={handleModalEdit}>Cancelar</button>
                </div>

            </form>
        </Modal>
    )
}