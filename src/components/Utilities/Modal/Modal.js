import React from "react"
import logoImg from '../../../images/favicon.png'

import './Modal.css'

export default function Modal({ refr, onClick, children }) {

    return (
        <>
            <div className="Modal" onClick={() => onClick()}></div>
            <div className="info">
                <img src={logoImg} alt={logoImg} />
                {children}
            </div>
        </>
    )
}