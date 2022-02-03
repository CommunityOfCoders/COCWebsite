# SETUP

To setup a local development environment, follow the steps given below.

1. Ensure you have NodeJS, npm and redis installed in your system.
2. Fork and then clone the repository
```bash
$ git clone https://github.com/<your-username>/COCWebsite.git
```
3. Install dependencies in `new_client` folder.
```bash
$ cd new_client
$ npm i
```
4. Install dependencies in `server` folder.
```bash
$ cd ../server # If you are in ./server
$ npm i
```
5. Generate environment variables and fill in the values.
```bash
$ cp .env.example .env
```
> Your `.env` is ignored by `git`, which you can see in `.gitignore`, and so, it's safe!
6. Start the development servers
```bash
$ npm run dev
```

At the end of this, you should have
- server running at `http://localhost:8000`
- new_client running at `http://localhost:3000`
- redis running at PORT `6379`

# Folder structure

Our folder structure

```
.
├── new_client
│   ├── public # Stores public files like index.html
│   └── src
│       ├── actions # Redux actions and types
│       ├── reducers # Redux reducers
│       ├── store # Redux store
│       └── components
│           └── auth # A component directory
└── server
    ├── src
    │   ├── config
    │   │   ├── dbconnect.js # Database connections.
    │   │   ├── index.js # Config object
    │   │   └── redis.js # Redis connection
    │   ├── controllers
    │   │   └── AuthController.js # Sample controller
    │   ├── middleware
    │   │   └── auth.js # Express middleware
    │   ├── models
    │   │   └── User.js # Mongoose model
    │   ├── utility # Standard utilities
    │   ├── views # .ejs files for mails
    │   ├── app.js # Main server file
    │   └── routes.js # Express routes
    └── test
        ├── api
        │   └── users_test.js # Sample test file using mocha, chai
        └── test_helper.js # Test config initializers
```

## Bug/ Feature Request

Now that the development environment is all set up, head over to [Contributing](./CONTRIBUTING.md) to learn how to contribute to COCWebsite.
