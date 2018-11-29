import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAMyA8XV_gzZiK084FDINNJbM2-l6sgYig",
  authDomain: "react-tli.firebaseapp.com",
  databaseURL: "https://react-tli.firebaseio.com",
  projectId: "react-tli",
  storageBucket: "react-tli.appspot.com",
  messagingSenderId: "489660422364"
};

firebase.initializeApp(config);

const database = firebase.database();
const baseRoot = '/users/3905';
const TMP_USER = `3905`;
const calendarRoot = `calendar`;
const teachersRoot = `teachers`;
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
  TMP_USER,
  teachersRoot,
  calendarRoot,
  clientsRoot,
  projectsRoot,
  clientsProjectsRoot,
  registrationsRoot,
  projectsRegistrationsRoot,
  invoicesRoot,
  projectsInvoicesRoot,
};
