document.addEventListener("DOMContentLoaded", function () {
    const historyTable = document.getElementById("leaveHistoryTableBody");
    const history = JSON.parse(localStorage.getItem("leaveHistory")) || [];
  
    if (history.length === 0) {
      historyTable.innerHTML = `<tr><td colspan="8" class="text-center text-muted">No reviewed applications yet.</td></tr>`;
      return;
    }
  
    history.forEach((req) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${req.usn || "N/A"}</td>
        <td>${req.subject}</td>
        <td>${req.leaveType}</td>
        <td>${req.startDate}</td>
        <td>${req.endDate}</td>
        <td>${req.reason}</td>
        <td><span class="badge bg-${req.status === "Approved" ? "success" : "danger"}">${req.status}</span></td>
        <td>${new Date(req.decidedAt).toLocaleDateString()}</td>
      `;
      historyTable.appendChild(row);
    });
  });
  