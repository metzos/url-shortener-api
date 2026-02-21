# URL Shortener API

A high-performance REST API for a URL shortening service.

# Tech Stack
* **Framework:** [NestJS](https://nestjs.com/) (TypeScript)
* **Database:** PostgreSQL (Containerized via Docker)
* **ORM:** [Prisma](https://www.prisma.io/) (v7)
* **Validation:** `class-validator` & `class-transformer`

## Features

* **Link Generation:** Converts long, unwieldy URLs into short, trackable links.
* **Instant Redirection:** Quickly forwards users from the short link to the original destination.
* **Click Analytics:** Safely and accurately tracks the number of times a link is visited using atomic increments in PostgreSQL.
* **Strict Validation:** Uses Data Transfer Objects (DTOs) and global validation pipes to ensure only valid URLs are processed and to reject malicious or malformed payloads.

---

## How to Run Locally

### Prerequisites
* [Node.js](https://nodejs.org/) installed
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### 1. Clone the repository
```bash
git clone https://github.com/metzos/url-shortener-api.git
cd url-shortener-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Database
This will spin up a local PostgreSQL database using Docker.
```bash
docker compose up -d
```

### 4. Setup Prisma
Generate the Prisma Client and push the schema to the database.
```bash
npx prisma migrate dev
```

### 5. Start the Server
```bash
npm run start:dev
```
The API will now be running on `http://localhost:3000`.

---

## API Endpoints

### 1. Create a Short URL
**POST** `/shorten`

Expects a valid URL in the request body. Unrecognized properties or invalid web addresses will be rejected with a `400 Bad Request`.

**Request Body:**
```json
{
  "url": "https://www.google.com"
}
```

**Response:**
```json
{
  "id": 1,
  "originalUrl": "https://www.google.com",
  "shortCode": "link8243",
  "clicks": 0,
  "createdAt": "2026-02-21T12:00:00.000Z"
}
```

---

### 2. Redirect to Original URL
**GET** `/:shortCode`

Looks up the short code, safely increments the total `clicks` counter by 1 in the database, and performs an HTTP `302` redirect to the original web address.

**Example Request:**
`http://localhost:3000/link8243`

---

### 3. View Link Analytics
**GET** `/stats/:shortCode`

Retrieves the current data for a short link (including total clicks) *without* incrementing the click counter.

**Example Request:**
`http://localhost:3000/stats/link8243`

**Response:**
```json
{
  "id": 1,
  "originalUrl": "https://www.google.com",
  "shortCode": "link8243",
  "clicks": 14,
  "createdAt": "2026-02-21T12:00:00.000Z"
}
```