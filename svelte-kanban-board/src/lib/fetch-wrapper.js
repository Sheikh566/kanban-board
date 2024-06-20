export class FetchWrapper {
  static async get(path, token = null) {
    const loginUrl = `${import.meta.env.VITE_API_URL}${path}`;
    const res = await fetch(loginUrl, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    })

    if (res.status == 401) {
      localStorage.removeItem("RememberMeToken");
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    
    return { data: await res.json(), status: res.status };
  }

  static async post(path, data, token = null) {
    const loginUrl = `${import.meta.env.VITE_API_URL}${path}`;
    const res = await fetch(loginUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(data),
    });

    if (res.status == 401) {
      localStorage.removeItem("RememberMeToken");
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }

    return { data: await res.json(), status: res.status };
  }

  static async put(path, data, token = null) {
    const loginUrl = `${import.meta.env.VITE_API_URL}${path}`;
    const res = await fetch(loginUrl, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(data),
    })

    if (res.status == 401) {
      localStorage.removeItem("RememberMeToken");
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    
    return { data: await res.json(), status: res.status };
  }

  static async delete(path, token = null) {
    const loginUrl = `${import.meta.env.VITE_API_URL}${path}`;
    const res = await fetch(loginUrl, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (res.status == 401) {
      localStorage.removeItem("RememberMeToken");
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }

    return { data: await res.json(), status: res.status };
  }
}