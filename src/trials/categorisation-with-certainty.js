// Categorisation with certainty
export default function (jsPsych, timeline, ImageChoicePlugin, HtmlSliderResponsePlugin, waste_fraction_signs, stimuliAllAsItem) {
  timeline.push({
    timeline: [
      {
        type: ImageChoicePlugin,
        img_array: waste_fraction_signs,
        img_path: "",
        prompt: "<p>Which of the waste fractions on the right do you believe that the waste item on the left fit into?<br /> <br />Click a waste fraction to select it.</p>",
        values: ["cardboard", "food", "glass", "hazardous", "metal", "paper", "plastics", "residual", "textile"],
        css_classes: ["choice-with-stimulus", "nine-options"],
        data: {
          question: 'fraction-belongingness',
          item: jsPsych.timelineVariable('item')
        },
        stimulus: function() {
          return "assets/img/betaset-sorted/" + jsPsych.timelineVariable('item');
        },
        time_after_response: 400
      },
      {
        type: HtmlSliderResponsePlugin,
        stimulus: `<p>How certain are you of that selection?</p>`,
        require_movement: true,
        labels: ['Very uncertain', 'Neither certain nor uncertain', 'Very certain'],
        css_classes: "slider-with-stimulus",
      },
    ],
    timeline_variables: stimuliAllAsItem,
    randomize_order: true
  });
};