function ToDoItem({ data, category }) {
  let color;
  switch (category) {
    case "shopping":
      color = "red";
      break;
    case "activity":
      color = "blue";
      break;
  }
  return (
    <div style={{ width: "100 %" }}>
      <h1>Hello</h1>
    </div>
  );
}
export default ToDoItem;
