# Secrets Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Secrets Application is a secure platform where users can sign up, log in, and share their secrets or notes in a todo list style. Users can manage their secrets by deleting, or updating them. The application also provides various settings and support features, and supports Google OAuth for authentication.

## Features

- User authentication with Passport.js (local strategy and Google OAuth)
- Secure session management with express-session
- Secrets management: Add, delete, and update secrets
- User settings: Terms and policies, help and support, privacy and security, personal information
- Google OAuth integration for registration and login
- Error handling for GET requests

## Technologies Used

- **Frontend:** HTML, CSS, EJS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** Passport.js (local strategy, Google OAuth)
- **Session Management:** express-session
- **Other:** body-parser, path, url

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/korayakben/Secrets.git
   ```

2. Change into the project directory:

   ```bash
   cd Secrets
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up your environment variables in a `.env` file:

   ```env
      DB_USER="secretadmin"
      DB_PASSWORD="test123"
      DB_DATABASE="secretusers"
      DB_HOST="localhost"
      DB_PORT=5432
      SECRET_KEY="secret key"
   ```

5. Run the application:
   ```bash
   node app.js
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new account or log in using an existing account.
3. Use the application to manage your secrets.

## API Endpoints

### GET Requests

- **/**: Renders the `index.ejs` file.
- **/login**: Renders the `login.ejs` file.
- **/register**: Renders the `register.ejs` file.
- **/resetpass**: Renders the `resetpass.ejs` file.
- **/secrets**: Retrieves and displays secrets using the `getSecrets` controller.
- **/submit**: Renders the submit form using the `getSubmit` controller.
- **/settings**: Renders the settings page using the `getSettings` controller.
- **/settings/termspolicies**: Renders the terms and policies page using the `getTermsPolicies` controller.
- **/settings/helpsupport**: Renders the help and support page using the `getHelpSupport` controller.
- **/settings/privsec**: Renders the privacy and security page using the `getPrivSec` controller.
- **/settings/personalinfo**: Renders the personal information page using the `getPersonalInfo` controller.

### POST Requests

- **/secrets**: Handles the submission of secrets using the `postSecrets` controller.
- **/submit**: Handles the submission form using the `postSubmit` controller.
- **/settings/privsec**: Handles updates to privacy and security settings using the `postPrivSec` controller.
- **/settings/helpsupport**: Handles help and support form submissions using the `postHelpSupport` controller.
- **/settings**: Handles settings updates using the `postSettings` controller.
- **/**: Handles the home page form submission using the `postHome` controller.
- **/register**: Handles user registration using the `postRegister` controller.
- **/login**: Handles user login using the `passport.authenticate('local')` middleware.
- **/resetpass**: Handles password reset using the `postResetPass` controller.

### Google OAuth

- **/auth/google/login**: Initiates Google OAuth login with profile and email scopes.
- **/auth/google/register**: Initiates Google OAuth registration with profile and email scopes.
- **/auth/google/secrets**: Handles Google OAuth callback, redirecting to `/secrets` on success or `/login` on failure.

## Project Structure

```plaintext
Secrets/
│
├── public/
│   ├── css/
│   ├── icons/
│   ├── images/
│
├── src/
│   ├── controllers/
│   │   ├── Get Requests/
│   │   └── Post Requests/
│   ├── utils/
│   │   ├── database/
│   │   └── googleAuth/
│   └── views/
│       └── ejsfiles/
│
├── .env
├── app.js
├── package.json
└── README.md

```
