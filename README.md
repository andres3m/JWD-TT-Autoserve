### Vehicle Inventory App 🚘

#### **Description**

Full-stack app that retrieves and displays vehicle details via API calls. 

Search by id and by car specs:
- Make
- Model
- Year
- Price
- Fuel type
- Mileage
- Transmission type

Tech stack:
Frontend:
- React (hooks and functional components)
- Tailwind CSS
- React-loader-spinner (for loading indicator)

Backend:
- Next.js
- Node.js
- Prisma ORM

Database: Postgresql hosted in Elephant.sql for production and SQL Lite for dev local

Deployment: Vercel


#### **Instructions**

Check the deployed app out: https://jwd-tt-autoserve.vercel.app/

or

Run the app locally:

1. Clone the repo:
```
git clone https://github.com/andres3m/JWD-Tech-Test-Autoserve.git
```
2. Enter in the project folder:
```bash
  cd JWD-Tech-Test-Autoserve/
```
3. Install dependencies
```
npm i
```
4. Update JWD-TT-Back-End\prisma\schema.prisma file to have SQLite provider:

From
```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
To
```
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```
5. Run "npx prisma generate" to create a JavaScript client to interact with your database. It should be runned every time you make changes to your Prisma schema or when setting up the Prisma Client for the first time.
```
npx prisma generate
```
6. Run the app
```
npm run dev
```
6. If no vehicles are displayed run the database seed to populate the database with test data and try again.
```
npx prisma db seed
```
