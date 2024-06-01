import BrowserCheckPlugin from '@jspsych/plugin-browser-check';
import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";

// Browser check
export default function (experiment) {
  jsPsych = experiment.jsPsych;

  experiment.timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: function() {
      switch (experiment.detectLanguage()) {
        case 'sv':
          return `
            <h1>Observera!</h1>

            <p>Du måste använda en stationär dator/laptop för att delta i denna undersökning.</p>

            <p>Om du är på mobil, vänligen stäng sidan och tillgå undersökningen från en stationär dator eller laptop istället.</p>
          `;
        default:
          break;
      }
    },
    choices: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return ["I am on a desktop/laptop"];
        case 'da':
          return ["Jeg anvender en statilnær/laptop"];
        case 'sv':
          return ["Jag använder redan en stationär dator/laptop"];
        default:
          break;
      }
    },
    on_finish: function() {
      jsPsych.setProgressBar(0.015);
    }
  });

  experiment.timeline.push({
    type: BrowserCheckPlugin,
    inclusion_function: (data) => {
      return data.mobile === false
    },
    exclusion_message: (data) => {
      if(data.mobile) {
        switch (experiment.detectLanguage()) {
          case 'en':
            return '<p>You must use a desktop/laptop computer to participate in this survey.</p>';
          case 'da':
            return '<p>Du skal anvende en stationær/laptop for at deltage i denne undersøgelse.</p>';
          case 'sv':
            return '<p>Du måste använda en stationär/laptop för att delta i denna undersökning.</p>';
          default:
            break;
        }
      } else {
        switch (experiment.detectLanguage()) {
          case 'en':
            return '<p>An error has occurred due to your browser. Please try again from a different browser.</p>';
          case 'da':
            return '<p>Der er sket en fejl på i din browser. Venligst prøv igen fra en anden browser.</p>';
          case 'sv':
            return '<p>Det har uppstått ett fel på grund av din webbläsare. Vänligen försök igen från en annan webbläsare.</p>';
          default:
            break;
        }
      }
    }
  });
}