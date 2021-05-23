import React from 'react';
import {Modal as ModalAntd} from "antd";

export default function Modal(props) {
     
    const {children, title, isVisible, setIsVisible, style} = props; 
    
    

    
    return (
        <ModalAntd 
        style={style}
        title={title}
        centered
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        footer= {false}
       
        >
          {children}
        </ModalAntd>
    )
}
