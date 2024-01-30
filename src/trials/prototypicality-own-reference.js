// Prototypicality against own prototype
export default function (jsPsych, timeline, HtmlButtonResponsePlugin, HtmlSliderResponsePlugin, detectLanguage, prototypicalityFractionCount, congruencymix, fractions) {
  timeline.push({
    timeline: [
      {
        type: HtmlButtonResponsePlugin,
        stimulus: function() {
          switch (detectLanguage()) {
            case 'en':
              return `
                <p>Please take a moment to form a mental image of household waste items that you would categorise as <strong>${jsPsych.timelineVariable('fraction_en')}</strong>.</p>
              `;
            case 'da':
              return `
                <p>Brug et øjeblik på at danne dig et mentalt billede af husholdningsaffald, som du ville kategorisere som <strong>${jsPsych.timelineVariable('fraction_da')}</strong>.</p>
              `;
            case 'sv':
              return `
                <p>Vänligen ta en stund för att bilda dig en mental bild av hushållsavfall som du skulle kategorisera som <strong>${jsPsych.timelineVariable('fraction_sv')}</strong>.</p>
              `;
            default:
              break;
          }
        },
        choices: function() {
          switch (detectLanguage()) {
            case 'en':
              return ["Click here when you have formed a mental image that you would categorise as " + jsPsych.timelineVariable('fraction_en')];
            case 'da':
              return ["Klik her, når du har dannet et mentalt billede af husholdningsaffald, som du ville kategorisere som " + jsPsych.timelineVariable('fraction_da')];
            case 'sv':
              return ["Klicka här när du har skapat en mental bild av hushållsavfall som du skulle kategorisera som " + jsPsych.timelineVariable('fraction_sv')];
            default:
              break;
          }
        },
        on_load: function() { // Delay the display of the response button
          console.log(document.querySelector(".jspsych-btn"));
          document.querySelector(".jspsych-btn").classList.add("hidden");
          setTimeout(function() {
            document.querySelector(".jspsych-btn").classList.remove("hidden");
          }, 2000);
        }
      },
      {
        type: HtmlButtonResponsePlugin,
        stimulus: function() {
          switch (detectLanguage()) {
            case 'en':
              return `
                <p>In a moment, you will see ${congruencymix.length} images of various waste items.</p>
                <p>For each item, you must judge how well it resembles <strong>your</strong> mental image<br /> of household waste items that you would categorise as <strong>${jsPsych.timelineVariable('fraction_en')}</strong>.</p>
                <p>So take a moment to savour the image that you have in mind right now.</p>
              `;
            case 'da':
              return `
                <p>Om et øjeblik vil du se ${congruencymix.length} billeder af forskelligt affald.</p>
                <p>For hvert stykke affald skal du vurdere, hvor godt det ligner <strong>dit</strong> mentale billede<br /> af husholdningsaffald, som du ville kategorisere som <strong>${jsPsych.timelineVariable('fraction_da')}</strong></p>
                <p>Så brug et øjeblik på at fæstne det billede du har på sinde nu.</p>
              `;
            case 'sv':
              return `
                <p>Inom kort kommer du att se ${congruencymix.length} bilder av olika avfallssaker.</p>
                <p>För varje sak måste du bedöma hur bra den liknar <strong>ditt</strong> mentala bild<br /> av hushållsavfall som du skulle kategorisera som <strong>${jsPsych.timelineVariable('fraction_sv')}</strong>.</p>
                <p>Så ta en stund att mindes den mentala bild du har i åtanke just nu.</p>
              `;
            default:
              break;
          }
        },
        choices: function() {
          switch (detectLanguage()) {
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
              switch (detectLanguage()) {
                case 'en':
                  return `
                    <div class="prompt">
                      <p>How well does this item resemble the mental image of household waste items categorised as <strong>${jsPsych.timelineVariable('fraction_en')}</strong> that you had in mind before?</p>
                    </div>`;
                case 'da':
                  return `
                    <div class="prompt">
                      <p>Hvor godt ligner det her det mentale billede af husholdningsaffald kategoriseret som <strong>${jsPsych.timelineVariable('fraction_da')}</strong>, som du havde i tankerne før?</p>
                    </div>`;
                case 'sv':
                  return `
                    <div class="prompt">
                      <p>Hur vel liknar den här saken den mentala bilden av hushållsavfall som kategoriseras som <strong>${jsPsych.timelineVariable('fraction_sv')}</strong> som du hade i åtanke innan?</p>
                    </div>`;
                default:
                  break;
              }
            }, 
            labels: function() {
              switch (detectLanguage()) {
                case 'en':
                  return ['<p>It looks nothing like<br />my mental image</p>', 'Neither/nor', '<p>It looks identical to<br />my mental image</p>'];
                case 'da':
                  return ['<p>Det ligner overhovedet ikke<br />mit mentale billede</p>', 'Hverken/eller', '<p>Det ligner præcis<br />mit mentale billede</p>'];
                case 'sv':
                  return ['<p>Det ser överhuvudtaget inte<br />ut som mitt mentale bild</p>', 'Varken/eller', '<p>Det ser identiskt ut<br />med mitt mentale bild</p>'];
                default:
                  break;
              }
            },
            button_label: function() {
              switch (detectLanguage()) {
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
            timeline: congruencymix,
          }
        ]
      }
    ],
    timeline_variables: fractions,
    sample: {
      type: 'without-replacement',
      size: prototypicalityFractionCount
    }
  });
};