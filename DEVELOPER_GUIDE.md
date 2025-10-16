# Developer Guide

This guide provides an overview of the application's architecture, instructions for setting up the development environment, and guidelines for contributing to the project.

## Table of Contents

- [Application Architecture](#application-architecture)
- [Getting Started](#getting-started)
- [Core Features](#core-features)
- [Contributing](#contributing)

## Application Architecture

This application is built with the following technologies:

- **Backend:** Laravel
- **Frontend:** Inertia.js (with Vue.js)
- **Database:** MySQL

The backend follows the standard Laravel MVC architecture. The frontend is a single-page application that is built with Vue.js and Inertia.js.

## Getting Started

To get started with the project, you'll need to have the following installed on your local machine:

- PHP >= 8.2
- Composer
- Node.js
- NPM

Once you have these installed, you can follow these steps to set up the project:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your/repository.git
    ```

2.  **Install the dependencies:**

    ```bash
    composer install
    npm install
    ```

3.  **Create a copy of the `.env.example` file and name it `.env`:**

    ```bash
    cp .env.example .env
    ```

4.  **Generate a new application key:**

    ```bash
    php artisan key:generate
    ```

5.  **Run the database migrations:**

    ```bash
    php artisan migrate
    ```

6.  **Start the development server:**

    ```bash
    npm run dev
    ```

## Core Features

The application has the following core features:

- **Health Records:** Users can create, read, update, and delete their health records.
- **Reminders:** Users can set reminders for appointments, medications, and other health-related events.
- **Medicine:** Users can track their medications and dosages.

## Contributing

We welcome contributions to the project! To contribute, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch for your changes.**
3.  **Make your changes and commit them.**
4.  **Push your changes to your fork.**
5.  **Create a pull request.**
