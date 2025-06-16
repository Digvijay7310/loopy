This is the backend of loopy

This project is made with express, node, mongoose, jsonwebtoken, bcrypt, multer and cloudinary

- Here we are made 4 models:-

1. User model
2. Video model
3. Comment model
4. Like model

For upload a video or thumbanial we use cloudinary with multer

- User routes
  /register with post
  /login with post
  /profile with get
  /update-profile with put
  /logout with post

- Video routes
  /upload with post
  /videos with get
  /my-videos with get
  /video/:videoId with get
  /my-comments-videos with get
  /my-likes-videos with get
  /delete-my-video/:videoId with delete
  /delete-all-videos with delete
