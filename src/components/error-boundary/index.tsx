import React from 'react';

import withErrorBoundary from './with-error-boundary';

const ErrorMessage: React.FC = () => {
  return <h2>Sorry there was an unexpected error</h2>;
};

const ErrorBoundary = withErrorBoundary(ErrorMessage);

export default ErrorBoundary;
