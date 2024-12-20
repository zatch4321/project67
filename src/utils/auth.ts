import { supabase } from './supabase';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export async function register({ email, password, name }: RegisterCredentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function login({ email, password }: LoginCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  window.location.reload();
}

export async function getCurrentUser() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session?.user || null;
}

// Auth state change listener
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    const user = session?.user;
    if (user) {
      // Update UI for logged in state
      document.getElementById('loginBtn')?.classList.add('hidden');
      document.getElementById('userProfile')?.classList.remove('hidden');
      document.getElementById('userName')!.textContent = user.user_metadata.name || user.email;
      document.getElementById('userAvatar')!.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`;
    }
  } else if (event === 'SIGNED_OUT') {
    // Update UI for logged out state
    document.getElementById('loginBtn')?.classList.remove('hidden');
    document.getElementById('userProfile')?.classList.add('hidden');
  }
});