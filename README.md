# What's this?

[Qurl.gq](https://qurl.gq) is an open-source URL Shortener written in Node.js 🔗 

# Contributing ideas
- Apply a custom font
- Add tests
- Add IP address logging
- UI Improvements
- Sanitise user input

# Screenshots

<a href="https://qurl.gq">
  <img width="1434" alt="Screen Shot 2022-10-06 at 1 00 44 PM" src="https://user-images.githubusercontent.com/76220359/194374946-3312cbd2-0380-41bb-9701-58432c961696.png">
</a>

<a href="https://qurl.gq/658ys/info">
  <img width="1434" alt="Screen Shot 2022-10-06 at 1 01 15 PM" src="https://user-images.githubusercontent.com/76220359/194374986-a71ef6c6-42c7-466e-aab7-ee658c97d462.png">
</a>

# Development

Clone the repo
```bash
git clone https://github.com/TheRedstoneRadiant/Qurl.gq
cd Qurl.gq
```

Copy .env.example and replace MongoDB URI
```bash
cp .env.example .env
nano .env
```

Install dependencies
```bash
npm install
```

Start development server
```bash
npm run dev
````

# Tech Stack
Webserver: [Express.js](https://expressjs.com)

Database: [MongoDB](https://www.mongodb.com)

CSS Library: [PicoCSS](https://picocss.com)
