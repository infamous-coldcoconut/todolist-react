import Icon from "@mdi/react";
import {
  mdiPencilPlus,
  mdiAccountPlus,
  mdiAccountRemove,
  mdiFilter,
} from "@mdi/js";
import Button from "react-bootstrap/Button";

function ListDetailToolBar({
  isOwner,
  handleCreateItem,
  showAddModal,
  showRemoveModal,
  handleSelfRemove,
  setShowResolved,
}) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
      <Button onClick={handleCreateItem} variant="primary">
        <Icon path={mdiPencilPlus} size={1} />
        Add item
      </Button>

      {isOwner && showAddModal && (
        <Button onClick={showAddModal} variant="primary">
          <Icon path={mdiAccountPlus} size={1} />
          Add member
        </Button>
      )}

      {isOwner && showRemoveModal ? (
        <Button onClick={showRemoveModal} variant="danger">
          <Icon path={mdiAccountRemove} size={1} />
          Remove member
        </Button>
      ) : (
        <Button onClick={handleSelfRemove} variant="danger">
          <Icon path={mdiAccountRemove} size={1} />
          Remove yourself from the list
        </Button>
      )}

      <Button
        variant="primary"
        onClick={() => {
          setShowResolved((current) => !current);
        }}
      >
        <Icon path={mdiFilter} size={1} />
        Filter
      </Button>
    </div>
  );
}

export default ListDetailToolBar;
