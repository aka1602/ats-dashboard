module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				'feat',
				'fix',
				'docs',
				'style',
				'refactor',
				'test',
				'ci',
				'revert',
				'perf',
				'wip',
				'build',
				'ci',
				'chore',
				'release',
			],
		],
		'subject-min-length': [2, 'always', 8],
		'subject-max-length': [2, 'always', 50],
	},
};
