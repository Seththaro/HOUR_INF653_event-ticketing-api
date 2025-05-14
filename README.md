# Event Ticketing API

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue.svg)](https://github.com/Seththaro/HOUR_INF653_event-ticketing-api)
[![YouTube Demo](https://img.shields.io/badge/YouTube-Demo-red.svg)](YOUR_YOUTUBE_VIDEO_LINK)

A RESTful API for an Event Ticketing System built with Node.js, Express, and MongoDB. Deployed on Render.com, it supports user authentication, event management, ticket bookings with QR code generation, email confirmations, and admin analytics.

---

## Table of Contents

- [Event Ticketing API](#event-ticketing-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
  - [Available Scripts](#available-scripts)
  - [API Reference](#api-reference)
    - [Authentication](#authentication)
    - [Events](#events)
    - [Bookings](#bookings)
    - [Admin](#admin)
  - [Testing](#testing)
  - [Deployment](#deployment)
  - [Video Demo](#video-demo)
  - [Links](#links)
  - [License](#license)

---

## Features

* **User & Admin Roles**: Secure JWT authentication and role-based access control.
* **Event Management**: Create, Read, Update, Delete (CRUD) events with filtering by category, date, and venue.
* **Ticket Booking**: Validate seat availability, generate QR codes, and receive email confirmation.
* **QR Validation**: Public endpoint to validate tickets by QR code.
* **Admin Dashboard**: Analytics view of events with booking summaries.
* **Error Handling**: Global middleware for JSON and HTML 404 responses based on `Accept` header.

---

## Tech Stack

* **Runtime**: Node.js
* **Server**: Express
* **Database**: MongoDB + Mongoose
* **Authentication**: JWT + bcrypt.js
* **QR Codes**: `qrcode` package
* **Email**: Nodemailer + SendGrid/Ethereal
* **Deployment**: Render.com

---

## Getting Started

### Prerequisites

* Node.js v14+ installed
* npm or yarn
* MongoDB instance (local or MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Seththaro/HOUR_INF653_event-ticketing-api.git
   cd HOUR_INF653_event-ticketing-api
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file based on the `.env.example` in the project root:

```dotenv
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

# Email (SendGrid SMTP)
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=SG.your_sendgrid_api_key
```

---

## Available Scripts

* `npm run dev` - Start the server with nodemon for development.
* `npm start`   - Start the server in production mode.

---

## API Reference

### Authentication

| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| POST   | `/api/auth/register` | Register a new user               |
| POST   | `/api/auth/login`    | Authenticate user and receive JWT |

### Events

| Method | Endpoint          | Description                                                  |
| ------ | ----------------- | ------------------------------------------------------------ |
| GET    | `/api/events`     | List all events (filters: `?category=`, `?date=`, `?venue=`) |
| GET    | `/api/events/:id` | Get details of a single event                                |
| POST   | `/api/events`     | Create an event (admin only)                                 |
| PUT    | `/api/events/:id` | Update an event (admin only)                                 |
| DELETE | `/api/events/:id` | Delete an event (admin only)                                 |

### Bookings

| Method | Endpoint                     | Description                           |
| ------ | ---------------------------- | ------------------------------------- |
| POST   | `/api/bookings`              | Book tickets (user only)              |
| GET    | `/api/bookings`              | List bookings for the current user    |
| GET    | `/api/bookings/:id`          | Get details of a specific booking     |
| GET    | `/api/bookings/validate/:qr` | Validate a ticket by QR code (public) |

### Admin

| Method | Endpoint               | Description                                          |
| ------ | ---------------------- | ---------------------------------------------------- |
| GET    | `/api/admin/dashboard` | View events with booking-user analytics (admin only) |

---

## Testing

Use the provided `api.http` file with the VS Code **REST Client** extension or Postman to run through all endpoints, including edge cases and error scenarios.

---

## Deployment

1. Push your code to GitHub.
2. On Render.com, create a new **Web Service** linked to this repository.
3. Set environment variables in the Render dashboard as shown above.
4. Deploy and access your API at:

   ```
   https://tharoeventicketing.onrender.com
   ```

---

## Video Demo

Watch the full demo on YouTube:

[![YouTube Demo](https://img.shields.io/badge/YouTube-Demo-red.svg)](YOUR_YOUTUBE_VIDEO_LINK)

---

## Links

* **GitHub Repository:** [https://github.com/Seththaro/HOUR\_INF653\_event-ticketing-api.git](https://github.com/Seththaro/HOUR_INF653_event-ticketing-api.git)
* **YouTube Demo:** YOUR\_YOUTUBE\_VIDEO\_LINK

---

## License

This project is licensed under the MIT License. Feel free to use and modify.
