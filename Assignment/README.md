# JSON Tree Visualizer

An interactive web application to visualize JSON data as a hierarchical tree structure using **React** and **React Flow**.
It helps developers and learners explore complex JSON objects with a clean visual layout, search functionality, and interactive navigation.

---

##  Features

**JSON Input & Validation** – Paste or type any JSON data and validate instantly.
**Tree Visualization** – View JSON as a dynamic node tree using React Flow.
**Search Functionality** – Search using JSON paths like `$.user.address.city` and highlight matched nodes.
**Zoom & Pan Controls** – Navigate large trees with smooth zoom and drag.
**Dynamic Coloring** – Different colors for objects, arrays, and primitive values.
**Error Handling** – Shows error messages for invalid JSON input.

###  (Optional Features)
- Dark / Light mode toggle
- Copy JSON path on node click
- Download tree as image
- Reset / Clear visualization

---

##  Tech Stack

- **React** – Component-based UI
- **React Flow** – Graph visualization
- **Tailwind CSS** – Styling and layout
- **JavaScript (ES6+)**

---

## 🧠 How It Works

1. User inputs or pastes JSON data.
2. App validates the JSON and converts it into a **graph of nodes and edges**.
3. The tree is rendered using **React Flow** with distinct colors for each node type.
4. The search bar highlights and focuses on matching nodes.

---

## 📦 Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/<your-username>/json-tree-visualizer.git
cd json-tree-visualizer
npm install
npm run dev
