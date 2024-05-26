import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";

// Attention check "Do not click j or f, but the space bar"
export default function (experiment) {
  jsPsych = experiment.jsPsych;
  
  // Intro
  experiment.timeline.push({
    type: HtmlKeyboardResponsePlugin,
    stimulus: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return `
            <p>This screen is an attention check.</p>
            <p>Please do not press <b>f</b> or <b>j</b>.<br />Instead, press the spacebar to continue.</p>
          `;
        case 'da':
          return `
            <p>Dette skærmbillede er et opmærksomhedstjek.</p>
            <p>Vær venlig ikke at trykke på <b>f</b> eller <b>j</b>.<br />Tryk i stedet på mellemrumstasten for at fortsætte.</p>
          `;
        case 'sv':
          return `
            <p>Denna skärmbild är en uppmärksamhetskontroll.</p>
            <p>Var vänlig tryck inte på <b>f</b> eller <b>j</b>.<br />Tryck istället på mellanslagstangenten för att fortsätta.</p>
          `;
        default:
          break;
      }
    },
    on_finish: function(data) {
      // Save the button text (value) in addition to its index
      if (data.response == " ") {
        data.attention_check_response = 'Successful attention check!';
      } else {
        data.attention_check_response = 'Failed attention check! This key should not have been pressed';
      }
    },
    choices: 'ALL_KEYS',
  });
};