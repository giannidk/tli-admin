import firebase from 'firebase';


/* var config = {
    apiKey: "AIzaSyAMyA8XV_gzZiK084FDINNJbM2-l6sgYig",
    authDomain: "react-tli.firebaseapp.com",
    databaseURL: "https://react-tli.firebaseio.com",
    projectId: "react-tli",
    storageBucket: "react-tli.appspot.com",
    messagingSenderId: "489660422364"
  };
   */

var config = {
    apiKey: "AIzaSyBRYMDh-hJEYpWI1mg_2P36bvjT3n7jhuo",
    authDomain: "reactfreelance.firebaseapp.com",
    databaseURL: "https://reactfreelance.firebaseio.com",
    projectId: "reactfreelance",
    storageBucket: "reactfreelance.appspot.com",
    messagingSenderId: "1020252082009"
  };
  firebase.initializeApp(config);

const database = firebase.database();
const baseRoot = '/users/3905';
const clientsRoot = `${baseRoot}/clients`;
const projectsRoot = `${baseRoot}/projects`;
const clientsProjectsRoot = `${baseRoot}/clientsProjects`;
const registrationsRoot = `${baseRoot}/registrations`;
const projectsRegistrationsRoot = `${baseRoot}/projectsRegistrations`;
const invoicesRoot = `${baseRoot}/invoices`;
const projectsInvoicesRoot = `${baseRoot}/projectsInvoices`;

export {
  database, 
  baseRoot,
  clientsRoot,
  projectsRoot,
  clientsProjectsRoot,
  registrationsRoot,
  projectsRegistrationsRoot,
  invoicesRoot,
  projectsInvoicesRoot
};
