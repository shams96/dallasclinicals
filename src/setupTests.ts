import '@testing-library/jest-dom';

// Mock IntersectionObserver for framer-motion
class IntersectionObserver {
  observe = vitest.fn()
  disconnect = vitest.fn()
  unobserve = vitest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
})

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
})
