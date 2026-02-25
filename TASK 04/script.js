const API = "http://localhost:3000";

// Load Orders
fetch(`${API}/orders`)
  .then(res => res.json())
  .then(data => {
    const table = document.querySelector("#orderTable tbody");
    data.forEach(order => {
      table.innerHTML += `
        <tr>
          <td>${order.name}</td>
          <td>${order.product_name}</td>
          <td>${order.quantity}</td>
          <td>${order.order_date}</td>
          <td>₹${order.total_price}</td>
        </tr>
      `;
    });
  });

// Highest Order
fetch(`${API}/highest-order`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("highestOrder").innerHTML += `
      <p>${data.name} - ₹${data.total_value}</p>
    `;
  });

// Top Customer
fetch(`${API}/top-customer`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("topCustomer").innerHTML += `
      <p>${data.name} (${data.total_orders} orders)</p>
    `;
  });