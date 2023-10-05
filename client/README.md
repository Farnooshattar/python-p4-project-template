Events Master
Events Master is a web application that allows users to explore and manage events. This README provides an overview of the application's structure and functionality.

Events Master provides the following features:

User Authentication: Users can create accounts or log in to existing ones.
Event Exploration: Users can view a list of events available.
Cart Management: Users can add events to their cart for later viewing.
Comments: Users can post comments on events.
Logout: Users can safely log out of their accounts.
Prerequisites
Before running the application, you'll need the following:

Python (3.6 or higher)
Node.js (for the React frontend)
SQLite (for the database)
Installation
Backend (Flask)

The Flask backend should be running on http://localhost:5000.

The React frontend should be running on http://localhost:3000.

Usage
Open your web browser and visit http://localhost:3000.

You can create a new account or log in with an existing one.

Explore available events, add events to your cart, and post comments on events.

When you're done, you can log out.

Details:
Flask Backend
The Flask backend provides the server-side functionality for your web application. It includes routes for user authentication, event management, cart functionality, comments, and more.

app.py: This is the main Flask application file. It sets up the Flask app, configures the database, and defines the routes for various actions.

models.py: This file defines the database models using SQLAlchemy. In your code, you have defined three models: User, Event, and Comment. These models represent the structure of your database tables.

config.py: This file contains configuration settings for the Flask application, such as the database URI and other application-specific configurations.

requirements.txt: This file lists all the Python packages and their versions required for running your Flask application. You can install these packages using pip install -r requirements.txt.

Routes and Functionality
User Authentication (/signup, /login, /logout): You have routes for user signup, login, and logout. User data is stored in the User model.

Event Management (/events, /userevents): These routes handle events. /events allows users to fetch a list of available events, while /userevents retrieves events associated with the currently logged-in user.

Comments (/events/<int:event_id>/comments): This route allows users to post comments on specific events. Comments are associated with both users and events.

Cart Management (/incart, /add_event_to_user, /remove_event_from_user): These routes handle adding and removing events from a user's cart. You use the Event model's in_cart attribute to manage the cart.

React Frontend
The React frontend provides the user interface for your web application. It allows users to interact with your backend through a user-friendly interface.

App.js: This is the main React component that defines the routing for your application. It uses the react-router-dom library to navigate between different pages (components).
Pages and Components
Authenticate (Authenticate.js): This component handles user authentication. Users can sign up or log in using their username and email. Depending on whether the user is signing up or logging in, a different form is displayed.

HomePage (HomePage.js): This is the main page of your application. It displays a carousel of events and allows users to switch between different tabs: "Home" (event list), "My Cart" (user's cart), and "About." Users can also log out from this page.

EventsList (EventsList.js): This component displays a list of available events. Users can add events to their cart from this list.

UserEvents (UserEvents.js): This component shows events in the user's cart. It updates the list when events are added or removed from the cart.

LogoutPage (LogoutPage.js): This page displays a simple message when the user logs out. It provides a link to return to the homepage.

Functionality
User Authentication: Users can create accounts or log in. The user's information is sent to the Flask backend for processing. Upon successful login, the user is redirected to the homepage.

Event Exploration: Users can view a list of available events on the "Home" tab. Event data is fetched from the Flask backend.

Cart Management: Users can add events to their cart and view the cart on the "My Cart" tab. Cart-related actions are sent to the Flask backend.

Comments: Users can post comments on specific events. Comment data is associated with the user and the event and is stored in the database.

Logout: Users can log out from any page, which invalidates their session and redirects them to the logout page.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
