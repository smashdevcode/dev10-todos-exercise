
# Dev10 Yet Another ToDos Application (Now with React!)

## Running the Applications

After you've cloned this repo, open the `server` folder into IntelliJ and run the `App.main()` method. Then from a terminal window, `cd` into the `client` folder, run `npm install` then `npm start` to start the React app.

## Tasks

* [ ] Add a form to the `ToDos` component to add a new ToDo
  * [ ] Add a form element with a single input element and button
  * [ ] Add a change event handler method for the description input element
  * [ ] Add a submit event handler method for the form
  * [ ] Within the form submit handler method, use the Fetch API to make a POST to the API
  * [ ] On success, use the Fetch API to get the list of ToDos and update the component's state

* [ ] Update the `ToDos` component to properly handled 400 BAD REQUEST responses
  * Display all error messages returned by the server when the response has a `400 BAD REQUEST` HTTP status code

* [ ] Update the `ToDos` component to support deleting ToDos

* [ ] Update the `ToDos` component to support editing ToDos

* [ ] Style your app
  * [ ] Add the Bootstrap CSS stylesheet to the `index.html` page
  * [ ] Update your JSX elements to use Bootstrap appropriate markup

## Homework

**Start with completing any of the main tasks that are undone!**

Then choose one (or more) of the following:

* Refactor the React app to use multiple components
* Refactor the React app to use `async`/`await` for all of the Fetch API calls
* Build another simple CRUD React + Spring API app with the theme of your choice
* Read the React tutorial or watch one of the free Egghead React video courses
  * https://reactjs.org/tutorial/tutorial.html
  * https://reactjs.org/community/courses.html
* Work on the new, unofficial "Ramping Up on React" exercise
  * I can send this to you 1:1 via Teams
