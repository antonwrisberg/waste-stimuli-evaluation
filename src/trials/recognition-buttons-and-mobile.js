import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";

// Recognition
export default function (experiment) {
  jsPsych = experiment.jsPsych;

  // Intro to recognition
  experiment.timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return `
            <p>In a moment, you will see ${experiment.recognitionTrialCount} images of waste.</p>
            <p>For each image, you should decide whether you could explain to someone else what it is.</p>
          `;
        case 'da':
          return `
            <p>Om et øjeblik vil du se ${experiment.recognitionTrialCount} billeder af affald.</p>
            <p>For hvert billede, skal du afgøre, om du ville kunne foreklare en anden, hvad det er.</p>
          `;
        case 'sv':
          return `
            <p>Inom kort kommer du att se ${experiment.recognitionTrialCount} bilder på avfall.</p>
            <p>För varje bild bör du avgöra om du skulle kunna förklara för någon annan vad det är.</p>
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

  // Familiarity 0.0.2
  experiment.timeline.push({
    timeline: [
      {
        type: HtmlButtonResponsePlugin,         
        stimulus: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <div class="stimulus">
                  <p>Could you explain to someone else what this is?</p>
                  <img src="assets/img/betaset-sorted/${jsPsych.timelineVariable('item')}">
                </div>`;
            case 'da':
              return `
                <div class="stimulus">
                  <p>Kunne du forklare en anden, hvad det her er?</p>
                  <img src="assets/img/betaset-sorted/${jsPsych.timelineVariable('item')}">
                </div>`;
            case 'sv':
              return `
                <div class="stimulus">
                <p>Kunna du förklara för någon annan vad det här är?</p>
                  <img src="assets/img/betaset-sorted/${jsPsych.timelineVariable('item')}">
                </div>`;
            default:
              break;
          }
        },
        choices: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return ['No', 'Maybe', 'Yes'];
            case 'da':
              return ['Nej', 'Måske', 'Ja'];
            case 'sv':
              return ['Nej', 'Kanske', 'Ja'];
            default:
              break;
          }
        },
        css_classes: "buttons-with-stimulus",
        data: {
          question: 'recognition',
          item: jsPsych.timelineVariable('item')
        },
        
        on_finish: function(data) {
          // Save the button text (value) in addition to its index
          data.response_index = data.response;
          data.response = ['no', 'maybe', 'yes'][data.response_index];
        }
      },
    ],
    timeline_variables: experiment.stimuli.allAsItem,
    sample: {
      type: 'without-replacement',
      size: experiment.recognitionTrialCount
    },
  });
};