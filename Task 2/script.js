// DATA
const data = [
  { id: 1, name: "Arun", department: "IT", date: "2024-01-12" },
  { id: 2, name: "Meena", department: "HR", date: "2023-11-05" },
  { id: 3, name: "Ravi", department: "Finance", date: "2024-02-20" },
  { id: 4, name: "Divya", department: "IT", date: "2023-09-18" }
];

let filteredData = [...data];

// RENDER TABLE
function renderTable() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  filteredData.forEach(item => {
    const row = `
      <tr>
        <td>${item.name}</td>
        <td>${item.department}</td>
        <td>${item.date}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// FILTER
document.getElementById("departmentFilter").addEventListener("change", function () {
  const selected = this.value;

  if (selected === "All") {
    filteredData = [...data];
  } else {
    filteredData = data.filter(item => item.department === selected);
  }

  renderTable();
  renderCounts();
});

// SORT BY NAME
function sortByName() {
  filteredData.sort((a, b) => a.name.localeCompare(b.name));
  renderTable();
}

// SORT BY DATE
function sortByDate() {
  filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  renderTable();
}

// COUNT
function renderCounts() {
  const countList = document.getElementById("countList");
  countList.innerHTML = "";

  const counts = {};

  data.forEach(item => {
    counts[item.department] = (counts[item.department] || 0) + 1;
  });

  for (let dept in counts) {
    countList.innerHTML += `<li>${dept}: ${counts[dept]}</li>`;
  }
}

// INITIAL LOAD
renderTable();
renderCounts();