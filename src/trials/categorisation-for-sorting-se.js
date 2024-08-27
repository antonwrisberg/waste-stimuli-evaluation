import ImageChoicePlugin from "/node_modules/@antonwrisberg/plugin-images-choice/dist";

// Categorisation
export default function CategorisationForSortingSeTrial (experiment) {
  jsPsych = experiment.jsPsych;

  experiment.timeline.push({
    timeline: [
      {
        type: ImageChoicePlugin,
        img_array: [
          "assets/img/signs_se/batterier.png",
          "assets/img/signs_se/farligt-avfall.png",
          "assets/img/signs_se/glasforpackningar-fargade.png",
          "assets/img/signs_se/glasforpackningar-ofargade.png",
          "assets/img/signs_se/ljuskallor.png",
          "assets/img/signs_se/matavfall.png",
          "assets/img/signs_se/metall.png",
          "assets/img/signs_se/metallforpackningar.png",
          "assets/img/signs_se/papper.png",
          "assets/img/signs_se/pappers-forpackningar.png",
          "assets/img/signs_se/plastforpackningar.png",
          "assets/img/signs_se/restavfall-grovavfall.png",
          "assets/img/signs_se/restavfall.png",
          "assets/img/signs_se/smaelektronik.png",
          "assets/img/signs_se/tidningar.png",
          "assets/img/signs_se/tradgardsavfall.png",
          "assets/img/signs_se/wellpapp.png",
          "assets/img/signs_se/vet-inte.png"
        ],
        img_path: "",
        prompt: "<p>Which of the waste fractions on the right do you believe that the waste item on the left fit into?<br /> <br />Click a waste fraction to select it.</p>",
        values: ["batteries", "hazardous", "glass-uncoloured", "glass-coloured", "lightbulbs", "food", "metal", "metal-packaging", "paper", "paper-packaging", "plastics", "big-waste", "residual", "electronics", "newspapers", "garden", "cardboard", "uncertain"],
        css_classes: ["choice-with-stimulus", "nineteen-options"],
        data: {
          question: 'fraction-belongingness',
          item: jsPsych.timelineVariable('item')
        },
        stimulus: function() {
          return "assets/img/stimuli-1.1-800x800-tinified-unsorted/" + jsPsych.timelineVariable('item');
        },
        time_after_response: 200
      }
    ],
    timeline_variables: experiment.stimuli.items.UnsortedasItems,
    randomize_order: false
  });
};