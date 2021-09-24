import { useContext } from "react"
import { FinancasContext } from "../pages/Dashboard"

export function Display(){
    const { handleModalSpent, financasArray } = useContext(FinancasContext)

    return (
        <div className="display">
            <span>R$ 1000</span>
{/*             <h2>{financasArray}</h2> */}
            <div className="footer-display">
                <span>R$ 1000 
                    <button onClick={handleModalSpent}>
                        <i class="fas fa-minus-circle"></i>
                    </button>
                </span>

                <span>R$ 2000 
                    <button>
                        <i class="fas fa-plus-circle"></i>
                    </button>
                </span>
            </div>
        </div>
    )
}