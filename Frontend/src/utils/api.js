export async function fetchSession() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/session`);
    const data = await res.json();
    return data.client_secret.value;
}
