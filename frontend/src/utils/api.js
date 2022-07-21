class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization
  }

  _createFetch(url, options = {}) {
    return fetch(url, options)
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  getInitialCards() {
    return this._createFetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: `${this._token}`
      }
    })
  }

  setNewCard(data) {
    return this._createFetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  deleteCard(id) {
    return this._createFetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`
      }
    })
  }

  changeLikeCardStatus(id, isLiked) {
    return this._createFetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  getUserInfo() {
    return this._createFetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  setUserInfo(data) {
    return this._createFetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'authorization': `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.description
      })
    })
  }

  setUserAvatar(data) {
    return this._createFetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'authorization': `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }
}

const token = localStorage.getItem('token');

export const api = new Api({
  baseUrl: 'https://api.mesto.mkozhevnikov23.nomoredomains.xyz',
  headers: {
    'authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
});
