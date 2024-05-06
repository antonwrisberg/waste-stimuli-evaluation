import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import FreeSortPlugin from '@jspsych/plugin-free-sort';
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

  // console.log(experiment.stimuli.set);

  experiment.timeline.push({
    timeline: [
      {
        type: ImagesLineSortPlugin,
        img_array: function() {
          var fractionObject = experiment.stimuli.set.find(({ key }) => key === jsPsych.timelineVariable('key'));

          let images = [];

          console.log(fractionObject);

          for (var i = 0; i < experiment.prototypicalityFreeSortCongruentCount; i ++) {
            images.push(fractionObject.congruent[i]);
          }

          for (var j = 0; j < experiment.prototypicalityFreeSortIncongruentCount; j ++) {
            images.push(fractionObject.incongruent[j]);
          }
          // return images;

          return shuffleArray(images);
        },
        img_path: "assets/img/betaset-sorted/",
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
            case 'sv':
              return `<p>Dra bilderna och placera dem längs linjen efter hur bra exempel du tycker att de är på <strong>${jsPsych.timelineVariable('fraction_sv')}</strong>.</p>`;
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
      }
    ],
    timeline_variables: experiment.stimuli.fractions,
    sample: {
      type: 'without-replacement',
      size: experiment.prototypicalityFractionCount
    }
  });
};