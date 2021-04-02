import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/font-awesome/css/font-awesome.min.css'
import '../template/custom.css'

import React from 'React'
import Menu from '../template/menu'
import Routes from './routes'
import { Route } from 'react-router'

export default props =>(
    <div className="container">
        <Menu />
        <Routes />
    </div>
)