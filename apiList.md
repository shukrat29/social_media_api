# DevHub api

# authRouter

- POST /signup
- POST /login
- POST /logout

# profileRouter

- GET /profile/view
- PATCH /pfofile/edit
- PATCH /frofile/password (for forgot password API) Homework

# connectionRequestRouter

# status: ignored, interested (as a sender)

- POST /request/send/:status/:userId

#

- POST /request/review/:status/:requestId

# userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed - gets you the profiles of other users on platform
