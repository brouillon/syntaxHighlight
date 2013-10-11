SyntaxHighlight
=======

SyntaxHighlight est un plugin pour TinyMCE 4.x qui utilise le script de http://alexgorbatchev.com/SyntaxHighlighter/ pour la coloration.
Il n'y a pas de coloration en direct dans le plugin ou l'éditeur, le plugin se charge de renseigner les attributs nécessaires.

Installation
-------

* Plugin externe :
Mettez le dossier SyntaxHighlight sur votre serveur web
```js
tinymce.init({
	[...]
	external_plugins: {
		"SyntaxHighlight": "PathToSyntaxHighlight/plugin.min.js"
	},
	toolbar: "[...] SyntaxHighlight",
	[...]
});
```
Remplacez 'PathToSyntaxHighlight' par l'adresse du dossier SyntaxHighlight

* Plugin interne :
Ajoutez le dossier SyntaxHighlight dans le dossier des plugins de TinyMCE ('tinymce/plugins/')
```js
tinymce.init({
	[...]
	plugins: "[...] SyntaxHighlight",
	toolbar: "[...] SyntaxHighlight",
	[...]
});
```

Pour afficher le code coloré, ajoutez dans le head de votre page :
```html
<script src="PathToSyntaxHighlight/SyntaxHighlighter/scripts/shCore.js" type="text/javascript"></script>
<script src="PathToSyntaxHighlight/SyntaxHighlighter/scripts/shAutoloader.js" type="text/javascript"></script>
<link href="PathToSyntaxHighlight/SyntaxHighlighter/styles/shCore.css" rel="stylesheet" type="text/css" />
<link href="PathToSyntaxHighlight/SyntaxHighlighter/styles/TheStyleYouWant" rel="stylesheet" type="text/css" />
```
Remplacez 'PathToSyntaxHighlight' par l'adresse du dossier SyntaxHighlight
Remplacez 'TheStyleYouWant' par le nom du fichier de style que vous souhaitez utiliser

Dans onLoad ou en fin de page :
```html
<script type="text/javascript">
<!--
function path() {
    var args = arguments, result = [];
    for(var i = 0; i < args.length; i++)
        result.push(args[i].replace("@", "PathToSyntaxHighlight/SyntaxHighlighter/scripts/"));
    return result
};
SyntaxHighlighter.autoloader.apply(null, path(
    "bash	 @shBrushBash.js",
    "csharp  @shBrushCSharp.js",
    "c       @shBrushCpp.js",
    "css     @shBrushCss.js",
    "diff    @shBrushDiff.js",
    "html    @shBrushXml.js",
    "js      @shBrushJScript.js",
    "java    @shBrushJava.js",
    "perl    @shBrushPerl.js",
    "php     @shBrushPhp.js",
    "text    @shBrushPlain.js",
    "py      @shBrushPython.js",
    "ruby    @shBrushRuby.js",
    "sql     @shBrushSql.js",
    "xml     @shBrushXml.js"
));
SyntaxHighlighter.defaults["toolbar"] = false;
SyntaxHighlighter.all();
-->
</script>
```
Remplacez 'PathToSyntaxHighlight' par l'adresse du dossier SyntaxHighlight

-----------------------------------------------------------------------------

Licence
-------
SyntaxHighlight est disponible sous licence GNU LESSER GENERAL PUBLIC LICENSE v3
http://www.gnu.org/licenses/lgpl.html

-----------------------------------------------------------------------------

Credits
-------
SyntaxHighlighter by alex Gorbatchev http://alexgorbatchev.com/SyntaxHighlighter/ Licence MIT
Icon by Jigsoar License: Creative Commons (Attribution 3.0 Unported)