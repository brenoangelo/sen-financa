import { useState, useContext } from 'react'
import { FinancasContext } from './Dashboard'

import { Modal } from "../components/Modal"

export function SpentModal(props){
    const [title, setTitle] = useState()
    const [value, setValue] = useState()
    const [category, setCategory] = useState('alimentacao')
    const { allFinances, setAllFinances, dateNow, handleModalSpent} = useContext(FinancasContext)


    function handleNewSpent(event){
        event.preventDefault()

        if(title === undefined || value === undefined){
            return;
        }
        if(title.trim() === '' || value === '' || value <= 0){
            return;
        }
        const spent = {
            id: new Date().getTime(),
            title: title, 
            value: Number(value), 
            category: category, 
            type: "saida",
            date: dateNow()
        }

        setAllFinances([...allFinances, spent])
        
    
        handleModalSpent() 

    }

    function handleChange(event){
        setCategory(event.target.value)
    }

    return (
        <Modal>
            
            <form>
                <h3>Adicionar Gasto</h3>
                <input type="text" placeholder="Titulo"
                    maxLength="20"
                    onChange={event => setTitle(event.target.value)}
                    value={title}
                />
                
                <div className="row-form">
                    <select value={category} onChange={handleChange}>
                        <option value="alimentacao">Alimentação</option>
                        <option value="transporte">Transporte</option>
                        <option value="saude">Saúde</option>
                        <option value="contas">Contas</option>
                        <option value="lazer">Lazer</option>
                        <option value="outras despesas">Outras Despesas</option>
                    </select>
                    <span>R$</span>
                    <input type="number" placeholder="Valor"
                        onChange={event => setValue(event.target.value)}
                        value={value}
                    />
                </div>

                <div className="form-buttons">
                    <button onClick={event => handleNewSpent(event)}>Confirmar</button>
                    <button onClick={handleModalSpent}>Cancelar</button>
                </div>

            </form>
        </Modal>
    )
}