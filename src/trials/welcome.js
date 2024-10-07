import PreloadPlugin from "@jspsych/plugin-preload";
import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response"; 

// Break
export default function (experiment) {
  jsPsych = experiment.jsPsych;

  // Asset load
  experiment.timeline.push({
    type: PreloadPlugin,
    images: [
      "assets/img/logos/Lunds_universitet_C2r_RGB.png"
    ]
  });
  
  experiment.timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: function() {
      switch (experiment.detectLanguage()) {
        case 'sv':
          return `
            <img src="assets/img/logos/Lunds_universitet_C2r_RGB.png" style="height:120px">

            <p>Välkommen till denna undersökning som handlar om hur du tänker kring avfall och avfallssortering.</p>

            <p>Undersökningen tar 8-10 minuter att genomföra.<br />Undvik att ta pauser under denna tid.</p>
            
            <p>Varken försöksledarna eller andra obehöriga kommer kunna koppla dina svar till dig som person.<br />All insamlad data kommer att hanteras enligt gällande GDPR-lagstiftning.</p>

            <p>Du kan när som helst välja att avsluta din medverkan genom att stänga fönstret. Då kommer ingen data att sparas!</p>
            
            <p>Undersökningen genomförs av Anton Wrisberg, doktorand vid Lunds Universitet.<br />Vid frågor kan han nås på <a href="mailto:anton.wrisberg@lucs.lu.se">anton.wrisberg@lucs.lu.se</a>.</p>
            
            <p>Tack för att du vill delta!</p>
          `;
        case 'da':
          return `
            <img src="assets/img/logos/Lunds_universitet_C2r_RGB.png" style="height:120px">

            <p>Info om <b>undersøgelse af affalds&shy;sortering på Roskilde Festival</b>:</p>

            <p>Din deltagelse tager cirka 4 minutter.</p>

            <p>Ingen (udover dig) vil kunne koble dine svar til dig.</p>
            
            <p>Al data vil blive håndteret jævnfør gældende GDPR-lovgivning.</p>

            <p>Du kan altid lukke dette vindue for at afbryde din deltagelse. Så vil ingen data blive gemt.</p>

            <p>Undersøgelsen gennemføres af Anton Wrisberg. Hvis du har spørgsmål, kan han nås på <a href="mailto:anton.wrisberg@lucs.lu.se">anton.wrisberg@lucs.lu.se</a>.</p>

            <p>Tak for din deltagelse - din tid er meget værdifuld for os!</p>

          `;
        case 'en':
          return `
            <img src="assets/img/logos/LundUniversity_C2line_RGB.png" style="height:120px">

            <p>Info about <b>investigation of waste sorting at Roskilde Festival</b>:</p>

            <p>Your participation takes around 4 minutes.</p>

            <p>Nobody (but you) will be able to link your responses to you.</p>
            
            <p>All data will be handled in accordance with current GDPR legislation.</p>

            <p>You can close this window at any time to discontinue your participation. Then no data will be saved.</p>

            <p>This research is conducted by Anton Wrisberg. If you have any questions, reach him at <a href="mailto:anton.wrisberg@lucs.lu.se">anton.wrisberg@lucs.lu.se</a>.</p>

            <p>Thank you for participating - your time is very valuable to us!</p>
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
    },
    on_finish: function() {
      jsPsych.setProgressBar(0.02);
    }
  });
};