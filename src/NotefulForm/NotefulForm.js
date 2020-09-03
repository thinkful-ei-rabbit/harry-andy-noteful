import React from 'react'
import './NotefulForm.css'
import AddFolder from '../AddFolder/AddFolder'

export default function NotefulForm(props) {
  const { className, ...otherProps } = props
  return (
    <form
      className={['Noteful-form', className].join(' ')}
      action='#' autocomplete="off"
      {...otherProps}>
        <AddFolder />
      </form>
  )
}
