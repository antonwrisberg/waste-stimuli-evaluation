import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";

// Break
export default function (experiment) {
  jsPsych = experiment.jsPsych;
  
  experiment.timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: function() {
      switch (experiment.detectLanguage()) {
        case 'sv':
          return `
            <img src="assets/img/logos/Lunds_universitet_C2r_RGB.png" style="height:120px">

            <p>Hej och välkommen till denna undersökning som handlar om hur du tänker kring avfall och avfallssortering.</p>

            <p>Undersökningen består av 3 delar. Totalt tar den 15-20 minuter att genomföra.<br />Mellan varje del kommer du ges möjlighet att ta en paus. Undvik att ta andra pauser än dessa, tack!</p>
            
            <p>Innan varje del kommer du att få instruktioner om vad du kommer göra.<br />Var snäll och läs instruktionerna noggrant.</p>
            
            <p>Varken försöksledarna eller anda obehöriga kommer kunna koppla dina svar till dig som person.<br />All insamlad data kommer att hanteras enligt gällande GDPR-lagstiftning.</p>

            <p>Du kan när som helst välja att avsluta din medverkan genom att stänga fönstret. Då kommer ingen data att sparas!</p>
            
            <p>Undersökningen genomförs av Anton Wrisberg, doktorand vid Lunds Universitet.<br />Vid frågor kan han nås på <a href="mailto:anton.wrisberg@lucs.lu.se">anton.wrisberg@lucs.lu.se</a>.</p>
            
            <p>Tack för att du vill delta!</p>
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