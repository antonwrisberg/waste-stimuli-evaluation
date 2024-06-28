import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import TinderWastePlugin from '/node_modules/@antonwrisberg/plugin-tinder-waste';
import PreloadPlugin from "@jspsych/plugin-preload";

// Categorisation
export default function CategorisationSwipeRFTrial (experiment) {
  let jsPsych = experiment.jsPsych;

  // console.log("Her")
  // console.log(experiment.stimuli.congruencymix);

  // Intro
  experiment.timeline.push({
    timeline: [
      {
        type: HtmlButtonResponsePlugin,
        stimulus: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <p>In a moment, you will see 5 random waste fractions. One at a time.</p>

                <p>For each fraction, you have 30 seconds to sort as many waste items as possible.</p>

                <p><b>Swipe right</b> if you believe that the waste item <b>belongs</b> in the fraction.</p>

                <p><b>Swipe left</b> if you believe that the waste item <b>does not belong</b> in the fraction.</p>

                <p>Be as accurate and fast as possible to beat your friends!</p>
              `;
            case 'da':
              return `
                <p>Om et øjeblik, vil du se 5 tilfældige affaldsfraktioner. En ad gangen.</p>

                <p>For hver fraktion har du 30 sekunder til at sortere så mange stykker affald som muligt.</p>

                <p><b>Swipe til højre</b> hvis du mener affaldet <b>hører til</b> i fraktionen.</p>

                <p><b>Swipe til venstre</b>, hvis du mener affaldet <b>ikke hører til</b> i fraktionen.</p>

                <p>Vær så akkurat og hurtig som muligt for at slå dine venner!</p>
              `;
            case 'sv':
              return `
                <p>Nu kommer du att se en bild på en avfallskategori tillsammans med bilder på avfall.</p>

                <p>Din uppgift kommer att vara att avgöra om den visade bilden tillhör den visade avfallskategorin eller ej.</p>
                                
                <p>Swipe till höger om du tror att avfallet <b>tillhör</b> kategorin.</p>

                <p>Swipe till vänster om du tror att avfallet <b>inte tillhör</b> kategorin.</p>
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
        on_finish: function() {
          jsPsych.setProgressBar(0.04);
        }
      }
    ]
  });

  experiment.timeline.push({
    timeline: [
      { // Preload
        type: PreloadPlugin,
        images: function () {
          console.log(experiment.stimuli.congruencymix);
          console.log(experiment.stimuli.fractions[jsPsych.timelineVariable('key')]);
          var thisFraction = false;
          var preloadPaths = [];

          experiment.stimuli.fractions.forEach(function (el) {
            if (el.key == jsPsych.timelineVariable('key')) {
              thisFraction = el;
            }
          })

          console.log(thisFraction);

          for (var i = 0; i < experiment.stimuliCounts.congruent; i ++) {
            preloadPaths.push('assets/img/stimuli-rf-sorted/' + thisFraction.congruent[i]);
          }

          for (var i = 0; i < experiment.stimuliCounts.incongruent; i ++) {
            preloadPaths.push('assets/img/stimuli-rf-sorted/' + thisFraction.incongruent[i]);
          }

          switch (experiment.detectLanguage()) {
            case 'en':
              preloadPaths.push(thisFraction.sign_en);
              break;
            case 'da':
              preloadPaths.push(thisFraction.sign_da);
              break;
            case 'sv':
              preloadPaths.push(thisFraction.sign_sv);
              break;
            default:
              break;
          }

          console.log(preloadPaths);

          return preloadPaths;
        }
      },
      {
        type: HtmlButtonResponsePlugin,
        stimulus: function() {
          let data = jsPsych.data.get().last(1).values()[0];
          let fractionIndex = data.internal_node_id.split("-")[2].split(".")[1];

          switch (experiment.detectLanguage()) {
            case 'en':
              console.log(data.internal_node_id);
              return `
                <p>Here comes waste fraction ${(fractionIndex * 1 + 1)} out of 5.</p>
                <p>You have 30 seconds from you click 'Start' below.</p>
              `;
            case 'da':
              return `
                <p>Her kommer affaldsfraktion ${(fractionIndex * 1 + 1)} ud af 5.</p>
                <p>Du har 30 sekunder fra du klikker 'Start'.</p>
              `;
            case 'sv':
              return `
                <p>Observera: Nu kommer det en ny avfallskategori.</p>
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
          experiment.timeLimit = 1000 * 60 * 0.5 // Let this fraction run for 30 seconds
        }
      },
      {
        type: TinderWastePlugin,
        fraction_img: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return jsPsych.timelineVariable('sign_en');
            case 'da':
              return jsPsych.timelineVariable('sign_da');
            case 'sv':
              return jsPsych.timelineVariable('sign_sv');
            default:
              break;
          }
        },
        css_classes: ["tinder-waste"],
        time_after_response: 200,
        label_left: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return 'Does not belong';
            case 'da':
              return 'Hører ikke til';
            case 'sv':
              return 'Tillhör inte';
            default:
              break;
          }
        },
        label_right: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return 'Belong';
            case 'da':
              return 'Hører til';
            case 'sv':
              return 'Tillhör';
            default:
              break;
          }
        },
        data: {
          question: 'fraction-belongingness',
          fraction: jsPsych.timelineVariable('key'),
        },
        timeline: experiment.stimuli.congruencymix,
        on_load: function() {
          document.querySelector('.stimulus-wrapper img').style.transform = 'scale(0)';

          setTimeout(function() {
            document.querySelector('.stimulus-wrapper img').style.transform = 'scale(1)';
          }, 15);
        },
        on_finish: function(data) {
          if (
            data.condition == 'congruent' && data.response == 'right' ||
            data.condition == 'incongruent' && data.response == 'left'
          ) {
            data.correctResponse = true;
          } else {
            data.correctResponse = false;
          }

          if (new Date().getTime() - experiment.timeLimitSetTime > experiment.timeLimit) {
            jsPsych.endCurrentTimeline();
          } else {
            console.log("Still " + (experiment.timeLimit - (new Date().getTime() - experiment.timeLimitSetTime)) + " ms left")

            let stimuliIndex = data.internal_node_id.split("-")[3].split(".")[0];
            let fractionIndex = data.internal_node_id.split("-")[3].split(".")[1];

            let progressPercentageBasedOnStimuli = ((stimuliIndex * 1 + 1) + fractionIndex * experiment.stimuli.congruencymix.length) / (experiment.stimuli.congruencymix.length * 5);
            let progressPercentageBasedOnTime = ((new Date().getTime() - experiment.timeLimitSetTime) / experiment.timeLimit) / 5 + fractionIndex / 5;
            
            // console.log("progressPercentageBasedOnTime: " + progressPercentageBasedOnTime);
            // console.log("progressPercentageBasedOnStimuli: " + progressPercentageBasedOnStimuli);

            jsPsych.setProgressBar(0.05 + Math.max(progressPercentageBasedOnStimuli, progressPercentageBasedOnTime) * 0.9);

            console.log(data);
          }
        }
      },
    ],
    timeline_variables: experiment.stimuli.fractions,
    sample: {
      type: 'custom',
      // Function to sample with weights but without replacement
      fn: function(t){
          console.log(t);
          var sample = jsPsych.randomization.sampleWithReplacement(t, 100, experiment.stimuli.fractionCounts);
          console.log(sample);
          var neworder = sample.filter((item, index) => sample.indexOf(item) === index);
          console.log(neworder);
          return neworder.slice(0, 5);
      }
    }
  });
};