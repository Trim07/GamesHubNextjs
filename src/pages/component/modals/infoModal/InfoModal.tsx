import Router from "next/router";
import { Modal, Button } from "react-bootstrap";


export default function InfoModal(props){

  return (
    <Modal {...props} style={{zIndex: 9999}}>
      <Modal.Header closeButton>
        <Modal.Title>Central de informações</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.message!}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="close-modal" onClick={props.onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}