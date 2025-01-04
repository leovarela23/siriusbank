# Sirius Bank

A modern, space-themed banking interface that simulates payment processing through a REST API. Built with React, Express, and Node.js.

## 🚀 Features

- Space-themed user interface
- Payment simulation API
- JWT-based payment tracking
- Secure login interface
- Payment summary visualization
- Automated callback handling

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Authentication**: JWT
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## 🔧 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 🔨 Building for Production

Build the application:

```bash
npm run build
```

## 🔌 API Endpoints

### Create Payment Session

```http
POST /api/payments
```

Headers:
- `Authentication: Basic {api_key}`
- `callbackUrl: {callback_url}`

Request Body Example:
```json
{
  "Data": {
    "ReadRefundAccount": "Yes",
    "Initiation": {
      "InstructionIdentification": "TEST1736021657",
      "EndToEndIdentification": "TEST1736021657",
      "InstructedAmount": {
        "Amount": "1.00",
        "Currency": "GBP"
      },
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "50000012345601",
        "Name": "Tester Testarossa"
      },
      "RemittanceInformation": {
        "Unstructured": "Test",
        "Reference": "TEST1736021657"
      }
    }
  }
}
```

### Get Payment Details

```http
GET /api/payment/:token
```

## 🔒 Security Notes

- The JWT secret key should be stored in environment variables in production
- API keys should be properly validated in a production environment
- The in-memory payment storage should be replaced with a proper database in production

## 📁 Project Structure

```
sirius-bank/
├── server/
│   └── index.js         # Express server setup
├── src/
│   ├── pages/           # React components for each route
│   ├── App.tsx          # Main React component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
└── vite.config.ts       # Vite configuration
```

## 🌟 User Flow

1. API receives payment request
2. User is redirected to login page
3. After login, payment summary is displayed
4. User accepts or cancels payment
5. System redirects to callback URL

## 📄 License

MIT
