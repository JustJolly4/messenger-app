# Messenger App

**By Justine Jolly**

## Introduction

Messenger App is a simple messaging application that demonstrates full-stack development using a React Native (Expo) frontend and a Node.js backend.  
Users can send messages to any recipient and retrieve messages sent to them.  
This project is designed for anyone learning about RESTful APIs, React Native, and server scripting.

---

## Front-End

The front-end is built with **React Native (Expo)** and supports web testing via Expo’s web mode.

### Features

- **Send Message:** Enter a sender, recipient, and message, then send it to the backend.
- **Retrieve Messages:** Enter a recipient to retrieve all messages sent to them.

### How to run

1. Go to the `frontend` folder:
    ```bash
    cd frontend
    npx expo start --web
    ```
2. Open [http://localhost:8081](http://localhost:8081) (or as shown in your terminal) in your browser.

### Screenshots

![Messenger App Screenshot](screenshot2.png)


---

## Server APIs (Back-End)

The backend is a **Node.js Express server** with two main endpoints:

### 1. **Send a message**

- **POST** `/sendMessage`
- **Body:**  
    ```json
    {
      "sender": "Alice",
      "recipient": "Bob",
      "message": "Hello Bob!"
    }
    ```
- **Response:**  
    ```json
    { "success": true, "message": "Message sent!" }
    ```

### 2. **Retrieve messages**

- **GET** `/retrieveMessages?recipient=Bob`
- **Response:**  
    ```json
    {
      "messages": [
        {
          "sender": "Alice",
          "recipient": "Bob",
          "message": "Hello Bob!",
          "timestamp": "2025-06-05T15:38:16.384Z"
        }
      ]
    }
    ```

### How to run

1. Go to the `backend` folder:
    ```bash
    cd backend
    node server.js
    ```

---

## Extra Credit: Database Integration

*Currently, messages are stored in a local JSON file (`messages.json`).  
Database integration (e.g., MySQL/MongoDB) can be added for extra credit.*

---

## Team

**This project was completed individually by Justine Jolly.**