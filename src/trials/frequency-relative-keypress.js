import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import ImagesKeyboardResponsePlugin from "/node_modules/@antonwrisberg/plugin-images-keyboard-response";
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
            <p>Press the f and j keys to select the left and right image respectively.</p>
          `;
        case 'da':
          return `
            <p>Om et øjeblik vil du se ${experiment.frequencyRelativeTrialCount} billedpar af affald.</p>
            <p>For hvert par skal du vælge det stykke affald, du senest har færdigopbrugt.</p>
            <p>Tryk på f- og j-tasterne for at vælge henholdsvis venstre og højre billede.</p>
          `;
        case 'sv':
          return `
            <p>Inom kort kommer du att få se ${experiment.frequencyRelativeTrialCount} bildpar på avfall.</p>
            <p>För varje par kommer vi att be dig att välja det avbildade avfall som du senast har förbrukat/använt slut på.</p>
            <p>Tryck på f- och j-tangenterna för att välja den vänstra och högra bild respektive.</p>
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

  // Odd-one-out-inspired relative frequency
  experiment.timeline.push({
    timeline: [
      {
        type: ImagesKeyboardResponsePlugin,
        img_array: jsPsych.timelineVariable('diad'),
        img_path: "assets/img/betaset-sorted/",
        prompt: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `<p class="prompt">Choose the image that depicts the waste you most recently expended.<br />Press the f and j keys to select the left and right image respectively.</p>`;
            case 'da':
              return `<p class="prompt">Vælg det billede, der afbilder det affald, du senest har færdigforbrugt.<br />Tryk på f- og j-tasterne for at vælge henholdsvis venstre og højre billede.</p>`;
            case 'sv':
              return `<p class="prompt">Välj den bild som avbildar det avfall som du senast har förbrukat/använt slut på.<br />Tryck på f- och j-tangenterna för att välja den vänstra och högra bild respektive.</p>`;
            default:
              break;
          }
        },
        choices: ["f", "j"],
        css_classes: ["select-the-imposter", "two-options"],
        data: {
          question: 'frequency-relative-keypress'
        },
        time_after_response: 400,
        on_finish: function(data) {
          // Save the fraction (by stealing it from the name of the selected image)
          // data.fraction = data.value.split("-", 1)[0];
          console.log(data);
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