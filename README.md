# Netflix Clone

## Table of Contents

## Database using Prisma ORM

Installation:

    npm i -D prisma 
    npm i @prisma/client

Initialize:

    npx prisma init

Add the following to lib/prisma.ts

    import { PrismaClient } from "@prisma/client";

    const client = global.prisma || new PrismaClient();
    if (process.env.NODE_ENV !== "production") global.prisma = client;

    export default client;

Create models in prisma/schema.prisma

Update database schemas

i. Pushing changes:

    npx prisma db push 

ii. Using migrations:

    npx prisma migrate dev --name <migration-name>

## Fetch using SWR

    npm i swr

## Icons

    npm i react-icons
    npm i @heroicons/react

## Authentication using NextAuth Sessions [Read Docs](https://next-auth.js.org/getting-started/example)
