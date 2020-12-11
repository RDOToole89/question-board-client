
import React from "react";
import { Button, Nav } from "react-bootstrap";
import { logOut } from "../../store/user/actions";
import { useDispatch, useSelector } from "react-redux";


import { selectUser } from "../../store/user/selectors";
import { useHistory } from "react-router-dom";

export function LoggedInLinks() {

  return (
    <Nav>
      {/* <NavDropdown title={'Question boards'} id='basic-nav-dropdown'></NavDropdown> */}
    </Nav>
  );
}
export function LogOutButton() {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUser).email;
  const history = useHistory();
  const logOutClickHandler = () => {
    dispatch(logOut());
    history.push("/");
  };

  return (
    <Nav>
      <div style={{ marginRight: "1em", alignSelf: "center" }}>
        {" "}
        {userEmail}
      </div>
      <Button
        variant="danger"
        className="log-btn"
        onClick={() => {
          logOutClickHandler();
        }}
      >
        Log out
      </Button>
    </Nav>
  );
}
