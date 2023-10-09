# LostAndFound
Overview
This application serves as a platform for managing items. Users can add, update, delete, and view items. Additionally, the application supports user authentication and notification features.

Technologies
•	Node.js
•	Express.js
•	MongoDB
•	Multer for file upload
•	Axios for HTTP requests

Installation
1.	Clone the repository
git clone https://github.com/Rutik-Deakin/LostAndFound.git
2.	Navigate to the project directory
cd LostAndFound
3.	Install dependencies
npm install
4.	Start the server
npm start
Usage

Endpoints
•	POST /add-item: Adds a new item
•	POST /signup: Registers a new user
•	POST /signin: Authenticates a user
•	GET /items: Fetches all items
•	GET /items/:id: Fetches a single item by ID
•	DELETE /delete-item/:id: Deletes an item by ID
•	POST /add-notification: Adds a notification
•	GET /notifications/:id: Fetches notifications by ID

Environment Variables
MONGODB_URI = 'mongodb+srv://admin:admin@project.efwork4.mongodb.net/?retryWrites=true&w=majority'

File Structure
•	FrontEnd/: Contains all the front-end files.
•	BackEnd/: Contains all the back-end files.
•	Controllers/: Contains all the controller files.
•	Models/: Contains all the model files.
•	FrontEnd/images/uploadedImage/: Contains uploaded images.
•	Routers/: Contains all the routing files.

Contributing
•	Fork the repository
•	Create your feature branch (git checkout -b feature/fooBar)
•	Commit your changes (git commit -am 'Add some fooBar')
•	Push to the branch (git push origin feature/fooBar)
•	Create a new Pull Request

License
This project is licensed under the MIT License.
