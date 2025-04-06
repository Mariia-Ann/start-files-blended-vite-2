import { useEffect, useState } from 'react';
import Form from '../components/Form/Form';
import Text from '../components/Text/Text';
import TodoList from '../components/TodoList/TodoList';
import { nanoid } from 'nanoid';
import EditForm from '../components/EditForm/EditForm';

const Todos = () => {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem('saved-todos')) ?? []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem('saved-todos', JSON.stringify(todos));
  }, [todos]);

  const addNewTodo = e => {
    e.preventDefault();

    const form = e.target;
    const { search } = form.elements;

    if (findTodo(search.value)) {
      alert('This todo already exists!');
      return;
    }

    addTodo({
      id: nanoid(),
      text: search.value,
    });

    form.reset();
  };

  const addTodo = newTodo => {
    setTodos(prevTodos => {
      return [...prevTodos, newTodo];
    });
  };

  const deleteTodo = todoId => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoId);
    });
  };

  const handleEditTodo = todo => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  const cancelUpdate = () => {
    setIsEditing(false);
    setCurrentTodo({});
  };

  const updateTodo = text => {
    if (findTodo(text)) {
      alert('This todo already exists!');
      return;
    }
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === currentTodo.id ? { ...todo, text: text } : todo
      )
    );
    setIsEditing(false);
    setCurrentTodo({});
  };

  const findTodo = text => {
    return todos.some(todo => todo.text === text);
  };

  return (
    <>
      {isEditing ? (
        <EditForm
          updateTodo={updateTodo}
          cancelUpdate={cancelUpdate}
          defaultValue={currentTodo.text}
        />
      ) : (
        <Form onSubmit={addNewTodo} />
      )}

      {todos.length === 0 ? (
        <Text textAlign="center">There are no any todos ...</Text>
      ) : (
        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onChange={handleEditTodo}
        />
      )}
    </>
  );
};

export default Todos;
