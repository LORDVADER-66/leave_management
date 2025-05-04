document.addEventListener("DOMContentLoaded", function () {
    const requestsTable = document.getElementById("leaveRequestsTableBody");
  
    function loadRequests() {
      const requests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
      requestsTable.innerHTML = "";
  
      if (requests.length === 0) {
        requestsTable.innerHTML = `<tr><td colspan="7" class="text-center text-muted">No pending leave requests.</td></tr>`;
        return;
      }
  
      requests.forEach((req, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${req.usn || "N/A"}</td>
          <td>${req.subject}</td>
          <td>${req.leaveType}</td>
          <td>${req.startDate}</td>
          <td>${req.endDate}</td>
          <td>${req.reason}</td>
          <td>
            <button class="btn btn-sm btn-success me-2" data-action="approve" data-index="${index}">Approve</button>
            <button class="btn btn-sm btn-danger" data-action="reject" data-index="${index}">Reject</button>
          </td>
        `;
        requestsTable.appendChild(row);
      });
  
      document.querySelectorAll("button[data-action]").forEach(button => {
        button.addEventListener("click", function () {
          const action = this.getAttribute("data-action");
          const index = parseInt(this.getAttribute("data-index"));
  
          const requests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
          const history = JSON.parse(localStorage.getItem("leaveHistory")) || [];
  
          const request = requests[index];
          request.status = action === "approve" ? "Approved" : "Rejected";
          request.decidedAt = new Date().toISOString();
  
          // Move to history and remove from active requests
          history.push(request);
          requests.splice(index, 1);
  
          localStorage.setItem("leaveRequests", JSON.stringify(requests));
          localStorage.setItem("leaveHistory", JSON.stringify(history));
  
          loadRequests(); // Refresh the table
        });
      });
    }
  
    loadRequests();
  });
  