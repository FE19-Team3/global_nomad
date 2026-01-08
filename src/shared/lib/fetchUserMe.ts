export async function fetchUserMe() {
  const res = await fetch(`/api/users/me`, {
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Unauthorized');
  }

  return res.json();
}
