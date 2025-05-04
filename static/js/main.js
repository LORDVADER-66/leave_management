document.addEventListener("DOMContentLoaded", function () {
    const usnPlaceholder = document.getElementById("usnPlaceholder");
    const logoutBtn = document.getElementById("logoutBtn");
  
    if (usnPlaceholder) {
      const usn = localStorage.getItem("current_usn");
      if (usn) {
        usnPlaceholder.textContent = usn;
      } else {
        window.location.href = "../login/student_login.html";
      }
    }
  
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("current_usn");
        window.location.href = "../login/student_login.html";
      });
    }
  });
  