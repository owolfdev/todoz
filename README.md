## create

method: POST

endpoint:
http://localhost:3001/api/createTodo

{
"title": "New Todo",
"description": "Something New.",
"due_date": "2023-05-01",
"images": ["https://images.unsplash.com/photo-1591871937573-74dbba515c4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"]
}

## delete

method: DELETE

endpoint:
http://localhost:3001/api/deleteTodo?id=d723e376-f636-4e55-a442-7f2952213971

## update

method: PUT

endpoint:
http://localhost:3001/api/updateTodo

{
"id": "45061ad9-e205-430e-9606-46eb74c573ce",
"title": "Kittens a-go-go",
"description": "I love kittens",
"due_date": "2023-05-01",
"images": ["https://images.unsplash.com/photo-1591871937573-74dbba515c4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"]
}
