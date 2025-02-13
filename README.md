# Demo of API using Express.js

## Getting Started

### Prerequisites

- Docker
- Node.js
- npm

### Installation

1. **Install Dependencies**

   Navigate to the root directory and run the following command to install the necessary dependencies:

   ```sh
   npm install
   ```

2. **Run Docker Compose**

    In a separate terminal, navigate to the docker directory and run the following command to start the Docker containers:
    ```sh
    cd docker
    docker-compose up   
    ```

3. **Run the Application**
    In another terminal, navigate back to the root directory and run the following command to start the application in development mode:

    ```sh
    npm run dev
    ```

4. **Testing via Swagger**
    Once the application is running, you can test the API endpoints using Swagger. Open your browser and navigate to:

    ```sh
    http://localhost:5000/api-docs
    ```

    This will open the Swagger UI where you can interact with the API.