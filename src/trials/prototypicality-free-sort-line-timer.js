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
            <p>In a moment, you will see an arrow and a number of images of waste.</p>
            <p>For each arrow, We ask you to sort the images by dragging and dropping them onto the arrow accordingly to how good an example you think they are of the specified waste fraction.</p>
            <p>This part of the survey automatically ends after 6 minutes.<br />Then you have the option to take a break.</p>
          `;
        case 'da':
          return `
            <h1>Del 2</h1>
            <p>Om et øjeblik vil du se en pil og en række billeder af affald.</p>
            <p>For hver pil beder vi dig om at sortere billederne ved at trække og slippe dem på pilen i overensstemmelse med, hvor godt et eksempel du synes, de er på den angivne affaldsfraktion.</p>
            <p>Denne del af undersøgelsen slutter automatisk efter 6 minutter.<br />Herefter har du mulighed for at holde en pause.</p>"
          `;
        case 'sv':
          return `
            <h1>Del 2</h1>
            <p>Inom kort kommer du att se en pil och ett antal bilder på avfall.</p>
            <p>För värje pil ber vi dig att sortera bilderna genom att dra och släppa dem på pilen enligt hur bra exempel du tycker de är på den angivna avfallsfraktionen.</p>
            <p>Denna del av undersökningen avslutas automatiskt efter 6 minuter.<br />Därefter har du möjlighet att ta en paus.</p>
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
      experiment.timeLimit = 1000*60*6;
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
              return `<p>Drag and drop the images along the line according to how good an example you think they are of the waste fraction <strong>${jsPsych.timelineVariable('fraction_en')}</strong>.</p>`;
            case 'da':
              return `<p>Træk billederne og placer dem langs linjen efter hvor godt et eksempel du synes, de er på affaldsfraktionen <strong>${jsPsych.timelineVariable('fraction_da')}</strong>.</p>`;
            case 'sv':
              return `<p>Dra bilderna och placera dem längs linjen efter hur bra exempel du tycker att de är på sorteringskategorin <strong>${jsPsych.timelineVariable('fraction_sv')}</strong>.</p>`;
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