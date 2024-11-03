import { useContext, useState } from "react";
import { ListDetailContext } from "../ListDetail/ListDetailProvider";
import { UserContext } from "../User/UserProvider";
import AddForm from "../ListDetail/AddForm";
import RemoveForm from "../ListDetail/RemoveForm";
import Member from "./Member";

function MemberList({ listId }) {
  const { getListById, addMember, removeMember } =
    useContext(ListDetailContext);
  const { userMap, userList, loggedInUser } = useContext(UserContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const selectedList = getListById(listId);
  const isOwner = selectedList?.owner === loggedInUser;

  return (
    <div style={{ border: "1px solid grey", margin: "8px", padding: "8px" }}>
      <AddForm
        show={showAddModal}
        userList={userList}
        handlerMap={{
          addMember: ({ memberId }) => addMember(listId, memberId),
        }}
        handleClose={() => setShowAddModal(false)}
      />

      <RemoveForm
        show={showRemoveModal}
        userList={userList}
        handlerMap={{
          removeMember: ({ memberId }) => removeMember(listId, memberId),
        }}
        handleClose={() => setShowRemoveModal(false)}
      />

      <div>
        Member List
        {isOwner && (
          <button onClick={() => setShowAddModal(true)}>Add Member</button>
        )}
      </div>

      <Member
        memberId={selectedList?.owner}
        data={userMap[selectedList?.owner]}
        isOwner={true}
      />

      {selectedList?.memberList.map((memberId) => (
        <div key={memberId} style={{ display: "flex", alignItems: "center" }}>
          <Member
            memberId={memberId}
            data={userMap[memberId]}
            showRemoveButton={isOwner || memberId === loggedInUser}
            handlerMap={{
              removeMember: () => removeMember(listId, memberId),
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default MemberList;
