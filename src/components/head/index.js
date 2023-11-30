import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, buttonText, buttonOnClick}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {buttonText && <button onClick={buttonOnClick}>{buttonText}</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  buttonText: PropTypes.string,
  buttonOnClick: PropTypes.func,
};

Head.defaultProps = {
  buttonOnClick: () => {},
}

export default React.memo(Head);
