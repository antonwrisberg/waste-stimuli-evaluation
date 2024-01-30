// Odd-one-out with reason
export default function (jsPsych, timeline, ImageChoicePlugin, SurveyTextPlugin, stimuliAllAsItem) {
  timeline.push({
    timeline: [
      {
        type: ImageChoicePlugin,
        img_array: jsPsych.timelineVariable('triad'),
        prompt: "<p>Below are three waste items.<br />Please identify a quality/dimension in which two of them align while the last differs.</p><p>Now, click the one that differs:</p>",
        css_classes: ["select-the-imposter", "three-options"],
        data: {
          question: 'imposterness',
          options: jsPsych.timelineVariable('triad')
        }
      },
      {
        type: SurveyTextPlugin,
        questions: [
          {prompt: 'How does this item differ?', required: true}
        ]
      },
    ],
    timeline_variables: triads,
    randomize_order: true
  });
};