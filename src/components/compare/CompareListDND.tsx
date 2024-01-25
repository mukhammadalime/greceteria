// import CompareItem from "./CompareItem";
// import React, { useState } from "react";
// import { ListManager } from "react-beautiful-dnd-grid";

// const products = [
//   {
//     id: "almond-california",
//     name: "Almond California",
//   },
//   {
//     id: "qurtob",
//     name: "Qurtob",
//   },
//   {
//     id: "chicken",
//     name: "Chicken",
//   },
//   {
//     id: "chicken-legs",
//     name: "Chicken Legs",
//   },
//   {
//     id: "milk",
//     name: "Milk",
//   },
//   {
//     id: "canned-palow",
//     name: "Canned Palow",
//   },
// ];

// function sortList(list) {
//   return list.slice().sort((first, second) => first.order - second.order);
// }

// const styles = {
//   listStyle: "none",
//   display: "flex",
//   columnGap: "2.4rem !important",
//   rowGap: "2.4rem !important",
//   flexWrap: "wrap !important",
//   justifyContent: "flex-start !important",
// };

// const CompareList = (props) => {
//   const [items, updateItems] = useState(products);

//   const sortedList = () => {
//     const sortedItems = sortList(items);
//     updateItems(sortedItems);
//   };

//   const reorderList = (sourceIndex, destinationIndex) => {
//     if (destinationIndex === sourceIndex) {
//       return;
//     }
//     const list = items;

//     if (destinationIndex === 0) {
//       list[sourceIndex].order = list[0].order - 1;
//       sortedList();
//       return;
//     }

//     if (destinationIndex === list.length - 1) {
//       list[sourceIndex].order = list[list.length - 1].order + 1;
//       sortedList();
//       return;
//     }

//     if (destinationIndex < sourceIndex) {
//       list[sourceIndex].order =
//         (list[destinationIndex].order + list[destinationIndex - 1].order) / 2;
//       sortedList();
//       return;
//     }

//     list[sourceIndex].order =
//       (list[destinationIndex].order + list[destinationIndex + 1].order) / 2;
//     sortedList();
//   };

//   return (
//     <div className="section-lg">
//       <div className="container">
//         {/* <ul className="compare-list"> */}
//         <ListManager
//           style={styles}
//           items={items}
//           direction="horizontal"
//           maxItems={3}
//           render={(item) => <CompareItem item={item} />}
//           onDragEnd={reorderList}
//         />
//         {/* </ul> */}
//       </div>
//     </div>
//   );
// };

// export default CompareList;
import React from "react";

const CompareListDND = () => {
  return <div>CompareListDND</div>;
};

export default CompareListDND;
