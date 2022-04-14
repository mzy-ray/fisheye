import React from 'react';

const MISSING_ERROR = 'Error was swallowed during propagation.';

const withErrorBoundary = <BaseProps extends Record<string, never>>(
  BaseComponent: React.ComponentType<BaseProps>
): React.ComponentType => {
  type HocProps = Record<string, never>;
  type HocState = {
    readonly error: Error | null | undefined;
  };

  return class Hoc extends React.Component<HocProps, HocState> {
    // Enhance component name for debugging and React-Dev-Tools
    static displayName = `withErrorBoundary(${BaseComponent.name})`;
    // reference to original wrapped component
    static readonly WrappedComponent = BaseComponent;

    readonly state: HocState = {
      error: undefined,
    };

    componentDidCatch(error: Error | null, info: object): void {
      this.setState({error: error || new Error(MISSING_ERROR)});
      this.logErrorToCloud(error, info);
    }

    logErrorToCloud = (error: Error | null, info: object): void => {
      // TODO: send error report to service provider
      console.log(error, info);
    };

    render(): React.ReactNode {
      const {children, ...restProps} = this.props;
      const {error} = this.state;

      if (error) {
        return <BaseComponent {...(restProps as BaseProps)} />;
      }
      return children;
    }
  };
};

export default withErrorBoundary;
