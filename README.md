# CompassoUOL  
  
## Step 1  
  
Installing dependencies, in the project folder, where you can find the "package.json" file run "npm install".  
  
## Step 2  
  
Configure the ".env" file with the server port and your database configuration.  
  
## Step 3  
  
Finally run "npm test" to start the server running in Nodemon module. Or "npm start" to run using PM2 module.  
   
# API Usage  
  
## Get All  
  
GET http://localhost/api/clients?name=cesar&limit=10&page=1&reverse=false  
  
GET http://localhost/api/cities?name=recife&state=pernambuco&limit=10&page=1&reverse=false  
  
Description:  
  
It is possible to filter the seach. "name", "state", "limit", "page" and "reverse" if used can't be empty.  
Default: "limit" = 10, "page" = 1 and "reverse" = false.  
  
limit -> Number of elements returned in the request.  
page -> Simulating a pagination, it is possible to get the elements in the informed page, returning the "number of elements" <= "limit".  
reverse -> Indicates if the list is in order of creation or if it has to be inversed.  
  
## Get  
  
GET http://localhost:8888/api/clients/7c36c58b-63ec-4206-8188-ac4c5ec3e829  
  
GET http://localhost:8888/api/cities/7c36c58b-63ec-4206-8188-ac4c5ec3e829  
  
## Create  
  
POST http://localhost/api/clients  
  
body = {  
   name: ''  
}  
  
POST http://localhost/api/cities  
  
body = {  
   name: '',  
   state: ''  
}  
  
## Update  
  
PUT http://localhost:8888/api/clients/7c36c58b-63ec-4206-8188-ac4c5ec3e829  
  
body = {  
   name: ''  
}  
  
PUT http://localhost:8888/api/cities/7c36c58b-63ec-4206-8188-ac4c5ec3e829  
  
body = { 
   name: '',  
   state: ''  
}  
  
## Soft Delete  
  
DELETE http://localhost:8888/api/clients/7c36c58b-63ec-4206-8188-ac4c5ec3e829  
  
DELETE http://localhost:8888/api/cities/7c36c58b-63ec-4206-8188-ac4c5ec3e829  
  
## Restore  
  
POST http://localhost:8888/api/clients/7c36c58b-63ec-4206-8188-ac4c5ec3e829/restore  
  
POST http://localhost:8888/api/cities/7c36c58b-63ec-4206-8188-ac4c5ec3e829/restore  
