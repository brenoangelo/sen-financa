
import { Modal } from "../components/Modal"

export function EditModal(){

    return (
        <Modal>
            <form>
                <input type="text" placeholder="Titulo"/>
                <select name="categoria">
                    <option value="alimentacao">Alimentação</option>
                    <option value="alimentacao">Transporte</option>
                    <option value="alimentacao">Saúde</option>
                    <option value="alimentacao">Lazer</option>
                    <option value="alimentacao">Outros</option>
                </select>
                <input type="number" placeholder="Valor"/>

                <div className="form-buttons">
                    <button>Confirmar</button>
                    <button>Cancelar</button>
                </div>

            </form>
        </Modal>
    )
}