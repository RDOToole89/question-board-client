import React from "react";
import { selectQueue } from "../../store/questions/selectors";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { selectShowSidebar } from "../../store/appState/selectors";
import { Button } from "react-bootstrap";
import { toggleSidebar } from "../../store/appState/actions";

export default function Queue() {
  const queue = useSelector(selectQueue);
  const dispatch = useDispatch();
  const showSidebar = useSelector(selectShowSidebar);
  console.log("queue", queue);
  if (!showSidebar) {
    return (
      <Button
        onClick={() => dispatch(toggleSidebar())}
      >{`< Show question queue`}</Button>
    );
  }
  return <div className="sidebar">Sidebar</div>;
}
