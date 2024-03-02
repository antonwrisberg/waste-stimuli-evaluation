import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import ImageChoicePlugin from "/node_modules/@antonwrisberg/plugin-image-choice/dist";

// Odd-one-out
export default function (experiment) {
  jsPsych = experiment.jsPsych;
  
  // Intro to odd-one-out
  experiment.timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return `
            <p>In a moment, you will see ${experiment.oddOneOutTrialCount} sets of three images of waste.</p>
            <p>For each set, you must select the waste item that differs most from the others.</p>
          `;
        case 'da':
          return `
            <p>Om et øjeblik vil du se ${experiment.oddOneOutTrialCount} sæt af tre billeder af affald.</p>
            <p>For hvert sæt skal du vælge det stykke affald, der adskiller sig mest fra de andre.</p>
          `;
        case 'sv':
          return `
            <p>Inom kort kommer du att få se ${experiment.oddOneOutTrialCount} uppsättningar av tre bilder på avfall.</p>
            <p>För varje uppsättning bilder kommer vi att be dig att välja det avbildade avfall som skiljer sig mest från de andra .</p>
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

  // Odd-one-out
  experiment.timeline.push({
    timeline: [
      {
        type: ImageChoicePlugin,
        img_array: jsPsych.timelineVariable('triad'),
        img_path: "assets/img/betaset-sorted/",
        prompt: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `<p>Below are three waste items.<br />Please click the one that differs the most from the two others.</p>`;
            case 'da':
              return `<p>Nedenfor er tre stykker affald.<br />Klik på det, der adskiller sig mest fra de to andre.</p>`;
            case 'sv':
              return `<p>Här nedanför ser du tre olika bilder på avfall.<br />Klicka på den som avbildar det avfall som skiljer sig mest från de andra två.</p>`;
            default:
              break;
          }
        },
        css_classes: ["select-the-imposter", "three-options"],
        data: {
          question: 'odd-one-out'
        },
        time_after_response: 400
      }
    ],
    timeline_variables: [{
      triad: function() {
        return jsPsych.randomization.sampleWithoutReplacement(experiment.stimuli.all, 3);
      }
    }],
    repetitions: experiment.oddOneOutTrialCount
  });
};