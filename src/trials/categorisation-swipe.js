import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import TinderWastePlugin from '/node_modules/@antonwrisberg/plugin-tinder-waste';

// Categorisation
export default function (experiment) {
  let jsPsych = experiment.jsPsych;
  let jIsCorrect = (Math.random() > .5);

  console.log("Her")
  console.log(experiment.stimuli.congruencymix);

  // Intro
  experiment.timeline.push({
    timeline: [
      {
        type: HtmlButtonResponsePlugin,
        stimulus: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <p>In a moment, you will see a images of random waste items and a random waste fraction.</p>
                <p>For each item, you must decide if you believe the item to belong in the waste fraction.</p>

                <p>Press <b>${(jIsCorrect ? 'j' : 'f')}</b>, if you believe that the item <b>belongs</b> in the fraction.<br />
                Press <b>${(jIsCorrect ? 'f' : 'j')}</b>, if you believe that the item <b>does no belong</b> in the fraction.</p>

                <p>To begin, please press <b>j</b>.</p>
              `;
            case 'da':
              return `
                <p>Om et øjeblik vil du se et billeder af tilfældige stykker affald sammen med en tilfældig affaldsfraktion.</p>
                <p>For hvert stykle affald skal du afgøre, om du tror, at det hører til i affaldsfraktionen.</p>
                
                <p>Tryk på <b>${(jIsCorrect ? 'j' : 'f')}</b>, hvis du mener, at affaldet <b>hører til</b> i fraktionen.<br />
                Tryk på <b>${(jIsCorrect ? 'f' : 'j')}</b>, hvis du mener, at affaldet <b>ikke hører til</b> i fraktionen.</p>
                
                <p>For at begynde, tryk på den tast, der angiver, at affaldet hører til i fraktionen.</p>
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
      {
        type: HtmlButtonResponsePlugin,
        stimulus: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <p>Note: A new waste fraction will now appear.</p>
              `;
            case 'da':
              return `
                <p>Bemærk: Nu kommer der en ny affaldsfraktion.</p>
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
          experiment.timeLimit = 1000 * 60 * 7/*number of minutes for this setup*/ /experiment.stimuli.fractions.length;
        }
      },
      {
        type: TinderWastePlugin,
        fraction_img: jsPsych.timelineVariable('sign_sv'),
        css_classes: ["tinder-waste"],
        time_after_response: 200,
        label_left: 'Tillhör inte',
        label_right: 'Tillhör',
        data: {
          question: 'fraction-belongingness',
          item: jsPsych.timelineVariable('item'),
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
          if (new Date().getTime() - experiment.timeLimitSetTime > experiment.timeLimit) {
            jsPsych.endCurrentTimeline();
          } else {
            console.log("Still " + (experiment.timeLimit - (new Date().getTime() - experiment.timeLimitSetTime)) + " ms left")

            let stimuliIndex = data.internal_node_id.split("-")[3].split(".")[0];
            let fractionIndex = data.internal_node_id.split("-")[3].split(".")[1];

            let progressPercentageBasedOnStimuli = ((stimuliIndex * 1 + 1) + fractionIndex * experiment.stimuli.congruencymix.length) / (experiment.stimuli.congruencymix.length * experiment.stimuli.fractions.length);
            let progressPercentageBasedOnTime = ((new Date().getTime() - experiment.timeLimitSetTime) / experiment.timeLimit) / experiment.stimuli.fractions.length + fractionIndex / experiment.stimuli.fractions.length;
            
            // console.log("progressPercentageBasedOnTime: " + progressPercentageBasedOnTime);
            // console.log("progressPercentageBasedOnStimuli: " + progressPercentageBasedOnStimuli);

            jsPsych.setProgressBar(0.05 + Math.max(progressPercentageBasedOnStimuli, progressPercentageBasedOnTime) * 0.9);
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
          return neworder //.slice(0, 6);
      }
    }
  });
};