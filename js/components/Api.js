class Api {
    constructor({address, token}) {
        this._address = address;
        this._token = token;
    }

    getMessages() {
        return fetch(`${this._address}/messages`, {
            headers: {
                authorization: this._token
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        });
    }

    addMessage(data) {
        return fetch(`${this._address}/messages`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                user: data.user,
                message: data.message
            })
        })
            .then(response => response.ok
                ? response.json()
                : Promise.reject(`Ошибка ${response.status}`))
    }


    removeMessage(id) {
        return fetch(`${this._address}/messages/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
            .then(response => response.ok
                ? Promise.resolve('success')
                : Promise.reject(`Ошибка ${response.status}`))
    }
}


export default Api;
