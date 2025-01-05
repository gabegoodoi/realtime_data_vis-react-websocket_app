import React, { useState } from "react";
import { Container, Form } from 'react-bootstrap';

type SimppleMessageInputProps = {
    socket: any;
}

const SimpleMessageInput: React.FC<SimppleMessageInputProps> = ({socket}) => {
    const [messageText, setMessageText] = useState("");

    const sendMessage = () => {
        socket.emit("message", { text: messageText });
        setMessageText("");
    };

    const handleEnterKey = (e: any) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
            setMessageText("");
        }
    };

    return (
        <Container>
            <Form>
                <Form.Label style={{ font: "aria", color: "lightgray" }}>
                    type your message
                </Form.Label>
                <Form.Control
                    type="text"
                    id="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => handleEnterKey(e)}
                    autoComplete="off"
                    ></Form.Control>
            </Form>
        </Container>
    );
}

export default SimpleMessageInput;