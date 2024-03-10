import React from "react";

function Alert(props) {
  const {alert} = props;
  const capitalize = (word) =>{
    if(word === 'danger'){
      word = "error"
    }
     const lower = word.toLowerCase();
     return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

return (
  <div style={{height: '40px'}}>
    {alert && <div style={alert.type === 'danger'?{color:'red'}:{color:'green'}} className={`alert alert-${alert.type} d-flex align-items-center`} role="alert">
      <strong>{capitalize(alert.type)}</strong>: {alert.msg}
    </div>}
  </div>
);
}

export default Alert;
