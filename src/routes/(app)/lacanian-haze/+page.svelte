<script lang="ts">
	import { enhance } from '$app/forms';
	import { Heading, P, A, Input, Label, Textarea, Button, Checkbox, Helper } from 'flowbite-svelte';
	import type { ActionData } from './$types';

	type IntakeForm = {
		success?: boolean;
		projectName?: string;
		error?: string;
		name?: string;
		email?: string;
		description?: string;
		aiTools?: string;
		projectLink?: string;
		wantsToPresent?: boolean;
	};

	export let form: ActionData;
	// Single typed view of the action result so template access is type-safe
	// across the success / failure / undefined union.
	$: f = (form ?? {}) as unknown as IntakeForm;
</script>

<div class="flex flex-col gap-6 flex-1">
	<Heading tag="h1">🌀 Lacanian Haze — Submit Your AI Project</Heading>

	<P>
		Building something with or around AI? We want to hear about it. Share your project below to get
		it in front of the Lacanian Haze community — works-in-progress, side hacks, and shipped products
		are all welcome. Let us know if you'd like to demo it at an upcoming meetup.
	</P>
	<P>
		New to the group? Read more about <A href="/group/lacanian-haze">Lacanian Haze</A>.
	</P>

	{#if f.success}
		<div
			class="rounded-lg border border-green-300 bg-green-50 p-4 text-green-800 dark:border-green-700 dark:bg-green-900/30 dark:text-green-200"
			role="status"
		>
			<p class="font-semibold">Thanks — we got it! 🎉</p>
			<p>
				Your project <span class="font-medium">{f.projectName}</span> has been submitted. We'll be in
				touch about the next meetup.
			</p>
		</div>
	{:else}
		{#if f.error}
			<div
				class="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200"
				role="alert"
			>
				{f.error}
			</div>
		{/if}

		<form method="POST" action="?/submitProject" use:enhance class="max-w-2xl">
			<div class="flex flex-col gap-4">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<Label for="name" class="mb-2">Your name *</Label>
						<Input
							class="bg-primary-100"
							type="text"
							id="name"
							name="name"
							placeholder="Jane Doe"
							value="{form?.name ?? ''}"
							required
						/>
					</div>
					<div>
						<Label for="email" class="mb-2">Email *</Label>
						<Input
							class="bg-primary-100"
							type="email"
							id="email"
							name="email"
							placeholder="jane@example.com"
							value="{form?.email ?? ''}"
							required
						/>
					</div>
				</div>

				<div>
					<Label for="projectName" class="mb-2">Project name *</Label>
					<Input
						class="bg-primary-100"
						type="text"
						id="projectName"
						name="projectName"
						placeholder="What's it called?"
						value="{f.projectName ?? ''}"
						required
					/>
				</div>

				<div>
					<Label for="description" class="mb-2">What are you building? *</Label>
					<Textarea
						id="description"
						name="description"
						rows="5"
						placeholder="Tell us about your project — what it does, who it's for, and how AI fits in."
						value="{f.description ?? ''}"
						required
					/>
				</div>

				<div>
					<Label for="aiTools" class="mb-2">AI tools, models, or frameworks</Label>
					<Input
						class="bg-primary-100"
						type="text"
						id="aiTools"
						name="aiTools"
						placeholder="e.g. GPT-4, Claude, LangChain, a fine-tuned model…"
						value="{f.aiTools ?? ''}"
					/>
					<Helper class="mt-1">Optional</Helper>
				</div>

				<div>
					<Label for="projectLink" class="mb-2">Link (repo, demo, or site)</Label>
					<Input
						class="bg-primary-100"
						type="url"
						id="projectLink"
						name="projectLink"
						placeholder="https://github.com/you/project"
						value="{f.projectLink ?? ''}"
					/>
					<Helper class="mt-1">Optional</Helper>
				</div>

				<Checkbox name="wantsToPresent" checked="{f.wantsToPresent ?? false}">
					I'd like to demo or present this at an upcoming meetup
				</Checkbox>
			</div>

			<Button class="mt-6" type="submit">Submit project</Button>
		</form>
	{/if}
</div>
