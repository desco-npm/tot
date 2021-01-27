# @desco/tot
![logo](initial/logo.png)

>[View documentation in American English](README.en.md)

## Sobre

O **Tot** é um pacote responsável por prover um ambiente de documentação para seus projetos com:

* Versões
* Multi-idiomas
* Tópicos
* Ícones para os tópicos
* Filtros
* Artigos
* Componente próprio de exemplo códigos
* Breadcrumb
* Paginação
* Customização de cores
* Customização de fonte
* Configuração

## Instalação

```bash 
npm init
npm install @desco/tot
cp node_modules/@desco/tot/initial/* .
```

1. Instala o **Tot**;
2. Copia arquivos de modelo inicial do Tot para o seu projeto;

> Note que dentre os arquivos copiados no passo 3, consta um *packages.json* que irá **sobrescrever** o atual.

## Configurações

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


### A configuração "VERSIONS"

A configuração `VERSIONS` deve conter uma lista contendo objetos com as seguintes propriedades:

| Nome | Descrição |
|---|---|
| number | O número da versão |

> Note que `VERSIONS` deve estar ordenado da versão mais antiga para a mais nova

*Exemplo:*

```js
VERSIONS=[ { number: '1.0.0', }, { number: '1.0.1', }, { number: '1.2.9', }, ]
```

### A configuração "LANGUAGES"

A configuração `LANGUAGES` deve conter uma lista contendo objetos com as seguintes propriedades:

| Nome | Descrição |
|---|---|
| name | O nome do idioma |
| initials | A sigla do idioma |

*Exemplo:*

```bash
LANGUAGES=[ { initials: 'en', name: 'American English', }, { initials: 'ptbr', name: 'Portugês do Brasil', }, ]
```

## Tópicos

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

## Artigos

O que é uma documentação sem os artigos explicando um determinado assunto? Vamos criar eles!

Lembra que criamos um diretório para cada versão e que dentro de cada um deles criamos um `topics.json` o qual contém uma lista de tópicos, cada um com um id?

Vamos agora, dentro dos diretórios das versões, criar novos diretórios nomeados com os ids de cada um dos tópicos informados.

Por exemplo: No `topics.json` exemplificado acima, temos os tópicos com id `level1` e `level2`, logo criamos os diretórios `level1` e `level2`.

Dentro destes diretórios, criarems arquivos *markdown* para cada um dos idiomas configurados no arquivo `.env`. Por exemplo: Se temos os idiomar *ptbr* e *en*, vamos ter os arquivos `ptbr.md` e `en.md`.

Estes arquivos conterão o conteúdo do artigo no idioma em questão, ou seja, o `ptbr.md` conterá o conteúdo do artigo em portugês do Brasil e o `en.md` o conteúdo do artigo em inglês americano.

> Note que arquivos *markdown* aceitam tando código *markdown*, como *HTML* e até mesmo um misto entre eles. <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">Consulte aqui para aprender mais sobre *markdown*</a>.

> Note que, caso não seja criado um arquivo para um idioma e este seja solicitado, o **Tot** irá carregar no idioma padrão configurado no arquivo `.env`.

> Note que não é preciso adicionar o título do tópico, ele já será automaticamente adicionado como cabeçalho de nível 1 (`h1` / `#`).

### Links Entre Artigos

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

### Exemplos de Códigos nos Artigos

O **Tot** possui uma marcação própria para exemplos de códigos nos artigos.

Digamos que você deseja exibir um ou mais códigos referentes a um exemplo, para isso começamos adicionando a seguinte marcação onde o código deve ser exibido:

```
{<exemplo>}
```

Sempre que o **Tot** encontrar esta marcação, ele irá adicionar um componente baseado nas configurações informadas no arquivo de nome *exemplo*, como informado e localizado no mesmo diretório do artigo.

```
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

## Cores

Para alterar as cores da documentação, simplesmente altera as variáveis do arquivo `collors.scss`.

Este arquivo contém, além de variáveis para todas as cores usadas, outras variáveis para cada elemento da documentação, se algo tem uma cor, tem uma variável!

## Fontes

Para alterar as fontes da documentação, copie as fontes desejadas para dentro do diretório `./fonts` e edite o arquivo `./fonts.scss` com a importação adequada das fontes.

> Note que dentro de `./fonts.scss`, o diretório `./~@/assets/fonts/` aponta para onde suas fontes ficarão após executar o **Tot**.

Feito isso, edite as variáveis `$FONT_DEFAULT` e `$FONT_CODE` dentro do mesmo arquivo para definir a fonte usada em cada caso.

| Variável | Descrição |
|---|---|
| $FONT_DEFAULT | Fonte padrão a ser usada |
| $FONT_CODE | Fonte a ser udada nas áreas onde código é exibido |


## Logo

Para alterar a logo, simplesmente sobrescreva o arquivo `logo.png` pela logo desejada.

> Note que, para melhor exibição, a logo deve ter um formato com largura e altura iguais.

## Ícone

Para alterar o ícone que aparece na barra do navegador, simplesmente sobrescreva o arquivo `ico.png` pelo ícone desejado.

> Note que, para melhor exibição, o ícone deve ter dimensões de 16x16 pixels.

## Iniciando para Desenvolvimento

Apenas rode os seguintes comandos, cada um em uma linha de comando, para executar o front e o back.

```bash 
npm run front
npm run back
```

## Construindo a Aplicação

Para construir uma versão final do frontend da aplicação, rode: 

```bash
npm run build
```

Um diretório *build* será criado na raiz do projeto, ele irá conter todos os arquivos prepadados
para rodar no seu servidor de produção!

> Note que `build` constrói apenas o frontend, ainda será necessário iniciar o backend normalmente