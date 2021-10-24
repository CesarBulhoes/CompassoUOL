'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Cities extends Model {
		static associate(models) {
			
		}
	};
	Cities.init({
		id: {
			primaryKey: true,
			allowNull: false,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				matches: {
					args: '[A-zÀ-ú ]*',
					msg: "'Name' must contain only letters."
				},
				len: {
					args: [3, 50],
					msg: "'Name' must have a length between 3 and 50 characteres."
				}
			}
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				matches: {
					args: '[A-zÀ-ú ]*',
					msg: "'Name' must contain only letters."
				},
				len: {
					args: [3, 50],
					msg: "'Name' must have a length between 3 and 50 characteres."
				}
			}
		}
	}, {
		sequelize,
		timestamps: true,
		paranoid: true,
		freezeTableName: true,
		version: 'version',
		modelName: 'cities'
	});
	return Cities;
};

