import React, {ReactElement} from 'react'
import {useHistory} from 'react-router-dom'
import DefaultHome from './pages/DefaultHome.page'
import TopNav from './common/TopNav.page'

import './Main.page.scss'
import BottomNav from './common/BottomNav.page'
import Footer from './common/Footer.page';

interface Props {

}

export default function Main({}: Props): ReactElement {
    const history = useHistory()

    const onOpenClick = async () => {
        history.push(`/`)
    }

    return (
        // <div className="main-section">
        <div>    
            <TopNav/>

            <DefaultHome/>

            <Footer/>

            <BottomNav/>

        </div>
    )
}
