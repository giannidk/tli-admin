import firebase from 'firebase';
import config from './firebase-config';

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();
export const baseRoot = '/users/3905';
export const TMP_USER = `3905`;
export const calendarRoot = `calendar`;
export const teachersRoot = `teachers`;
export const clientsRoot = `${baseRoot}/clients`;
export const projectsRoot = `${baseRoot}/projects`;
export const clientsProjectsRoot = `${baseRoot}/clientsProjects`;
export const registrationsRoot = `${baseRoot}/registrations`;
export const projectsRegistrationsRoot = `${baseRoot}/projectsRegistrations`;
export const invoicesRoot = `${baseRoot}/invoices`;
export const projectsInvoicesRoot = `${baseRoot}/projectsInvoices`;