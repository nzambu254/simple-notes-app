## Simple Notes App

Welcome to our technical assignment!
This short project will help us understand how you approach coding, structure your work, use Git & GitHub. Feel free to ask questions or for clarification.

### Duration
This project is designed to be completed in **1–2 days**(by Wednesday, 8th October).  
We’re not looking for perfection, we just want to see how you approach problems, structure code, and use the basics of React, Node, or Laravel.

### Goal
Build a very simple **Notes App** that allows a user to :
- Add a note (title + content)
- View all notes
- Edit a note
- Delete a note
You can choose React, Node.js or Laravel depending on your area of focus or comfort.

### Instructions
1. Fork this repository to your own GitHub account.
2. Create a new folder under the /submissions directory using your full name (e.g. submissions/BrianMwangi/).
3. Inside your folder, create your project files
4. Include a README.md inside your folder with:
	- Short project description
	- Setup steps (how to run it)
	- Any notes or improvements you'd make
5. Once done, push your code to your forked repository.
6. Finally, open a Pull Request to this main repo.

#### Frontend ![React Badge](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
**Requirements**:
- Create a simple page to list all notes.
- Add a form to create a new note.
- Allow deleting and editing notes.
- Data can be stored in memory (just using React state) or fetched from an API if backend if you will be also build the backend.
**What we'll look for**:
- Understanding of  React basics (`useState`, `useEffect`).
- Clean, organized components.
- Basic form handling and event management.
- Simple styling or use of any CSS framework

#### Backend ![Laravel Badge](https://img.shields.io/badge/Laravel-FF2D20?style=flat&logo=laravel&logoColor=white) or ![Node.js Badge](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
**Requirements**:
- Build a REST API with endpoints:
```
GET /notes
POST /notes
PUT /notes/:id
DELETE /notes/:id

```
- Each note should have:
```
{
  "id": 1,
  "title": "Example title",
  "content": "Example content"
}
```
- Store data in a JSON file or an SQL database
- Include basic validation (e.g. title is required)
**What we'll look for**:
- Proper REST structure
- Clean, readable code
- Basic error handling
- Use of framework features (routes, controllers, etc.)

#### Evaluation Criteria
| Category            | Weight | Description                              |
| ------------------- | ------ | ---------------------------------------- |
| Functionality       | 30%    | App runs and basic CRUD works            |
| Code Clarity        | 25%    | Clean, readable, and organized           |
| Git Usage           | 20%    | Commit messages, structure, pull request |
| Effort & Initiative | 15%    | Documentation and extra effort           |
| Presentation        | 10%    | Clear folder, readme, and overall setup  |

