export async function fetchJSON(path, method = 'GET', data = null) {
  const headers = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }
  const options = { method, headers };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}${path}`, options);

  if (res.ok) {
    return res.status === 200 ? await res.json() : undefined;
  }

  if (res.status === 422) {
    throw new Error('The server rejected the request parameter(s).');
  }

  const body = await res.text();
  try {
    const result = JSON.parse(body);
    throw new Error(result.message || result.sqlMessage || 'Unexpected server error.');
  } catch (err) {
    throw new Error(`${res.status} - ${res.statusText}`);
  }
}
