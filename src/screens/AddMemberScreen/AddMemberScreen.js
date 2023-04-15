import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createMemberAction } from "../../actions/memberActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateMember({ history }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [department, setDept] = useState("");
    const [pic, setPic] = useState(
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [picMessage, setPicMessage] = useState(null);
    const [year, setYear] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [linkedin, setLinkedin] = useState("");

  const dispatch = useDispatch();

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const memberCreate = useSelector((state) => state.memberCreate);
  const { loading, error, member } = memberCreate;

  const resetHandler = () => {
    setEmail("");
    setName("");
    setPosition("");
    setDept("");
    setYear("");
    setStartYear("");
    setEndYear("");
    setLinkedin("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createMemberAction(name, email, position, department, pic, year, linkedin, startYear, endYear));
    if (!name || !position) return;

    resetHandler();
    history.push("/members");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="ADD MEMBER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="position">
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="name"
              value={position}
              placeholder="Enter Role"
              onChange={(e) => setPosition(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="name"
              value={department}
              placeholder="Enter Department"
              onChange={(e) => setDept(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="name"
              value={year}
              placeholder="Enter Academic Year"
              onChange={(e) => setYear(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="content">
              <Form.Label>Batch</Form.Label>
              <Row>
                <Col lg={5} md={5} sm={11} xs={11}>
                  <Form.Control
                    type="content"
                    placeholder="Enter the Start Year"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                  />
                </Col>
                <Col>
                  {"-"}
                </Col>
                <Col lg={5} md={5} sm={11} xs={11}>
                  <Form.Control
                    type="content"
                    placeholder="Enter the End Year"
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>

          <Form.Group controlId="linkedin">
            <Form.Label>LinkedIn</Form.Label>
            <Form.Control
              type="name"
              value={linkedin}
              placeholder="Enter LinkedIn Link"
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group>

          <Card.Text>
            <Card.Img
              variant="top"
              src={pic}
              style={{
                width: '30%',
                height: 'auto',
                objectFit: 'cover',
                objectPosition: 'center',
                aspectRatio: '4/5'
              }}
            />
          </Card.Text>

          <Button variant="primary" type="submit">
            Add Member
          </Button>
          <Button className="mx-2" onClick={resetHandler} variant="danger">
            Reset Fields
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
}

export default CreateMember;
