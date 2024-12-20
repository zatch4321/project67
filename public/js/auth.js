function toggleLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
  }
}

function toggleProfileMenu() {
  const menu = document.getElementById('profileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

async function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const user = await login({ email, password });
    
    // Update UI
    document.getElementById('loginBtn').classList.add('hidden');
    document.getElementById('userProfile').classList.remove('hidden');
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userAvatar').src = user.avatar;
    
    toggleLoginModal();
    showDashboard();
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
}

function showDashboard() {
  document.getElementById('dashboardContent').classList.remove('hidden');
  updateDashboard();
  toggleProfileMenu();
}

function showApplications() {
  // Implement applications view
  toggleProfileMenu();
}

// Initialize auth state
document.addEventListener('DOMContentLoaded', () => {
  const user = getCurrentUser();
  if (user) {
    document.getElementById('loginBtn').classList.add('hidden');
    document.getElementById('userProfile').classList.remove('hidden');
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userAvatar').src = user.avatar;
  }

  // Add event listeners
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
});