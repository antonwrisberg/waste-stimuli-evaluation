import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import SurveyHtmlFormPlugin from '@jspsych/plugin-survey-html-form';

// Frequency
export default function (experiment) {
  jsPsych = experiment.jsPsych;

  // Intro to frequency
  experiment.timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return `
            <p>In a moment, you will see ${experiment.frequencyTrialCount} images of waste.</p>
            <p>For each piece of waste, you must indicate how many times you have expended it in the past week.</p>
          `;
        case 'da':
          return `
            <p>Om et øjeblik vil du se ${experiment.frequencyTrialCount} billeder af affald.</p>
            <p>For hvert stykke affald skal du angive, hvor mange gange du har forbrugt det i løbet af den seneste uge.</p>
          `;
        case 'sv':
          return `
            <p>Inom kort kommer du att se ${experiment.frequencyTrialCount} bilder på avfall.</p>
            <p>För varje stycke avfall måste du ange hur många gånger du har förbrukat det under den senaste veckan.</p>
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

  // Frequency
  experiment.timeline.push({
    timeline: [
      {
        type: SurveyHtmlFormPlugin,
        preamble: function() {
          return `<img src="assets/img/betaset-sorted/${jsPsych.timelineVariable('item')}">`;
        },
        html: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return '<p>In the past week, I have expended this (ignoring brands and variants) <input type="number" id="resp-box" name="response" required /> times.</p>';
            case 'da':
              return '<p>I løbet af den seneste uge har jeg forbrugt dette (ignorer varemærker og varianter) <input type="number" id="resp-box" name="response" required /> gange.</p>';
            case 'sv':
              return '<p>Under den senaste veckan har jag förbrukat detta (ignorera varumärken och varianter) <input type="number" id="resp-box" name="response" required /> gånger.</p>';
            default:
              break;
          }
        },
        button_label: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return 'Continue (⏎)';
            case 'da':
              return 'Fortsæt (⏎)'
            case 'sv':
              return 'Fortsätt (⏎)';
            default:
              break;
          }
        },
        autofocus: 'resp-box',
        css_classes: "image-with-count",
        data: {
          question: 'frequency',
          item: jsPsych.timelineVariable('item')
        },
        on_finish: function(data) {
          data.response = data.response.response;
        }
      },
    ],
    timeline_variables: experiment.stimuli.allAsItem,
    sample: {
      type: 'without-replacement',
      size: experiment.frequencyTrialCount
    },
  });
};