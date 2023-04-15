import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./EditMember.css";
import { useDispatch, useSelector } from "react-redux";
import { updateMemberAction } from "../../actions/memberActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";
import API from "../../API/api";

const EditMember = ({ match, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  const memberUpdate = useSelector((state) => state.memberUpdate);
  const { loading, error, success } = memberUpdate;

  useEffect(() => {
    const fetching = async () => {
        const uri = `${API}members/`;
        const { data } = await axios.get(`${uri}${match.params.id}`);
        
        setName(data.name);
        setEmail(data.email);
        setPosition(data.position);
        setDept(data.department);
        setYear(data.year);
        setLinkedin(data.linkedin);
        setPic(data.pic);
        const [startYr, endYr] = data.period.split("-").map(str => str.trim());
        setStartYear(startYr);
        setEndYear(endYr);
    };

    fetching();
  }, [match.params.id]);

  const submitHandler = (e) => {
    e.preventDefault();    
    if (!name || !position || !startYear || !endYear) return;
    dispatch(updateMemberAction(match.params.id, name, email, position, department, pic, year, linkedin, startYear, endYear));
  };

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

  const resetHandler = () => {    
    setEmail("");
    setName("");
    setPosition("");
    setDept("");
    setYear("");
    setStartYear("");
    setEndYear("");
    setLinkedin("");
    setPic("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
  };

  return (
    <MainScreen title="EDIT MEMBER">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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
                    <Form.Label>Role</Form.Label>
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
                <Button type="submit" varient="primary">
                    Update
                </Button>                
                <Button className="mx-2" onClick={resetHandler} variant="danger">
                    Reset Fields
                </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default EditMember;