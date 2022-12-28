import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction, listUsers } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function removeUser({ history, search }) {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  useEffect(() => {
    dispatch(listUsers());
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
      dispatch(deleteUserAction(id));
    }
  };
  
  return (
    <MainScreen >
    
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {users &&
        users
          .filter((user) => user.isAdmin === false)
          .reverse()
          .map((user) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={user._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(note)}
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
                      {user.name + " | " + user.email}
                    </Accordion.Toggle>
                  </span>

                  <div>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(user._id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Department - {user.department}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{user.position}</ReactMarkdown>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default removeUser;
