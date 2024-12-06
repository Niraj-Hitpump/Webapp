import { NavLink } from 'react-router-dom';

const Error = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h2 className="error-title">404</h2>
        <h4 className="error-subtitle">Sorry! Page Not Found</h4>
        <p className="error-message">
          Oops! It seems like the page you are looking for does not exist. If you think this is a mistake, please contact our support team.
        </p>
        <div className="error-actions">
          <NavLink to="/" className="error-button">
            Return Home
          </NavLink>
          <NavLink to="/contact" className="error-button secondary">
            Report Problem
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Error;
