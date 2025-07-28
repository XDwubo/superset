import React from 'react';
import './MyComponent.scss';

const MyComponent = ({ 
  color = '#3498db', 
  size = 16, 
  borderRadius = 4,
  padding = 16,
  children 
}) => {
  const cssVars = {
    '--component-color': color,
    '--component-size': `${size}px`,
    '--component-border-radius': `${borderRadius}px`,
    '--component-padding': `${padding}px`
  };

  return (
    <div className="my-component" style={cssVars}>
      <div className="my-component__content">
        {children}
      </div>
    </div>
  );
};

export default MyComponent;