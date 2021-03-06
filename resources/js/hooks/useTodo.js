import { useCallback, useState } from "react";
import axios from "axios";

import { UNPROCESSABLE_ENTITY } from "../util";

export const useTodo = () => {
    const [todos, setTodos] = useState([]);

    const getTodos = useCallback(() => {
        axios.get("/api/todo")
            .then((res) => {
                setTodos(res.data.todos);
            })
            .catch((err) => {
                alert('ToDoの取得に失敗しました。');
                console.log(err.response);
            });
    }, []);

    const createTodo = useCallback((props) => {
        const { formData, setTodoErrorMessage, setTodoText } = props;

        axios.post("/api/todo", formData)
            .then((res) => {
                setTodos(res.data.todos);
                setTodoErrorMessage('');
                setTodoText('');
            })
            .catch((err) => {
                if (err.response.status === UNPROCESSABLE_ENTITY) {
                    setTodoErrorMessage(err.response.data.errors.todo[0]);
                } else {
                    alert('ToDo作成に失敗しました。');
                    console.log(err.response);
                }
            });
        },
        []
    );

    const completeTodo = useCallback((props) => {
        const { formData } = props;
        
        axios.post("/api/todo/complete", formData)
            .then((res) => {
                setTodos(res.data.todos);
            })
            .catch((err) => {
                alert('ToDoステータスの変更に失敗しました。');
                console.log(err.response);
            });
        },
        []
    );

    const returnTodo = useCallback((props) => {
        const { formData } = props;

        axios.post("/api/todo/incomplete", formData)
            .then((res) => {
                setTodos(res.data.todos);
            })
            .catch((err) => {
                alert('ToDoステータスの変更に失敗しました。');
                console.log(err.response);
            });
        },
        []
    );

    const deleteTodo = useCallback((props) => {
        const { formData } = props;

        axios.post("/api/todo/delete", formData)
            .then((res) => {
                setTodos(res.data.todos);
            })
            .catch((err) => {
                alert('ToDo削除に失敗しました。');
                console.log(err.response);
            });
        },
        []
    );
    
    return { getTodos, todos, createTodo, completeTodo, returnTodo, deleteTodo };
}