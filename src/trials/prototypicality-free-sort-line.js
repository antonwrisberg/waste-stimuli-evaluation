import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import FreeSortPlugin from '@jspsych/plugin-free-sort';
import ImageFreeSortPlugin from '@antonwrisberg/plugin-image-freesort';


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
        type: ImageFreeSortPlugin,
        img_array: function() {
          var fractionObject = experiment.stimuli.set.find(({ key }) => key === jsPsych.timelineVariable('key'));

          let images = [];

          console.log(fractionObject);

          for (var i = 0; i < experiment.prototypicalityFreeSortCongruentCount; i ++) {
            images.push("assets/img/betaset-sorted/" + fractionObject.congruent[i]);
          }

          for (var j = 0; j < experiment.prototypicalityFreeSortIncongruentCount; j ++) {
            images.push("assets/img/betaset-sorted/" + fractionObject.incongruent[j]);
          }
          // return images;

          return shuffleArray(images);
        },
        img_path: "",
        arrow_text_left: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return "Worse";
            case 'da':
              return "Værre";
            case 'sv':
              return "Sämre exempel";
            default:
              break;
          }
        },
        arrow_text_right: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return "Better";
            case 'da':
              return "Bedre";
            case 'sv':
              return "Bättre exempel";
            default:
              break;
          }
        },
        scale_factor: 4,
        sort_area_shape: "square",
        // stim_height: 115,
        // stim_width: 115,
        prompt: function() {
          return `<p>Dra bilderna och placera dem längs linjen efter hur bra exempel du tycker att de är på <strong>${jsPsych.timelineVariable('fraction_sv')}</strong>.</p>`;
        },
        prompt_location: "above",
        counter_text_unfinished: "Du måste placera alla bilder inom sorteringsområdet. %n% bild(er) saknas.",
        counter_text_finished: "Alla bilder placerade. Placera gärna bilder om, om det behövs.",
        css_classes: "prototypicality-free-sort",
        data: {
          question: 'prototypicality-freesort',
          fraction: jsPsych.timelineVariable('key')
        },
        // on_load: function() { // Make sure the last dragged element is always on top
        //   document.querySelectorAll(".plain-draggable").forEach(function(element) {
        //     element.addEventListener("mousedown", (event) => {
        //       event.currentTarget.style.zIndex = (Date.now() - Math.floor(Date.now() / (24 * 60 * 60 * 1000)) * (24 * 60 * 60 * 1000)).toString;
        //     });
        //   });
        // }
      }
    ],
    timeline_variables: experiment.stimuli.fractions,
    sample: {
      type: 'without-replacement',
      size: experiment.prototypicalityFractionCount
    }
  });
};