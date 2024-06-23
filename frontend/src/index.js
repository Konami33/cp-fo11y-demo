import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// --- INSTALL ---
// Before you start, make sure you have installed @grafana/faro-web-sdk with your package manager of choice.
// For example, with npm: npm install @grafana/faro-web-sdk
// or with yarn: yarn add @grafana/faro-web-sdk

// --- USAGE ---
// Add the following code snippet to your application before any other JavaScript/TypeScript code!
// For example put the code in your root index.[ts|js] file, right before you initialize your SPA / App.

import { createRoutesFromChildren, matchRoutes, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { getWebInstrumentations, initializeFaro, ReactIntegration, ReactRouterVersion } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

initializeFaro({
  url: 'https://faro-collector-prod-us-east-0.grafana.net/collect/279506015931a091184db094e40c889a',
  app: {
    name: 'CP-Fo11-Demo',
    version: '1.0.0',
    environment: 'production'
  },
  
  instrumentations: [
    // Mandatory, overwriting the instrumentations array would cause the default instrumentations to be omitted
    ...getWebInstrumentations(),

    // Initialization of the tracing package.
    // This packages is optional because it increases the bundle size noticeably. Only add it if you want tracing data.
    new TracingInstrumentation(),

    // Integrate with React Router 6
    new ReactIntegration({
      router: {
        version: ReactRouterVersion.V6,
        dependencies: {
          createRoutesFromChildren,
          matchRoutes,
          Routes,
          useLocation,
          useNavigationType
        },
      }
    })
  ],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);