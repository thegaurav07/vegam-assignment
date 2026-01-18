import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import App from './App';

// ✅ Enable MSW for dev AND preview/demo
async function enableMocking() {
  const isMockEnabled =
    import.meta.env.MODE === 'development' ||
    import.meta.env.MODE === 'preview' ||
    import.meta.env.VITE_ENABLE_MSW === 'true';

  if (!isMockEnabled) {
    return;
  }

  const { worker } = await import('./mocks/browser');

  if ((window as any).__mswStarted) return;
  (window as any).__mswStarted = true;

  await worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

enableMocking().then(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
});
