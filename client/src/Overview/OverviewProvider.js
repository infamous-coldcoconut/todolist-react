import { useState, useMemo, useContext } from "react";
import OverviewToolBar from "./OverviewToolBar";
import OverviewList from "./OverviewList";
import { UserContext } from "../User/UserProvider";

function OverviewProvider() {
  const [showArchive, setShowArchive] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const [listOverviewCard, setListOverviewCard] = useState([
    {
      id: "td01",
      name: "První úkolovník",
      state: "active",
      owner: "u1",
      memberList: ["u2"],
    },
    {
      id: "td02",
      name: "Druhý úkolovník",
      state: "archived",
      owner: "u1",
      memberList: ["u2", "u3"],
    },
    {
      id: "td03",
      name: "Třetí úkolovník",
      state: "active",
      owner: "u3",
      memberList: [],
    },
    {
      id: "td04",
      name: "čtvrtý úkolovník",
      state: "archived",
      owner: "u2",
      memberList: ["u1"],
    },
  ]);

  function handleCreate() {
    setListOverviewCard((current) => {
      const newList = {
        id: Math.random().toString(),
        name: "New List",
        state: "active",
        owner: loggedInUser,
        memberList: [],
      };
      return [...current, newList];
    });
  }

  function handleArchive(dtoIn) {
    setListOverviewCard((current) => {
      const itemIndex = current.findIndex((item) => item.id === dtoIn.id);
      current[itemIndex] = { ...current[itemIndex], state: "archived" };
      return current.slice();
    });
  }

  function handleDelete(dtoIn) {
    setListOverviewCard((current) => {
      const itemIndex = current.findIndex((item) => item.id === dtoIn.id);
      current.splice(itemIndex, 1);
      return current.slice();
    });
  }

  function handleNameChange(dtoIn) {
    setListOverviewCard((current) =>
      current.map((item) =>
        item.id === dtoIn.id ? { ...item, name: dtoIn.name } : item
      )
    );
  }

  const filteredToDoListList = useMemo(() => {
    if (showArchive) {
      return listOverviewCard.filter(
        (item) =>
          item.owner === loggedInUser || item.memberList?.includes(loggedInUser)
      );
    } else {
      return listOverviewCard.filter(
        (item) =>
          item.state === "active" &&
          (item.owner === loggedInUser ||
            item.memberList?.includes(loggedInUser))
      );
    }
  }, [showArchive, listOverviewCard, loggedInUser]);

  return (
    <>
      <OverviewToolBar
        handleCreate={handleCreate}
        showArchive={showArchive}
        setShowArchive={setShowArchive}
      />
      <OverviewList
        OverviewList={filteredToDoListList}
        handleArchive={handleArchive}
        handleDelete={handleDelete}
        handleNameChange={handleNameChange}
        currentUserId={loggedInUser}
      />
    </>
  );
}

export default OverviewProvider;
