  
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

 
  /* CLASSE Favorites QUE VAI CONTER A LOGICA DOS DADOS - COMO OS DADOS SERÃO ESTRUTURADOS - HERANÇA */

  export class Favorites {       // CRIANDO E EXPORTANDO A CLASSE //

    constructor(root){          // CRIANDO O APP - ROOT // root = app

      this.root = document.querySelector(root)     // procurando para exsitri o tempo todo
      this.load();                                 // para carregar a funcao load

      GithubUser.search('FilipeRabelo').then(user => console.log(user))  // promise user é o retono d fecth(endpoint)

    }



    load(){  // funcao para carregar os dados

      this.entrieDates = JSON.parse( localStorage.getItem('@github-favorites:')) || [];  /* se JSON.parse tiver vazio -> transfoma em array */
      
      // console.log(this.entrieDates)

      // localstore é uma api do browser    //  getItem => pegar um item  //  parse modifica o objeto

      // this.entrieDates = [   // ARRAY    // LISTA DE USUARIOS //
      //   {
      //     login: "FilipeRabelo",
      //     name: "Filipe Rabelo",
      //     public_repos: "340",
      //     followers: "1200",
      //   },
    }




    async add(username){                                  // precisar ir buscar o usuario no github   // ASSINCRONISMO //

      // TRATAMENTO DE ERROR // 
      try{                                                // tente fazer
        const user = await GithubUser.search(username);   // aguardando a promise terminar
        // console.log(user)

        if(user.login === undefined){
          throw new Error("Usuario não encontrado!")       // Disparar uma msg de Error
        }

        this.entrieDates = [user, ...this.entrieDates];   // user = novo usuario - ...this.entrieDate trazendo os outros usuarios

      }catch(error){                                      // capture o erro 
        alert(error.message);
      }

    }



    delete(user){   // BOTÃO DE ESCLUIR //
      
      const filteredEntries = this.entrieDates.filter(entry => entry.login != user.login); // se false // NOVA CONSTANTE //
      console.log(filteredEntries)     

      this.entrieDates = filteredEntries; // estou limpando todo o array entrieDates ecolocando um novo array dentro do entrieDate //
      this.update()      

      // função de ordem superior 
      // higher-order function (map, filter, find, reduce...)
      // principio da imutabilidade
    }

  } /* FIM CLASSE - guardar os dados no localstorege */

  
 
  export class FavoritesView extends Favorites{  // CLASS VIEW - DOM - ESSA PARTE CUIDA DA PARTE DE VISUALIZAÇÃO DO HTML 
                                                 
    constructor(root) {                          // #app  // this.root é a div #app //

      super(root);                               // super é a cola q uni a classe filha (cria o link entre os dois)

      this.tbody = this.root.querySelector("table tbody");
      this.update();
      this.onadd();                              // PARA JA RODAR NO COMEÇO //

    }

    onadd(){

      const addButton   = this.root.querySelector('.search button')

      addButton.onclick = () => {        
        const {value} =  this.root.querySelector('.search input') // pegando o valor do input
        // console.dir(value)

        this.add(value)
      }
    }



    update(){                               // criando o html na FavoritesView  // função update //

      this.removeAllTr();
      this.entrieDates.forEach( user => {  // para cada usuario quero rodar uma funcao

        const row = this.createRow()
        // console.log(row)

        row.querySelector('.user img').src             = `https://github.com/${user.login}.png`;
        row.querySelector('.user img').alt             = `Imagem de ${user.name}`;
        row.querySelector('.user p').textContent       = user.name;
        row.querySelector('.user span').textContent    = user.login;
        row.querySelector('.repositories').textContent = user.public_repos;
        row.querySelector('.followers').textContent    = user.followers;

        row.querySelector('.remove').onclick = () => {  /* onclick para qndo houver somente um evento */
        
          const isOk = confirm('Tem certeza que deseja deletar essa linha?');

          if(isOk){  /* se for true */
            this.delete(user);
          }
        }

        this.tbody.append(row)  // .append() recebe um elemento html da DOM
      })

    }

    
    createRow(){   /* CRIANDO AS LINHAS */

      const tr = document.createElement("tr");  // TR CRIADA PELO JAVASCRIPT - DOM

      // CONTEUDO  // tBody
      tr.innerHTML = `
             
        <td class="user">
          <img src="https://github.com/FilipeRabelo.png" alt="Imagem de Filipe Rabelo"/>
          <a href="https://github.com/FilipeRabelo" target="_blank">
           <p></p>
           <span></span>
          </a>
        </td>
     
        <td class="repositories">100</td><!-- COLUNAS - td -->
        <td class="followers">65655454</td>        
        
        <td>
          <button class="remove">&times</button>
        </td>        
        
      `
      return tr;    // tr.innerHTML = content    // para colocar o conteudo dentro do tr
    }

    removeAllTr(){   // função remove //

      this.tbody.querySelectorAll('tr').forEach((tr) => {    // para cada td vai executar essa função
        // console.log(tr)
        // alert("oi")
        tr.remove()
      })

      // console.log(tbody.querySelectorAll('tr'))
    }

  }

















