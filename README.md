# **LoopedIn**

LoopedIn is a work-in-progress social networking platform for developers. Think of it as a lightweight LinkedIn clone where users can sign up, log in, manage their profile. This is a work in progress and new features will be added as and when possible!

## Features

User authentication (signup/login) with JWT

Dashboard with user details

Responsive UI with custom styling

Secure password hashing using bcrypt

API built with Express + MongoDB Atlas



## Tech Stack

Frontend: React, CSS

Backend: Node.js, Express

Database: MongoDB Atlas

Hosting: Heroku (Eco dyno)

## Installation

**Clone this repo:**

git clone https://github.com/awanivaidya/LoopedIn.git
cd LoopedIn


**Install dependencies:**

npm install
cd client && npm install


Add environment variables (in a .env file at root):

MONGODB_URI=your_connection_string
JWT_SECRET=your_secret_key


Run locally:

npm run dev

## Deployment

The app is deployed on Heroku. You can view the live demo here:
https://loopedin-acac3e638b8f.herokuapp.com/dashboard/

## **Status**

This is a work in progress. Current functionality covers authentication and dashboard. New features and improved UI/UX will be added soon.

## **Author**

Awani Mahesh Vaidya
