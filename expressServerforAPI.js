/* 
setting up an Express server in a Node.js application. */
const express = require("express");
const app = express();
const port = 8000;

app.use(express.json()); // <-- This line is required

const cors = require('cors');
app.use(cors());

let items = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
  },
  {
    id: 2,
    name: "Smart LED TV 43-Inch",
  },
  {
    id: 3,
    name: "Laptop Backpack Water-Resistant",
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
  },
  {
    id: 5,
    name: "Smartphone 128GB Dual SIM",
  },
  {
    id: 6,
    name: "Gaming Mechanical Keyboard",
  },
  {
    id: 7,
    name: "Noise Cancelling Earbuds",
  },
  {
    id: 8,
    name: "Portable Power Bank 20000mAh",
  },
  {
    id: 9,
    name: "Smartwatch Fitness Tracker",
  },
  {
    id: 10,
    name: "Ergonomic Office Chair",
  },
];

app.get("/api/items", (req, res) => {
  res.json(items);
});

app.get("/api/items/:id", (req, res) => {  
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
});

app.post("/api/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put("/api/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.name = req.body.name || item.name;
  res.json(item);
});

app.delete("/api/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Item not found" });

  items.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
