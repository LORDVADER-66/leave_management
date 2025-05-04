document.addEventListener("DOMContentLoaded", function () {
    const requestTable = document.getElementById("leaveRequestsBody");
  
    function loadRequests() {
      const requests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
      requestTable.innerHTML = "";
  
      if (requests.length === 0) {
        requestTable.innerHTML = `
          <tr>
            <td colspan="7" class="text-center text-muted">No leave requests found.</td>
          </tr>`;
        return;
      }
  
      requests.forEach((req, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${req.usn || "N/A"}</td>
          <td>${req.subject}</td>
          <td>${req.startDate}</td>
          <td>${req.endDate}</td>
          <td>${req.reason}</td>
          <td>${req.leaveType}</td>
          <td>
            <button class="btn btn-success btn-sm me-1" data-action="approve" data-index="${index}">Approve</button>
            <button class="btn btn-danger btn-sm" data-action="reject" data-index="${index}">Reject</button>
          </td>
        `;
        requestTable.appendChild(row);
      });
  
      document.querySelectorAll("button[data-action]").forEach((btn) => {
        btn.addEventListener("click", handleDecision);
      });
    }
  
    function handleDecision(event) {
      const action = event.target.getAttribute("data-action");
      const index = parseInt(event.target.getAttribute("data-index"));
  
      let requests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
      const request = requests.splice(index, 1)[0]; // remove from current requests
      request.status = action === "approve" ? "Approved" : "Rejected";
      request.decidedAt = new Date().toISOString();
  
      // Save updated pending list
      localStorage.setItem("leaveRequests", JSON.stringify(requests));
  
      // Add to history
      const history = JSON.parse(localStorage.getItem("leaveHistory")) || [];
      history.push(request);
      localStorage.setItem("leaveHistory", JSON.stringify(history));
  
      loadRequests(); // Refresh table
    }
  
    loadRequests();
  });
  