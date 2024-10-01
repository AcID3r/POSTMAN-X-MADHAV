1. Project Overview
   
•	Title of Project: "Stock Price Monitoring & Discord Notification System"
•	Description: This project monitors live stock prices and sends automated notifications via Discord when a target stock price is reached. It integrates a frontend stock price viewer, a backend API, and a notification system using Discord bots.
•	Key Features:
o	Real-time stock price monitoring using an API.
o	Notification trigger when the current price matches the target price.
o	User interface for selecting stocks and setting target prices.
o	Discord integration for automated alerts.
________________________________________
2. Collection of Tools, Technologies, and Frameworks
   
•	Backend:
o	Node.js: Backend runtime for JavaScript.
o	Express.js: Web framework used to handle API routing and requests.
o	Discord.js: JavaScript library for interacting with the Discord API.
o	Axios: For making HTTP requests to fetch stock prices from external APIs.
•	Frontend:
o	React (Next.js): For building the frontend UI.
o	Framer Motion: For animations in the UI.
o	CSS (Styled JSX): For styling the user interface.
•	Stock API:
o	Finnhub API: To fetch live stock prices.
•	Tools:
o	Postman: For testing APIs during development.
o	VS Code: Development environment.
________________________________________
3. Installation Instructions and Steps to Run the Project
   
1.	Clone the Repository:
STEP 1-  git clone <repository-url>
STEP 2 - cd <repository-folder>
2.	Install Backend Dependencies: Navigate to the backend folder and install Node.js dependencies:
STEP 1 - cd backend
STEP 2 -  npm install
3.	Set Up API Keys:
o	You’ll need an API key from ___ for stock price fetching.
o	Update the server.js file with your API key
4.	Run the Backend:
STEP 1 - node server.js
5.	Install Frontend Dependencies: Navigate to the frontend folder and install dependencies:
STEP 1 - cd frontend
STEP 2 - npm install
6.	Run the Frontend:
STEP 1 - npm run dev
7.	Test APIs Using Postman: 
FINAL STEP  - Use Postman to make API calls like GET /api/stock-price.
________________________________________
4. Problem Statement and Real-World Impact
   
•	Problem Statement: Investors need a simple way to track stock prices and receive instant notifications when certain conditions, like a target price, are met. Tracking multiple stocks manually can be time-consuming and error-prone.
•	Solution: This project solves the problem by automating stock price monitoring and enabling real-time alerts using a Discord bot. Users can select a stock, set a target price, and be notified as soon as the price threshold is hit, ensuring they never miss a crucial opportunity.
•	Real-World Impact: This system can save investors time and increase the efficiency of trading decisions. By receiving notifications on Discord, users can stay updated on price changes without having to monitor the market continuously.


Disclaimer
This project is self-made and intended for personal and educational purposes only. It is not to be used for any commercial purposes without prior permission. For any use cases involving commercial purposes, please contact me via LinkedIn for permission.

Connect on LinkedIn:
www.linkedin.com/in/madhav-joshi7

License
This project is licensed under the MIT License. However, the code must not be used for commercial purposes without permission.

Author
This project was built by Madhav Joshi. Feel free to reach out for collaboration or if you would like to extend this project.


