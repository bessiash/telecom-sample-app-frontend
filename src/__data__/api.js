function* login (username, password) {
    return yield fetch('http://localhost:8000/api/auth/token/obtain/',
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ username, password }),
        }
    ).then(response => response.json())
}

function* refreshAccessToken (token) {
    return yield fetch('http://localhost:8000/api/auth/token/refresh/',
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({refresh: token}),
        }
    ).then(response => response.json())
}

function* getTelecomOperators (authorization = {}) {
    return yield fetch('http://localhost:8000/api/telecom/operator/',
        {
            headers: {
                'Content-Type': 'application/json',
                ...authorization,
            },
            method: 'GET',
        }
    ).then(response => response.json())
}

function* getPurce (authorization = {}) {
    return yield fetch('http://localhost:8000/api/telecom/purce/',
        {
            headers: {
                'Content-Type': 'application/json',
                ...authorization,
            },
            method: 'GET',
        }
    ).then(response => response.json())
}

function* refill (id, phone, amount, authorization = {}) {
    return yield fetch(`http://localhost:8000/api/telecom/operator/${id}/refill/`,
        {
            headers: {
                'Content-Type': 'application/json',
                ...authorization,
            },
            method: 'POST',
            body: JSON.stringify({ phone, amount }),
        }
    ).then(response => response.json())
}

export default {
    login,
    refill,
    getPurce,
    refreshAccessToken,
    getTelecomOperators,
}
