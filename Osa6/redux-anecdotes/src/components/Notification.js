import React from 'react';

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    store.getState().notification 
    ? <div style={style}>
      {store.getState().notification}
    </div>
    : null
  )
}

export default Notification
