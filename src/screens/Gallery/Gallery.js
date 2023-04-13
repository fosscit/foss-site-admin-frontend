import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { createPictureAction, deletePictureAction, listGallery } from "../../actions/galleryActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function Gallery({ history, search }) {
  const dispatch = useDispatch();
  
  const [pic, setPic] = useState(
    "https://icon-library.com/images/image-icon/image-icon-10.jpg"
  );
  const [picMessage, setPicMessage] = useState("");
  
  const galleryList = useSelector((state) => state.galleryList);
  const { loading, error, gallery } = galleryList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const pictureDelete = useSelector((state) => state.pictureDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = pictureDelete;

  const pictureCreate = useSelector((state) => state.pictureCreate);
  const { success: successCreate } = pictureCreate;

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/image-icon/image-icon-10.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/webp") {
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

  useEffect(() => {
    dispatch(listGallery());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
  ]);

  console.log(gallery);

  const submitHandler = (e) => {    
    e.preventDefault();
    dispatch(createPictureAction(pic));
    history.push("/gallery");
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePictureAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="pic">
          <div className="d-flex align-items-center">
            <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload Picture"
              custom
              className="mr-3"
            />
            <Button type="submit" variant="primary">
              Add Picture
            </Button>
          </div>
        </Form.Group>
        <Card.Text>
          <Card.Img
            variant="top"
            src={pic}
            style={{
              width: '30%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center',
              aspectRatio: '16/9'
            }}
          />
        </Card.Text>
      </Form>   
      
      <h3 style={{ marginTop: '50px', marginBottom: '0' }}>{"Gallery"}</h3>
      <hr />
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {gallery && (
        <Row>
          {gallery
            .map(image => (
              <Col key={image._id} md={4}>
                <Card>
                  <Card.Body>
                    <Card.Text>
                      <Card.Img variant="top" src={image.pic} style={{objectFit: 'contain', aspectRatio: '16/9'}} />
                    </Card.Text>
                    <Button variant="danger" className="mx-2" onClick={() => deleteHandler(image._id)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      )}

    </MainScreen>
  );
}

export default Gallery;
