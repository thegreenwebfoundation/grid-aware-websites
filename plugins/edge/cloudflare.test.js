import { describe, it, expect } from 'vitest'
import getLocation from './cloudflare'

describe('getLocation', () => {
  it('should return location data when CF data is present', () => {
    const mockRequest = {
      cf: {
        country: 'DE'
      }
    }

    const result = getLocation(mockRequest)
    
    expect(result).toEqual({
      country: 'DE'
    })
  })

  it('should return return an error when all data is undefined', () => {
    const mockRequest = {}

    const result = getLocation(mockRequest)
    
    expect(result).toEqual({
      status: "error",
    })
  })
})
