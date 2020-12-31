hljs.initHighlightingOnLoad();
hljs.configure({ useBR : true}); $('div.code pre code').each(function(i, block) { hljs.highlightBlock(block); });