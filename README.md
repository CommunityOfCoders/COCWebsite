# Ye hai README

The project consists of two parts __client__ and __server__.

The folder __new_client__ is under development currently and will replace the client folder someday.

Tips to get started :-

1. Clone the repo.
```bash
    git clone https://github.com/CommunityOfCoders/COCWebsite.git
```

2. Navigate to the server folder. 
```bash
    cd server
```

3. This one is dependent on what you wish to start henceforth.
    
    a. To start the server, type `npm run start`.

    b. To start the development server (the one that uses nodemon), type `npm run serve`.

    c. To start the new_client folder, type `npm run new_client`.

    d. To start both the server and the new_client __concurrently__, type `npm run dev`.


For the developers and the contributors :-

Always run the following two commands in all folders containing node_modules to ensure that the `package-lock.json` doesn't break.

```bash
    npm i
    npm ci
```
