import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteMessageAction, listMessages } from "../../actions/messageActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyMessages({ history, search }) {
  const dispatch = useDispatch();

  const messageList = useSelector((state) => state.messageList);
  const { loading, error, messages } = messageList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const messageDelete = useSelector((state) => state.messageDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = messageDelete;

  useEffect(() => {
    dispatch(listMessages());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteMessageAction(id));
    }
  };

  return (
    <MainScreen title={`Messages`}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {messages &&
        messages
          .filter((filteredNote) =>
            filteredNote.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((message) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={message._id}>
              <Card.Header style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <Accordion.Toggle
                    as={Card.Text}
                    variant="link"
                    eventKey="0"
                  >
                    {message.name}
                  </Accordion.Toggle>
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "gray",
                    alignSelf: "center",
                  }}
                >
                  Created on{" "}
                  <cite title="Source Title">
                    {message.createdAt.substring(0, 10)}
                  </cite>
                </span>
                <span>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(message._id)}
                    >
                      Delete
                    </Button>
                </span>
              </Card.Header>

                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        {message.email}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{message.message}</ReactMarkdown>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default MyMessages;
