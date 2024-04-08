import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import ImageChoicePlugin from "/node_modules/@antonwrisberg/plugin-image-choice/dist";

// Relative frequency
export default function (experiment) {
  jsPsych = experiment.jsPsych;
  
  // Intro
  experiment.timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return `
            <p>In a moment, you will see ${experiment.frequencyRelativeTrialCount} image pairs of waste.</p>
            <p>For each pair, you must select the waste item that you have most recently expended.</p>
          `;
        case 'da':
          return `
            <p>Om et øjeblik vil du se ${experiment.frequencyRelativeTrialCount} billedpar af affald.</p>
            <p>For hvert par skal du vælge det stykke affald, du senest har færdigopbrugt.</p>
          `;
        case 'sv':
          return `
            <p>Inom kort kommer du att få se ${experiment.frequencyRelativeTrialCount} bildpar på avfall.</p>
            <p>För varje par kommer vi att be dig att välja det avbildade avfall som du senast har förbrukat/använt slut på.</p>
          `;
        default:
          break;
      }
    },
    choices: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return ["Start"];
        case 'da':
          return ["Start"];
        case 'sv':
          return ["Start"];
        default:
          break;
      }
    }
  });

  // addy.split(",", 1)[0]

  // Odd-one-out-inspired relative frequency
  experiment.timeline.push({
    timeline: [
      {
        type: ImageChoicePlugin,
        img_array: jsPsych.timelineVariable('diad'),
        img_path: "assets/img/betaset-sorted/",
        prompt: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `<p>Below are two waste items.<br />Please click the one that you have most recently expended.</p>`;
            case 'da':
              return `<p>Nedenfor er to stykker affald.<br />Klik på det, du senest har færdigforbrugt.</p>`;
            case 'sv':
              return `<p>Här nedanför ser du två olika bilder på avfall.<br />Klicka på den som avbildar det avfall som du senast har förbrukat/använt slut på.</p>`;
            default:
              break;
          }
        },
        css_classes: ["select-the-imposter", "two-options"],
        data: {
          question: 'frequency-relative'
        },
        time_after_response: 400,
        on_finish: function(data) {
          // Save the fraction (by stealing it from the name of the selected image)
          data.fraction = data.value.split("-", 1)[0];
        }
      }
    ],
    timeline_variables: [{
      diad: function() {
        return jsPsych.randomization.sampleWithoutReplacement(experiment.stimuli.inFractions[jsPsych.randomization.sampleWithoutReplacement(experiment.stimuli.fractions, 1)[0].key], 2);
      }
    }],
    repetitions: experiment.frequencyRelativeTrialCount
  });
};