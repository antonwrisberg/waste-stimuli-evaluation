import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import ImagesLineSortPlugin from "/node_modules/@antonwrisberg/plugin-images-freesort";


function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) { 
 
      // Generate random number 
      var j = Math.floor(Math.random() * (i + 1));
                 
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
     
  return array;
}

// Prototypicality with free sort
export default function (experiment) {
  jsPsych = experiment.jsPsych;

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

            <p>Din uppgift kommer att vara att sortera bilderna efter<br /><b>hur ofta du förbrukar eller använder slut på dem</b>.</p>
            
            <p>Du sorterar bilderna genom att dra dem med din muspekare och släppa bilderna på pilen.</p>
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
      experiment.timeLimit = 1000 * 60 * 7; // Run this round of trials for 7 minutes
      jsPsych.setProgressBar(0.035);
    }
  });

  // console.log(experiment.stimuli.set);

  experiment.timeline.push({
    timeline: [
      {
        type: ImagesLineSortPlugin,
        img_array: function() {
          var fractionObject = experiment.stimuli.fractions.find(({ key }) => key === jsPsych.timelineVariable('key'));

          let images = [];

          images.push(jsPsych.randomization.sampleWithoutReplacement(fractionObject.congruent, experiment.prototypicalityFreeSortCongruentCount + experiment.prototypicalityFreeSortIncongruentCount));

          return jsPsych.randomization.shuffle(images.flat());
        },
        img_path: function() {
          return "assets/img/stimuli-800x800-sorted/";
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
          if (new Date().getTime() - experiment.timeLimitSetTime > experiment.timeLimit) {
            jsPsych.endCurrentTimeline();
          } else {
            let progressPercentageBasedOnTime = ((new Date().getTime() - experiment.timeLimitSetTime) / experiment.timeLimit);
            jsPsych.setProgressBar(0.05 + progressPercentageBasedOnTime * 0.9);
          }
        }
      },
      {
        timeline: [{
          type: HtmlButtonResponsePlugin,
          stimulus: function() {
            switch (experiment.detectLanguage()) {
              case 'en':
                return `
                  <p>This screen is an attention check.</p>
                  <p>Please do not click the button below.<br />The experiment will continue automatically in a few seconds.</p>
                `;
              case 'da':
                return `
                  <p>Dette skærmbillede er et opmærksomhedstjek.</p>
                  <p>Vær venlig ikke at klikke på knappen nedenfor.<br />Eksperimentet fortsætter automatisk om nogle sekunder.</p>
                `;
              case 'sv':
                return `
                  <p>Denna skärmbild är en uppmärksamhetskontroll.</p>
                  <p>Var vänlig och klicka inte på knappen nedan.<br />Experimentet fortsätter automatiskt om några sekunder.</p>
                `;
              default:
                break;
            }
          },
          choices: function() {
            switch (experiment.detectLanguage()) {
              case 'en':
                return ["Continue"];
              case 'da':
                return ["Fortsæt"];
              case 'sv':
                return ["Fortsätt"];
              default:
                break;
            }
          },
          on_finish: function(data) {
            if (data.response === 0) {
              data.attention_check_response = 'Failed attention check! This button should not have been clicked';
            } else {
              data.attention_check_response = 'Successful attention check!';
            }
          },
          trial_duration: 6000
        }],
        conditional_function: function(){
          return (Math.random() > .6)
        }
      }
    ],
    timeline_variables: experiment.stimuli.fractions,
    sample: {
      type: 'with-replacement',
      size: 36,
      weights: experiment.stimuli.fractionCounts
    }
  });
};