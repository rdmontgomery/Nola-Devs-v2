import mongoose, { model, Schema } from 'mongoose';
import type { ProjectSubmission } from '$lib/types/project-submission.d.ts';

const projectSubmissionSchema = new Schema<ProjectSubmission>({
	groupSlug: {
		type: String,
		required: true,
		default: 'lacanian-haze'
	},
	name: {
		type: String,
		required: [true, 'Name is required'],
		maxlength: [120, 'Name cannot exceed 120 characters']
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		lowercase: true,
		trim: true
	},
	projectName: {
		type: String,
		required: [true, 'Project name is required'],
		maxlength: [160, 'Project name cannot exceed 160 characters']
	},
	description: {
		type: String,
		required: [true, 'Project description is required'],
		maxlength: [4000, 'Project description cannot exceed 4000 characters']
	},
	aiTools: {
		type: String,
		required: false,
		maxlength: [1000, 'AI tools field cannot exceed 1000 characters']
	},
	projectLink: {
		type: String,
		required: false
	},
	wantsToPresent: {
		type: Boolean,
		required: true,
		default: false
	},
	createdAt: {
		type: Date,
		required: true
	}
});

const ProjectSubmissionModel =
	mongoose.models.ProjectSubmission ||
	model('ProjectSubmission', projectSubmissionSchema);

export default ProjectSubmissionModel;
