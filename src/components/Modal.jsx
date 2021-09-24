
import '../styles/modal.css'

export function Modal(props){
    return (
        <div className="modal">
            <main>
                {props.children}
            </main>
        </div>
    )
}