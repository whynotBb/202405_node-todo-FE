import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const TodoPage = ({ user, setUser }) => {
    console.log("todo user", user);
    const [todoList, setTodoList] = useState([]);
    const [todoValue, setTodoValue] = useState("");

    const getTasks = async () => {
        const response = await api.get("/tasks");
        setTodoList(response.data.data);
    };
    useEffect(() => {
        getTasks();
    }, []);
    const addTodo = async () => {
        try {
            const response = await api.post("/tasks", {
                task: todoValue,
                isComplete: false,
                author: user._id,
            });
            if (response.status === 200) {
                getTasks();
            }
            setTodoValue("");
        } catch (error) {
            console.log("error:", error);
        }
    };

    const deleteItem = async (id) => {
        console.log(id);
        try {
            const response = await api.delete(`/tasks/${id}`);
            if (response.status === 200) {
                getTasks();
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const toggleComplete = async (id) => {
        try {
            const task = todoList.find((item) => item._id === id);
            const response = await api.put(`/tasks/${id}`, {
                isComplete: !task.isComplete,
            });
            if (response.status === 200) {
                getTasks();
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    const logout = () => {
        sessionStorage.removeItem("token");
        setUser(null);
    };
    return (
        <>
            <Container className="logout">
                <span onClick={logout}>LogOut</span>
            </Container>
            <Container>
                <Row className="add-item-row">
                    <Col xs={12} sm={10}>
                        <input
                            type="text"
                            placeholder="할일을 입력하세요"
                            onChange={(event) =>
                                setTodoValue(event.target.value)
                            }
                            className="input-box"
                            value={todoValue}
                        />
                    </Col>
                    <Col xs={12} sm={2}>
                        <button onClick={addTodo} className="button-add">
                            추가
                        </button>
                    </Col>
                </Row>

                <TodoBoard
                    todoList={todoList}
                    deleteItem={deleteItem}
                    toggleComplete={toggleComplete}
                />
            </Container>
        </>
    );
};

export default TodoPage;
