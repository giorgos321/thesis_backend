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
			include: { 
				model: models.student,
				association: models.subscription.hasMany(models.student,{ foreignKey: 'id', sourceKey: 'studentId' })
			 },
		 });
		 
		res.status(200).json(sub);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
	
	
};

async function create(req, res) {
		try {
			await models.subscription.bulkCreate(req.body);
			res.status(201).end();
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
};

async function update(req, res) {
		try {
			const { labInstanceId,studentId } = req.body;

			await models.subscription.update(req.body, {
				where: {
					labInstanceId: labInstanceId,
					studentId: studentId
				}
			});
			res.status(200).end();
		} catch (error) {
			res.status(500).send(error);
		}
};

async function remove(req, res) {
	try {
		const { labInstanceId,studentId } = req.body;

		await models.subscription.destroy({
			where: {
				labInstanceId: labInstanceId,
				studentId: studentId
			}
		});
		res.status(200).end();
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
