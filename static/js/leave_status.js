document.addEventListener("DOMContentLoaded", function () {
    const usn = localStorage.getItem("current_usn");
    const tableBody = document.getElementById("leaveTableBody");
  
    if (!usn) {
      alert("Not logged in.");
      window.location.href = "../login/student_login.html";
      return;
    }
  
    const allRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const myRequests = allRequests.filter((req) => req.usn === usn);
  
    if (myRequests.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No leave applications found.</td></tr>`;
    } else {
      myRequests.forEach((req) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${req.subject}</td>
          <td>${req.leaveType}</td>
          <td>${req.startDate}</td>
          <td>${req.endDate}</td>
          <td>${req.reason}</td>
          <td><span class="badge ${getStatusClass(req.status)}">${req.status}</span></td>
        `;
        tableBody.appendChild(row);
      });
    }
  
    function getStatusClass(status) {
      switch (status) {
        case "Approved": return "bg-success";
        case "Rejected": return "bg-danger";
        default: return "bg-warning text-dark";
      }
    }
  });
  