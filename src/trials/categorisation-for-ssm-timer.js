import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import CallFunctionPlugin from '@jspsych/plugin-call-function';

// Categorisation
export default function (experiment) {
  jsPsych = experiment.jsPsych;

  // Intro
  experiment.timeline.push({
    timeline: [
      {
        type: HtmlKeyboardResponsePlugin,
        stimulus: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <h1>Part 3</h1>
                <p>Please place a finger from your right hand on the <b>j</b> key and a finger from your left hand on the <b>f</b> key.</p>
                <p>When you have placed both fingers, press <b>f</b> to continue.</p>
              `;
            case 'da':
              return `
                <h1>Del 3</h1> 
                <p>Placér en finger fra din højre hånd på <b>j</b>-tasten og en finger fra din venstre hånd på <b>f</b>-tasten.</p>
                <p>Tryk på <b>f</b> for at fortsætte, når du har placeret begge fingre.</p>
              `;
            case 'sv':
              return `
                <h1>Del 3</h1>
                <p>Placera ett finger från din högra hand på tangenten <b>j</b> och ett finger från din vänstra hand på tangenten <b>f</b>.</p>
                <p>Tryck på <b>f</b> för att fortsätta när du har placerat båda fingrarna.</p>
              `;
            default:
              break;
          }
        },
        choices: ["f"],
      },
      {
        type: HtmlKeyboardResponsePlugin,
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
                
                <p>For at begynde, tryk på <b>j</b>.</p>
              `;
            case 'sv':
              return `
                <p>Om en stund kommer du att se en bild av slumpmässiga avfall tillsammans med en slumpmässig avfallsfraktion.</p>
                <p>För varje bild av avfall ska du avgöra om du tror att den tillhör avfallsfraktionen.</p>
                
                <p>Tryck på <b>${(jIsCorrect ? 'j' : 'f')}</b>, om du tror att avfallet <b>tillhör</b> fraktionen.<br />
                Tryck på <b>${(jIsCorrect ? 'f' : 'j')}</b>, om du tror att avfallet <b>inte tillhör</b> fraktionen.</p>
                
                <p>För att börja, tryck på <b>j</b>.</p>
              `;
            default:
              break;
          }
        },
        choices: ["j"]
      }
    ]
  });

  let jIsCorrect = (Math.random() > .5);

  experiment.timeline.push({
    timeline: [
      // {
      //   type: CallFunctionPlugin,
      //   func: function() {},
      //   on_finish: function(data) {
      //     experiment.timeLimitSetTime = new Date().getTime();
      //     experiment.timeLimit = 1000*60*6/experiment.stimuli.fractions.length;
      //   }
      // },
      {
        type: HtmlKeyboardResponsePlugin,
        stimulus: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <p>Note: A new waste fraction will now appear.</p>
                <p>Press <b>f</b> to continue.</p>
              `;
            case 'da':
              return `
                <p>Bemærk: Nu kommer der en ny affaldsfraktion.</p>
                <p>>Tryk på <b>f</b> for at fortsætte.</p>
              `;
            case 'sv':
              return `
                <p>Observera: Nu kommer det en ny avfallsfraktion.</p>
                <p>Tryck på <b>f</b> för att fortsätta.</p>
              `;
            default:
              break;
          }
        },
        choices: ["f"],
        on_finish: function(data) {
          experiment.timeLimitSetTime = new Date().getTime();
          experiment.timeLimit = 1000*60*6/experiment.stimuli.fractions.length;
        }
      },
      {
        type: HtmlKeyboardResponsePlugin,
        prompt: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <p class="prompt">Press <b>${(jIsCorrect ? 'j' : 'f')}</b>, if you believe that this item <b>belongs</b> in this waste fraction.<br />
                Press <b>${(jIsCorrect ? 'f' : 'j')}</b>, if you believe that this item <b>does no belong</b> in this waste fraction.</p>
                <img class="fraction" src="${jsPsych.timelineVariable('sign_sv')}" />
              `;
            case 'da':
              return `
                <p class="prompt">Tryk på <b>${(jIsCorrect ? 'j' : 'f')}</b>, hvis du mener, at affaldet <b>hører til</b> i fraktionen.<br />
                Tryk på <b>${(jIsCorrect ? 'f' : 'j')}</b>, hvis du mener, at affaldet <b>ikke hører til</b> i fraktionen.</p>
                <img class="fraction" src="${jsPsych.timelineVariable('sign_sv')}" />  
              `;
            case 'sv':
              return `
                <p class="prompt">Tryck på <b>${(jIsCorrect ? 'j' : 'f')}</b>, om du tror att avfallet <b>tillhör</b> fraktionen.<br />
                Tryck på <b>${(jIsCorrect ? 'f' : 'j')}</b>, om du tror att avfallet <b>inte tillhör</b> fraktionen.</p>
                <img class="fraction" src="${jsPsych.timelineVariable('sign_sv')}" />
              `;
            default:
              break;
          }
        },
        css_classes: ["choice-with-stimulus", "one-option"],
        data: {
          question: 'fraction-belongingness',
          item: jsPsych.timelineVariable('item'),
          fraction: jsPsych.timelineVariable('key'),
          keyIndicatingBelongingness: (jIsCorrect ? 'j' : 'f')
        },
        choices: ["j", "f"],
        timeline: experiment.stimuli.congruencymix,
        on_finish: function(data) {
          if (new Date().getTime() - experiment.timeLimitSetTime > experiment.timeLimit) {
            jsPsych.endCurrentTimeline();
          } else {
            console.log("Still " + (experiment.timeLimit - (new Date().getTime() - experiment.timeLimitSetTime)) + " ms left")
          }
        }
      }
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
          return neworder; //.slice(0, 6);
      }
    }
  });
};