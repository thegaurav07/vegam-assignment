import React from 'react';
import { Alert, Button, Box } from '@mui/material';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4 }}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={this.handleRetry}>
                Retry
              </Button>
            }
          >
            Something went wrong. Please try again.
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}
