
export const secureRequestMethod = 'http'
export const urlsAPI = {
    'main': `${secureRequestMethod}://localhost:8000/api`,
    'user_account': {
        'getAllUserGames': '/my-account/my-games',
        'register_game': '/my-account/register-game',
    }
}
