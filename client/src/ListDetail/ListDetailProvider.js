import React, { createContext, useState, useEffect } from "react";

export const ListDetailContext = createContext();

function ListDetailProvider({ children }) {
  const [showResolved, setShowResolved] = useState(false);

  const [data, setLists] = useState([
    {
      id: "td01",
      name: "První úkolovník",
      owner: "u1",
      memberList: ["u2", "u3"],
      itemList: [
        {
          id: "item01",
          name: "první úkol",
          resolved: false,
        },
        {
          id: "item02",
          name: "druhý úkol",
          resolved: true,
        },
      ],
    },
  ]);

  const getListById = (id) => {
    const list = data.find((list) => String(list.id) === String(id));
    return list;
  };

  const addItem = (listId, newItem) => {
    setLists((prevData) =>
      prevData.map((list) =>
        list.id === listId
          ? { ...list, itemList: [...list.itemList, newItem] }
          : list
      )
    );
  };

  const itemStatus = (listId, itemId) => {
    setLists((prevData) =>
      prevData.map((list) =>
        list.id === listId
          ? {
              ...list,
              itemList: list.itemList.map((item) =>
                item.id === itemId
                  ? { ...item, resolved: !item.resolved }
                  : item
              ),
            }
          : list
      )
    );
  };

  const addMember = (listId, memberId) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, memberList: [...list.memberList, memberId] }
          : list
      )
    );
  };

  const removeMember = (listId, memberId) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              memberList: list.memberList.filter((id) => id !== memberId),
            }
          : list
      )
    );
  };

  const updateMemberList = (id, newMemberList) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === id ? { ...list, memberList: newMemberList } : list
      )
    );
  };

  const filteredItems = (listId) => {
    const selectedList = getListById(listId);
    if (!selectedList) return [];
    return selectedList.itemList.filter((item) =>
      showResolved ? true : !item.resolved
    );
  };

  useEffect(() => {
    console.log("showResolved state changed to:", showResolved);
  }, [showResolved]);

  return (
    <ListDetailContext.Provider
      value={{
        getListById,
        addMember,
        removeMember,
        updateMemberList,
        addItem,
        itemStatus,
        filteredItems,
        showResolved,
        setShowResolved,
      }}
    >
      {children}
    </ListDetailContext.Provider>
  );
}

export default ListDetailProvider;
