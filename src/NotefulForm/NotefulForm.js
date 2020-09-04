import React from 'react'
import './NotefulForm.css'
import AddFolder from '../AddFolder/AddFolder'

export default function NotefulForm(props) {
  const { className, history, ...otherProps } = props
  return (
    <form
      className={['Noteful-form', className].join(' ')}
      action='#' autoComplete="off"
      {...otherProps}>
        <AddFolder history={history} />
      </form>
  )
}
