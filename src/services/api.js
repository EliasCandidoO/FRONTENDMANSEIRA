// Instância única do Axios pra toda a comunicação com a API do NewsStream.
// O interceptor de resposta padroniza qualquer erro no formato { message, errors, status },
// garantindo que nenhuma tela precise ficar tratando exceção do próprio jeito:
//
// 1) error.response -> A API respondeu com status de erro (4xx/5xx). 
//    Ex: tentar comentar deslogado (401) ou mandar campo obrigatório vazio (400).
//    Como a API já manda um JSON estruturado, a gente só repassa no nosso padrão.
//
// 2) error.request -> A requisição foi enviada, mas não houve resposta (API caiu ou usuário sem net).
//    Como não tem response.data, jogamos uma mensagem genérica e amigável.
//
// 3) else -> Erro que ocorre na hora de montar a request (configuração errada do Axios).
//    Quase impossível de acontecer no dia a dia, mas tá coberto para evitar quebrar tudo.


import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // A API respondeu, mas com um status de erro (4xx ou 5xx)
      const apiError = error.response.data
      return Promise.reject({
        message: apiError.message || 'Ocorreu um erro na requisição.',
        errors: apiError.errors || [],
        status: error.response.status,
      })
    } else if (error.request) {
      // A requisição foi enviada, mas nenhuma resposta chegou (API fora do ar, sem rede)
      return Promise.reject({
        message: 'Não foi possível se conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.',
        errors: [],
        status: null,
      })
    } else {
      // Erro ao montar a própria requisição (configuração inválida, por exemplo)
      return Promise.reject({
        message: 'Erro inesperado ao preparar a requisição.',
        errors: [],
        status: null,
      })
    }
  }
)

export default api