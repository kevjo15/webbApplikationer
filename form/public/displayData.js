document.addEventListener('DOMContentLoaded', function() {
  fetch('/data')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#html-data-table tbody');
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.username}</td>
        <td>${item.password}</td>
        <td>${item.Email}</td>
        <td>${item.age}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.log('Error fetching data:', error);
  });
});