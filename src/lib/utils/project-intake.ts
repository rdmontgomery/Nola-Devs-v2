/**
 * Helpers for the Lacanian Haze project intake form. Builds the Slack
 * Block Kit message that notifies the community when someone submits a
 * project they're building with or around AI.
 */

import type { ProjectSubmission } from '$lib/types/project-submission';

/**
 * Build the Slack Block Kit blocks announcing a new project submission.
 * @param submission The submitted project.
 * @returns Slack Block Kit Blocks
 */
export const buildProjectSubmissionBlocks = (submission: ProjectSubmission) => {
	const lines = [
		`*${submission.projectName}*`,
		submission.description ? `\n${submission.description}` : '',
		submission.aiTools ? `\n🛠️ *AI / tools:* ${submission.aiTools}` : '',
		submission.projectLink ? `🔗 ${submission.projectLink}` : '',
		`\n👤 ${submission.name} · ${submission.email}`,
		submission.wantsToPresent
			? '🎤 Wants to present/demo at the next meetup'
			: '👀 Sharing for now — not presenting'
	]
		.filter(Boolean)
		.join('\n');

	return [
		{
			type: 'section',
			text: { type: 'mrkdwn', text: ':rocket: *New Lacanian Haze project submission!*' }
		},
		{ type: 'divider' },
		{
			type: 'section',
			text: { type: 'mrkdwn', text: lines }
		}
	];
};
