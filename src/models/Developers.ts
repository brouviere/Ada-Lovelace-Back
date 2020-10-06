import { Document, Schema, model, Model } from 'mongoose';

export interface IDevelopers extends Document {
	lastname: string;
	firstname: string;
	gender: string;
	phone: string;
	email: string;
	techs: string[];
	networks: {
		portfolio: string,
		git: string,
		linkedin: string,
		stackOverflow: string
	},
	// area: any,
	remote: boolean;
	photo: string[];
	openToWork: boolean;
	softSkills: string[];
}

const developersSchema = new Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	gender: { type: String, required: true },
	phone: String,
	email: { type: String, required: true, unique: true },
	// techs: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'techs'
	// }],
	networks: {
		portfolio: String,
		git: String,
		linkedin: String,
		stackOverflow: String
	},
	// area: any,
	remote: {type: Boolean, default: false},
	// photo: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'photo'
	// },
	// languages: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'languages'
	// }],
	openToWork: {type: Boolean, default: false}
	// softSkills: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'softSkills'
	// }],
});

export const developers = model<IDevelopers, Model<IDevelopers>>("developers", developersSchema);
