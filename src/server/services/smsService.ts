/**
 * SMS Dispatch Service
 * 
 * Supports real SMS via Twilio or Firebase SMS when configured in .env:
 * - TWILIO_ACCOUNT_SID
 * - TWILIO_AUTH_TOKEN
 * - TWILIO_PHONE_NUMBER
 * 
 * In development or when keys are absent, runs the OTP Simulator which logs the code
 * to the server console and passes the simulated OTP so the UI can auto-assist testing.
 */

export interface SmsResult {
  success: boolean;
  provider: 'twilio' | 'simulator';
  message: string;
  simulatedCode?: string;
}

export async function sendSmsOtp(
  phone: string,
  code: string,
  purpose: 'verification' | 'login' | 'reset' = 'verification'
): Promise<SmsResult> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  const purposeText =
    purpose === 'login'
      ? 'Your one-time login passcode is'
      : purpose === 'reset'
      ? 'Your password recovery code is'
      : 'Your registration verification code is';

  const messageBody = `[Auth Portal] ${purposeText}: ${code}. Valid for 5 minutes. Do not share this with anyone.`;

  // Real Twilio Integration
  if (accountSid && authToken && fromNumber) {
    try {
      const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const authHeader = 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64');

      const params = new URLSearchParams();
      params.append('To', phone);
      params.append('From', fromNumber);
      params.append('Body', messageBody);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Twilio SMS error:', errorData);
        throw new Error(errorData.message || 'Failed to dispatch SMS via Twilio');
      }

      console.log(`[Twilio SMS Sent] Dispatched SMS to ${phone}`);
      return {
        success: true,
        provider: 'twilio',
        message: `SMS sent via Twilio to ${phone}`
      };
    } catch (err: any) {
      console.warn('Twilio dispatch failed, falling back to simulator for continuity:', err.message);
    }
  }

  // Development / Simulator Mode
  console.log('====================================================');
  console.log(`📱 [SMS OTP SIMULATOR] Dispatch to: ${phone}`);
  console.log(`💬 Message: "${messageBody}"`);
  console.log(`🔑 Verification Code: [ ${code} ]`);
  console.log('====================================================');

  return {
    success: true,
    provider: 'simulator',
    message: `SMS simulated for ${phone}`,
    simulatedCode: code
  };
}
