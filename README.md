# Further Introduction to React.js

Video: <https://www.youtube.com/watch?v=kNk_ycw5uM8>

## Adding Express.js backend

Video: <https://www.youtube.com/watch?v=N9Xg9zu5v4I>

## Integrating PostgreSQL Database with pgAdmin

Video: <https://www.youtube.com/watch?v=CmxQ-R7YgJg>

## How to Run

Copy `.env.example` to a new file `.env`. Then fill in the values for each variable.

```
# macOS / Linux
cp .env.example .env

# Windows
copy .env.example .env
```

Install dependencies:

```
npm install
```

Have two terminal windows, one for backend server:

```
# todo: make npm run server
node ./server/index.js
```

And another for the frontend client:

```sh
npm start
```
