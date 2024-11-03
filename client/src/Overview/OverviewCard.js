import Icon from "@mdi/react";
import { mdiArchive, mdiDelete, mdiPencilBox } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button.js";
import Card from "react-bootstrap/Card";
import NameChangeForm from "./NameChangeForm";
import { useState } from "react";

function OverviewCard({
  shoppingList,
  setShowConfirmDeleteDialog,
  handleNameChange,
  currentUserId,
}) {
  const navigate = useNavigate();
  const [showNameChangeForm, setShowNameChangeForm] = useState(false);
  const isOwner = shoppingList.owner === currentUserId;

  return (
    <Card style={{ width: "18rem" }}>
      <div
        onClick={() => {
          navigate("/ShoppingListDetail?id=" + shoppingList.id);
        }}
        style={{ cursor: "pointer" }}
      >
        <Card.Body>
          <p>{shoppingList.name}</p>
          <div
            style={{
              display: "grid",
              gap: "2px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isOwner && (
              <Button
                size={"sm"}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNameChangeForm(true);
                }}
              >
                <Icon path={mdiPencilBox} size={1} />
              </Button>
            )}

            <Button size={"sm"} onClick={(e) => e.stopPropagation()}>
              <Icon path={mdiArchive} size={1} />
            </Button>
            <Button
              size={"sm"}
              variant="danger"
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirmDeleteDialog(shoppingList.id);
              }}
            >
              <Icon path={mdiDelete} size={1} />
            </Button>
          </div>
        </Card.Body>
      </div>
      <NameChangeForm
        show={showNameChangeForm}
        handleClose={() => setShowNameChangeForm(false)}
        data={shoppingList}
        handlerMap={{
          updateName: (newName) =>
            handleNameChange({ id: shoppingList.id, name: newName }),
        }}
      />
    </Card>
  );
}

export default OverviewCard;
