import React from 'react'
import crypto from 'crypto'

const generateSignature = (
  apiKey: string,
  apiSecret: string,
  meetingNumber: number,
  role: 0 | 1,  // 0: join meeting, 1: start meeting
) => {
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
  const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
  const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')
  return signature
}

const API_KEY = 'LO11NX44SauwGJjmr9sBcA'
const API_SECRET = 'h53RKLfvNJ3f2lXx1NEKHOlk43SZ8c8ZHvaR'

const ZoomTest = () => {
  // @ts-ignore
  const { ZoomMtg } = window
  ZoomMtg.preLoadWasm()

  return (
    <div>
      ZoomTest
    </div>
  )
}

export default ZoomTest
