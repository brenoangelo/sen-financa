

export function Category(props){
    return (
        <div className="categorias">

            <table>
                <tr>
                    <th>Categoria</th>
                    <th>%</th>
                    <th>Valor</th>
                </tr>

                <tr>
                    <td><span><i className="fas fa-utensils"></i> Alimentação</span></td>
                    <td>20%</td>
                    <td>300,00</td>
                </tr>

                <tr>
                    <td><span><i className="fas fa-car"></i> Transporte</span></td>
                    <td>20%</td>
                    <td>300,00</td>
                </tr>

                <tr>
                    <td><span><i className="fas fa-briefcase-medical"></i> Saúde</span></td>
                    <td>20%</td>
                    <td>300,00</td>
                </tr>

                <tr>
                    <td><span><i className="fas fa-gamepad"></i> Lazer</span></td>
                    <td>20%</td>
                    <td>300,00</td>
                </tr>

                <tr>
                    <td><span><i className="fas fa-certificate"></i> Outros</span></td>
                    <td>20%</td>
                    <td>300,00</td>
                </tr>

            </table>
         
        </div>
    )
}