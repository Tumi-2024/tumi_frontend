// Third Party
import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'

// Vue
import Vue from 'vue'

// Main Section

// Sentry
Sentry.init({
  Vue,
  dsn: 'https://0c339102c50641c7b64c4874588c7b61@o494364.ingest.sentry.io/5565368',
  autoSessionTracking: true,
  integrations: [
    new Integrations.BrowserTracing()
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0
})
