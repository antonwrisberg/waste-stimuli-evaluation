import BrowserCheckPlugin from '@jspsych/plugin-browser-check';

// Browser check
export default function (experiment) {
  jsPsych = experiment.jsPsych;

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
            return '<p>Du måste använda en stationär/dator för att delta i denna undersökning.</p>';
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