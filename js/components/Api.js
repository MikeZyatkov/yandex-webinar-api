class Api {
    constructor({address, token, groupId}) {
        this._address = address;
        this._token = token;
    }

    getMessages() {
        return fetch(`${this._address}/messages`, {
            headers: {
                authorization: this._token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                return Promise.reject(`Ошибка ${response.status}`)
            })
    }

    addMessage(data) {
        return fetch(`${this._address}/messages`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: data.user,
                message: data.message
            })
        })
            .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`))
    }

    removeMessage(id) {
        return fetch(`${this._address}/messages/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
            .then(result => result.ok ? Promise.resolve('success') : Promise.reject(`Ошибка ${result.status}`))
    }
}

export default Api;
