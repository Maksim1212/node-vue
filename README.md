** Simple Node js + Vue js APP **
## Components
1)Auth
2)User
3)Weather
## Routes
http://localhost:3000/v1/auth/login --GET (csrf && JWT)
http://localhost:3000/v1/auth/register --GET (GET (csrf && JWT))
http://localhost:3000/weather/ --GET (need JWT token)
http://localhost:3000/v1/auth/401/ --GET
http://localhost:3000/v1/auth/404/ --GET
http://localhost:3000/v1/users/ --GET
## Installation

```bash
$ npm install
```
## Running the app
```bash
$ npm run start
