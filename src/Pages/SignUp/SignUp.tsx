import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
//import { signUp } from "../../store/user/actions";
import { selectToken, selectUserLanguage } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col } from "react-bootstrap";

export default function Login() {
  const [newUser, setNewUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    class: 0,
    isTeacher: false,
  });
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event: any) {
    event.preventDefault();
    console.log("to do: dispatch sign up");
    //dispatch(signUp(newUser));
  }

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Sign up</h1>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={newUser.firstName}
            onChange={(event) =>
              setNewUser({ ...newUser, firstName: event.target.value })
            }
            placeholder={"Enter your first name"}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>{"Last name"}</Form.Label>
          <Form.Control
            value={newUser.lastName}
            onChange={(event) =>
              setNewUser({ ...newUser, lastName: event.target.value })
            }
            placeholder={"Enter your last name"}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={newUser.email}
            onChange={(event) =>
              setNewUser({ ...newUser, email: event.target.value })
            }
            type="email"
            placeholder={"Enter your email address"}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicLanguage">
          <Form.Label>Class</Form.Label>
          <Form.Control
            as="select"
            value={newUser.class}
            onChange={(event) =>
              setNewUser({
                ...newUser,
                class: parseInt(event.target.value),
              })
            }
            placeholder={"Your class"}
            required
          >
            <option value="En-GB">English</option>
            <option value="Fr-FR">Français</option>
          </Form.Control>
        </Form.Group>

        {/* <Form.Group controlId="formBasicGender">
          <Form.Label>Are you a teacher?</Form.Label>
          <Form.Control
            as="select"
            value={newUser.gender}
            onChange={(event) =>
              setNewUser({ ...newUser, : event.target.value })
            }
            required
          >
            <option value="male">{t_male}</option>
            <option value="female">{t_female}</option>
            <option value="other"> {t_other} </option>
          </Form.Control>
        </Form.Group> */}

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={newUser.password}
            onChange={(event) =>
              setNewUser({ ...newUser, password: event.target.value })
            }
            type="password"
            placeholder={"Enter a password"}
            required
          />
        </Form.Group>
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Sign up
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
