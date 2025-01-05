import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';

type SimpleChatBodyProps = {
    socket: any;
};

const SimpleChatBody: React.FC<SimpleChatBodyProps> = ({ socket }) => {
    const [messages, setMessages] = useState([] as any[]);

    useEffect(() => {
        const messageListener = (message: any) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        socket.on("message", messageListener);

        // Cleanup the event listener on unmount
        return () => {
            socket.off("message", messageListener);
        };
    }, [socket]);

    return (
        <Container
            style={{
                marginTop: "40px",
                background: "lightblue",
                padding: "20px",
                borderRadius: "10px",
            }}
        >
            {messages.map((message, index) => (
                <Card key={index} className="mb-2">
                    <Card.Body>
                        <Card.Text>
                            {message.text}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default SimpleChatBody;