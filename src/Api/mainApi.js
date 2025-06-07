const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  function putAccessToken(accessToken) {
    return localStorage.setItem('accessToken', accessToken);
  }

  async function fetchWithToken(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      alert(responseJson.message);
      return { error: true };
    }
    return { error: false };
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      alert(responseJson.message);
      return {
        error: true,
        data: null,
      };
    }
    return { error: false, data: responseJson.data };
  }

  async function seeAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
  }
  async function seeOwnUser() {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null,
      };
    }
    return { error: false, data: responseJson.data };
  }
  async function createThread({ title, body, category }) {
    const response = await fetch(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  }

  async function seeAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`, {
      method: 'GET',
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  }

  async function seeDetailThread(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  }

  async function createComment(content, id) {
    const response = await fetch(`${BASE_URL}/threads/${id}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ content }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  }

  async function upVoteThread(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}/up-vote`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  }
  async function downVoteThread(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}/down-vote`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  }
  async function neutralVoteThread(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}/neutral-vote`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  }
  async function upVoteComment(id, commentId) {
    const response = await fetch(
      `${BASE_URL}/threads/${id}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  }
  async function downVoteComment(id, commentId) {
    const response = await fetch(
      `${BASE_URL}/threads/${id}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  }
  async function neutralVoteComment(id, commentId) {
    const response = await fetch(
      `${BASE_URL}/threads/${id}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  }

  async function leaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null,
      };
    }
    return {
      error: false,
      data: responseJson.data,
    };
  }
  return {
    getAccessToken,
    putAccessToken,
    register,
    fetchWithToken,
    login,
    createComment,
    createThread,
    upVoteComment,
    upVoteThread,
    downVoteComment,
    downVoteThread,
    neutralVoteComment,
    neutralVoteThread,
    leaderboards,
    seeAllThreads,
    seeDetailThread,
    seeOwnUser,
    seeAllUsers,
  };
})();
export { api };
