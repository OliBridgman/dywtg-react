import React from "react";
import PropTypes from "prop-types";

const Select = props => {
  const { children, ...otherProps } = props;
  return (
    <select className="select" {...otherProps}>
      {children}
    </select>
  );
};

Select.propTypes = {
  children: PropTypes.node
};

export default Select;
