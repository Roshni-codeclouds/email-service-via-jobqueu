# NestJS Email Service (Job Queue)

A simple NestJS service to trigger emails using BullMQ and Mailer module.

## Features
- Email triggering via REST API
- Background processing using BullMQ (Redis)
- Handlebars templates support
- Configurable via environment variables

## Prerequisites
- Node.js
- Redis

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```env
   PORT=3001
   REDIS_HOST=localhost
   REDIS_PORT=6379
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=user@example.com
   SMTP_PASS=password
   SMTP_FROM="No Reply" <noreply@example.com>
   ```

## Running the app

```bash
# development
npm run start:dev

# production mode
npm run start:prod
```

## API Endpoints

### Send Email
- **URL:** `/email/send`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "to": "recipient@example.com",
    "subject": "Hello World",
    "text": "This is a test email",
    "html": "<b>This is a test email</b>",
    "template": "welcome",
    "context": {
      "name": "John Doe"
    }
  }
  ```
