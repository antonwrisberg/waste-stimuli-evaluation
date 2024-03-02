import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import SurveyHtmlFormPlugin from '@jspsych/plugin-survey-html-form';
import HtmlSliderResponsePlugin from '@jspsych/plugin-html-slider-response';

// Prototypicality against own prototype
export default function (experiment) {
  jsPsych = experiment.jsPsych;

  experiment.timeline.push({
    timeline: [
      {
        type: SurveyHtmlFormPlugin,
        preamble: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <p>Please take a moment to form a mental image of a waste item from the home that you would categorise as <strong>${jsPsych.timelineVariable('fraction_en')}</strong>.</p>
                <p class="delayed">What is in your mental image?</p>
              `;
            case 'da':
              return `
                <p>Brug et øjeblik på at danne dig et mentalt billede af et stykke affald fra hjemmet, som du ville kategorisere som <strong>${jsPsych.timelineVariable('fraction_da')}</strong>.</p>
                <p class="delayed">Hvad forestiller dit mentale billede?</p>
              `;
            case 'sv':
              return `
                <p>Vänligen ta en stund för att forma en inre bild av något från hemmet du skulle slänga som avfall och som du skulle kategorisera som <strong>${jsPsych.timelineVariable('fraction_sv')}</strong>.</p>
                <p class="delayed">Vad visar din inre bild?</p>
              `;
            default:
              break;
          }
        },
        html: `<input name="mentalImage" type="text" id="mental-image-response" class="delayed" required><br /><br />`,
        autofocus: "mental-image-response",
        button_label: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return "Next";
            case 'da':
              return "Næste";
            case 'sv':
              return "Nästa";
            default:
              break;
          }
        },
        css_classes: "text-with-input",
        on_load: function() { // Delay the display of the response button
          document.querySelectorAll(".delayed, .jspsych-btn").forEach(function(e) {
            console.log(e);
            e.classList.add("hidden");
          });
          setTimeout(function() {
            document.querySelectorAll(".delayed, .jspsych-btn").forEach(function(e) {
              e.classList.remove("hidden");
            });
          }, 2000);
        },
        on_finish: function(data) {
          jsPsych.data.addProperties({
            [jsPsych.timelineVariable('key') + '-mental-image']: data.response.mentalImage
          });
          console.log(data.response.mentalImage);
        }
      },
      {
        type: HtmlButtonResponsePlugin,
        stimulus: function() {
          let images = [];
          ["cardboard", "bio", "glass", "hazardous", "metal", "paper", "plastic", "residual", "textile"].forEach(function (e) { 
            images.push("assets/img/betaset-sorted/" + experiment.stimuli.inFractions[e][Math.floor(Math.random() * experiment.stimuli.inFractions[e].length)]);
          })
          console.log(images);

          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <p>In a moment, you will see ${experiment.stimuli.congruencymix.length} random images of various waste items like the ones below.</p>
                <img src="${images[0]}">
                <img src="${images[1]}">
                <img src="${images[2]}">
                <img src="${images[3]}">
                <img src="${images[4]}">
                <img src="${images[5]}">
                <img src="${images[6]}">
                <img src="${images[7]}">
                <img src="${images[8]}">
                <p>For each item, you must judge on a scale how well it resembles the mental image <strong>you</strong> just formed<br /> of a waste item from the home that you would categorise as <strong>${jsPsych.timelineVariable('fraction_en')}</strong>.</p>
                <p>So take a moment to savour the mental image that you have in mind right now (of "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}").</p>
              `;
            case 'da':
              return `
                <p>Om et øjeblik vil du se ${experiment.stimuli.congruencymix.length} tilfældige billeder af forskellige stykker affald som dem nedenfor.</p>
                <img src="${images[0]}">
                <img src="${images[1]}">
                <img src="${images[2]}">
                <img src="${images[3]}">
                <img src="${images[4]}">
                <img src="${images[5]}">
                <img src="${images[6]}">
                <img src="${images[7]}">
                <img src="${images[8]}">
                <p>For hvert stykke affald skal du bedømme på en skala, hvor godt det ligner det mentale billede,<br /><strong>du</strong> lige har dannet af et stykke affald fra hjemmet, som du ville kategorisere som <strong>${jsPsych.timelineVariable('fraction_da')}</strong>.</p>
                <p>Så brug et øjeblik på at fæstne det mentale billede du har på sinde nu (af "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}").</p>
              `;
            case 'sv':
              return `
                <p>Inom kort kommer du att se ${experiment.stimuli.congruencymix.length} slumpmässiga bilder på olika avfall som dem du ser här nedanför.</p>
                <img src="${images[0]}">
                <img src="${images[1]}">
                <img src="${images[2]}">
                <img src="${images[3]}">
                <img src="${images[4]}">
                <img src="${images[5]}">
                <img src="${images[6]}">
                <img src="${images[7]}">
                <img src="${images[8]}">
                <p>För varje bild kommer vi att be dig att på en skala ange hur mycket den liknar den inre bild<br /> <strong>du</strong> just formade av ett avfall från hemmet som du skulle kategorisera som <strong>${jsPsych.timelineVariable('fraction_sv')}</strong>.</p>
                <p>Försök att minnas den inre bild du formade (av "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}").</p>
              `;
            default:
              break;
          }
        },
        choices: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return ["When you are ready, click here"];
            case 'da':
              return ["Klik her, når du er klar"];
            case 'sv':
              return ["När du är redo, klicka här"];
            default:
              break;
          }
        },
        css_classes: "text-with-thumbnails",
        on_load: function() { // Delay the display of the response button
          console.log(document.querySelector(".jspsych-btn"));
          document.querySelector(".jspsych-btn").classList.add("hidden");
          setTimeout(function() {
            document.querySelector(".jspsych-btn").classList.remove("hidden");
          }, 4000);
        }
      },
      {
        timeline: [
          {
            type: HtmlSliderResponsePlugin,
            prompt: function(){
              switch (experiment.detectLanguage()) {
                case 'en':
                  return `
                    <div class="prompt">
                      <p>Where on the scale would you place this item in terms of how well it resembles your mental image of a waste item from a home categorised as <strong>${jsPsych.timelineVariable('fraction_en')}</strong>?</p>
                    </div>`;
                case 'da':
                  return `
                    <div class="prompt">
                      <p>Hvor på skalaen ville du placere dette stykke affald for hvor godt det ligner dit mentale billede af et sykke affald fra hjemmet kategoriseret som <strong>${jsPsych.timelineVariable('fraction_da')}</strong>?</p>
                    </div>`;
                case 'sv':
                  return `
                    <div class="prompt">
                      <p>Hur mycket liknar detta avfall din inre bild av ett avfall från hemmet kategoriserat som <strong>${jsPsych.timelineVariable('fraction_sv')}</strong>?</p>
                    </div>`;
                default:
                  break;
              }
            }, 
            labels: function() {
              switch (experiment.detectLanguage()) {
                case 'en':
                  return [`<p>It looks nothing like<br />my mental image<br />(of "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}")</p>`, '← less&nbsp;&nbsp;&nbsp;more →', `<p>It looks identical to<br />my mental image<br />(of "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}")</p>`];
                case 'da':
                  return [`<p>Det ligner overhovedet ikke<br />mit mentale billede<br />(af "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}")</p>`, '← mindre&nbsp;&nbsp;&nbsp;mere →&nbsp;&nbsp;', `<p>Det ligner præcis<br />mit mentale billede<br />(af "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}")</p>`];
                case 'sv':
                  return [`<p>Det ser överhuvudtaget inte<br />ut som min inre bild<br />(av "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}")</p>`, '← mindre&nbsp;&nbsp;&nbsp;mer →&nbsp;&nbsp;&nbsp;', `<p>Det ser precis ut<br />som min inre bild<br />(av "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}")</p>`];
                default:
                  break;
              }
            },
            button_label: function() {
              switch (experiment.detectLanguage()) {
                case 'en':
                  return "Next";
                case 'da':
                  return "Næste";
                case 'sv':
                  return "Nästa";
                default:
                  break;
              }
            },
            require_movement: true, // TODO: Change to TRUE when done testing
            css_classes: "slider-with-stimulus-and-prompt",
            data: {
              question: 'prototypicality',
              fraction: jsPsych.timelineVariable('key')
            },
            timeline: experiment.stimuli.congruencymix,
          }
        ]
      }
    ],
    timeline_variables: experiment.stimuli.fractions,
    sample: {
      type: 'without-replacement',
      size: experiment.prototypicalityFractionCount
    }
  });
};