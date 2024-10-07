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

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

# userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed (fetches 20/30.... users at a time)
