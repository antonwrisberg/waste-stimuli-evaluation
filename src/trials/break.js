import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";

// Break
export default function (experiment) {
  jsPsych = experiment.jsPsych;
  
  experiment.timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return `
            <h1>Break</h1>
            <p>You now have the option to take a break. All timers are paused until you continue.</p>
          `;
        case 'da':
          return `
            <h1>Pause</h1>
            <p>Du har nu mulighed for at holde en pause. Alle timere er sat på pause, indtil du fortsætter.</p>
          `;
        case 'sv':
          return `
            <h1>Paus</h1>
            <p>Du har nu möjlighet att ta en paus. Alla timrar är pausade tills du fortsätter.</p>
          `;
        default:
          break;
      }
    },
    choices: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return ["End break and continue"];
        case 'da':
          return ["Afslut pause og fortsæt"];
        case 'sv':
          return ["Avsluta paus och fortsätt"];
        default:
          break;
      }
    }
  });
};