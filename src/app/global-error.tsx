'use client';

import ErrorBoundary from 'src/components/error-boundary/ErrorBoundary';
import React from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  React.useEffect(() => {
    console.error('LOG: This error was caught by Error Boundary', error);
  }, [error]);

  return (
    <html>
      <body>
        <ErrorBoundary />;
      </body>
    </html>
  );
}
