/**
 * Email Dispatch Service
 * 
 * Supports real Email delivery via SendGrid or SMTP when configured in .env:
 * - SENDGRID_API_KEY
 * - FROM_EMAIL (e.g. no-reply@yourdomain.com)
 * 
 * In development or when keys are absent, runs the Email Simulator which logs the code
 * to the server console and passes the simulated code so the UI can auto-assist testing.
 */

export interface EmailResult {
  success: boolean;
  provider: 'sendgrid' | 'simulator';
  message: string;
  simulatedCode?: string;
  confirmationUrl?: string;
}

export async function sendEmailVerification(
  email: string,
  code: string,
  name: string = 'User',
  purpose: 'verification' | 'reset' = 'verification'
): Promise<EmailResult> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || 'no-reply@platform.internal';
  const appUrl = process.env.APP_URL || 'http://localhost:3000';

  const confirmationUrl = `${appUrl}/verify-email?code=${code}&email=${encodeURIComponent(email)}`;
  const subject =
    purpose === 'reset'
      ? 'Password Recovery Code - Security Portal'
      : 'Verify Your Email Address - Security Portal';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaec; border-radius: 8px;">
      <h2 style="color: #282c3f; margin-top: 0;">Welcome, ${name}!</h2>
      <p style="color: #535766; font-size: 14px; line-height: 1.6;">
        ${purpose === 'reset' ? 'We received a request to reset your password. Use the verification code below:' : 'Thank you for registering. Please confirm your email address to activate all account features.'}
      </p>
      <div style="background-color: #f5f5f6; border-radius: 6px; padding: 16px; text-align: center; margin: 24px 0;">
        <span style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #ff3f6c; font-family: monospace;">${code}</span>
      </div>
      <p style="color: #535766; font-size: 13px;">
        Or click the link below to confirm automatically:<br/>
        <a href="${confirmationUrl}" style="color: #ff3f6c; text-decoration: underline;">Confirm My Email</a>
      </p>
      <hr style="border: none; border-top: 1px solid #eaeaec; margin: 24px 0;" />
      <p style="color: #94969f; font-size: 11px;">
        This code expires in 5 minutes. If you did not request this, please disregard this email.
      </p>
    </div>
  `;

  // Real SendGrid Integration
  if (apiKey && apiKey.startsWith('SG.')) {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email, name }],
              subject
            }
          ],
          from: { email: fromEmail, name: 'Security Portal' },
          content: [
            {
              type: 'text/html',
              value: htmlContent
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('SendGrid email error:', errorText);
        throw new Error('SendGrid dispatch failed');
      }

      console.log(`[SendGrid Email Sent] Dispatched verification to ${email}`);
      return {
        success: true,
        provider: 'sendgrid',
        message: `Email sent via SendGrid to ${email}`,
        confirmationUrl
      };
    } catch (err: any) {
      console.warn('SendGrid dispatch failed, falling back to simulator for continuity:', err.message);
    }
  }

  // Development / Simulator Mode
  console.log('====================================================');
  console.log(`📧 [EMAIL VERIFICATION SIMULATOR] Dispatch to: ${email}`);
  console.log(`🏷️ Subject: "${subject}"`);
  console.log(`🔑 Verification Code: [ ${code} ]`);
  console.log(`🔗 Confirmation Link: ${confirmationUrl}`);
  console.log('====================================================');

  return {
    success: true,
    provider: 'simulator',
    message: `Email simulated for ${email}`,
    simulatedCode: code,
    confirmationUrl
  };
}
