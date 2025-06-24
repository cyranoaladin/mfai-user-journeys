import React, { ComponentType } from 'react';

/**
 * Higher-order component (HOC) that prevents server-side rendering
 * This ensures components are only rendered on the client side where React is fully initialized
 */
export default function noSSR<P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> {
  // Create a new component that will only render on client side
  function NoSSR(props: P) {
    // State to track if we're on the client
    const [isClient, setIsClient] = React.useState(false);
    
    // Effect runs only on client
    React.useEffect(() => {
      setIsClient(true);
    }, []);
    
    // Show nothing on server, render component on client
    if (!isClient) {
      return null;
    }
    
    return <WrappedComponent {...props} />;
  }
  
  // Copy display name for better debugging
  NoSSR.displayName = `NoSSR(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;
  
  return NoSSR;
}
