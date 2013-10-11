/*
* syntaxHighlight plugin
* v1.0
* Written by brouillon
* https://github.com/brouillon/syntaxHighlight
* Date 05/10/2013
* Released under LGPL License.
*/
tinymce.PluginManager.requireLangPack('syntaxHighlight');
tinymce.PluginManager.add('syntaxHighlight', function(editor, url) {

	var shSettings 		= {},
		defaultBrush 	= 'html',
		selectedNode 	= false,
		hadSelection	= false;

	function showDialog() {

		var selection 			= editor.selection,
			dom 				= editor.dom,
			selectionContent 	= selection.getContent(),
			rBrush, rBrushLen, i;

		//clear
		shSettings = {};

		rBrush = [
			{text:'Choose Language',	value:'0'},
			{text:'BASH',				value:'bash'},
			{text:'C / C++',			value:'c'},
			{text:'C#',				value:'csharp'},
			{text:'CSS',				value:'css'},
			{text:'DIFF',				value:'diff'},
			{text:'HTML',				value:'html'},
			{text:'Java',				value:'java'},
			{text:'JavaScript',		value:'js'},
			{text:'Perl',				value:'perl'},
			{text:'PHP',				value:'php'},
			{text:'Python',			value:'py'},
			{text:'Ruby',				value:'ruby'},
			{text:'Text',				value:'text'},
			{text:'SQL',				value:'sql'},
			{text:'XML',				value:'XML'}
		];
		rBrushLen = rBrush.length;

		selectedNode = selection.getNode();

		//try to get settings
		try {
			shSettings = JSON.parse('{"'+dom.getAttrib(selectedNode, 'class').replace(/first-line/g, 'firstLine').replace(/: /g,'": "').replace(/; /g, '","').replace(/"true"/g, 'true').replace(/"false"/g, 'false').replace(/"\[/g, '[').replace(/\]"/g, ']')+'}');
		}
		//or init default
		catch(e) {
			shSettings = {
				brush: 		defaultBrush,
				gutter: 	true,
				firstLine: 	1,
				highlight: 	[]
			};
		}

		//is there a selection
		if (selectedNode.nodeName == 'BODY' && selectionContent.length == 0) {
			hadSelection = false;
		}
		//a block of code
		else if (selectedNode.nodeName == 'PRE') {
			hadSelection = true;
			shSettings.codebox = dom.getParent(selectedNode).textContent.replace(/\&lt\;/g, "<").replace(/\&gt\;/g, ">");
		}
		//Something else, select parent
		else {
			hadSelection = true;
			//more than one block selected
			if (selectedNode.nodeName == 'BODY') {
				selectedNode = selection.getSelectedBlocks();
				shSettings.codebox = selectionContent.replace(/<br \/>/g, "\r\n").replace(/(<[^>]*>)/g, '').replace(/&nbsp;/g, '');
			}
			else {

				//Select the parent
				selectedNode = dom.getParent(selectedNode);
				shSettings.codebox = dom.getParent(selectedNode).textContent.replace(/<br \/>/g, "\r\n").replace(/\&lt\;/g, "<").replace(/\&gt\;/g, ">");
			}
		}

		//Select brush
		for(i = 0; i< rBrushLen; i++){
			if( rBrush[ i ].value == shSettings.brush){
				rBrush[ i ].selected = true;
			}
		}

		editor.windowManager.open({
			title: 	'Syntax Highlighter',
			data: 	shSettings,
			body: [
					{
						name: 'Language',
						type: 'listbox',
						values: rBrush,
						onselect : function() {

							shSettings.brush = this.value();

						 }
					},
					{
						type: 'container',
						layout: 'flex',
						direction: 'row',
						align: 'center',
						spacing: 5,
						items: [
							{
								type: 'label',
								text: 'Start :'
							},
							{
								name: 'firstLine',
								type: 'textbox',
								tooltip: 'Start number'
							},
							{
								type: 'label',
								text: 'Highlights :'
							},
							{
								name: 'highlight',
								type: 'textbox',
								tooltip: 'Highlights Help'
							},
							{
								type: 'checkbox',
								checked: shSettings.gutter,
								text: 'Show Numbers',
								onclick: function(){
									shSettings.gutter = this.value();
								}
							}
						]
					},
					{
						name: 'codebox',
						type: 'textbox',
						minHeight: 250,
						multiline: true
					}
			],
			onsubmit: function(e) {

				var content, highlight, firstLine, brush, gutter;

				//content to highlight
				content 	= e.data.codebox.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				//lines to highlight
				highlight 	= e.data.highlight.replace(/[^0-9,\-]/g, "");
				//offset number
				firstLine 	= e.data.firstLine.replace(/[^0-9]/g, "");
				//language
				brush 		= shSettings.brush;
				//Show number
				gutter 		= shSettings.gutter;

				if (firstLine == '') {
					firstLine = 1;
				}

				//if there was a selection before open
				if (hadSelection == true) {
					//remove content
					setTimeout(function(){editor.dom.remove(selectedNode);}, 0);
				}

				//append new content into tinyMCE
				setTimeout(function(){editor.insertContent('<pre style="background-color: #353535; color: #fff; margin: 5px 0; padding: 10px;" class="brush: '+brush+'; gutter: '+gutter+'; first-line: '+firstLine+'; highlight: ['+highlight+']">'+content+'</pre>', {format: 'raw'});}, 0);

			}
		});
	}
	editor.addButton('syntaxHighlight', {
		image: url+'/img/syntaxHighlight.gif',
		tooltip: 'Insert Code',
		onclick: function() {
			showDialog();
        }
	});
    editor.addMenuItem('syntaxHighlight', {
        text: 'code',
		image: url+'/img/syntaxHighlight.gif',
        context: 'insert',
        onclick: function() {
			showDialog();
        }
    });
});
