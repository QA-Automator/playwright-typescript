import { Block, KnownBlock, MessageAttachment } from "@slack/types";
import { SummaryResults } from "playwright-slack-report/dist/src";

function generateCustomLayout(
  summaryResults: SummaryResults
): Array<KnownBlock | Block> {
  const { tests } = summaryResults;

  // Defines result array
  const maxNumberOfFailures = 4
  const maxNumberOfFailureLength = 650;
  const fails: any[] = [];

  // header
  const header = {
    type: "header",
    text: {
      type: "plain_text",
      text: "🎭 Playwright Tests",
      //text: `🎭 ${process.env.GITHUB_WORKFLOW}`,
      emoji: true,
    },
  };

  // summary section
  const summary = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `✅ Passed: *${summaryResults.passed}* | ❌ Failed: *${summaryResults.failed}* | ⏩ Skipped: *${summaryResults.skipped}*\n\n`,
    },
  };

  // push fail info
  if (summaryResults.failures.length > 0) {
    fails.push({
      "type": "context",
      "elements": [
        {
          "type": "image",
          "image_url": "https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg", ///need to change this
          "alt_text": "error message"
        },
        {
          "type": "mrkdwn",
          "text": "*Failed* description."
        }
      ]
    })
  }

  for (let i = 0; i < summaryResults.failures.length; i += 1) {
    const { failureReason, test } = summaryResults.failures[i];
    const formattedFailure = failureReason
      .substring(0, maxNumberOfFailureLength)
      .split('\n')
      .map((l) => `>${l}`)
      .join('\n');
    fails.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${test}*
        \n\n${formattedFailure}`,
      },
    });
    if (i > maxNumberOfFailures) {
      fails.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*There are too many failures to display, view the full results in the test report*',
        },
      });
      break;
    }
  }

  const meta: { type: string; text: { type: string; text: string } }[] = [];
  if (summaryResults.meta) {
    for (let i = 0; i < summaryResults.meta.length; i += 1) {
      const { key, value } = summaryResults.meta[i];
      meta.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `\n*${key}*: \t${value}\n`,
        },
      });
    }
  }

const testReport = 
		{
			type: 'actions',
			elements: [
				{
					type: 'button',
					text: {
						type: 'plain_text',
						emoji: false,
						text: `
						Test Report`,
					},
					//value: 'click_me',
                    //url: 'http://www.google.com',
				},

			],
		};

  return [
    header,
    summary,
    //...meta,
    { type: "divider" },
    ...fails,
    testReport,
    { type: "divider" },
  ];
}


export { generateCustomLayout };