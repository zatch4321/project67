// UI utility functions
export function toggleModal(modalId: string, show?: boolean) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  if (show === undefined) {
    show = modal.style.display !== 'flex';
  }
  
  modal.style.display = show ? 'flex' : 'none';
}

export function toggleMenu(menuId: string) {
  const menu = document.getElementById(menuId);
  if (!menu) return;
  menu.classList.toggle('hidden');
}

// Make functions globally available
window.toggleLoginModal = () => toggleModal('loginModal');
window.toggleProfileMenu = () => toggleMenu('profileMenu');