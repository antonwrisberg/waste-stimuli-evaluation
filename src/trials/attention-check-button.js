import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";

// Attention check "Do not click the button"
export default function (experiment) {
  jsPsych = experiment.jsPsych;
  
  // Intro
  experiment.timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return `
            <p>This screen is an attention check.</p>
            <p>Please do not click the button below.<br />The experiment will continue automatically in a few seconds.</p>
          `;
        case 'da':
          return `
            <p>Dette skærmbillede er et opmærksomhedstjek.</p>
            <p>Vær venlig ikke at klikke på knappen nedenfor.<br />Eksperimentet fortsætter automatisk om nogle sekunder.</p>
          `;
        case 'sv':
          return `
            <p>Denna skärmbild är en uppmärksamhetskontroll.</p>
            <p>Var vänlig och klicka inte på knappen nedan.<br />Experimentet fortsätter automatiskt om några sekunder.</p>
          `;
        default:
          break;
      }
    },
    choices: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return ["Continue"];
        case 'da':
          return ["Fortsæt"];
        case 'sv':
          return ["Fortsätt"];
        default:
          break;
      }
    },
    on_finish: function(data) {
      // Save the button text (value) in addition to its index
      if (data.response === 0) {
        data.attention_check_response = 'Failed attention check! This button should not have been clicked';
      } else {
        data.attention_check_response = 'Successful attention check!';
      }
    },
    trial_duration: 6000
  });
};