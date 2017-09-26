casper.test.begin('Testing saisie adresse SNA', 4, function (test) {

	casper
		.start('https://clodio.github.io/sna-adresse/saisie-adresse-simple-rapide')
		.then(function () {
			this.waitForSelector("#autocomplete",
			function pass () {
				this.echo("*** Autocomplete bloc exist", 'COMMENT');
				test.assertExists('#autocomplete');
				this.echo("*** Saisie de libourn dans le champ autocompletion", 'COMMENT');
				this.sendKeys('#autocomplete', "libourn");
				casper.waitForSelectorTextChange("span.pac-matched:first-of-type", function() {
					//this.echo("span.pac-matched:first-of-type::::::" + this.getHTML('span.pac-matched:first-of-type'));
					//this.echo("span.pac-item-query:first-of-type::::::" + this.getHTML('span.pac-item-query'));
					this.echo("** autocomplete proposition bloc exist", 'COMMENT');
					test.assertExists('div.pac-container.pac-logo');
					
					this.echo("** Found 'Libourn' in match text", 'COMMENT');
					test.assertSelectorHasText('span.pac-matched:first-of-type', 'Libourn');
					
					this.echo("** Found Libourne in first returned row", 'COMMENT');
					test.assertEquals('<span class="pac-matched">Libourn</span>e', this.getHTML('span.pac-item-query'));
					
				});
			},
			function fail () {
				this.debugHTML();
				test.fail("Did not load element #autocomplete");
			},
			2000 // timeout limit in milliseconds
		);
		})
		.run(function () {
			test.done();
		});
});