
import '../styles/menu.css'

import Logo from '../assets/images/finances-logo.png'

export function MenuAside(){
    return (
        <aside id="menu">

            <div className="logo">
                <img src={Logo} alt="Finanças Logo"/>
                <span>senfinanças</span>
            </div>

            <nav>
                <ul>
                    <li><a href="#"><i class="fas fa-tachometer-alt"></i>Dashboard</a></li>
                    <li><a href="#"><i class="fas fa-retweet"></i>Transações</a></li>
                    <li><a href="#"><i class="fas fa-list-ul"></i>Categorias</a></li>
                    <li><a><i class="fas fa-door-open"></i>Logout</a></li>
                </ul>
            </nav>
        </aside>
    )
}