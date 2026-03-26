'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

interface HydrationSuppressorProps {
  children: React.ReactNode;
}

const HydrationSuppressor = ({ children }: HydrationSuppressorProps) => {
  const [isClient, setIsClient] = useState(false);

  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
};

export default HydrationSuppressor;
