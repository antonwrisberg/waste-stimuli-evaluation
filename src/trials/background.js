import SurveyHtmlFormPlugin from '@jspsych/plugin-survey-html-form';

// Recognition
export default function (experiment) {
  jsPsych = experiment.jsPsych;

  experiment.timeline.push({
    type: SurveyHtmlFormPlugin,
    preamble: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return `
            <h1>Almost done!</h1>
            <p>(thank you again)</p>
            <p>Aswer these two background questions to finish your participation.</p>
          `;
        case 'da':
          return `
            <h1>Næsten færdig!</h1>
            <p>(tak igen)</p>
            <p>Besvar disse to spørgsmål og afslut din deltagelse.</p>
          `;
        case 'sv':
          return `
            <h1>Nästan klar!</h1>
            <p>(tack igen)</p>
            <p>Besvara dessa två frågor och avsluta din medverkan.</p>
          `;
        default:
          break;
      }
    },
    html: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return `
            <p>I was born in year <input type="number" id="birthyear-resp-box" name="birthyear" size="4" min="1900" max="2024" required /></p>
            <p>I identify as <select name="gender" required>
              <option value="" disabled selected>Please select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other / prefer no to answer</option>
            </select></p>
          `;
        case 'da':
          return `
            <p>Jeg blev født i år <input type="number" id="birthyear-resp-box" name="birthyear" size="4" min="1900" max="2024" required /></p>
            <p>Jeg identificerer mig som <select name="gender" required>
              <option value="" disabled selected>Vælg venligst</option>
              <option value="female">Kvinde</option>
              <option value="male">Mand</option>
              <option value="other">Andet / foretrækker ikke at svare</option>
            </select></p>
          `;
        case 'sv':
          return `
            <p>Jag föddes år <input type="number" id="birthyear-resp-box" name="birthyear" size="4" min="1900" max="2024" required /></p>
            <p>Jag identifierar mig som <select name="gender" required>
              <option value="" disabled selected>Vänligen välj</option>
              <option value="female">Kvinna</option>
              <option value="male">Man</option>
              <option value="other">Annat / föredrar att inte svara</option>
            </select></p>
          `;
        default:
          break;
      }
    },
    autofocus: 'birthyear-resp-box',
    button_label: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return 'Finish and save responses';
        case 'da':
          return 'Afslut og gem svar';
        case 'sv':
          return 'Avsluta och spara svar';
        default:
          break;
      }
    }
  });
};