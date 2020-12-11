import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function ScreenshotModal({
  screenshotURL,
}: {
  screenshotURL?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <>
      <i onClick={() => setShow(true)} className="ml-2 las la-image la-2x"></i>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Screenshot
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {screenshotURL ? (
            <img src={screenshotURL} alt="screenshot of the problem" />
          ) : (
            "No screenshot is associated with this question"
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
