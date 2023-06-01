const sequelize = require('../../sequelize');
const { getIdParam } = require('../helpers');
const { models, fn, col, QueryTypes } = sequelize

async function getAll(req, res) {
	const labinstance = await models.labInstance.findAll({
		attributes: ['id','startTime','endTime','daysOfWeek','startRecur','endRecur','color'],
		include: [{
			model: models.lab,
			attributes: ['id','lab_description', 'lab_name'],
		},
		{ model: models.teacher },
		{ model: models.student, attributes: ['name','register_number'] }]
	});
	res.status(200).json(labinstance);
};

async function getById(req, res) {
	const id = getIdParam(req);
	// Labinstance with students
	const labinstance = await models.labInstance.findByPk(id, {
		include: [{
			model: models.student,
			as: 'students',
			attributes: ["id", 'name']
		}]
	});

	if (labinstance) {
		res.status(200).json(labinstance);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		await models.labInstance.create(req.body);
		res.status(201).end();
	}
};

async function update(req, res) {
	const id = getIdParam(req);

	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id === id) {
		await models.labInstance.update(req.body, {
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
	await models.labInstance.destroy({
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
