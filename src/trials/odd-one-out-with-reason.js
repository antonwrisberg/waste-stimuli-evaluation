// Odd-one-out with reason
export default function (jsPsych, timeline, ImageChoicePlugin, SurveyTextPlugin, stimuliAll, oddOneOutTrialCount) {
  timeline.push({
    timeline: [
      {
        type: ImageChoicePlugin,
        img_array: jsPsych.timelineVariable('triad'),
        img_path: "assets/img/betaset-sorted/",
        prompt: "<p>Below are three waste items.<br />Please identify a quality/dimension in which two of them align while the last differs.</p><p>Now, click the one that differs:</p>",
        css_classes: ["select-the-imposter", "three-options"],
        data: {
          question: 'odd-one-out-before-reason',
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
    timeline_variables: [{
    triad: function() {
        return jsPsych.randomization.sampleWithoutReplacement(stimuliAll, 3);
    }
    }],
    repetitions: oddOneOutTrialCount
  });
};