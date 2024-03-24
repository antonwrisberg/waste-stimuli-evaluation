import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";

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
            <p>For each piece of waste, you must indicate how many days it has been since you last expended it.</p>
          `;
        case 'da':
          return `
            <p>Om et øjeblik vil du se ${experiment.frequencyTrialCount} billeder af affald.</p>
            <p>For hvert stykke affald skal du angive, hvor mange dage der er gået, siden du sidst har forbrugt det.</p>
          `;
        case 'sv':
          return `
            <p>Inom kort kommer du att se ${experiment.frequencyTrialCount} bilder på avfall.</p>
            <p>För varje bild av avfall kommer vi att be dig att berätta hur många dagar som har gått sedan du senast har förbrukat/använt slut på det som visas på bilden.</p>
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
        type: HtmlButtonResponsePlugin,
        stimulus: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `<img src="assets/img/betaset-sorted/${jsPsych.timelineVariable('item')}"><p>How many days has it been since you last expended this (ignoring brands and variants)?</p>`;
            case 'da':
              return `<img src="assets/img/betaset-sorted/${jsPsych.timelineVariable('item')}"><p>Hvor mange dage er der gået siden du sidst har forbrugt dette (ignorer varemærker og varianter)?</p>`;
            case 'sv':
              return `<img src="assets/img/betaset-sorted/${jsPsych.timelineVariable('item')}"><p>Hur många dagar har gått sedan du senast har förbrukat/använt slut på detta (ignorera varumärken och varianter)?</p>`;
            default:
              break;
          }
        },
        choices: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return ["0 days (today)", "1 day (yesterday)", "2 days", "3 days", "4 days", "5 days", "6 days", "7 days (1 week)", "8 days or more", "I have never expended this"];
            case 'da':
              return ["0 dage (i dag)", "1 dag (i går)", "2 dage", "3 dage", "4 dage", "5 dage", "6 dage", "7 dage (1 uge)", "8 dage eller mere", "Jeg har aldrig brugt dette"];
            case 'sv':
              return ["0 dagar (idag)", "1 dag (igår)", "2 dagar", "3 dagar", "4 dagar", "5 dagar", "6 dagar", "7 dagar (1 vecka)", "8 dagar eller mer", "Jag har aldrig använt detta"];
            default:
              break;
          }
        },
        css_classes: "image-with-count",
        data: {
          question: 'frequency (days since last expend)',
          item: jsPsych.timelineVariable('item')
        },
        on_finish: function(data) {
          data.response_index = data.response;
          data.response = ['0', '1', '2', '3', '4', '5', '6', '7', '8+', 'never'][data.response_index];
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