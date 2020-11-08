import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignInSide from './page/auth/Signin.jsx'
import TimeSheetAdmin from './page/admin/TimeSheet'
import TimeSheetUser from './page/user/TimeSheet'
import Reminder from './page/user/Reminder'
import RemindAdmin from './page/admin/Remind'
import Visa from './page/user/Visa'
import VisaAdmin from './page/admin/VisaAdmin'

const Routes = () => {
    return(
        <div>
            <BrowserRouter>
            <Switch >
            <Route path="/" exact component={SignInSide}/>
            <Route path="/main" exact component={TimeSheetAdmin}/>
            <Route path="/officer" exact component={TimeSheetUser}/>
            <Route path="/reminder" exact component={Reminder}/>
            <Route path="/remindAdmin" exact component={RemindAdmin}/>
            <Route path="/visa" exact component={Visa}/>
            <Route path="/visaAdmin" exact component={VisaAdmin}/>
            </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes;