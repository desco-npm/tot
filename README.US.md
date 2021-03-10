<div align="right">
  <a href="README.md">
    <img alt="Ler em Portugês do Brasil" src="https://img.shields.io/static/v1?label=&message=🇧🇷 Ler em Português do Brasil&color=green&style=for-the-badge" />
  </a>
</div>

<table>
  <tr>
    <td><img src="https://i.ibb.co/y81YrrF/tot.png"></td>
    <td>  
      <h1>@desco/tot</h1>
      Package that allows you to create documentation.
      <br /><br />
      <div align="center">
        <img alt="MIT License" src="https://img.shields.io/static/v1?label=License&message=MIT&color=green&style=for-the-badge">
        <img alt="Version 1.10.2" src="https://img.shields.io/static/v1?label=Version&message=1.10.2&color=blue&style=for-the-badge">
      </div>
      <h4 align="center"> 
        🧪 In Beta 🚀
      </h4>
    </td>
  </tr>
</table>

> <a href="https://github.com/desco-npm" target="_blank">See other NPM projects here.</a>

> <a href="https://github.com/descoifica" target="_blank">See other projects here.</a>

---

## 📋 Table of Contents

* [✔️ Resources](#Resources)
* [🛠️ Technology](#Technology)
* [⚙️ Installation](#Installation)
* [📚 How to use](#How-to-use)

---

<a name="Resources"></a>

## ✔️ Resources

* [x] Versions
* [x] Multi-languages
* [x] Topics
* [x] Icons for topics
* [x] Filters
* [x] Articles
* [x] Own component of example codes
* [x] Breadcrumb
* [x] Pagination
* [x] Color customization
* [x] Font customization
* [x] Configuration

---

## 🛠️ Technology

The following technologies are used:

* [NodeJS](https://nodejs.org/en/);
* [VueJS](https://vuejs.org/);
* [Axios](https://www.npmjs.com/package/axios);
* [Element](https://element.eleme.io);
* [Express](https://expressjs.com);
* [Express](https://expressjs.com);
* [PUG / JADE](https://pugjs.org/api/getting-started.html);
* [SCSS / SASS](https://sass-lang.com);

---

<a name="Installation"></a>

## ⚙️ Installation

```bash
npm install @desco/tot

cp node_modules/@desco/tot/initial/* .
cp node_modules/@desco/tot/initial/.env ./.env
```

> Note that it will be necessary to have **NPM** installed for the command to work.

> Copy commands will create initial files to work with

> Note that among the files copied in step 3, there is a *packages.json* that will **overwrite** the current one.

---

<a name="How-To-Use"></a>

## 📚 How to use

### Settings

To configure **Tot**, just manipulate the *.env* file provided in step 2 of the installation.

See a table with all available configurations:

| Name | Description |
| --- | --- |
| VUE_APP_TITULO | Documented project title, will appear in both the browser title bar and the documentation template |
| VUE_APP_BASE_URL | URL where the backend is running |
| VUE_APP_DEFAULT_LANGUAGE | Acronym for the standard documentation language. If any article is not available in the language requested by the user, it will be loaded in the default language. |
| VUE_APP_SIZE_SIDE | Size of the side area of ​​the documentation, considering that the entire screen occupies 25 "columns", how many will the side area occupy? It must be an integer. |
| VUE_APP_TIMEOUT | How long (in mileseconds) the documentation will wait for a response from the backend before giving a timeout error. |
| VUE_APP_TOPIC_SEARCH_PLACEHOLDER | Text to be displayed in the topic search field when it is empty |
| VUE_APP_ARTICLE_NOT_FOUND_TITLE | Screen title of "Article not found" |
| VUE_APP_ARTICLE_NOT_FOUND_CONTENT | "Article not found" screen content |
| VUE_APP_ARTICLE_ERROR_TITLE | Screen title of "Error loading article" |
| VUE_APP_ARTICLE_ERROR_CONTENT | Contents of the "Error loading article" screen |
| SERVER_PORT | Port on which the backend will run |
| VERSIONS | Documented versions |
| LANGUAGES | Languages ​​supported by the documentation |
| BREADCRUMB_AMOUNT_ITEMS | Quantity of items in the breadcrumb |


#### The "VERSIONS" setting

The `VERSIONS` configuration must contain a list containing objects with the following properties:

| Name | Description |
| --- | --- |
| number | The version number |

> Note that `VERSIONS` must be ordered from the oldest version to the newest one

*Example:*

```js
VERSIONS=[ { number: '1.0.0', }, { number: '1.0.1', }, { number: '1.2.9', }, ]
```

#### The "LANGUAGES" setting

The `LANGUAGES` configuration must contain a list containing objects with the following properties:

| Name | Description |
| --- | --- |
| name | The name of the language |
| initials | The acronym of the language |

*Example:*

```js
LANGUAGES=[ { initials: 'en', name: 'American English', }, { initials: 'ptbr', name: 'Portugês do Brasil', }, ]
```

### Topics

Let's look at how to add topics in the documentation.

Within the `articles` directory, add new directories named with the` number` property of each version added in the `VERSIONS` settings.

Within each of these directories we will have a file `topics.json` that will contain the topics shown in the documentation for this version and also other directories that will contain the articles in the documentation, but we will see the articles later, we will focus on` topics.json `.

`Topics.json` should contain an array containing objects for each topic in the documentation.

These objects have the following properties:

| Name | Description |
| --- | --- |
| id | The topic identification, this value should be used in the name of the directory of the related article (we will see in detail soon) |
| label | Topic name, must contain a JSON containing properties named with the acronym of the languages ​​and with values ​​containing the name of the topic in the language in question
| icon | Class of the topic icon to be displayed in the tree. See the icons for [FontAwesome] (https://fontawesome.com/icons?d=gallery) and [Element.io] (https://element.eleme.io/#/en-US/component/icon) to choose what you want |
| tree | If entered as `false`, the topic will not appear in the topic tree or in the pagination |
| article | If entered as `false`, the topic will not be clickable in the tree and will not appear in the pagination |
| children | List of child topics |

*Example:*

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

> Note that, as each version has its own `topics.json`, whenever the documentation version changes, the topics will also change.

> Note that it is possible to have a version without `topics.json`, in this case **Tot** will load the first` topics.json` existing in previous versions. This avoids having to keep replicating `topics.json` with every small version change, but make sure you have a` topics.json` at least in the first version.

### Articles

What is documentation without articles explaining a particular subject? Let's create them!

Remember that we created a directory for each version and that within each one we created a `topics.json` which contains a list of topics, each with an id?

Now, within the version directories, we will create new directories named with the ids of each of the topics provided.

For example: In the `topics.json` exemplified above, we have the topics with id` level1` and `level2`, so we created the directories` level1` and `level2`.

Within these directories, create *markdown* files for each of the languages ​​configured in the `.env` file. For example: If we have the languages ​​*ptbr* and *en*, we will have the files `ptbr.md` and` en.md`.

These files will contain the content of the article in the language in question, that is, `ptbr.md` will contain the content of the article in Brazilian Portuguese and` en.md` the content of the article in American English.

> Note that *markdown* files accept both *markdown* code, such as *HTML* and even a mix between them. <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank"> See here to learn more about *markdown* </a>.

> Note that if a file for a language is not created and requested, **Tot** will load in the default language configured in the `.env` file.

> Note that there is no need to add the topic title, it will automatically be added as a level 1 heading (`h1` /` # `).

#### Links Between Articles

If you want to create a link within an article that you send to another article it is very simple, see:

*Markdown example*

```markdown
[Meu Link Para Outro Artigo](#idlevel1.idlevel1.2.idlevel1.2.1)
```

*Exemplo em HTML*

```html
<a href="#idlevel1.idlevel1.2.idlevel1.2.1">Meu Link Para Outro Artigo</a>
```

Explaining: Start the link with `#` and add the id of the desired topic, if you want a topic that is a child of oturo (or others) just add the ids in order and separate them by a `.` period.

#### Code Examples in Articles

**Tot** has its own markup for code examples in articles.

Let's say you want to display one or more codes for an example, to do this we start by adding the following markup where the code should be displayed:

```markdown
{<exemplo>}
```

Whenever **Tot** finds this tag, it will add a component based on the settings informed in the file named *example*, as informed and located in the same directory as the article.

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

As we can see, we are left with a code component that displays one or more codes separated by tabs with the language name and icon.

> If a name is not provided, the technology will be used instead

> If the technology is not informed, a standard icon will be used

> If the reported technology is not recognized, a standard icon will be displayed with the name of the technology in parentheses

### Colors

To change the colors of the documentation, simply change the variables in the `collors.scss` file.

This file contains, in addition to variables for all colors used, other variables for each element of the documentation, if something has a color, it has a variable!

### Sources

To change the sources of the documentation, copy the desired fonts into the `. / Fonts` directory and edit the`. / Fonts.scss` file with the proper font import.

> Note that inside `. / Fonts.scss`, the`. / ~ @ / Assets / fonts / `directory points to where your fonts will be after running **Tot**.

That done, edit the variables `$ FONT_DEFAULT` and` $ FONT_CODE` within the same file to define the font used in each case.

| Variable | Description |
| --- | --- |
| $ FONT_DEFAULT | Standard font to be used |
| $ FONT_CODE | Source to be used in areas where code is displayed |


### Soon

To change the logo, simply overwrite the `logo.png` file with the desired logo.

> Note that, for better display, the logo must have a format with equal width and height.

### Icon

To change the icon that appears on the browser bar, simply overwrite the `ico.png` file with the desired icon.

> Note that, for better display, the icon must have dimensions of 16x16 pixels.

### Starting for Development

Just run the following commands, each on a command line, to execute the front and back.

`` bash
npm run front
npm run back
``

### Building the Application

To build a final version of the application frontend, run:

```bash
npm run build
```

A *build* directory will be created at the root of the project, it will contain all the files prepared to run on your production server!

> Note that `build` builds only the frontend, it will still be necessary to start the backend normally

---

## Author

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
        <img alt="GitHub Overview @descodifica" src="https://img.shields.io/static/v1?label=GitHub Overview&message=@descodifica&color=black&logo=github&style=for-the-badge">
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