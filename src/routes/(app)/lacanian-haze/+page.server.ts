import { fail } from '@sveltejs/kit';
import { WebClient } from '@slack/web-api';
import { env } from '$env/dynamic/private';
import { projectSubmissionController } from '$lib/db/controllers/project-submission.controller';
import { buildProjectSubmissionBlocks } from '$lib/utils/project-intake';
import type { ProjectSubmission } from '$lib/types/project-submission';
import type { Actions } from './$types';

const GROUP_SLUG = 'lacanian-haze';

export const actions: Actions = {
	submitProject: async ({ request }) => {
		const data = await request.formData();

		const name = (data.get('name') as string)?.trim();
		const email = (data.get('email') as string)?.trim();
		const projectName = (data.get('projectName') as string)?.trim();
		const description = (data.get('description') as string)?.trim();
		const aiTools = (data.get('aiTools') as string)?.trim();
		const projectLink = (data.get('projectLink') as string)?.trim();
		const wantsToPresent = data.get('wantsToPresent') === 'on';

		const values = { name, email, projectName, description, aiTools, projectLink, wantsToPresent };

		// Required-field validation (return values so the form can repopulate)
		if (!name || !email || !projectName || !description) {
			return fail(400, {
				...values,
				error: 'Please fill in your name, email, project name, and a description.'
			});
		}

		const submission: ProjectSubmission = {
			groupSlug: GROUP_SLUG,
			name,
			email,
			projectName,
			description,
			aiTools: aiTools || undefined,
			projectLink: projectLink || undefined,
			wantsToPresent,
			createdAt: new Date()
		};

		// Persist to MongoDB
		try {
			await projectSubmissionController.createSubmission(submission);
		} catch (e) {
			console.error('Error saving project submission:', e);
			return fail(500, {
				...values,
				error: 'Something went wrong saving your submission. Please try again.'
			});
		}

		// Notify the community in Slack. A failure here shouldn't fail the
		// submission since it's already saved, so we just log it.
		const slackToken = env.SLACK_BOT_TOKEN;
		const slackChannel = env.SLACK_INTAKE_CHANNEL_ID;
		if (slackToken && slackChannel) {
			try {
				const slackClient = new WebClient(slackToken);
				await slackClient.chat.postMessage({
					channel: slackChannel,
					text: `New Lacanian Haze project submission: ${projectName}`,
					blocks: buildProjectSubmissionBlocks(submission)
				});
			} catch (err) {
				console.error('Failed to post project submission to Slack:', err);
			}
		}

		return { success: true, projectName };
	}
};
