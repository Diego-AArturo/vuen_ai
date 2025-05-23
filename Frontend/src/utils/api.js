export async function fetchSession() {
    const res = await fetch("/session");
    const data = await res.json();
    return data.client_secret.value;
}
