import { Route, Switch } from "react-router"

import { Dashboard } from "../views/Dashboard"
import { TransactionList } from '../views/TransactionList'

export function Content(){
    return(
        <main>
            <Switch>

                <Route path="/" exact component={Dashboard} />
                
                <Route path="/transaction-list" component={TransactionList} />

            </Switch>
        </main>
    )
}