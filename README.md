# Simple User Login Web

## Using 
- Passport.js
> for user authenticate
- MongoDB
> NoSQL database to store user
- Connect-Flash
> flash validate error & warning
- Bcrypt.js
> use bcrypt to hash password and save to db
- View Engine : EJS
> frontend render
- Bootstrap.css
> simple frontend css style
- Unsplash
> free images source



## How to install

Install modules

```
npm install
```

Add MongoDB database uri to .env

```
DATABASE_URI=YOUR_MONGODB_URI
```

Add session secretkey to .env

```
SESSION_SECRET=SECRET_KEY
```

You can generate secret key by running "crypto_generator.js" file

```
node crypto_generator
```

## Run server

Now You can run the server and see it on localhost:3000

```
npm run devStart
```

![Demo](https://github.com/fatsoap/Simple-User-Login-Web/blob/master/demo.PNG)

