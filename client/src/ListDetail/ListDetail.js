import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { ListDetailContext } from "./ListDetailProvider";
import ListDetailToolBar from "./ListDetailToolBar";
import { UserContext } from "../User/UserProvider";
import AddForm from "./AddForm";
import RemoveForm from "./RemoveForm";

function ListDetail() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const {
    getListById,
    addMember,
    removeMember,
    addItem,
    itemStatus,
    showResolved,
    setShowResolved,
    filteredItems,
  } = useContext(ListDetailContext);
  const { userList, loggedInUser } = useContext(UserContext);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const listId = params.get("id");

  const selectedList = getListById(listId);
  const isOwner = selectedList?.owner === loggedInUser;

  const handleCreateItem = () => {
    if (selectedList) {
      const newItem = {
        id: `item${Date.now()}`,
        name: "New Task",
        resolved: false,
      };
      addItem(selectedList.id, newItem);
    }
  };

  const handleCheckboxChange = (itemId) => {
    itemStatus(selectedList.id, itemId);
  };

  const handleAddMember = (member) => {
    if (isOwner && selectedList && member && member.memberId) {
      addMember(selectedList.id, member.memberId);
    }
  };

  const handleRemoveMember = (member) => {
    console.log("Removing member:", member);
    if (selectedList && member && member.memberId) {
      if (isOwner || member.memberId === loggedInUser) {
        removeMember(listId, member.memberId);
      }
    }
  };

  const handleSelfRemove = () => {
    handleRemoveMember({ memberId: loggedInUser });
  };

  const filteredItemsList = filteredItems(listId);

  return (
    <div>
      <h2>List Detail</h2>
      <ListDetailToolBar
        isOwner={isOwner}
        handleCreateItem={handleCreateItem}
        showAddModal={isOwner ? () => setShowAddModal(true) : undefined}
        showRemoveModal={isOwner ? () => setShowRemoveModal(true) : undefined}
        handleSelfRemove={handleSelfRemove}
        setShowResolved={setShowResolved}
      />
      {isOwner && (
        <AddForm
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
          userList={userList}
          handlerMap={{ addMember: handleAddMember }}
        />
      )}
      {isOwner && (
        <RemoveForm
          show={showRemoveModal}
          handleClose={() => setShowRemoveModal(false)}
          userList={userList}
          handlerMap={{ removeMember: handleRemoveMember }}
        />
      )}
      {selectedList ? (
        <>
          <h3>{selectedList.name}</h3>
          <p>Owner: {selectedList.owner}</p>
          <p>Members: {selectedList.memberList.join(", ")}</p>
          <ul>
            {filteredItemsList && Array.isArray(filteredItemsList) ? (
              filteredItemsList.map((item) => (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.resolved}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  {item.name} - {item.resolved ? "Resolved" : "Not Resolved"}
                </li>
              ))
            ) : (
              <p>No items found.</p>
            )}
          </ul>
        </>
      ) : (
        <p>No list found.</p>
      )}
    </div>
  );
}

export default ListDetail;
