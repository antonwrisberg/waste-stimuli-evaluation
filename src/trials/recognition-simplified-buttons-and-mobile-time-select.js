import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import ImageButtonResponsePlugin from "@jspsych/plugin-image-button-response";
import SurveyHtmlFormPlugin from '@jspsych/plugin-survey-html-form';

// Recognition
export default function (experiment) {
  jsPsych = experiment.jsPsych;

  // Intro to recognition
  experiment.timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return `
            <p>Thank you for choosing to participate.</p>
            <p>We currently evaluate a stimuli set for future experiments.</p>
            <p>In a moment, you will see images of waste. For each image, we ask if you can see what is on the image.</p>
            <p>Remember: this is an evaluation of our images, not of you. You cannot answer wrongly.</p>
          `;
        case 'da':
          return `
            <p>Tak fordi du vil være med.</p>
            <p>Vi evaluerer i øjeblikket et stimuli-sæt til fremtidige eksperimenter.</p>
            <p>Om et øjeblik vil du se billeder af affald. For hvert billede beder vi dig vurdere, om du kan se, hvad der er på billedet.</p>
            <p>Husk: Dette er en vurdering af vores billeder, ikke af dig. Du kan ikke svare forkert.</p>
        `;
        case 'sv':
          return `
            <p>Tack för att du vill vara med.</p>
            <p>Vi gör en utvärdering av bilder av sopor för framtida experiment.</p>
            <p>Inom kort kommer du att se bilder på avfall. För varje bild ber vi dig att utvärdera om du kan se vad som är på bilden.</p>
            <p>Kom ihåg: Detta är en utvärdering av våra bilder, inte av dig. Du kan inte svara fel.</p>
        `;
        default:
          break;
      }
    },
    choices: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return ["Next"];
        case 'da':
          return ["Næste"];
        case 'sv':
          return ["Nästa"];
        default:
          break;
      }
    }
  });

  // // Select time to spend on experiment
  // experiment.timeline.push({
  //   type: HtmlButtonResponsePlugin,
  //   stimulus: function() {
  //     switch (experiment.detectLanguage()) {
  //       case 'en':
  //         return `
  //           <p>We appreciate your time. Choose how much of it you would like to share with us.</p>
  //           <p>The survey will automatically end when it reaches the time limit you choose.</p>
  //         `;
  //       case 'da':
  //         return `
  //           <p>Vi værdsætter din tid. Vælg, hvor meget af den, du vil dele med os.</p>
  //           <p>Undersøgelsen slutter automatisk, når det når den tidsgrænse, du vælger.</p>
  //         `;
  //       case 'sv':
  //         return `
  //           <p>Vi uppskattar din tid. Välj hur mycket av den du vill dela med oss.</p>
  //           <p>Undersökningen avslutas automatiskt när den når den tidsgräns du väljer.</p>
  //         `;
  //       default:
  //         break;
  //     }
  //   },
  //   choices: function() {
  //     switch (experiment.detectLanguage()) {
  //       case 'en':
  //         return ["3 minutes", "5 minutes", "7 minutes"];
  //       case 'da':
  //         return ["3 minutter", "5 minutter", "7 minutter"];
  //       case 'sv':
  //         return ["3 minuter", "5 minuter", "7 minuter"];
  //       default:
  //         break;
  //     }
  //   },
  //   on_finish: function(data) {
  //     experiment.timeLimitSetTime = new Date().getTime();
  //     experiment.timeLimit = [1000*60*3, 1000*60*5, 1000*60*7][data.response];
  //     console.log(experiment.timeLimit);
  //   }
  // });

  // The actual evaluation
  experiment.timeline.push({
    timeline: [
      {
        type: ImageButtonResponsePlugin,         
        stimulus: function() {
          return `assets/img/betaset.2.0_800x800/${jsPsych.timelineVariable('item')}`;
        },
        prompt: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `<p class="jspsych-html-button-response-prompt">Can you see what is on the image??</p>`;
            case 'da':
              return `<p class="jspsych-html-button-response-prompt">Kan du se, hvad der er på billedet?</p>`;
            case 'sv':
              return `<p class="jspsych-html-button-response-prompt">Kan du se vad som är på bilden?</p>`;
            default:
              break;
          }
        },
        choices: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return ['No', 'Yes'];
            case 'da':
              return ['Nej', 'Ja'];
            case 'sv':
              return ['Nej', 'Ja'];
            default:
              break;
          }
        },
        stimulus_height: '800px',
        stimulus_width: '800px',
        render_on_canvas: false,
        trial_duration: 60000,
        post_trial_gap: 200,
        css_classes: "recognition-trial",
        data: {
          question: 'recognition',
          item: jsPsych.timelineVariable('item')
        },
        on_finish: function(data) {
          // Save the button text (value) in addition to its index
          data.response_index = data.response;
          data.response = ['no', 'yes'][data.response_index];

          // Test if we have reached the timelimit for this timeline
          // console.log("Timeline started at: " + experiment.timeLimitSetTime);
          // console.log("Time now is " + new Date().getTime());
          // console.log(new Date().getTime() - experiment.timeLimitSetTime + "ms has bassed");
          // if (new Date().getTime() - experiment.timeLimitSetTime > experiment.timeLimit) {
            // console.log("That is more than the limit. This will be the final trial.");
            // jsPsych.endCurrentTimeline();
          // } else {
            // console.log("That is within the limit (of " + experiment.timeLimit + ") - another trial will follow");
          // }
        }
      },
    ],
    timeline_variables: experiment.betasetTwoZero.allAsItem,
    randomize_order: true
  });

  // experiment.timeline.push({
  //   type: SurveyHtmlFormPlugin,
  //   preamble: function() {
  //     switch (experiment.detectLanguage()) {
  //       case 'en':
  //         return `
  //           <p><b>Almost done!</b> (thank you again)<br />
  //           Aswer these three background questions to finish your participation.</p>
  //         `;
  //       case 'da':
  //         return `
  //           <p><b>Næsten færdig!</b> (tak igen)<br />
  //           Besvar disse tre spørgsmål og afslut din deltagelse.</p>
  //         `;
  //       case 'sv':
  //         return `
  //           <p><b>Nästan klar!</b> (tack igen)<br />
  //           Besvara dessa tre frågor och avsluta din medverkan.</p>
  //         `;
  //       default:
  //         break;
  //     }
  //   },
  //   html: function() {
  //     switch (experiment.detectLanguage()) {
  //       case 'en':
  //         return `
  //           <p>I was born in year <input type="number" id="birthyear-resp-box" name="birthyear" size="4" min="1900" max="2024" required /></p>
  //           <p>I identify as <select name="gender" required>
  //             <option value="" disabled selected>Please select</option>
  //             <option value="female">Female</option>
  //             <option value="male">Male</option>
  //             <option value="other">Other / prefer no to answer</option>
  //           </select></p>
  //           <p>I study / have studied / work at <select name="faculty" required>
  //           <option value="" disabled selected>Please select</option>
  //           <option value="engineering">Faculty of Engineering, LTH</option>
  //           <option value="finearts">Faculty of Fine and Performing Arts</option>
  //           <option value="humanitiestheology">Faculties of Humanities and Theology</option>
  //           <option value="law">Faculty of Law</option>
  //           <option value="medicine">Faculty of Medicine</option>
  //           <option value="science">Faculty of Science</option>
  //           <option value="socialsciences">Faculty of Social Sciences</option>
  //           <option value="economicsmanagement">School of Economics and Management, LUSEM</option>
  //           <option value="other">Other / prefer no to answer</option>
  //         </select></p>
  //         `;
  //       case 'da':
  //         return `
  //           <p>Jeg blev født i år <input type="number" id="birthyear-resp-box" name="birthyear" size="4" min="1900" max="2024" required /></p>
  //           <p>Jeg identificerer mig som <select name="gender" required>
  //             <option value="" disabled selected>Vælg venligst</option>
  //             <option value="female">Kvinde</option>
  //             <option value="male">Mand</option>
  //             <option value="other">Andet / foretrækker ikke at svare</option>
  //           </select></p>
  //           <p>Jeg studerer / har studeret / arbejder på <select name="faculty" required>
  //           <option value="" disabled selected>Vælg venligst</option>
  //           <option value="engineering">Det Tekniske Fakultet, LTH</option>
  //           <option value="finearts">Fakultetet for Billedkunst og Scenekunst</option>
  //           <option value="humanitiestheology">Humaniora- og Teologifakulteterne</option>
  //           <option value="law">Det Juridiske Fakultet</option>
  //           <option value="medicine">Det Sundhedsvidenskabelige Fakultet</option>
  //           <option value="science">Det Naturvidenskabelige Fakultet</option>
  //           <option value="socialsciences">Det Samfundsvidenskabelige Fakultet</option>
  //           <option value="economicsmanagement">Handelshøjskolen, LUSEM</option>
  //           <option value="other">Andet / foretrækker ikke at svare</option>
  //         </select></p>
  //         `;
  //       case 'sv':
  //         return `
  //           <p>Jag föddes år <input type="number" id="birthyear-resp-box" name="birthyear" size="4" min="1900" max="2024" required /></p>
  //           <p>Jag identifierar mig som <select name="gender" required>
  //             <option value="" disabled selected>Vänligen välj</option>
  //             <option value="female">Kvinna</option>
  //             <option value="male">Man</option>
  //             <option value="other">Annat / föredrar att inte svara</option>
  //           </select></p>
  //           <p>Jag studerar / har studerat / arbetar vid <select name="faculty" required>
  //           <option value="" disabled selected>Vänligen välj</option>
  //           <option value="engineering">Lunds tekniska högskola, LTH</option>
  //           <option value="finearts">Konstnärliga fakulteten</option>
  //           <option value="humanitiestheology">Humanistiska och teologiska fakulteterna</option>
  //           <option value="law">Juridiska fakulteten</option>
  //           <option value="medicine">Medicinska fakulteten</option>
  //           <option value="science">Naturvetenskapliga fakulteten</option>
  //           <option value="socialsciences">Samhällsvetenskapliga fakulteten</option>
  //           <option value="economicsmanagement">Ekonomihögskolan</option>
  //           <option value="other">Annat / föredrar att inte svara</option>
  //         </select></p>
  //         `;
  //       default:
  //         break;
  //     }
  //   },
  //   autofocus: 'birthyear-resp-box',
  //   button_label: function() {
  //     switch (experiment.detectLanguage()) {
  //       case 'en':
  //         return 'Finish and save responses';
  //       case 'da':
  //         return 'Afslut og gem svar';
  //       case 'sv':
  //         return 'Avsluta och spara svar';
  //       default:
  //         break;
  //     }
  //   }
  // });
};