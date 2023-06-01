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
	const sub = await models.subscription.findAll(id, { 
		include: [{ model: models.student }],
		where: {
			labInstanceId: id
		} });
	if (sub) {
		res.status(200).json(sub);
	} else {
		res.status(404).send('404 - Not found');
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
