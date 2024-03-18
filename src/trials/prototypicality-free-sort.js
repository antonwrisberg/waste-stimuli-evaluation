import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import FreeSortPlugin from '@jspsych/plugin-free-sort';

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
        type: FreeSortPlugin,
        stimuli: function() {
          var fractionObject = experiment.stimuli.set.find(({ key }) => key === jsPsych.timelineVariable('key'));

          let images = [];

          console.log(fractionObject);

          for (var i = 0; i < experiment.prototypicalityFreeSortCongruentCount; i ++) {
            images.push("assets/img/betaset-sorted/" + fractionObject.congruent[i]);
          }

          for (var j = 0; j < experiment.prototypicalityFreeSortIncongruentCount; j ++) {
            images.push("assets/img/betaset-sorted/" + fractionObject.incongruent[j]);
          }
          return images;

          // return shuffleArray(images);
        },
        scale_factor: 4,
        sort_area_shape: "square",
        // stim_height: 115,
        // stim_width: 115,
        prompt: function() {
          return `<p>Ordna bilderna efter hur bra exempel du tycker att de är av <strong>${jsPsych.timelineVariable('fraction_sv')}</strong>.</p><p>← sämre&nbsp;&nbsp;&nbsp;bättre →</p>`;
        },
        prompt_location: "above",
        counter_text_unfinished: "Du måste placera alla bilder inom sorteringsområdet. %n% bild(er) saknas.",
        counter_text_finished: "Alla bilder placerade. Placera gärna bilder om, om det behövs.",
        css_classes: "prototypicality-free-sort",
        data: {
          question: 'prototypicality-freesort',
          fraction: jsPsych.timelineVariable('key')
        },
        on_load: function() { // Make sure the last dragged element is always on top
          document.querySelectorAll(".jspsych-free-sort-draggable").forEach(function(element) {
            element.addEventListener("mousedown", (event) => {
              event.currentTarget.style.zIndex = Date.now() - Math.floor(Date.now() / (24 * 60 * 60 * 1000)) * (24 * 60 * 60 * 1000);
            });
          });
        }
      }
    ],
    timeline_variables: experiment.stimuli.fractions,
    sample: {
      type: 'without-replacement',
      size: experiment.prototypicalityFractionCount
    }
  });
};      
        
        // preamble: function() {
        //   switch (experiment.detectLanguage()) {
        //     case 'en':
        //       return `
        //         <p>Please take a moment to form a mental image of a waste item from the home that you would categorise as <strong>${jsPsych.timelineVariable('fraction_en')}</strong>.</p>
        //         <p class="delayed">What is in your mental image?</p>
        //       `;
        //     case 'da':
        //       return `
        //         <p>Brug et øjeblik på at danne dig et mentalt billede af et stykke affald fra hjemmet, som du ville kategorisere som <strong>${jsPsych.timelineVariable('fraction_da')}</strong>.</p>
        //         <p class="delayed">Hvad forestiller dit mentale billede?</p>
        //       `;
        //     case 'sv':
        //       return `
        //         <p>Vänligen ta en stund för att forma en inre bild av något från hemmet du skulle slänga som avfall och som du skulle kategorisera som <strong>${jsPsych.timelineVariable('fraction_sv')}</strong>.</p>
        //         <p class="delayed">Vad visar din inre bild?</p>
        //       `;
        //     default:
        //       break;
        //   }
        // },
        // html: `<input name="mentalImage" type="text" id="mental-image-response" class="delayed" required><br /><br />`,
        // autofocus: "mental-image-response",
        // button_label: function() {
        //   switch (experiment.detectLanguage()) {
        //     case 'en':
        //       return "Next";
        //     case 'da':
        //       return "Næste";
        //     case 'sv':
        //       return "Nästa";
        //     default:
        //       break;
        //   }
        // },
        // css_classes: "text-with-input",
        // on_load: function() { // Delay the display of the response button
        //   document.querySelectorAll(".delayed, .jspsych-btn").forEach(function(e) {
        //     console.log(e);
        //     e.classList.add("hidden");
        //   });
        //   setTimeout(function() {
        //     document.querySelectorAll(".delayed, .jspsych-btn").forEach(function(e) {
        //       e.classList.remove("hidden");
        //     });
        //   }, 2000);
        // },
        // on_finish: function(data) {
        //   jsPsych.data.addProperties({
        //     [jsPsych.timelineVariable('key') + '-mental-image']: data.response.mentalImage
        //   });
        //   console.log(data.response.mentalImage);
        // }
      // {
      //   type: HtmlButtonResponsePlugin,
      //   stimulus: function() {
      //     let images = [];
      //     ["cardboard", "bio", "glass", "hazardous", "metal", "paper", "plastic", "residual", "textile"].forEach(function (e) { 
      //       images.push("assets/img/betaset-sorted/" + experiment.stimuli.inFractions[e][Math.floor(Math.random() * experiment.stimuli.inFractions[e].length)]);
      //     })
      //     console.log(images);

      //     switch (experiment.detectLanguage()) {
      //       case 'en':
      //         return `
      //           <p>In a moment, you will see ${experiment.stimuli.congruencymix.length} random images of various waste items like the ones below.</p>
      //           <img src="${images[0]}">
      //           <img src="${images[1]}">
      //           <img src="${images[2]}">
      //           <img src="${images[3]}">
      //           <img src="${images[4]}">
      //           <img src="${images[5]}">
      //           <img src="${images[6]}">
      //           <img src="${images[7]}">
      //           <img src="${images[8]}">
      //           <p>For each item, you must judge on a scale how well it resembles the mental image <strong>you</strong> just formed<br /> of a waste item from the home that you would categorise as <strong>${jsPsych.timelineVariable('fraction_en')}</strong>.</p>
      //           <p>So take a moment to savour the mental image that you have in mind right now (of "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}").</p>
      //         `;
      //       case 'da':
      //         return `
      //           <p>Om et øjeblik vil du se ${experiment.stimuli.congruencymix.length} tilfældige billeder af forskellige stykker affald som dem nedenfor.</p>
      //           <img src="${images[0]}">
      //           <img src="${images[1]}">
      //           <img src="${images[2]}">
      //           <img src="${images[3]}">
      //           <img src="${images[4]}">
      //           <img src="${images[5]}">
      //           <img src="${images[6]}">
      //           <img src="${images[7]}">
      //           <img src="${images[8]}">
      //           <p>For hvert stykke affald skal du bedømme på en skala, hvor godt det ligner det mentale billede,<br /><strong>du</strong> lige har dannet af et stykke affald fra hjemmet, som du ville kategorisere som <strong>${jsPsych.timelineVariable('fraction_da')}</strong>.</p>
      //           <p>Så brug et øjeblik på at fæstne det mentale billede du har på sinde nu (af "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}").</p>
      //         `;
      //       case 'sv':
      //         return `
      //           <p>Inom kort kommer du att se ${experiment.stimuli.congruencymix.length} slumpmässiga bilder på olika avfall som dem du ser här nedanför.</p>
      //           <img src="${images[0]}">
      //           <img src="${images[1]}">
      //           <img src="${images[2]}">
      //           <img src="${images[3]}">
      //           <img src="${images[4]}">
      //           <img src="${images[5]}">
      //           <img src="${images[6]}">
      //           <img src="${images[7]}">
      //           <img src="${images[8]}">
      //           <p>För varje bild kommer vi att be dig att på en skala ange hur mycket den liknar den inre bild<br /> <strong>du</strong> just formade av ett avfall från hemmet som du skulle kategorisera som <strong>${jsPsych.timelineVariable('fraction_sv')}</strong>.</p>
      //           <p>Försök att minnas den inre bild du formade (av "${jsPsych.data.get().trials[0][jsPsych.timelineVariable('key') + '-mental-image']}").</p>
      //         `;
      //       default:
      //         break;
      //     }
      //   },
      //   choices: function() {
      //     switch (experiment.detectLanguage()) {
      //       case 'en':
      //         return ["When you are ready, click here"];
      //       case 'da':
      //         return ["Klik her, når du er klar"];
      //       case 'sv':
      //         return ["När du är redo, klicka här"];
      //       default:
      //         break;
      //     }
      //   },
      //   css_classes: "text-with-thumbnails",
      //   on_load: function() { // Delay the display of the response button
      //     console.log(document.querySelector(".jspsych-btn"));
      //     document.querySelector(".jspsych-btn").classList.add("hidden");
      //     setTimeout(function() {
      //       document.querySelector(".jspsych-btn").classList.remove("hidden");
      //     }, 4000);
      //   }
      // },
