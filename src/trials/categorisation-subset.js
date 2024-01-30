// Categorisation with subset
export default function (jsPsych, timeline, ImageChoicePlugin, stimuliAllAsItem, waste_fraction_signs) {
  timeline.push({
    timeline: [
      {
        type: ImageChoicePlugin,
        img_array: function() {
          return jsPsych.randomization.sampleWithoutReplacement(waste_fraction_signs, 4);
        },
        img_path: "",
        prompt: "<p>If you have to choose one, which of the waste fractions on the right do you think that the waste item on the left fits best into?<br /> <br />Click a waste fraction to select it.</p>",
        css_classes: ["choice-with-stimulus", "four-options"],
        stimulus: function () {
          return "assets/img/betaset-sorted/" + jsPsych.timelineVariable('item');
        },
        time_after_response: 400
      },
    ],
    timeline_variables: stimuliAllAsItem,
    randomize_order: true
  });
};