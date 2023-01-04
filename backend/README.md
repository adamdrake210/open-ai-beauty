## Nestjs Backend

The backend is a Nestjs application.

## Development

To get the backend up and running you need to follow these steps:

1. Start the docker postgres container:

```
docker-compose -f docker-compose.db.yml up
```

2. Start the app in dev watch mode

```
npm run start:dev
```

3. To see the DB content

```
npx prisma studio
```

## Deployment

For deploying on Heroku please use this command:

`git subtree push --prefix backend heroku main`
