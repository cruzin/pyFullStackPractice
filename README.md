# pyFullStackPractice
A coding challnge with a pythonic twist

To run the challenge

1. python -m venv venv (in the pyFullStackPractice folder)
2. venv\Scripts\activate (or mac equivalent)
3. pip install -r requirements.txt (in venv)

--- db init--

4. flask db init
5. flask db migrate -m "helpPage table" (make commit)
6. flask db upgrade (apply changes)

--- endpoint init --

7.uvicorn pyChallenge2:app --reload

--- frontend ---

8. navigate to the frontend-app folder
9. npm i
10. npm run start 

Enjoy!
