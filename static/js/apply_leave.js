document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("leaveForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const usn = localStorage.getItem("current_usn");
      if (!usn) {
        alert("Student not logged in.");
        return;
      }
  
      const subject = document.getElementById("subject").value.trim();
      const leaveType = document.getElementById("leaveType").value;
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
      const reason = document.getElementById("reason").value.trim();
  
      const leaveRequest = {
        usn,
        subject,
        leaveType,
        startDate,
        endDate,
        reason,
        status: "Pending",
        submittedAt: new Date().toISOString()
      };
  
      const allRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
      allRequests.push(leaveRequest);
      localStorage.setItem("leaveRequests", JSON.stringify(allRequests));
  
      alert("Leave request submitted!");
      window.location.href = "dashboard.html";
    });
  });
  