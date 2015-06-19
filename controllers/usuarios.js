var moment = require('moment');

module.exports = function(app){

	var Usuario = app.models.usuarios;

	var UsuarioController = {
		
		inserirUsuario: function(usuario, req, res)
		{

			var model = usuario;
			model.save(function(err){
				var mensagem = "Usuário cadastrado com sucesso!";
				if(err){
					console.log(err);
					mensagem = err;
				}
				req.flash('info',mensagem);
				res.redirect('/usuarios');
			});
		},

		atualizarUsuario: function(usuario, req, res)
		{
			
			Usuario.findById(usuario._id, function(err, data){
					if(err){
						console.log(err);
					}else{
							var model   = data;
							model.nome  = req.body.nome;
							model.login = req.body.login;
							model.senha = req.body.senha;
							model.save(function(err){
								if(err){
									console.log(err);
								}else{
									req.flash('info', 'Usuário atualizado com sucesso!');
								  res.redirect('/usuarios');
								}
							});
					}
				});

		},

		index: function(req,res){
			Usuario.find(function(err, data){
				if (err){
					console.log(err);
				}
				res.render("usuarios/index", {lista: data, value: [{}], moment: moment});
			});
		},

		edit: function(req,res){
			
			Usuario.findById(req.params.id, function(err, data){
				if(err){
					console.log(err);
				}else{
						res.render('usuarios/edit', {value: data});
				}
			});
			
		},

		update: function(req,res){
			var usuario = new Usuario(req.body);
			if(typeof req.body._id == 'undefined')
			{
				UsuarioController.inserirUsuario(usuario, req, res);
			}
			else 
			{
				UsuarioController.atualizarUsuario(usuario, req, res);
			}
		},

		show: function(req,res){
			Usuario.findById(req.params.id, function(err, data){
				if(err){
					console.log(err);
				}else{
						res.render('usuarios/show', {value: data});
				}
			});
		},

		remove: function(req,res){
			Usuario.remove({_id: req.params.id}, function(err){
				if (err){
					console.log(err);
				}else{
					req.flash('info', 'Usuário excluído com sucesso!');
					res.redirect('/usuarios');
				}
			});
		}
	}

	return UsuarioController;
}