const Todo = require('../models/todo');

 const todo_index_incomplete = async (req, res) => {
    let allTodosFromDb =await getAllTodos();
    console.log( allTodosFromDb);
    let inComplete = allTodosFromDb.filter(todo => todo.isCompleted===false);
    res.render('todos/main', {todosToShow : inComplete});
};

const todo_index_complete =async (req, res) => {
    let allTodosFromDb =await getAllTodos();
    let complete = allTodosFromDb.filter(todo => todo.isCompleted===true);
    res.render('todos/main', {todosToShow : complete});
};

const todo_post = (req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then((result) => {
            res.redirect('/todos');
        }).catch(err => console.log(err));
};

const todo_patch = (req, res) => {
    const id = req.params.id;
    const todoFromServer = Todo.findByIdAndUpdate(id, {isCompleted: true},
        (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Updated todo' + doc)
            }
        })
};

async function getAllTodos() {
    return Todo.find().sort({createdAt: -1});
}

module.exports = {
    todo_index_complete, todo_index_incomplete, todo_post, todo_patch
};