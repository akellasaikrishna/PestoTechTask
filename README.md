# PestoTechTask

**Folder Structure**
- The application repo consists of two folders.
  They are:
  * client
  * server
- *Server folder* contains all the code related to the backend application handling all the CRUD operations of the tasks applications.
- *Client folder* contains all the code for the UI of the application used to list all the tasks and add/update and delete existing tasks.

**Running the application**
- The client application can be run from the client folder by running the script *npm run dev*. The application will be running on port 5173 by default. The url will be *http://localhost:5173/*.
- The server application can be run from the server folder by running the script *node server.js* (or) *nodemon server.js (if nodemon is installed)*. The backend application will be running on *port 3000* by default.

  **Backend Endpoints**
    - create - http://localhost:5173/tasks/create - POST {title: '', description: '', status: '', created: ''}
    - read - http://localhost:5173/tasks/getAllTasks - POST - {}
    - update - http://localhost:5173/tasks/update - POST - {id: '', title: ''}
    - delete - http://localhost:5173/tasks/delete - POST - {id: ''}
