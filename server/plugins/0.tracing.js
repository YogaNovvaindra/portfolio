// OpenTelemetry tracing — enabled only when OTLP_ENABLE=true
// OTLP endpoint is read from OTLP_EXPORTER_ENDPOINT
//
// Uses createRequire to force native CJS require() for all @opentelemetry
// packages — avoids ESM/CJS interop issues with Nitro's bundler.
import { createRequire } from 'node:module'

const _require = createRequire(import.meta.url)

// Only enabled when OTLP_ENABLE=true
const ENABLED = process.env.OTLP_ENABLE === 'true'

export default defineNitroPlugin((nitroApp) => {
  if (!ENABLED) return

  const { NodeSDK }           = _require('@opentelemetry/sdk-node')
  const { OTLPTraceExporter }  = _require('@opentelemetry/exporter-trace-otlp-http')
  const { resourceFromAttributes } = _require('@opentelemetry/resources')
  const { trace }              = _require('@opentelemetry/api')

  const endpoint =
    process.env.OTLP_EXPORTER_ENDPOINT || 'http://localhost:4318/v1/traces'

  const exporter = new OTLPTraceExporter({ url: endpoint })

  const sdk = new NodeSDK({
    resource: resourceFromAttributes({
      'service.name': process.env.OTLP_SERVICE_NAME || 'portfolio',
      'service.version': process.env.npm_package_version || 'unknown',
      'deployment.environment': process.env.NODE_ENV || 'development',
    }),
    traceExporter: exporter,
  })

  sdk.start()

  // Register the tracer into the shared singleton (used by logging middleware)
  setTracer(trace.getTracer(process.env.OTLP_SERVICE_NAME || 'portfolio'))

  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message: `OpenTelemetry tracing enabled → ${endpoint}`,
      event: 'tracing.start',
    })
  )

  nitroApp.hooks.hook('close', async () => {
    try {
      await sdk.shutdown()
    } catch (err) {
      console.error('Error shutting down OpenTelemetry SDK', err)
    }
  })
})
