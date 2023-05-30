const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');
const moment = require('moment');

async function getAll(req, res) {
    const lab = await models.lab.findAll();
    res.status(200).json(lab);
};

async function getById(req, res) {
    const id = getIdParam(req);
    const lab = await models.lab.findByPk(id);
    if (lab) {
        res.status(200).json(lab);
    } else {
        res.status(404).send('404 - Not found');
    }
};

async function create(req, res) {
    if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		await models.lab.create(req.body);
		res.status(201).end();
	}
    // if (req.body.id) {
    //     res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)

    // } else {

    //     for (const key of ['name', 'startDate', 'duration', 'startRange', 'endRange']) {
    //         if (!req.body.hasOwnProperty(key)) {
    //             res.status(400).send(`Bad request: Missing required field`)
    //         }
    //     }

    //     const { name, startDate, duration, startRange, endRange } = req.body;
    //     console.log('MOMENT', moment().add(duration).format());
    //     const l = {
    //         lab_name: name,
    //         StartRange: moment(startRange, "DD-MM-YYYY").format(),
    //         EndRange: moment(endRange, "DD-MM-YYYY").format(),
    //         StartAt: moment(startDate, "DD-MM-YYYY hh:mm:ss").format(),
    //         EndAt: moment().add(duration).format()
    //     }
    //     console.log(l);
    //     const lab = await models.lab.build(l);
    //     console.log(lab.toJSON());
    //     await lab.save()
    //     res.status(201).end();
    // }
};

async function update(req, res) {
    const id = getIdParam(req);

    // We only accept an UPDATE request if the `:id` param matches the body `id`
    if (req.body.id === id) {
        await models.lab.update(req.body, {
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
    await models.lab.destroy({
        where: {
            id: id
        }
    });

    await models.labInstance.destroy({
        where: {
            labId: id
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