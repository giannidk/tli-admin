import {
	database,
  projectsRoot,
  registrationsRoot as regsRoot,
  projectsRegistrationsRoot as projectsRegsRoot
} from '../../firebase';
import {
	FETCH_PROJECTS,
	FETCH_PROJECTS_SUCCESS,
	FETCH_PROJECTS_FAIL,
	FETCH_PROJECT_DETAILS,
	FETCH_PROJECT_DETAILS_SUCCESS,
	FETCH_PROJECT_DETAILS_FAIL,
} from './types';

export function fetchProjects() {
	return (dispatch) => {
	dispatch({
			type: FETCH_PROJECTS
		});	
		// Fetching projects
		database.ref(projectsRoot)
			.once('value')
			.then(
				// success
				snap => {
					let projects = { ...snap.val() };
					dispatch({
						type: FETCH_PROJECTS_SUCCESS,
						payload: projects
					})
				}, 
				// error
				error => {
					dispatch({
						type: FETCH_PROJECTS_FAIL,
						error: 'There has been an error retieving the projects list!'
					})
				}); 
	};
};

export function projectDetails(key) {
	return (dispatch) => {
	dispatch({
			type: FETCH_PROJECT_DETAILS
		});	
		// Fetching project's details
		database.ref(projectsRoot).child(key)
			.once('value', 
			// success
			snap => 
			{            
				// Creating new container Objct
				let projectDetails = {...snap.val(), registrations: {} };				
				 // Fetching all Project's Registrations
				database.ref(projectsRegsRoot).child(key)				
        .once('value')
        .then( snap => {           
          // control if the project has some registrations, otherwise return dispatch
          if (snap.val() === null) {
              dispatch({
                    type: FETCH_PROJECT_DETAILS_SUCCESS,
                    key: key,
                    payload: projectDetails
                  }); 
          }
          // if the project has registrations, fetch details
          snap.forEach( regSnap => {
            // Retrieve registration Details
              database.ref(regsRoot).child(regSnap.key)
              .once('value')
              .then(
                // success
                regsDetails => { 
                  projectDetails.registrations = { ...projectDetails.registrations, [regsDetails.key]: regsDetails.val()}
                  projectDetails = { ...projectDetails, ...projectDetails.registrations}
                  dispatch({
                    type: FETCH_PROJECT_DETAILS_SUCCESS,
                    key: key,
                    payload: projectDetails
                  }); 
                },
                // error
                () => { console.log('ERROR');}
              )
          })
        });
				   
			},
			// error
			error => {
				  dispatch({
					type: FETCH_PROJECT_DETAILS_FAIL,
					error: 'There has been an error retieving the project!'
				})  
			}
		);

	};
};
