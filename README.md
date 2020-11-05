[![Build Status](https://travis-ci.org/oyedotunsodiq045/softoverflow.svg?branch=main)](https://travis-ci.org/oyedotunsodiq045/softoverflow)

# SoftOverflow

> SoftOverflow backend API.

## Quick Start

```bash
# Install dependencies
npm i

# Install dev-dependencies
npm i -D nodemon

# Serve on localhost:7000 (development)
npm run dev

# Serve on localhost:7000 (production)
npm start

# Import sample data into mongodb
node seeder -i

# Delete data from mongodb
node seeder -d
```
### Instruction

| Note                                                                                 |
| ------------------------------------------------------------------------------------ |
| URL &nbsp; &nbsp; &nbsp; &nbsp; https://softoverflow.herokuapp.com                   |
| URL &nbsp; &nbsp; &nbsp; &nbsp; https://softoverflow.glitch.me                       |
|                                                                                      |

### Testing

| Routes                                                                               | Description                  |
| ------------------------------------------------------------------------------------ | ---------------------------- |
| Authentication                                                                       |                              |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/register                                   | Register a User              |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/auth/login                                      | Login User                   |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/me                                   | Get Logged in User           |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/auth/logout                               | Logout User                  |
|                                                                                      |                              |
| Questions                                                                            |                              |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/questions                                       | Ask Question                 |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/questions                                 | Get All Questions            |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/questions/:id                             | Get Single Question          |
|                                                                                      |                              |
| Answers                                                                              |                              |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/questions/:questionId/answers                   | Answer Question              |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/answers                                   | Get All Answers              |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/questions/:questionId/answers             | Get Answers For Question     |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/answers/:id                               | Get Single Answer            |
|                                                                                      |                              |
| Ratings                                                                              |                              |
| POST &nbsp; &nbsp; &nbsp; url/api/v1/questions/:questionId/ratings                   | Add Rating For Question      |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/ratings                                   | Get All Ratings              |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/questions/:questionId/ratings             | Get Rating For Question      |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/ratings/:id                               | Get Single Rating            |
|                                                                                      |                              |
| Users                                                                                |                              |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/users                                     | Get All Users                |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/users/:id                                 | Get Single User              |
|                                                                                      |                              |
| Advanced Filtering                                                                   |                              |
| Questions                                                                            |                              |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/questions?categories[in]=Java             | Search Questions by category |
| Answers                                                                              |                              |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/answers?isSolution=true                   | Search Answers by isSolution |
| Users                                                                                |                              |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/users?role=user                           | Search Users by role         |
|                                                                                      |                              |
| Select, Sorting                                                                      |                              |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/questions?select=question,averageRating   |                              |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/ratings?sort=createdAt                    | Sort Rating, Ascending       |
|                                                                                      |                              |
| Pagination                                                                           |                              |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/questions?page=2&limit=2                  |                              |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/questions?select=question&page=1          |                              |
| GET &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/questions?page=2                          |                              |
