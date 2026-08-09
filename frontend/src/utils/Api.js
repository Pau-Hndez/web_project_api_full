import { getToken } from "./token";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async addCard(name, link) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  async deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getToken()}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(`Error: ${res.status}`));
    });
  }

  async _makeRequest(endPoint, method) {
    const options = {
      method,
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getToken()}`,
      },
    };
    const response = await fetch(`${this._baseUrl}${endPoint}`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  }
  async changeLikeCardStatus(cardId, isLiked) {
    return isLiked
      ? this._makeRequest(`/cards/${cardId}/likes`, "PUT")
      : this._makeRequest(`/cards/${cardId}/likes`, "DELETE");
  }
  async editProfilePicture({ avatar }) {
    console.log(avatar);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.log(err));
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
