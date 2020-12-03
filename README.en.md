# @desco/tot

>[Ver a documentação em Portugês Brasileiro](README.md)

## Installation

```bash 
npm init
npm install @desco/tot
cp node_modules/@desco/tot/initial/* .
```

1. Install ** Tot **;
2. Copies Tot initial template files for your project;

> Note that among the files copied in step 3, there is a *packages.json* that will **overwrite** the current one.

## Settings

To configure **Tot** just manipulate the *.env* file provided in step 2 of the installation.

See a table with all available configurations:

| Name | Description |
|---|---|
| VUE_APP_TITULO | Documented project title, will appear both in the browser title bar and in the documentation template |
| VUE_APP_BASE_URL | URL where the backend is running |
| VUE_APP_DEFAULT_LANGUAGE | Acronym for the standard documentation language. If any article is not available in the language requested by the user, it will be loaded in the default language |
| VUE_APP_SIZE_SIDE | Size of the side area of the documentation, considering that the entire screen occupies 25 "columns", how many will the side area occupy? Must be an integer |
| VUE_APP_TIMEOUT | How long (in mileseconds) the documentation will wait for a backend response before giving a timeout error |
| VUE_APP_TOPIC_SEARCH_PLACEHOLDER | Text to be displayed in the topic search field when it is empty |
| VUE_APP_ARTICLE_NOT_FOUND_TITLE | Screen title of "Article not found" |
| VUE_APP_ARTICLE_NOT_FOUND_CONTENT | Contents of the "Article not found" screen |
| VUE_APP_ARTICLE_ERROR_TITLE | Screen title of "Error loading article" |
| VUE_APP_ARTICLE_ERROR_CONTENT | Contents of the "Error loading article" screen |
| SERVER_PORT | Port on which the backend will run |
| VERSIONS | Documented versions |
| LANGUAGES | Languages supported by the documentation |


### The "VERSIONS" setting

The `VERSIONS` configuration must contain a list containing objects with the following properties:

| Name | Description |
|---|---|
| number | The version number |

> Note that `VERSIONS` must be ordered from the oldest version to the newest

*Example:*

```js
VERSIONS=[ { number: '1.0.0', }, { number: '1.0.1', }, { number: '1.2.9', }, ]
```

### The "LANGUAGES" setting

The `LANGUAGES` configuration must contain a list containing objects with the following properties:

| Name | Description |
|---|---|
| name | The name of the language |
| initials | The acronym of the language |

*Example:*

```bash
LANGUAGES=[ { initials: 'en', name: 'American English', }, { initials: 'ptbr', name: 'Portugês do Brasil', }, ]
```

## Topics

Let's look at how to add topics in the documentation.

Within the `articles` directory, add new directories named with the` number` property of each version added in the `VERSIONS` settings.

Within each of these directories we will have a file `topics.json` that will contain the topics shown in the documentation for this version and also other directories that will contain the articles in the documentation, but we will see the articles later, we will focus on` topics.json `.

`Topics.json` should contain an array containing objects for each topic in the documentation.

These objects have the following properties:

| Name | Description |
|---|---|
| id | The topic identification, this value should be used in the directory name of the related article (we will see in detail soon) |
| label | Topic name, must contain a JSON containing properties named with the acronym of the languages and with values containing the name of the topic in the language in question
| article | If entered as `false`, the topic will not load an article. |
| children | List of child topics |

*Example:*
```json
[
    {
        "id": "level1",
        "label": {
            "ptbr": "Nivel 1",
            "en": "Level 1"
        },
        "children": [
            {
                "id": "level.1.1",
                "label": {
                    "ptbr": "Nível 1.1",
                    "en": "Level 1.1"
                }
            }
        ]
    },
    {
        "id": "level2",
        "article": false,
        "label": {
            "ptbr": "Nivel 2",
            "en": "Level 2"
        },
        "children": [
            {
                "id": "level.2.1",
                "label": {
                    "ptbr": "Nível 2.1",
                    "en": "Level 2.1"
                }
            }
        ]
    }
]
```

> Note that since each version has its own `topics.json`, whenever the documentation version changes, the topics will also change.

> Note that it is possible to have a version without `topics.json`, in which case ** ot** will load the first` topics.json` existing in previous versions. This avoids having to keep replicating `topics.json` with every small version change, but make sure you have a` topics.json` at least in the first version.

## Articles

What is documentation without articles explaining a particular subject? Let's create them!

Remember that we created a directory for each version and that within each one we created a `topics.json` which contains a list of topics, each with an id?

Now, within the version directories, create new directories named with the ids of each of the topics provided.

For example: In the `topics.json` exemplified above, we have the topics with id` level1` and `level2`, so we created the directories` level1` and `level2`.

Within these directories, create * markdown * files for each of the languages configured in the `.env` file. For example: If we have the languages * ptbr * and * en *, we will have the files `ptbr.md` and` en.md`.

These files will contain the content of the article in the language in question, that is, `ptbr.md` will contain the content of the article in Brazilian Portuguese and` en.md` the content of the article in American English.

> Note that *markdown* files accept both *markdown* code, such as *HTML* and even a mix between them. <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">See here to learn more about *markdown*</a>.

> Note that if a language file is not created and requested, ** Tot ** will load in the default language configured in the `.env` file.

> Note that there is no need to add the topic title, it will automatically be added as a level 1 heading (`h1` /` # `).

### Links Between Articles

If you want to create a link within an article that you send to another article is very simple, see:

*Markdown example*

```markdown
[My Link To Another Article](#idlevel1.idlevel1.2.idlevel1.2.1)
```

*HTML Example*

```html
<a href="#idlevel1.idlevel1.2.idlevel1.2.1">My Link To Another Article</a>
```

Explaining: Start the link with `#` and add the id of the desired topic, if you want a topic that is a child of oturo (or others) just add the ids in order and separate them by a `.` period.

## Colors

To change the colors of the documentation, simply change the variables in the `collors.scss` file.

This file contains, in addition to variables for all colors used, other variables for each element of the documentation, if something has a color, it has a variable!

## Logo

To change the logo, simply overwrite the `logo.png` file with the desired logo.

> Note that, for better display, the logo must have a format with equal width and height.

## Getting Started

Just run the following commands, each on a command line, to execute the front and back.

```bash 
npm run front
npm run back
```