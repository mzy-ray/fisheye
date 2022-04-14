import React from 'react';

const withLazyLoading = <BaseProps extends {}>(
  BaseComponent: React.ComponentType<BaseProps>
): React.ComponentType => {
  type HocProps = {
    // here you can extend hoc with new props
  };
  type HocState = {
    readonly error: Error | null | undefined;
  };

  return class Hoc extends React.Component<HocProps, HocState> {
    render(): React.ReactNode {
      const {children, ...restProps} = this.props;

      return children;
    }
  };
};

export default withLazyLoading;
