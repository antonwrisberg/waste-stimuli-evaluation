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
            <p>Fyll i din bakgrundsinformation och avsluta ditt deltagande:</p>
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
            <p>Jag föddes år <input type="number" id="birthyear-resp-box" name="birthyear" size="4" min="1900" max="2024" required /> och identifierar mig som <select name="gender" required>
              <option value="" disabled selected>Vänligen välj</option>
              <option value="female">Kvinna</option>
              <option value="male">Man</option>
              <option value="other">Annat / föredrar att inte svara</option>
            </select>.</p>
            <p>Jag bor i <select name="dwelling" required>
              <option value="" disabled selected>Vänligen välj</option>
              <option value="house">Hus</option>
              <option value="apartment">Lägenhet</option>
              <option value="other">Annat / föredrar att inte svara</option>
            </select> i <select name="county" required>
              <option value="" disabled selected>Vänligen välj</option>
              <option value="10">Blekinge län</option>
              <option value="20">Dalarnas län</option>
              <option value="21">Gävleborgs län</option>
              <option value="09">Gotlands län</option>
              <option value="17">Hallands län</option>
              <option value="06">Jönköpings län</option>
              <option value="23">Jämtlands län</option>
              <option value="08">Kalmar län</option>
              <option value="07">Kronobergs län</option>
              <option value="13">Skåne län</option>
              <option value="01">Stockholms län</option>
              <option value="04">Södermanlands län</option>
              <option value="18">Uppsala län</option>
              <option value="12">Värmlands län</option>
              <option value="14">Västerbottens län</option>
              <option value="21">Västernorrlands län</option>
              <option value="19">Västmanlands län</option>
              <option value="25">Örebro län</option>
              <option value="05">Östergötlands län</option>
              <option value="other">Annat / föredrar att inte svara</option>
          </select>.</p>
            <p>Det är <select name="sorting convenience" required>
              <option value="" disabled selected>Vänligen välj</option>
              <option value="very inconvenient">Väldigt obekvämt</option>
              <option value="inconvenient">Obekvämt</option>
              <option value="little inconvenient">Lite obekvämt</option>
              <option value="neither convenient nor inconvenient">Varken bekvämt eller obekvämt</option>
              <option value="little convenient">Lite bekvämt</option>
              <option value="convenient">Bekvämt</option>
              <option value="very convenient">Väldigt bekvämt</option>
            </select> för mig att sortera avfall hemma.</p>
            <p>Jag känner mig <select name="sorting abilities" required>
              <option value="" disabled selected>Vänligen välj</option>
              <option value="not at all confident">Inte alls självsäker</option>
              <option value="very little confident">Mycket lite självsäker</option>
              <option value="little confident">Lite självsäker</option>
              <option value="somewhat confident">Ganska självsäker</option>
              <option value="confident">Självsäker</option>
              <option value="very confident">Mycket självsäker</option>
              <option value="extremely confident">Väldigt självsäker</option>
            </select> i min förmåga att sortera avfall.</p>
            <p>Jag sorterar <select name="sorting frequency" required>
              <option value="" disabled selected>Vänligen välj</option>  
              <option value="never">Aldrig</option>
              <option value="almost never">Nästan aldrig</option>
              <option value="seldom">Sällan</option>
              <option value="sometimes">Ibland</option>
              <option value="often">Ofta</option>
              <option value="almost always">Nästan alltid</option>
              <option value="always">Alltid</option>
            </select> mitt avfall.</p>
            <p>Att sortera avfall är <select name="sorting importance" required>
              <option value="" disabled selected>Vänligen välj</option>  
              <option value="very unimportant">Väldigt oviktigt</option>
              <option value="unimportant">Oviktigt</option>
              <option value="little unimportant">Lite oviktigt</option>
              <option value="neither important nor unimportant">Varken viktigt eller oviktigt</option>
              <option value="little important">Lite viktigt</option>
              <option value="important">Viktigt</option>
              <option value="very important">Väldigt viktigt</option>
            </select> för mig.</p>
            <p>Jag oroar mig <select name="envrionmental concern" required>
              <option value="" disabled selected>Vänligen välj</option>  
              <option value="not at all">Inte alls</option>
              <option value="very little">Mycket lite</option>
              <option value="little">Lite</option>
              <option value="somewhat little">Ganska lite</option>
              <option value="somewhat much">Ganska mycket</option>
              <option value="much">Mycket</option>
              <option value="very much">Väldigt mycket</option>
            </select> för miljön.</p>
          `;
        default:
          break;
      }
    },
    autofocus: 'birthyear-resp-box',
    css_classes: ["background-survey"],
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