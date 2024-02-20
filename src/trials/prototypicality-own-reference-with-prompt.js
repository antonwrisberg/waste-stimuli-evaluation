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
                <p>Please take a moment to form a mental image of waste items from the home that you would categorise as <strong>${jsPsych.timelineVariable('fraction_en')}</strong>.</p>
                <p class="delayed">What is in your mental image?</p>
              `;
            case 'da':
              return `
                <p>Brug et øjeblik på at danne dig et mentalt billede af affald fra hjemmet, som du ville kategorisere som <strong>${jsPsych.timelineVariable('fraction_da')}</strong>.</p>
                <p class="delayed">Hvad forestiller dit mentale billede?</p>
              `;
            case 'sv':
              return `
                <p>Vänligen ta en stund för att bilda dig en mental bild av avfall från hemmet som du skulle kategorisera som <strong>${jsPsych.timelineVariable('fraction_sv')}</strong>.</p>
                <p class="delayed">Vad ser du i din mentala bild?</p>
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
          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <p>In a moment, you will see ${experiment.stimuli.congruencymix.length} images of various waste items.</p>
                <p>For each item, you must judge how well it resembles <strong>your</strong> mental image<br /> of waste items from the home that you would categorise as <strong>${jsPsych.timelineVariable('fraction_en')}</strong>.</p>
                <p>So take a moment to savour the image that you have in mind right now (of "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}").</p>
              `;
            case 'da':
              return `
                <p>Om et øjeblik vil du se ${experiment.stimuli.congruencymix.length} billeder af forskelligt affald.</p>
                <p>For hvert stykke affald skal du vurdere, hvor godt det ligner <strong>dit</strong> mentale billede<br /> af affald fra hjemmet, som du ville kategorisere som <strong>${jsPsych.timelineVariable('fraction_da')}</strong></p>
                <p>Så brug et øjeblik på at fæstne det billede du har på sinde nu (af "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}").</p>
              `;
            case 'sv':
              return `
                <p>Inom kort kommer du att se ${experiment.stimuli.congruencymix.length} bilder av olika avfallssaker.</p>
                <p>För varje sak måste du bedöma hur bra den liknar <strong>ditt</strong> mentala bild<br /> av avfall från hemmet som du skulle kategorisera som <strong>${jsPsych.timelineVariable('fraction_sv')}</strong>.</p>
                <p>Så ta en stund att mindes den mentala bild du har i åtanke just nu (av "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}").</p>
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
                      <p>How well does this item resemble the mental image of waste items from a home categorised as <strong>${jsPsych.timelineVariable('fraction_en')}</strong> that you had in mind before?</p>
                    </div>`;
                case 'da':
                  return `
                    <div class="prompt">
                      <p>Hvor godt ligner det her det mentale billede af affald fra hjemmet kategoriseret som <strong>${jsPsych.timelineVariable('fraction_da')}</strong>, som du havde i tankerne før?</p>
                    </div>`;
                case 'sv':
                  return `
                    <div class="prompt">
                      <p>Hur vel liknar den här saken den mentala bilden av avfall från hemmet som kategoriseras som <strong>${jsPsych.timelineVariable('fraction_sv')}</strong> som du hade i åtanke innan?</p>
                    </div>`;
                default:
                  break;
              }
            }, 
            labels: function() {
              switch (experiment.detectLanguage()) {
                case 'en':
                  return [`<p>It looks nothing like<br />my mental image<br />(of "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}")</p>`, '← less | more →', `<p>It looks identical to<br />my mental image<br />(of "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}")</p>`];
                case 'da':
                  return [`<p>Det ligner overhovedet ikke<br />mit mentale billede<br />(af "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}")</p>`, '← mindre | mere →', `<p>Det ligner præcis<br />mit mentale billede<br />(af "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}")</p>`];
                case 'sv':
                  return [`<p>Det ser överhuvudtaget inte<br />ut som mitt mentale bild<br />(av "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}")</p>`, '← mindre | mer →', `<p>Det ser identiskt ut<br />med mitt mentale bild<br />(av "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}")</p>`];
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