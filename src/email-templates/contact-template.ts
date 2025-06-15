export const contactEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo mensaje de contacto</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9fafb;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .email-wrapper {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 30px 20px;
        }
        .message-box {
            background: #f3f4f6;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .info-item {
            margin-bottom: 15px;
        }
        .info-label {
            font-weight: 600;
            color: #4b5563;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .info-value {
            color: #1f2937;
            font-size: 16px;
            margin-top: 4px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background: #f9fafb;
            color: #6b7280;
            font-size: 14px;
        }
        .gradient-border {
            position: relative;
            margin: 20px 0;
        }
        .gradient-border::before {
            content: '';
            position: absolute;
            top: -1px;
            left: -1px;
            right: -1px;
            bottom: -1px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            border-radius: 12px;
            z-index: -1;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="email-wrapper">
            <div class="header">
                <h1>Nuevo mensaje de contacto</h1>
            </div>
            <div class="content">
                <div class="gradient-border">
                    <div class="message-box">
                        <div class="info-item">
                            <div class="info-label">Nombre</div>
                            <div class="info-value">{{name}}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Email</div>
                            <div class="info-value">{{email}}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Asunto</div>
                            <div class="info-value">{{subject}}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Mensaje</div>
                            <div class="info-value">{{message}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <p>Este mensaje fue enviado desde el formulario de contacto de tu portafolio.</p>
            </div>
        </div>
    </div>
</body>
</html>
` 