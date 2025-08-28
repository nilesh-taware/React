import React, { useState, useEffect } from "react";

function FetchData() {
  const [items, setUsers] = useState([]);

  useEffect(() => {
    // Fetch list of products from an API
    //http://localhost:8000/api/items
    fetch("http://localhost:8000/api/items")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []); // Empty array ensures this runs only once (when component mounts)

  return (
    <div>
      
      <div>
        <h2>Fetch Product List from local express server usin API</h2>
        <table className="table table-striped">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    {items.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
}

export default FetchData;
