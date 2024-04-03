import { useState } from 'react'
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

function App() {
  // array com tarefas predefinidas
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Criar funcionalidade x no Sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para a academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Pessoal",
      isCompleted: false,
    }
  ]);

  // Adicionando o search
  const [search, setSearch] = useState("");

  // Adicionando o filtro
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  // Adicionando uma nova tarefa
  const addTodo = (text, category) => {

    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      },
    ];

    setTodos(newTodos);
  };

  // remover tarefa
  const removeTodo = (id) => {
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter(todo =>
      todo.id !== id ? todo : null
    );
    setTodos(filteredTodos);
  }

  // completar Tarefas
  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo);
    setTodos(newTodos);
  };

  // retornando um as funcoes na pagina principal
  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} /> {/* component search mudar o state */}
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="todo-list">
        {todos
          .filter((todo) =>
            filter === "All"
              ? true
              : filter === "Completed"
                ? todo.isCompleted
                : !todo.isCompleted
          )
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) =>
            sort === "Asc"
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text)
          )
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo} />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  )
}

export default App
