import { useState, useContext} from 'react'
import { FinancasContext } from './Dashboard'

import { Modal } from "../components/Modal"

export function RevenueModal(){
    const [title, setTitle] = useState()
    const [value, setValue] = useState()
    const [category, setCategory] = useState('trabalho')
    const { allFinances, setAllFinances, handleModalRevenue, dateNow} = useContext(FinancasContext)

    function handleNewRevenue(event){
        event.preventDefault()

        if(title === undefined || value === undefined){
            return;
        }
        if(title.trim() === '' || value === '' || value <= 0){
            return;
        }
        const revenue = {
            id: new Date().getTime(),
            title: title, 
            value: Number(value), 
            category: category, 
            type: "entrada",
            date: dateNow()
        }
        
        setAllFinances([...allFinances, revenue])
    
        handleModalRevenue() 
    }

    function handleChange(event){
        setCategory(event.target.value)
    }

    return (
        <Modal>
            <form>
                <h3>Adicionar Entrada</h3>
                <input type="text" placeholder="Titulo"
                    maxLength="20"
                    onChange={event => setTitle(event.target.value)}
                    value={title}
                />
                
                <div className="row-form">
                    <select value={category} onChange={handleChange}>
                        <option value="trabalho">Trabalho</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="outros">Outros</option>
                    </select>
                    <input type="number" placeholder="Valor"
                        onChange={event => setValue(event.target.value)}
                        value={value}
                    />
                </div>

                <div className="form-buttons">
                    <button onClick={event => handleNewRevenue(event)}>Confirmar</button>
                    <button onClick={handleModalRevenue}>Cancelar</button>
                </div>

            </form>
        </Modal>
    )
}