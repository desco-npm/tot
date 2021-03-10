<div align="right">
  <a href="README.US.md">
    <img alt="Read in American English" src="https://img.shields.io/static/v1?label=&message=🇺🇸 Read in American English&color=red&style=for-the-badge" />
  </a>
</div>

<table>
  <tr>
    <td><img src="https://i.ibb.co/y81YrrF/tot.png"></td>
    <td>  
      <h1>@desco/tot</h1>
      Pacote que permite criar documentações.
      <br /><br />
      <div align="center">
        <img alt="Licença MIT" src="https://img.shields.io/static/v1?label=Licença&message=MIT&color=green&style=for-the-badge">
        <img alt="Versão 1.10.2" src="https://img.shields.io/static/v1?label=Versão&message=1.10.2&color=blue&style=for-the-badge">
      </div>
      <h4 align="center"> 
        🧪 Em fase Beta 🚀
      </h4>
    </td>
  </tr>
</table>

> <a href="https://github.com/desco-npm" target="_blank">Veja outros projetos NPM aqui.</a>

> <a href="https://github.com/descoifica" target="_blank">Veja outros projetos aqui.</a>

---

## 📋 Tabela de conteúdos

* [✔️ Recursos](#Recursos)
* [🛠️ Tecnologias](#Tecnologias)
* [⚙️ Instalação](#Instalação)
* [📚 Como Usar](#Como-Usar)

---

<a name="Recursos"></a>

## ✔️ Recursos

* [x] Versões
* [x] Multi-idiomas
* [x] Tópicos
* [x] Ícones para os tópicos
* [x] Filtros
* [x] Artigos
* [x] Componente próprio de exemplo códigos
* [x] Breadcrumb
* [x] Paginação
* [x] Customização de cores
* [x] Customização de fonte
* [x] Configuração

---

## 🛠️ Tecnologias

As seguintes tecnologias são utilizadas:

* [NodeJS](https://nodejs.org/en/);
* [VueJS](https://vuejs.org/);
* [Axios](https://www.npmjs.com/package/axios);
* [Element](https://element.eleme.io);
* [Express](https://expressjs.com);
* [Express](https://expressjs.com);
* [PUG/JADE](https://pugjs.org/api/getting-started.html);
* [SCSS/SASS](https://sass-lang.com);

---

<a name="Instalação"></a>

## ⚙️ Instalação

```bash
npm install @desco/tot

cp node_modules/@desco/tot/initial/* .
cp node_modules/@desco/tot/initial/.env ./.env
```

> Note que será necessário ter o **NPM** instalado para o comando funcionar.

> Os comandos de cópia irão criar arquivos iniciais com os quais trabalhar

> Note que dentre os arquivos copiados no passo 3, consta um *packages.json* que irá **sobrescrever** o atual.

---

<a name="Como-Usar"></a>

## 📚 Como Usar

### Configurações

Para configura o **Tot** basta manipular o arquivo *.env* disponibilizado no passo 2 da instalação.

Veja uma tabela com todas as configurações disponíveis:

| Nome | Descrição |
|---|---|
| VUE_APP_TITULO | Título do projeto documentado, irá aparecer tanto na barra de título do navegador como no template da documentação |
| VUE_APP_BASE_URL | URL onde o backend esta rodando |
| VUE_APP_DEFAULT_LANGUAGE | Sigla do idioma padrão da documentação. Caso algum artigo não esteja disponível no idioma pedido pelo usuário, será carregado no idioma padrão. |
| VUE_APP_SIZE_SIDE | Tamanho da área lateral da documentação, considerando que a tela inteira ocupa 25 "colunas", quantas a área lateral irá ocupar? Deve ser um número inteiro. |
| VUE_APP_TIMEOUT | Quanto tempo (em milesegundos) a documentação irá esperar resposta do backend antes de dar erro de timeout. |
| VUE_APP_TOPIC_SEARCH_PLACEHOLDER | Texto a ser exibido no campo de busca de tópicos quando ele estiver vazio |
| VUE_APP_ARTICLE_NOT_FOUND_TITLE | Título da tela de "Artigo não encontrado" |
| VUE_APP_ARTICLE_NOT_FOUND_CONTENT | Conteúdo da tela de "Artigo não encontrado" |
| VUE_APP_ARTICLE_ERROR_TITLE | Título da tela de "Erro ao carregar o artigo" |
| VUE_APP_ARTICLE_ERROR_CONTENT | Conteúdo da tela de "Erro ao carregar o artigo" |
| SERVER_PORT | Porta em que o backend irá rodar |
| VERSIONS | Versões documentadas |
| LANGUAGES | Idiomas suportados pela documentação |
| BREADCRUMB_AMOUNT_ITEMS | Quantidade de itens no breadcrumb |


#### A configuração "VERSIONS"

A configuração `VERSIONS` deve conter uma lista contendo objetos com as seguintes propriedades:

| Nome | Descrição |
|---|---|
| number | O número da versão |

> Note que `VERSIONS` deve estar ordenado da versão mais antiga para a mais nova

*Exemplo:*

```js
VERSIONS=[ { number: '1.0.0', }, { number: '1.0.1', }, { number: '1.2.9', }, ]
```

#### A configuração "LANGUAGES"

A configuração `LANGUAGES` deve conter uma lista contendo objetos com as seguintes propriedades:

| Nome | Descrição |
|---|---|
| name | O nome do idioma |
| initials | A sigla do idioma |

*Exemplo:*

```js
LANGUAGES=[ { initials: 'en', name: 'American English', }, { initials: 'ptbr', name: 'Portugês do Brasil', }, ]
```

### Tópicos

Vejamos como adicionar tópicos na documentação.

Dentro do diretório `articles`, adicione novos diretórios nomeados com a propriede `number` de cada versão adicionada nas configurações em `VERSIONS`.

Dentro de cada um destes diretórios teremos um arquivo `topics.json` que conterá os tópicos exibidos na documentação para esta versão e também outros diretórios que conterão os artigos da documentação, mas veremos os artigos mais para frente, vamos focar no `topics.json`.

O `topics.json` deverá conter um array contendo objetos para cada tópico da documentação.

Estes objetos possuem as seguintes propriedades:

| Nome | Descrição |
|---|---|
| id | A identificação do tópico, este valor deverá ser usado no nome do diretório do artigo relacionado (veremos em detalhes em breve) |
| label | Nome do tópico, deve conter um JSON contendo propriedades nomeadas com a sigla dos idiomas e com valores contendo o nome do tópico no idioma em questão
| icon | Classe do ícone do tópico a ser exibido na árvore. Consulte os ícones do [FontAwesome](https://fontawesome.com/icons?d=gallery) e do [Element.io](https://element.eleme.io/#/en-US/component/icon) para escolher o que deseja |
| tree | Se informado como `false`, o tópico não irá aparecer na árvore de tópicos nem na paginação |
| article | Se informado como `false`, o tópico não será clicável na árvore e não aparecerá na paginação |
| children | Lista de tópicos filhos  |

*Exemplo:*

```json
[
    {
        "id": "level1",
        "icon": "fas fa-sort-numeric-up-alt",
        "label": {
            "ptbr": "Nivel 1",
            "en": "Level 1"
        },
        "children": [
            {
                "id": "level.1.1",
                "icon": "fas fa-sort-numeric-up-alt",
                "label": {
                    "ptbr": "Nível 1.1",
                    "en": "Level 1.1"
                }
            }
        ]
    },
    {
        "id": "level2",
        "icon": "fas fa-sort-numeric-up-alt",
        "article": false,
        "label": {
            "ptbr": "Nivel 2",
            "en": "Level 2"
        },
        "children": [
            {
                "id": "level.2.1",
                "icon": "fas fa-sort-numeric-up-alt",
                "label": {
                    "ptbr": "Nível 2.1",
                    "en": "Level 2.1"
                }
            }
        ]
    },
    {
        "id": "NoTree",
        "tree": false,
        "label": {
            "ptbr": "Sem Árvore",
            "en": "NoTree"
        }
    }
]
```

> Note que, como cada versão possui seu próprio  `topics.json`, sempre que a versão da documentação mudar, os tópicos também mudarão.

> Note que é possível ter uma versão sem `topics.json`, neste caso o **Tot** irá carregar o primiro `topics.json` existente nas versões anteriores. Isso evita de precisar ficar replicando `topics.json` a cada pequena mudança de versão, mas garanta ter um  `topics.json` ao menos na primeira versão.

### Artigos

O que é uma documentação sem os artigos explicando um determinado assunto? Vamos criar eles!

Lembra que criamos um diretório para cada versão e que dentro de cada um deles criamos um `topics.json` o qual contém uma lista de tópicos, cada um com um id?

Vamos agora, dentro dos diretórios das versões, criar novos diretórios nomeados com os ids de cada um dos tópicos informados.

Por exemplo: No `topics.json` exemplificado acima, temos os tópicos com id `level1` e `level2`, logo criamos os diretórios `level1` e `level2`.

Dentro destes diretórios, criarems arquivos *markdown* para cada um dos idiomas configurados no arquivo `.env`. Por exemplo: Se temos os idiomar *ptbr* e *en*, vamos ter os arquivos `ptbr.md` e `en.md`.

Estes arquivos conterão o conteúdo do artigo no idioma em questão, ou seja, o `ptbr.md` conterá o conteúdo do artigo em portugês do Brasil e o `en.md` o conteúdo do artigo em inglês americano.

> Note que arquivos *markdown* aceitam tando código *markdown*, como *HTML* e até mesmo um misto entre eles. <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">Consulte aqui para aprender mais sobre *markdown*</a>.

> Note que, caso não seja criado um arquivo para um idioma e este seja solicitado, o **Tot** irá carregar no idioma padrão configurado no arquivo `.env`.

> Note que não é preciso adicionar o título do tópico, ele já será automaticamente adicionado como cabeçalho de nível 1 (`h1` / `#`).

#### Links Entre Artigos

Caso queira criar um link dentro de um artigo que envie para outro artigo é muito simples, veja:

*Exemplo em Markdown*

```markdown
[Meu Link Para Outro Artigo](#idlevel1.idlevel1.2.idlevel1.2.1)
```

*Exemplo em HTML*

```html
<a href="#idlevel1.idlevel1.2.idlevel1.2.1">Meu Link Para Outro Artigo</a>
```

Explicando: Comece o link com `#` e adicione o id do tópico desejado, caso deseje um tópico que seja filho de oturo (ou outros) basta ir adicionando os ids em ordem e separando-os por um `.` ponto.

#### Exemplos de Códigos nos Artigos

O **Tot** possui uma marcação própria para exemplos de códigos nos artigos.

Digamos que você deseja exibir um ou mais códigos referentes a um exemplo, para isso começamos adicionando a seguinte marcação onde o código deve ser exibido:

```markdown
{<exemplo>}
```

Sempre que o **Tot** encontrar esta marcação, ele irá adicionar um componente baseado nas configurações informadas no arquivo de nome *exemplo*, como informado e localizado no mesmo diretório do artigo.

```js
module.exports = {
    title: 'Título;
    description: 'Minha Descrição';
    example: [
        {
            lang: 'html',
            name: 'Exemplo de HTML',
            icon: 'fab.fa-html5',
            content: `
<template lang="pug">
div(@click="onClick") Meu exemplo em HTML aqui
</template>
            `,
        },
        {
            lang: 'javascript',
            name: 'Exemplo de JS',
            icon: 'fab.fa-js',
            content: `
export default {
    methods: {
        onClick () {
            alert('Exemplo de JS!')
        }
    }
}
            `,
        },
    ]
}
```

![Sem título](/assets/img1.png)

Como podemos ver, ficamos com um componente de código que exibe um ou mais códigos separados por abas com nome e ícone da linguagem.

> Caso um nome não seja informado, a tecnologia será usada no lugar

> Caso a tecnologia não seja informada, um ícone padrão será usado

> Caso a tecnologia informada não seja reconhecida, será exibido um ícone padrão com o nome da tecnologia entre parenteses

### Cores

Para alterar as cores da documentação, simplesmente altera as variáveis do arquivo `collors.scss`.

Este arquivo contém, além de variáveis para todas as cores usadas, outras variáveis para cada elemento da documentação, se algo tem uma cor, tem uma variável!

### Fontes

Para alterar as fontes da documentação, copie as fontes desejadas para dentro do diretório `./fonts` e edite o arquivo `./fonts.scss` com a importação adequada das fontes.

> Note que dentro de `./fonts.scss`, o diretório `./~@/assets/fonts/` aponta para onde suas fontes ficarão após executar o **Tot**.

Feito isso, edite as variáveis `$FONT_DEFAULT` e `$FONT_CODE` dentro do mesmo arquivo para definir a fonte usada em cada caso.

| Variável | Descrição |
|---|---|
| $FONT_DEFAULT | Fonte padrão a ser usada |
| $FONT_CODE | Fonte a ser udada nas áreas onde código é exibido |


### Logo

Para alterar a logo, simplesmente sobrescreva o arquivo `logo.png` pela logo desejada.

> Note que, para melhor exibição, a logo deve ter um formato com largura e altura iguais.

### Ícone

Para alterar o ícone que aparece na barra do navegador, simplesmente sobrescreva o arquivo `ico.png` pelo ícone desejado.

> Note que, para melhor exibição, o ícone deve ter dimensões de 16x16 pixels.

### Iniciando para Desenvolvimento

Apenas rode os seguintes comandos, cada um em uma linha de comando, para executar o front e o back.

```bash 
npm run front
npm run back
```

### Construindo a Aplicação

Para construir uma versão final do frontend da aplicação, rode: 

```bash
npm run build
```

Um diretório *build* será criado na raiz do projeto, ele irá conter todos os arquivos preparados para rodar no seu servidor de produção!

> Note que `build` constrói apenas o frontend, ainda será necessário iniciar o backend normalmente

---

## Autor

<table>
  <tr>
    <td width="150px">
      <img src="https://scontent.fsdu1-1.fna.fbcdn.net/v/t1.0-9/539886_235546170253505_5977326689811409130_n.jpg?_nc_cat=106&ccb=3&_nc_sid=174925&_nc_eui2=AeGgFWn_fWInwRkTo3mHSP993TbQ0TzG0Y3dNtDRPMbRjS-eZL1tr4I5maqz6O-jva9qWnIxKOsD3UtSm9CTeCys&_nc_ohc=Qw6NaDGrtIgAX9uFF2c&_nc_ht=scontent.fsdu1-1.fna&oh=5ebac9874d7a24e157c8c99fd965c2a4&oe=606539CE" width="100px;" alt=""/>
      <b>Rafael A. R. Dias</b>
    </td>
    <td>  
      <a href="mailto:eu@diasrafael.com.br" target="_blank" >
        <img alt="Email eu@diasrafael.com.br" src="https://img.shields.io/static/v1?label=Email&message=eu@diasrafael.com.br&color=red&logo=gmail&style=for-the-badge">
      </a>
      <a href="https://www.linkedin.com/in/diasrafael/" target="_blank">
        <img alt="Linkedin @diasrafael" src="https://img.shields.io/static/v1?label=Linkedin&message=@diasrafael&color=blue&logo=linkedin&style=for-the-badge">
      </a>
      <a href="https://www.facebook.com/eudiasrafael" target="_blank">
        <img alt="Facebook @eudiasrafael" src="https://img.shields.io/static/v1?label=Facebook&message=@eudiasrafael&color=blue&logo=facebook&style=for-the-badge">
      </a>
      <a href="https://github.com/descodifica" target="_blank">
        <img alt="GitHub Geral @descodifica" src="https://img.shields.io/static/v1?label=GitHub Geral&message=@descodifica&color=black&logo=github&style=for-the-badge">
      </a>
      <a href="https://github.com/desco-npm" target="_blank">
        <img alt="GitHub NPM @desco-npm" src="https://img.shields.io/static/v1?label=GitHub NPM&message=@desco-npm&color=black&logo=github&style=for-the-badge">
      </a>
      <a href="https://www.npmjs.com/org/desco" target="_blank">
        <img alt="NPM @desco" src="https://img.shields.io/static/v1?label=NPM&message=@desco&color=red&logo=npm&style=for-the-badge">
      </a>
    </td>
  </tr>
</table>