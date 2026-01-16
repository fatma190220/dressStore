import React from 'react'

export default function Button({title, icon,onClick,style}) {
  return (
    <> 
     <button className='main-bg button animated-btn' onClick={onClick} style={style}>{icon} {title}</button> 
    </>
  )
}
