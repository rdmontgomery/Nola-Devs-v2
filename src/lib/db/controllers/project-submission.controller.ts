import ProjectSubmissionModel from '$lib/db/models/project-submissions.model';
import type { ProjectSubmission } from '$lib/types/project-submission';
import { error } from '@sveltejs/kit';

export const projectSubmissionController = {
	/**
	 * Persist a new project intake submission.
	 * @async
	 * @param {ProjectSubmission} submission The submission to save.
	 * @returns {Promise<ProjectSubmission>} (fulfilled promise) The saved submission.
	 * @throws {error} 500 if the submission could not be saved.
	 * @example projectSubmissionController.createSubmission(submission)
	 */
	createSubmission: async (submission: ProjectSubmission): Promise<ProjectSubmission> => {
		try {
			const saved = await ProjectSubmissionModel.create(submission);
			return saved;
		} catch (e) {
			throw error(500, 'Unable to save project submission');
		}
	},

	/**
	 * Get all project submissions for a group, newest first.
	 * @async
	 * @param {string} groupSlug The slug of the group to get submissions for.
	 * @returns {Promise<ProjectSubmission[]>} (fulfilled promise) Array of submissions.
	 * @throws {error} 404 if the lookup fails.
	 * @example projectSubmissionController.getSubmissionsByGroup('lacanian-haze')
	 */
	getSubmissionsByGroup: async (groupSlug: string): Promise<ProjectSubmission[]> => {
		try {
			const submissions: ProjectSubmission[] = await ProjectSubmissionModel.find({ groupSlug })
				.sort({ createdAt: 'desc' })
				.select('-_id -__v')
				.lean();
			return submissions;
		} catch (e) {
			throw error(404, 'No project submissions found');
		}
	}
};
