import React, { ReactNode, Component } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ClientOnlyState {
  mounted: boolean;
}

/**
 * Component that only renders its content on the client side
 * Resolves hydration and React initialization issues by using class component
 * which doesn't rely on hooks that might cause issues during initialization
 */
class ClientOnly extends Component<ClientOnlyProps, ClientOnlyState> {
  constructor(props: ClientOnlyProps) {
    super(props);
    // Start with not mounted in SSR
    this.state = {
      mounted: false
    };
  }

  componentDidMount() {
    // Once mounted on client, update state
    this.setState({ mounted: true });
  }

  render() {
    const { children, fallback = null } = this.props;
    const { mounted } = this.state;

    // Server-side rendering or during hydration
    if (!mounted) {
      return <>{fallback}</>;
    }

    // Client-side rendering only
    return <>{children}</>;
  }
}

export default ClientOnly;
