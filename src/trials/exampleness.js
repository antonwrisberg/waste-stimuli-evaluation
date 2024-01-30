// Exampleness
export default function (jsPsych, timeline, HtmlSliderResponsePlugin, stimuliAll, waste_fraction_signs) {
  timeline.push({
    timeline: [
      {
        type: HtmlSliderResponsePlugin,
        stimulus: function(){
          console.log(jsPsych.timelineVariable('item')[0]);
          console.log("test");
          return `
            <div class="stimulus two-images">
              <p>How good an example do you think that the waste item on the left is of the waste fraction on the right?</p>
              <img src="assets/img/betaset-sorted/${jsPsych.timelineVariable('item')}">
              <img src="${jsPsych.timelineVariable('fraction')}">
            </div>`;
        },
        require_movement: true,
        labels: ['Very bad', 'Neither good nor bad', 'Very good'],
        css_classes: "slider-with-stimulus",
        data: {
          question: 'exampleness',
          item: jsPsych.timelineVariable('item'),
          fraction: jsPsych.timelineVariable('fraction'),
        },
      },
    ],
    timeline_variables: [{
      item: jsPsych.randomization.sampleWithoutReplacement(stimuliAll, 1)[0],
      fraction: jsPsych.randomization.sampleWithoutReplacement(waste_fraction_signs, 1)[0]
    }],
  });
};