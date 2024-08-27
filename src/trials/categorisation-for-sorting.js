import ImageChoicePlugin from "/node_modules/@antonwrisberg/plugin-images-choice/dist";

// Categorisation
export default function CategorisationForSortingTrial (experiment) {
  jsPsych = experiment.jsPsych;

  experiment.timeline.push({
    timeline: [
      {
        type: ImageChoicePlugin,
        img_array: [
          "assets/img/signs/CARDBOARD/CARDBOARD_rgb_72dpi.jpg",
          "assets/img/signs/FOOD_WASTE/FOOD_WASTE_rgb_72dpi.jpg",
          "assets/img/signs/GLASS/GLASS_rgb_72rgb.jpg",
          "assets/img/signs/HAZARDOUS_WASTE/HAZARDOUS_WASTE_rgb_72dpi.jpg",
          "assets/img/signs/METAL/METAL_rgb_72dpi.jpg",
          "assets/img/signs/PAPER/PAPER_rgb_72dpi.jpg",
          "assets/img/signs/PLASTICS/PLASTICS_rgb_72dpi.jpg",
          "assets/img/signs/RESIDUAL_WASTE/RESIDUAL_WASTE_rgb_72dpi.jpg",
          "assets/img/signs/TEXTILE_WASTE/TEXTILE_WASTE_rgb_72dpi.jpg",
        ],
        img_path: "",
        prompt: "<p>Which of the waste fractions on the right do you believe that the waste item on the left fit into?<br /> <br />Click a waste fraction to select it.</p>",
        values: ["cardboard", "food", "glass", "hazardous", "metal", "paper", "plastics", "residual", "textile"],
        css_classes: ["choice-with-stimulus", "nine-options"],
        data: {
          question: 'fraction-belongingness',
          item: jsPsych.timelineVariable('item')
        },
        stimulus: function() {
          return "assets/img/JPG_sorted_RFsubset/" + jsPsych.timelineVariable('item');
        },
        time_after_response: 200
      }
    ],
    timeline_variables: experiment.stimuli.items.RFasItems,
    randomize_order: true
  });
};