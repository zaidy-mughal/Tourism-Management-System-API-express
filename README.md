# Tourism Management System API (Express)

## Project Description
The **Tourism Management System API** is a backend solution designed to manage tourism-related data efficiently. This API, built using Node.js and Express.js, focuses on handling information about attractions, visitors, and reviews. It incorporates robust validations and unique features to ensure high performance, usability, and functionality.

---

## Directory Structure

```
├── controllers
│   ├── AttractionController.js
│   ├── VisitorController.js
│   └── ReviewController.js
├── models
│   ├── Attraction.js
│   ├── Visitor.js
│   └── Review.js
├── routes
│   ├── attractionRoutes.js
│   ├── visitorRoutes.js
│   └── reviewRoutes.js
├── .gitignore
├── package-lock.json
├── package.json
└── server.js
```

## Features

### 1. Core Functionalities
- **Attractions:**
  - Add, update, delete, and retrieve information about various attractions.
- **Visitors:**
  - Manage visitor data including registration, updates, and retrieval.
- **Reviews:**
  - Handle reviews for attractions, including CRUD operations.

### 2. Unique Features
- **Morgan Integration:**
  - Morgan is implemented for logging HTTP requests, aiding in debugging and monitoring the API usage.
- **CORS (Cross-Origin Resource Sharing):**
  - Enables secure access to the API from various domains, ensuring seamless frontend-backend integration.

### 3. Improvements
- **Functionality:**
  - Optimized routes and controllers for better scalability and maintainability.
- **Performance:**
  - Lightweight and efficient architecture for handling multiple requests simultaneously.
- **Usability:**
  - Well-structured and consistent API endpoints for intuitive interaction.

### 4. Validations
All API routes are equipped with robust validation mechanisms to:
- Ensure data integrity.
- Prevent invalid or malicious data submissions.
- Provide detailed error messages to users.

---

### Overview of Key Files
1. **`controllers/`**
   - Contains the business logic for managing attractions, visitors, and reviews.
2. **`models/`**
   - Defines the schema and data structure for the application's entities.
3. **`routes/`**
   - Defines the API endpoints and links them to respective controller methods.
4. **`server.js`**
   - Main entry point for the application, responsible for starting the server.

---

## Installation & Setup

### Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/zaidy-mughal/Tourism-Management-System-API-express.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Tourism-Management-System-API-express
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

---

## API Endpoints
##### Postman Link
`https://go.postman.co/workspace/208d0e66-a364-43fa-87df-f507bb4596c4/collection/36923264-d1865bb3-677c-4a31-b056-3c242819d6d6`

### Attractions
- `GET /api/attractions` - Retrieve all attractions
- `POST /api/attractions` - Add a new attraction
- `PUT /api/attractions/:id` - Update an attraction
- `DELETE /api/attractions/:id` - Delete an attraction

### Visitors
- `GET /api/visitors` - Retrieve all visitors
- `POST /api/visitors` - Register a new visitor
- `PUT /api/visitors/:id` - Update visitor information
- `DELETE /api/visitors/:id` - Delete a visitor

### Reviews
- `GET /api/reviews` - Retrieve all reviews
- `POST /api/reviews` - Add a new review
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review


---

## Contributing
Contributions are welcome! If you encounter any issues or have suggestions for improvements, feel free to create an issue or submit a pull request.

---

## License
This project is licensed under the MIT License.

---

## Acknowledgments
Special thanks to the open-source community for providing excellent libraries and tools that made this project possible.

