const API_BASE_URL = "http://127.0.0.1:3000";

async function fetchTransactions() {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions`);
    const transactions = await response.json();

    if (!response.ok) {
      throw new Error("Gagal mengambil data transaksi");
    }

    localStorage.setItem("transactions", JSON.stringify(transactions));
    return transactions;
  } catch (error) {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  }
}

async function fetchNotifications(userId) {
  try {
    const query = userId ? `?userId=${encodeURIComponent(userId)}` : "";
    const response = await fetch(`${API_BASE_URL}/notifications${query}`);
    const notifications = await response.json();

    if (!response.ok) {
      throw new Error("Gagal mengambil notifikasi");
    }

    localStorage.setItem("notifications", JSON.stringify(notifications));
    return notifications;
  } catch (error) {
    return JSON.parse(localStorage.getItem("notifications")) || [];
  }
}

async function markNotificationRead(notificationId) {
  const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
    method: "POST"
  });
  const notification = await response.json();

  if (!response.ok) {
    throw new Error(notification.error || "Gagal memperbarui notifikasi");
  }

  return notification;
}

function formatAmount(amount) {
  return Number(amount || 0).toLocaleString("id-ID");
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function requireLogin() {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return null;
  }

  return user;
}

function logoutUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
