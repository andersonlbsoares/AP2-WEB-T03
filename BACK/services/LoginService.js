const usuario = "admin"
const senha = "admin"


class LoginService {
    static login(user, password) {
        return new Promise(
            (resolve, reject) => {
                if (user == usuario && password == senha) {
                    resolve(
                        {
                            "message": "Usuário autenticado com sucesso"
                        }
                    )
                } else {
                    reject(
                        {
                            "message": "Usuário ou senha inválidos"
                        }
                    )
                }
            }
        )
    }
}

module.exports = LoginService