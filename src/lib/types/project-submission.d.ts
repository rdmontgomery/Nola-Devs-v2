export interface ProjectSubmission {
	groupSlug: string;
	name: string;
	email: string;
	projectName: string;
	description: string;
	aiTools?: string;
	projectLink?: string;
	wantsToPresent: boolean;
	createdAt: Date;
}
