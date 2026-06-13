// Shared tracer singleton — auto-imported in Nitro server context.
// The tracing plugin (0.tracing.js) calls setTracer() on startup.
// The logging middleware calls getTracer() to create per-request spans.

let _tracer = null

export function setTracer(tracer) {
  _tracer = tracer
}

export function getTracer() {
  return _tracer
}
