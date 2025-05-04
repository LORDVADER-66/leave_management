document.addEventListener("DOMContentLoaded", function () {
    const usn = localStorage.getItem("current_usn");
    const tableBody = document.getElementById("attendanceTableBody");
  
    if (!usn) {
      alert("Not logged in.");
      window.location.href = "../login/student_login.html";
      return;
    }
  
    // Simulated attendance data by USN
    const allAttendance = JSON.parse(localStorage.getItem("attendanceData")) || {};
  
    const records = allAttendance[usn] || [];
  
    if (records.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No attendance data found.</td></tr>`;
    } else {
      records.forEach((entry) => {
        const percent = ((entry.attended / entry.total) * 100).toFixed(1);
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.subject}</td>
          <td>${entry.total}</td>
          <td>${entry.attended}</td>
          <td>${percent}%</td>
        `;
        tableBody.appendChild(row);
      });
    }
  });
  