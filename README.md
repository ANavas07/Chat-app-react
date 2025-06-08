# 💬 Chat-app-react – Encrypted Chat Application (AES-128)

**Chat-app-react** is a full-stack real-time messaging app built with **React**, **Tailwind CSS**, **Node.js**, and **Express** — with a strong focus on **security and simplicity**.

🔐 Messages are encrypted using **AES-128**, providing an extra layer of privacy and ensuring that only authorized users can read the content.

---

## ✨ Features

- 💬 Real-time 1:1 or group messaging
- 🔒 AES-128 encryption for message content
- 💻 Modern, responsive UI with Tailwind
- ⚡ Fast, scalable backend with Express
- 🔐 No messages are stored in plain text
- 📦 Lightweight and easy to run locally

---

## 🧠 Tech Stack

### Frontend

| Tool          | Purpose                         |
|---------------|---------------------------------|
| **React**     | Component-based UI              |
| **Tailwind CSS** | Responsive styling           |
| **Axios**     | API communication               |
| **Context API / Hooks** | State management      |

### Backend

| Tool           | Purpose                          |
|----------------|----------------------------------|
| **Node.js**    | Backend runtime                  |
| **Express**    | API routing                      |
| **Crypto**     | AES-128 encryption               |
| **CORS, dotenv** | Middleware & config setup      |

---

## 🔐 Encryption Details

- AES-128 symmetric encryption is implemented using Node's built-in `crypto` module
- Messages are encrypted before being sent to the server
- The server does not store or access the unencrypted version of the message
- Only clients with the shared key can decrypt messages

> ⚠️ For demo purposes, the encryption key is currently static. In production, consider using secure key exchanges or end-to-end protocols.

---

## 🚀 Getting Started

### 📁 Clone the repository

```bash
git clone https://github.com/ANavas07/Chat-app-react.git
cd Chat-app-react
