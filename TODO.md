# Todos
- refresh cookies working properly
- Make terms pages
- Why someone should sign up banner/modal
- Avatar image when no profile image available
- Google setup for links being tracked
- Welcome email when signing up
- Notification to me when someone signs up
- Email Feature - https://maizzle.com/
- https://api.api-ninjas.com/v1/randomword
- Whenever a poem is published an email sent out to distribution list of that poem
- Potentially useful about Nextjs with Graphql: https://www.prisma.io/blog/fullstack-nextjs-graphql-prisma-2-fwpc6ds155#setting-up-apollo-client-in-nextjs

# Pages Ideas/SEO
- Emily Dickinson article
- Article about using Open AI

# Favorites

- user needs list of favorites (post ids)
- Post to show if favorited when user sees it
# Auth Task
- Update tokens to send in cookies like Lazy twitter - Backend
- https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#basics-login Explains about auth and tokens (JWT)
- https://www.apollographql.com/docs/react/api/link/introduction/ - Probably need ApolloLink on Frontend for auth with Apollo?
- Read about Nextjs Auth: https://thewidlarzgroup.com/nextjs-auth/

# Nestjs backend

https://github.com/notiz-dev/nestjs-prisma-starter

- Postgres in docker:
- Use Prisma https://wanago.io/2021/03/29/api-nestjs-prisma-postgresql/
- Set up Apis
- Add OAuth - Github
- Email:
  - https://mailpace.com/#pricing - SMTP server, use NodeMailer
  - https://developers.sendinblue.com/reference/createemailcampaign-1 Possibly?
  - https://notiz.dev/blog/send-beautiful-emails-crafted-with-maizzle - Create email templates
  - https://notiz.dev/blog/send-emails-with-nestjs# - Send emails
  - Transactional emails
  - Email Poems


# Email feature

- Need an email SMTP server to call via an API
- Need to generate the emails dynamically from a template - sending text
- Need to trigger the email send

# Steps

- Create a DB Table to store email addresses and name
- Will need a GDPR Shit on site
- When generating a poem, grab list of all emails from table
- Generate poem in email template too - maizzle??
- use nodemailer to send email via which smtp host?? - gmail??
- Batch send to all users (via bcc?)

# Useful links
- https://github.com/notiz-dev/nestjs-prisma-starter/tree/main/src
- https://wanago.io/2021/03/29/api-nestjs-prisma-postgresql/