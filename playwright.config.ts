import { defineConfig, devices } from '@playwright/test'
import { LogLevel } from '@slack/web-api';
import * as dotenv from 'dotenv'
import { generateCustomLayout } from './slack';
dotenv.config()

export default defineConfig({
	testDir: './tests',
	/* Maximum time one test can run for. */
	timeout: 30 * 1000,
	expect: {
		/**
		 * Maximum time expect() should wait for the condition to be met.
		 * For example in `await expect(locator).toHaveText();`
		 */
		timeout: 5000,
	},
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter:         //[
		[
		//"./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
		//{
		//  slackLogLevel: LogLevel.ERROR,
		//  channels: ["playwright"], // provide one or more Slack channels
		//  sendResults: "always", // "always" , "on-failure", "off"
		//  layoutAsync: generateCustomLayout,
		//   slackOAuthToken: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
		//   meta: 
		//   [
		// 	  {
		// 		key: "Test Results",
		// 		url: `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
		// 	  },
		//   ],
		// },
	  //],
	  ["dot"],
	  ["list"],
	  ["html"],],
	/*
	reporter: process.env.CI
    ? [
        [
          "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
          {
            channels: ["playwright"], // provide one or more Slack channels
            sendResults: "always", // "always" , "on-failure", "off"
			slackOAuthToken: "SLACK_BOT_USER_OAUTH_TOKEN",
			slackLogLevel: LogLevel.ERROR,
          },
        ],
        ["dot"],
        ["list"],
        ["html"],
      ]
    : [["dot"], ["list"], ["html"]],
	*/
	 // other reporters
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 0,
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://localhost:3000',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { channel: 'chrome' },
		// },
	],

	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	// outputDir: 'test-results/',

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   port: 3000,
	// },
})
