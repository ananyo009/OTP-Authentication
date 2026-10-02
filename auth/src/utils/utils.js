export function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOtpHtml(otp) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <!-- Container Table -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f5f7; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; padding: 36px 32px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #111827;">Verification Code</h1>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="font-size: 15px; line-height: 24px; color: #4b5563; padding-bottom: 28px;">
              Hello,
              <br><br>
              Use the single-use code below to complete your authentication. This code is valid for <strong>10 minutes</strong>.
            </td>
          </tr>

          <!-- OTP Display Block -->
          <tr>
            <td align="center" style="padding-bottom: 28px;">
              <div style="display: inline-block; background-color: #f3f4f6; border-radius: 6px; padding: 14px 28px; border: 1px dashed #d1d5db;">
                <span style="font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #1f2937;">
                  {${otp}}
                </span>
              </div>
            </td>
          </tr>

          <!-- Security Notice -->
          <tr>
            <td style="font-size: 13px; line-height: 20px; color: #6b7280; padding-bottom: 24px; border-bottom: 1px solid #f3f4f6;">
              If you didn’t request this code, you can safely ignore this email. Someone else may have typed your email address by mistake.
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 24px; font-size: 12px; color: #9ca3af; line-height: 18px;">
              © 2026 YourApp, Inc. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
 