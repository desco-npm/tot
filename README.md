# @desco/tot

## Instalação

```
npm init
npm install @desco/tot
cp node_modules/@desco/tot/initial/* .
```

1. Instala o **Tot**
2. Copia arquivos de modelo inicial do Tot para o seu projeto

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


### VERSIONS

A configuração `VERSIONS` deve conter uma lista contendo objetos com as seguintes propriedades:

| Nome | Descrição |
|---|---|
| number | O número da versão |

> Note que `VERSIONS` deve estar ordenado da versão mais antiga para a mais nova

*Exemplo:*

```
VERSIONS=[ { number: '1.0.0', }, { number: '1.0.1', }, { number: '1.2.9', }, ]
```

### LANGUAGES

A configuração `LANGUAGES` deve conter uma lista contendo objetos com as seguintes propriedades:

| Nome | Descrição |
|---|---|
| name | O nome do idioma |
| initials | A sigla do idioma |

*Exemplo:*

```
LANGUAGES=[ { initials: 'en', name: 'American English', }, { initials: 'ptbr', name: 'Portugês do Brasil', }, ]
```

## Cores

Para alterar as cores da documentação, simplesmente altera as variáveis do arquivo `collors.scss`.

Este arquivo contém, além de variáveis para todas as cores usadas, outras variáveis para cada elemento da documentação, se algo tem uma cor, tem uma variável!

## Logo

Para alterar a logo, simplesmente sobrescreva o arquivo `logo.png` pela logo desejada.

> Note que, para melhor exibição, a logo deve ter um formato com largura e altura iguais.

## Iniciando

Apenas rode os seguintes comandos, cada um em uma linha de comando, para executar o front e o back.

```
npm run front
npm run back
```