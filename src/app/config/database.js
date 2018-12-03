import firebase from 'firebase';
import config from './firebase-config';

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();

export const baseRoot = '/users/3905';
export const calendarRoot = `calendar`;
export const clientsProjectsRoot = `${baseRoot}/clientsProjects`;
export const clientsRoot = `${baseRoot}/clients`;
export const invoicesRoot = `${baseRoot}/invoices`;
export const projectsInvoicesRoot = `${baseRoot}/projectsInvoices`;
export const projectsRegistrationsRoot = `${baseRoot}/projectsRegistrations`;
export const projectsRoot = `${baseRoot}/projects`;
export const registrationsRoot = `${baseRoot}/registrations`;
export const teachersRoot = `teachers`;
export const usersRoot = "users";

export const TMP_USER = `3905`;