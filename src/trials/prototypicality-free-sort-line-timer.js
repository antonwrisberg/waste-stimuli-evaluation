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
            <h1>Part 2</h1>
            <p>In this part, you will see an arrow and a series of waste images on each screen.</p>
            <p>On each screen, we ask you to sort the images by <b>how good an example you think they are of the specified waste fraction</b>.<br />You sort the images by dragging and dropping them onto the arrow.</p>
            <p>This part of the survey automatically ends after 6 minutes.<br />Then you have the option to take a break.</p>
          `;
        case 'da':
          return `
            <h1>Del 2</h1>
            <p>I denne del vil du på hvert skærmbillede se en pil og en række billeder af affald.</p>
            <p>På hvert skærmbillede beder vi dig om at sortere billederne efter, <b>hvor godt et eksempel, du synes, de er på den angivne affaldsfraktion</b>.<br />Du sorterer billederne ved at trække og slippe dem på pilen.</p>
            <p>Denne del af undersøgelsen slutter automatisk efter 6 minutter.<br />Herefter har du mulighed for at holde en pause.</p>"
          `;
        case 'sv':
          return `
            <p>På varje sida kommer du att se en pil, en rad bilder på avfall och information om en avfallskategori.</p>

            <img src="assets/img/screendumps/part2_sv.png" class="screendump">
            
            <p>Din uppgift kommer att vara att sortera bilderna efter<br /><b>hur bra exempel du tycker att avfallet på bilden är av den avfallskategori som presenteras</b><br />(t.ex. plast eller tidningar).</p>
            
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

          images.push(jsPsych.randomization.sampleWithoutReplacement(fractionObject.congruent, experiment.prototypicalityFreeSortCongruentCount));
          images.push(jsPsych.randomization.sampleWithoutReplacement(fractionObject.incongruent, experiment.prototypicalityFreeSortIncongruentCount));

          return jsPsych.randomization.shuffle(images.flat());
        },
        img_path: function() {
          return "assets/img/stimuli-800x800-sorted/";
        },
        arrow_text_left: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return "Worse example";
            case 'da':
              return "Værre eksempel";
            case 'sv':
              return "Sämre exempel";
            default:
              break;
          }
        },
        arrow_text_right: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return "Better example";
            case 'da':
              return "Bedre eksampel";
            case 'sv':
              return "Bättre exempel";
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
              return `<p>Drag and drop the images along the arrow according to <b>how good an example you think they are of the waste fraction <em>${jsPsych.timelineVariable('fraction_en')}</em></b>.</p>`;
            case 'da':
              return `<p>Træk billederne og placer dem langs pilen efter <b>hvor godt et eksempel du synes, de er på affaldsfraktionen <em>${jsPsych.timelineVariable('fraction_da')}</em></b>.</p>`;
            case 'sv':
              return `<p>Dra bilderna och placera dem längs pilen efter <b>hur bra exempel du tycker att de är på avfallsfraktionen:</b></p><p style="text-transform:uppercase"><b>${jsPsych.timelineVariable('fraction_sv')}</b></p>`;
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
      }
    ],
    timeline_variables: experiment.stimuli.fractions,
    sample: {
      type: 'with-replacement',
      size: 24,
      weights: experiment.stimuli.fractionCounts
    }
  });
};