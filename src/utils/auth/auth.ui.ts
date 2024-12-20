import { supabase } from '../supabase/client';

export function initAuthStateListener() {
  supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user;
    
    if (event === 'SIGNED_IN' && user) {
      updateUIForSignedIn(user);
    } else if (event === 'SIGNED_OUT') {
      updateUIForSignedOut();
    }
  });
}

function updateUIForSignedIn(user: any) {
  document.getElementById('loginBtn')?.classList.add('hidden');
  document.getElementById('userProfile')?.classList.remove('hidden');
  document.getElementById('userName')!.textContent = user.user_metadata.name || user.email;
  document.getElementById('userAvatar')!.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`;
}

function updateUIForSignedOut() {
  document.getElementById('loginBtn')?.classList.remove('hidden');
  document.getElementById('userProfile')?.classList.add('hidden');
}