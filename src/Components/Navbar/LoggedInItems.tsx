import React from "react";
import { Button, Nav, NavDropdown } from "react-bootstrap";
import { logOut } from "../../store/user/actions";
import { useDispatch, useSelector } from "react-redux";

import { selectUser, selectUserLanguage } from "../../store/user/selectors";
import { useHistory } from "react-router-dom";

export function LoggedInLinks() {
  const history = useHistory();
  return (
    <Nav>
      <Nav.Link onClick={() => history.push("/my-questions")}>
        My questions
      </Nav.Link>
      <NavDropdown title={"Question boards"} id="basic-nav-dropdown">
        {/* <NavDropdown.Item onClick={() => history.push("/explore-recipes")}>
          {t_import_recipes}
        </NavDropdown.Item> */}
      </NavDropdown>
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
        onClick={() => {
          logOutClickHandler();
        }}
      >
        Log out
      </Button>
    </Nav>
  );
}
