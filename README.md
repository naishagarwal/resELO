# resELO
Application management system for recruiters with ELO scoring

### Running the Project
We use Firebase in this project for user-authentication using Firebase's RealTime Database. By creating a project on Firebase and creating a Realtime Database, one should be able to obtain a private API key and other information needed to run the realtime databse in a file "service_account.json". This file should be added to the Server folder in this repo, so that the Firebase Realtime
Database can run and successfuly user authenticate.

One will also need to install the firebase package using the command. Also run npm install to install all other packages needed:
```
npm install firebase
npm install
```
to obtain all firebase packages and commands needed.

Once the firebase is set up, they should now start up two terminals in their IDE. In the first terminal, they should start the server. The command for this is:
```
node Server/server.js
```
Once the server is running, they can run the project code on the other terminal with the command:
```
npm start
```
This should take them to the home page.

### About Our Project
The home page provides basic information about this web app and allows the user to choose to "LOG IN" or "CREATE ACCOUNT". When "LOG IN" is clicked, the user will be taken to another page where they can fill in the email and password for their account. If they choose the "CREATE ACCOUNT" page, they will be taken to a page where they can fill in an email and password (with at least six characters). Creating the account and logging in will both take the user to the Club Dashboard.

On the Club Dashboard, the user can create their clubs. When a club is created, it appears on the dashboard along with a unique link. When the link is copied and used, it takes the user to an upload page. This page is for the applications of the user. They can upload their resume and it will automatically be added to their club. If the user clicks on the club on the club dashboard it will take them to the club page where they can view and search for all the applicants in a ranking list as well as general stats. Here, they can also click the button “Compare” to actually compare the resumes that the applicants submitted. 

Once they click “Compare,” they will be taken to another page where two random resumes will appear and the user can choose which of the two they prefer. The ranking list on the club dashboard will automatically be updated as the user makes his/her selections.

Finally, the user can log out at any time with the “LOG OUT” button on the top right of every signed-in page.

