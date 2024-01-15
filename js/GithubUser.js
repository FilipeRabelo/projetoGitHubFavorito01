  
// API  

export class GithubUser{     

  static search(username){                                       /* criando um metodo estatico - procurar o nome do usuario */

    const endpoint = `https://api.github.com/users/${username}`; // local

    return fetch(endpoint)
      .then(data => data.json())                                 // transformando os dados em json // ele vem como string
      .then(({login, name, public_repos, followers}) => ({       // desentruturação // DATA - dados //
        login,          // login: data.login,
        name,           // name: data.name,
        public_repos,   // public_repos: data.public_repos,
        followers       // followers: data.followers          
    }))

    // retornando data (dados)
    // fetch = buscar // then = entao(promise) //  // fetch vai retorna o objeto com os dados
  };

}
