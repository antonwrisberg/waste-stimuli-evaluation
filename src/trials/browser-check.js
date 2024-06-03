import BrowserCheckPlugin from '@jspsych/plugin-browser-check';
import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import HtmlKeyboardResponsePlugin from '@jspsych/plugin-html-keyboard-response';

// Browser check
export default function (experiment) {
  jsPsych = experiment.jsPsych;

  experiment.timeline.push({
    type: BrowserCheckPlugin,
    on_load: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          document.querySelector('#jspsych-content').innerHTML = 'Checking browser …';
        case 'da':
          document.querySelector('#jspsych-content').innerHTML = 'Kontrollerer webbrowser …';
        case 'sv':
          document.querySelector('#jspsych-content').innerHTML = 'Kontrollerar webbläsare …';
        default:
          break;
      }
    },
    on_finish: function(data) {
      jsPsych.data.addProperties({
        is_mobile: data.mobile
      });

      jsPsych.setProgressBar(0.02);
    }
  });

  experiment.isMobile = function() {
    return this.jsPsych.data.get().trials[0].is_mobile;
  }

  experiment.timeline.push({
    timeline: [
      {
        type: HtmlKeyboardResponsePlugin,
        stimulus: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return '<p>You must use a desktop/laptop computer to participate in this survey.</p>';
            case 'da':
              return '<p>Du skal anvende en stationær/laptop for at deltage i denne undersøgelse.</p>';
            case 'sv':
              return `
                <p>Du måste använda en stationär/laptop för att delta i denna undersökning.</p>
                <p>Du skickas automatiskt tillbaka till PFM. Ett ögonblick.</p>
              `;
            default:
              break;
          }
        },
        trial_duration: 3000,
        choices: ["NO_KEYS"],
        on_finish: function(data) {
          if (typeof jatos !== "undefined") {
            jatos.endStudyAndRedirect("https://s.cint.com/Survey/EarlyScreenOut", jsPsych.data.get());
          } else {
            jsPsych.endExperiment();
          }
        },
        on_load: function() {
          jsPsych.setProgressBar(1);
        }
      },
      { // Blank trial to ensure blank screen while participants are redirected
        type: HtmlKeyboardResponsePlugin,
        stimulus: '',
        choices: ["NO_KEYS"],
        trial_duration: 10000
      }
    ],
    conditional_function: function() {
      return experiment.requiresDesktop && jsPsych.data.get().trials[0].is_mobile;
    }
  });
}