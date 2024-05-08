import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, toggleComplete, deleteTask }) => {
    return (
        <Row>
            <Col xs={12}>
                <div className={`todo-item`}>
                    <div
                        className={`todo-content ${
                            item.isComplete
                                ? "text-decoration-line-through"
                                : ""
                        }`}
                    >
                        {item.task}
                    </div>

                    <div>
                        <button
                            className="button-delete"
                            onClick={() => deleteTask(item._id)}
                        >
                            삭제
                        </button>
                        <button
                            className="button-delete"
                            onClick={() => toggleComplete(item._id)}
                        >
                            {item.isComplete ? "안끝남" : "끝남"}
                        </button>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default TodoItem;
