const { HasMany } = require('sequelize');
const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');
// const { students } = models

async function getAll(req, res) {
	const subs = await models.subscription.findAll({ include: [{ all: true }] });

	res.status(200).json(subs);
};

async function getById(req, res) {
	const id = getIdParam(req);
	//labInstanceId
	try {
		const sub = await models.subscription.findAll({ 
			where: {
				labInstanceId: id
			},
			attributes: ['absense','studentId'],
			include: { 
				model: models.student,
				association: models.subscription.hasMany(models.student,{ foreignKey: 'id', sourceKey: 'studentId' }),
				attributes: ['id','name'],
			 },
		 });
		 
		res.status(200).json(sub);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
	
	
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		await models.subscription.create(req.body);
		res.status(201).end();
	}
};

async function update(req, res) {
	const id = getIdParam(req);

	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id === id) {
		await models.subscription.update(req.body, {
			where: {
				id: id
			}
		});
		res.status(200).end();
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function remove(req, res) {
	const id = getIdParam(req);
	await models.subscription.destroy({
		where: {
			id: id
		}
	});
	res.status(200).end();
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
