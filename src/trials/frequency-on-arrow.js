import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import ImagesLineSortPlugin from "/node_modules/@antonwrisberg/plugin-images-freesort";
import PreloadPlugin from "@jspsych/plugin-preload";
import CallFunctionPlugin from "@jspsych/plugin-call-function";

// Prototypicality with free sort
export default function (experiment) {
  jsPsych = experiment.jsPsych;

  // Asset load
  experiment.timeline.push({
    type: PreloadPlugin,
    images: [
      "assets/img/screendumps/part1_sv.png",
      "assets/img/screendumps/part1.1_sv.png",
      "assets/img/stimuli-1.1-800x800-sorted/farligt_avfall/IMG_8019_1200x1200_m60_q10.jpg", //Paint bucket
      "assets/img/stimuli-1.1-800x800-sorted/glasforpackningar_fargade/5h5a7414_1200x1200_m60_q10.jpg", // Wine bottle
      "assets/img/stimuli-1.1-800x800-sorted/metallforpackningar/5h5a7447_1200x1200_m60_q10.jpg", // mackarel
      "assets/img/stimuli-1.1-800x800-sorted/matavfall/5h5a7781_1200x1200_m60_q10.jpg", // Orange
      "assets/img/attention-checks/800x800se/sällan.png",
      "assets/img/attention-checks/800x800se/ofta.png"
    ]
  });

  // Intro
  experiment.timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return `
            <h1>Part 1</h1>
            <p>In this part, you will see an arrow and a series of waste images on each screen.</p>
            <p>On each screen, we ask you to sort the images by <b>how often you expend them</b>.<br />You sort the images by dragging and dropping them onto the arrow.</p>
            <p>This part of the survey ends automatically after 6 minutes.<br />After this, you will have the opportunity to take a break.</p>
          `;
        case 'da':
          return `
            <h1>Del 1</h1>
            <p>I denne del vil du på hvert skærmbillede se en pil og en række billeder af affald.</p>
            <p>På hvert skærmbillede beder vi dig om at sortere billederne efter, <b>hvor ofte du færdigopbruger dem</b>.<br />Du sorterer billederne ved at trække og slippe dem på pilen.</p>
            <p>Denne del af undersøgelsen slutter automatisk efter 6 minutter.<br />Herefter har du mulighed for at holde en pause.</p>
          `;
        case 'sv':
          return `
            <p>På varje sida kommer du att se en pil och en rad bilder på avfall:</p>

            <img src="assets/img/screendumps/part1_sv.png" class="screendump">

            <p>Din uppgift kommer att vara att sortera bilderna längs pilen efter<br /><b>hur ofta du förbrukar eller använder slut på dem</b>.</p>
            
            <p>Du sorterar bilderna genom att dra dem med din muspekare och släppa dem på pilen.</p>
            
            <p>Du kan släppa bilderna över hela pilen:</p>

            <img src="assets/img/screendumps/part1.1_sv.png" class="screendump">

            <p>Du måste placera alla bilder innan du kan gå vidare.</p>
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
    on_finish: function(data) {
      jsPsych.setProgressBar(0.035);
    }
  });

  // Training trial
  experiment.timeline.push({
    timeline: [
      {
        type: ImagesLineSortPlugin,
        img_array: [
          "farligt_avfall/IMG_8019_1200x1200_m60_q10.jpg", //Paint bucket
          "glasforpackningar_fargade/5h5a7414_1200x1200_m60_q10.jpg", // Wine bottle
          "metallforpackningar/5h5a7447_1200x1200_m60_q10.jpg", // mackarel
          "matavfall/5h5a7781_1200x1200_m60_q10.jpg" // Orange
        ],
        img_path: function() {
          return "assets/img/stimuli-1.1-800x800-sorted/";
        },
        arrow_text_left: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return "Rarely";
            case 'da':
              return "Sjældent";
            case 'sv':
              return "Sällan";
            default:
              break;
          }
        },
        arrow_text_right: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return "Often";
            case 'da':
              return "Ofte";
            case 'sv':
              return "Ofta";
            default:
              break;
          }
        },
        button_label: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return "Continue";
            case 'da':
              return "Fortsæt";
            case 'sv':
              return "Fortsätt";
            default:
              break;
          }
        },
        prompt: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `<p>Drag and drop the images along the arrow according to <b>how often you expend them</b>.</p>`;
            case 'da':
              return `<p>Træk billederne og placer dem langs pilen efter, <b>hvor ofte du færdigopbruger dem</b>.</p>`;
            case 'sv':
              return `
                <p style="text-align: left">Detta är en <b>övning</b>.</p><p style="text-align: left">Gör så här:</p>

                <ol style="text-align: left">
                  <li>Dra apelsinen till pilen <b>som om</b> du ofta förbrukar/använder slut på den.</li>
                  <li>Dra målarburken till pilen <b>som om</b> du sällan förbrukar/använder slut på den.</li>
                  <li>Dra vinflaskan till pilen <b>som om</b> du förbrukar/använder slut på den mer sällan än apelsinen, men oftare än målarburken.</li>
                  <li>Dra makrillburken till pilen <b>som om</b> du förbrukar/använder slut på den mer sällan än vinflaskan, men oftare än målarburken.</li>
                </ol>
              `;
            default:
              break;
          }
        },
        prompt_location: "above",
        css_classes: "prototypicality-free-sort",
        on_load: function() {
          document.querySelector('#jspsych-line-sort-done-btn').addEventListener('mousedown', function(event) {
        
            var arrowRect = document.querySelector("#snap-box").getBoundingClientRect();

            var results = [];

            document.querySelectorAll(".jspsych-img-freesort-option").forEach(function(element) {
              // console.log("Index of image in array: " + element.children[0].getAttribute("data-choice"));
              // console.log("Image src: " + element.children[0].getAttribute("src"));
              var rect = element.getBoundingClientRect();
              // console.log(rect.left + ", " + rect.right);
              var itemWidth = rect.right - rect.left;
              var itemCentre = rect.left + itemWidth / 2;
              // console.log("Width of this item: " + itemWidth)
              // console.log("Centre of this item: " + itemCentre);
              var leftBoundaryForItem = arrowRect.left + itemWidth / 2;
              var rightBoundaryForItem = arrowRect.right - itemWidth / 2;
              // console.log("Left bounrady of arrow for this item: " + leftBoundaryForItem);
              // console.log("Right bounrady of arrow for this item: " + rightBoundaryForItem);
              var relativeLocationOfItemOnArrow = (itemCentre - leftBoundaryForItem) / (rightBoundaryForItem - leftBoundaryForItem);
              // console.log("Relative position of item on arrow: " + relativeLocationOfItemOnArrow);

              results.push({
                image: element.children[0].getAttribute("src").split("/").pop(),
                relative_location_on_arrow: relativeLocationOfItemOnArrow,
                display_index: element.children[0].getAttribute("data-choice"),
              });
            });

            var responses = {};
            results.forEach(function (val) {
              // console.log(val.image);
              switch (val.image) {
                case 'IMG_8019_1200x1200_m60_q10.jpg':
                  responses.paint = val.relative_location_on_arrow
                  break;
                case '5h5a7414_1200x1200_m60_q10.jpg':
                  responses.wine = val.relative_location_on_arrow
                  break;
                case '5h5a7447_1200x1200_m60_q10.jpg':
                  responses.fish = val.relative_location_on_arrow
                  break;
                case '5h5a7781_1200x1200_m60_q10.jpg':
                  responses.orange = val.relative_location_on_arrow
                  break;
              }
            });
      
            if (responses.orange < 0.8) {
              alert("Tycker du inte att apelsinen borde placeras längre till höger?");
            } else if (responses.paint > 0.2) {
                alert("Tycker du inte att målarburken borde placeras längre till vänster?");
            } else if (responses.wine < responses.paint) {
                alert("Tycker du inte att vinflaskan borde placeras längre till höger?");
            } else if (responses.wine > responses.orange) {
                alert("Tycker du inte att vinflaskan borde placeras längre till vänster?");
            } else if (responses.fish < responses.paint) {
                alert("Tycker du inte att makrillburken borde placeras längre till höger?");
            } else if (responses.fish > responses.wine) {
                alert("Tycker du inte att makrillburken borde placeras längre till vänster?");
            }
          })
        },
        on_finish: function() {
          jsPsych.setProgressBar(0.04);
        }
      },
      {
        type: HtmlButtonResponsePlugin,
        stimulus: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <h1>Part 1</h1>
                <p>In this part, you will see an arrow and a series of waste images on each screen.</p>
                <p>On each screen, we ask you to sort the images by <b>how often you expend them</b>.<br />You sort the images by dragging and dropping them onto the arrow.</p>
                <p>This part of the survey ends automatically after 6 minutes.<br />After this, you will have the opportunity to take a break.</p>
              `;
            case 'da':
              return `
                <h1>Del 1</h1>
                <p>I denne del vil du på hvert skærmbillede se en pil og en række billeder af affald.</p>
                <p>På hvert skærmbillede beder vi dig om at sortere billederne efter, <b>hvor ofte du færdigopbruger dem</b>.<br />Du sorterer billederne ved at trække og slippe dem på pilen.</p>
                <p>Denne del af undersøgelsen slutter automatisk efter 6 minutter.<br />Herefter har du mulighed for at holde en pause.</p>
              `;
            case 'sv':
              return `
                <p>Bra! Nu är du redo för den riktiga undersökningen.</p>

                <p>Härifrån kommer dina svar sparas och användas för forskning.</p>
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
        on_finish: function(data) {
          experiment.timeLimitSetTime = new Date().getTime();
          experiment.timeLimit = 1000 * 60 * 6.5; // Run this round of trials for 6.5 minutes
          jsPsych.setProgressBar(0.045);
        }
      }
    ]
  });

  // Actual trials
  experiment.timeline.push({
    timeline: [
      {
        type: CallFunctionPlugin,
        func: function() {
          var fractionObject = experiment.stimuli.fractions.find(({ key }) => key === jsPsych.timelineVariable('key'));
          experiment.stimuli.items.inCurrentTrial = jsPsych.randomization.sampleWithoutReplacement(fractionObject.congruent, experiment.prototypicalityFreeSortCongruentCount + experiment.prototypicalityFreeSortIncongruentCount)
        }
      },
      {
        type: PreloadPlugin,
        images: function() {
          let imgPaths = [];

          experiment.stimuli.items.inCurrentTrial.forEach(function(val) {
            imgPaths.push("assets/img/stimuli-1.1-800x800-sorted/" + val)
          })

          return imgPaths;
        }
      },
      {
        type: ImagesLineSortPlugin,
        img_array: function() {
          let imgArray = experiment.stimuli.items.inCurrentTrial;

          // Add control image with 40% likelihood
          if (Math.random() > .6) {
            imgArray.pop();

            // Add control image depending on current time ("randomness")
            if (new Date().getSeconds() % 2 == 0) {
              imgArray.push('../attention-checks/800x800se/ofta.png')
              // console.log("'ofta' attention check")
            } else {
              imgArray.push('../attention-checks/800x800se/sällan.png')
              // console.log("'sällan' attention check")
            }
          }
          
          return jsPsych.randomization.shuffle(imgArray);
        },
        img_path: function() {
          return "assets/img/stimuli-1.1-800x800-sorted/";
        },
        arrow_text_left: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return "Rarely";
            case 'da':
              return "Sjældent";
            case 'sv':
              return "Sällan";
            default:
              break;
          }
        },
        arrow_text_right: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return "Often";
            case 'da':
              return "Ofte";
            case 'sv':
              return "Ofta";
            default:
              break;
          }
        },
        button_label: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return "Continue";
            case 'da':
              return "Fortsæt";
            case 'sv':
              return "Fortsätt";
            default:
              break;
          }
        },
        prompt: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `<p>Drag and drop the images along the arrow according to <b>how often you expend them</b>.</p>`;
            case 'da':
              return `<p>Træk billederne og placer dem langs pilen efter, <b>hvor ofte du færdigopbruger dem</b>.</p>`;
            case 'sv':
              return `<p>Dra bilderna och placera dem längs pilen enligt <b>hur ofta du förbrukar/använder slut på dem</b>.</p>`;
            default:
              break;
          }
        },
        prompt_location: "above",
        css_classes: "prototypicality-free-sort",
        data: {
          question: 'prototypicality-line-sort',
          fraction: jsPsych.timelineVariable('key')
        },
        on_finish: function(data) {
          let progressPercentageBasedOnTime = ((new Date().getTime() - experiment.timeLimitSetTime) / experiment.timeLimit);
          jsPsych.setProgressBar(0.05 + Math.min(1, progressPercentageBasedOnTime) * 0.9);

          if (new Date().getTime() - experiment.timeLimitSetTime > experiment.timeLimit) {
            jsPsych.endCurrentTimeline();
          }
        }
      },
      // {
      //   timeline: [{
      //     type: HtmlButtonResponsePlugin,
      //     stimulus: function() {
      //       switch (experiment.detectLanguage()) {
      //         case 'en':
      //           return `
      //             <p>This screen is an attention check.</p>
      //             <p>Please do not click the button below.<br />The experiment will continue automatically in a few seconds.</p>
      //           `;
      //         case 'da':
      //           return `
      //             <p>Dette skærmbillede er et opmærksomhedstjek.</p>
      //             <p>Vær venlig ikke at klikke på knappen nedenfor.<br />Eksperimentet fortsætter automatisk om nogle sekunder.</p>
      //           `;
      //         case 'sv':
      //           return `
      //             <p>Denna skärmbild är en uppmärksamhetskontroll.</p>
      //             <p>Var vänlig och klicka inte på knappen nedan.<br />Experimentet fortsätter automatiskt om några sekunder.</p>
      //           `;
      //         default:
      //           break;
      //       }
      //     },
      //     choices: function() {
      //       switch (experiment.detectLanguage()) {
      //         case 'en':
      //           return ["Continue"];
      //         case 'da':
      //           return ["Fortsæt"];
      //         case 'sv':
      //           return ["Fortsätt"];
      //         default:
      //           break;
      //       }
      //     },
      //     on_finish: function(data) {
      //       if (data.response === 0) {
      //         data.attention_check_response = 'fail';
      //       } else {
      //         data.attention_check_response = 'success';
      //       }

      //       data.attention_check = true;
      //     },
      //     trial_duration: 6000
      //   }],
      //   conditional_function: function(){
      //     return (Math.random() > .6)
      //   }
      // }
    ],
    timeline_variables: experiment.stimuli.fractions,
    sample: {
      type: 'with-replacement',
      size: 36,
      weights: experiment.stimuli.fractionCounts
    }
  });
};