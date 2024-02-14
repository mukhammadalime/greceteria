/// ADD PRODUCT MODAL HELPER DATA
export const weightOptions = [
  { name: "kg", id: "kg" },
  { name: "g", id: "g" },
];

export const inStockOptions = [
  { name: "True", id: "true" },
  { name: "False", id: "false" },
];

/// SHOP FILTER OPTIONS HELPER DATA
export const priceOptions = [
  { name: "Min $5 -  Max $10", id: "5-10" },
  { name: "Min $10 - Max $20", id: "10-20" },
  { name: "Min $20 - Max $30", id: "20-30" },
  { name: "Min $30 - Max $40", id: "30-40" },
  { name: "Min $40 - Max $50", id: "40-50" },
];

export const sortOptions = [
  { name: "Sort by: Latest", id: "latest" },
  { name: "Sort by: Newest", id: "newest" },
  { name: "Sort by: Trending", id: "trending" },
];

export const ratingOptions = [
  { name: "⭐⭐⭐⭐⭐", id: "5" },
  { name: "⭐⭐⭐⭐", id: "4" },
  { name: "⭐⭐⭐", id: "3" },
  { name: "⭐⭐", id: "2" },
  { name: "⭐", id: "1" },
];

////////////////////////////////////////////////////////////////
export const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link", "image"], // toggled buttons
  [{ color: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ direction: "rtl" }], // text direction

  // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
];
