function applyExtraSetup(sequelize) {
	const { teacher, lab, student, labInstance, subscription, user, roles } = sequelize.models;



	lab.hasMany(labInstance, { foreignKey: { allowNull: false }, constraints: false });
	labInstance.belongsTo(lab, { foreignKey: { allowNull: false }, constraints: false });

	user.hasMany(labInstance, { foreignKey: 'teacherId', constraints: false });
	labInstance.belongsTo(user, { foreignKey: 'teacherId', constraints: false });

	labInstance.belongsToMany(student, { through: { model: subscription, foreignKey: 'labInstanceId' , unique: false },constraints: false });
	student.belongsToMany(labInstance, { through: { model: subscription, foreignKey: 'studentId', unique: false },constraints: false });

	labInstance.beforeBulkDestroy(async (options) => {
		const instances = await labInstance.findAll({
			where: options.where,
			raw: true
		});
		await subscription.destroy({
			where:{
				labInstanceId: instances.map(i => i.id)
			}
		})
	});

	// labInstance.beforeBulkDestroy(async (options) => {
	// 	const instances = await labInstance.findAll({
	// 		where: options.where,
	// 		raw: true
	// 	});
	// 	await subscription.destroy({
	// 		where:{
	// 			studentId: instances.map(i => i.id)
	// 		}
	// 	})
	// });

	// roles.belongsToMany(user, {
	// 	through: "user_roles",
	// 	foreignKey: "roleId",
	// 	otherKey: "userId",
	// 	constraints: false,
	// });
	// user.belongsTo(roles, {
	// 	through: "user_roles",
	// 	foreignKey: "id",
	// 	otherKey: "userId",
	// 	constraints: false,
	// });

}

module.exports = { applyExtraSetup };
