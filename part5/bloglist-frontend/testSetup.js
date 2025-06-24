/* eslint-disable no-undef */
import { afterEach } from 'vitest'
import { TextEncoder, TextDecoder } from 'util'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'


if (!window.TextEncoder) {
  // Import a polyfill
  window.TextEncoder = TextEncoder
  window.TextDecoder = TextDecoder
}



afterEach(() => {
  cleanup()
})
