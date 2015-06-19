module.exports = {
	"demonstração": function(client) {
		client
			.url("http://localhost:3000/")
			.setValue("#nome", "Nome")
			.setValue("#login", "Login")
			.setValue("#senha", "Senha")
			.click("#buscar")
			.pause(3000)
			.assert.containsText("#mensagem", "Usuário cadastrado com sucesso!")
			.end();
	}
};