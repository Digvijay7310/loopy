# Loopy

A modern, sleek video sharing platform where users can upload, watch, like, comment, and share videos. No subscription system — just simple, engaging video content for everyone.

---

## Table of Contents

- [About Loopy](#about-loopy)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Folder Structure](#folder-structure)  
- [API Endpoints](#api-endpoints)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

---

## About Loopy

Loopy is a responsive and user-friendly video sharing platform where registered users can:

- Upload and share their own videos  
- Watch videos uploaded by others  
- Like and comment on videos  
- Share video URLs easily  

Designed to be simple and focused, Loopy excludes complex features like subscriptions to keep the experience straightforward and engaging.

---

## Features

- User Authentication (Login/Signup)  
- Video Upload with metadata (title, description, thumbnail)  
- Video Playback with modern HTML5 video player  
- Like system for videos  
- Comment section with real-time updates  
- Share functionality (copy video URL to clipboard)  
- Responsive UI built with React and Tailwind CSS  
- Real-time feedback with toast notifications  
- Smooth animations with AOS  
- Error handling and loading states  

---

## Tech Stack

| Layer        | Technology                  |
| ------------ | --------------------------- |
| Frontend    | React, React Router, Tailwind CSS, React Icons, AOS |
| Backend     | Node.js, Express.js (assumed)    |
| Database    | MongoDB (assumed)           |
| HTTP Client | Axios                      |
| Notifications | React Toastify            |
| Authentication | Cookie-based sessions / JWT (assumed) |

---

## Getting Started

### Prerequisites

- Node.js v14+  
- npm or yarn  
- MongoDB instance (local or cloud)  

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Digvijay7310/loopy.git
   cd loopy



2. Install dependencies:

bash
Copy
Edit
npm install
# or
yarn install




Usage
Sign Up / Login: Register or log in to your account to upload videos and interact.

Upload Videos: Use the upload page/form to add new videos with title and description.

Watch Videos: Browse the homepage or suggested videos and click to watch.

Like & Comment: Engage with videos by liking or adding comments in real-time.

Share: Easily share video links via the share button (copies URL to clipboard).