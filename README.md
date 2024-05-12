# Simple Ecommerce REST Backend

This is a simple RESTful backend for an ecommerce application.

## Features

- User authentication (registration, login, change password)
- Product management (create, retrieve, update)
- Shopping cart functionality (get user's cart, update cart items)

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing

## Getting Started

1. Clone the repository:

\`\`\`bash
git clone https://github.com/your-username/Simple-Ecommerce-REST-backend.git
cd Simple-Ecommerce-REST-backend
\`\`\`

2. Install dependencies:

\`\`\`bash
yarn install
\`\`\`

3. Set up the database:
   
   - Make sure PostgreSQL is installed and running.
   - Set the environment variables in a `.env` file based on the provided `.env.example`.

4. Run the migrations and seed the database:

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

5. Start the server:

\`\`\`bash
yarn start
\`\`\`

6. The server should now be running. You can access the API at `http://localhost:3000`.

## API Endpoints

- `POST /api/register`: Register a new user.
- `POST /api/login`: Login and obtain an access token.
- `POST /api/change-password`: Change the password for the authenticated user.
- `POST /api/products`: Create a new product.
- `GET /api/products`: Retrieve all products.
- `GET /api/products/:id`: Retrieve a specific product by ID.
- `PUT /api/products/:id`: Update a specific product by ID.
- `GET /api/cart/:userId`: Retrieve the shopping cart for a specific user.
- `PUT /api/cart/:userId`: Update the shopping cart for a specific user.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
