import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import CallFunctionPlugin from '@jspsych/plugin-call-function';

// Categorisation
export default function (experiment) {
  let jsPsych = experiment.jsPsych;
  let jIsCorrect = (Math.random() > .5);

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
                <p>When you have placed both fingers, press <b>${(jIsCorrect ? 'f' : 'j')}</b> to continue.</p>
              `;
            case 'da':
              return `
                <h1>Del 3</h1> 
                <p>Placér en finger fra din højre hånd på <b>j</b>-tasten og en finger fra din venstre hånd på <b>f</b>-tasten.</p>
                <p>Tryk på <b>${(jIsCorrect ? 'f' : 'j')}</b> for at fortsætte, når du har placeret begge fingre.</p>
              `;
            case 'sv':
              return `
                <p>Placera ett finger från din högra hand på tangenten <b>j</b> och ett finger från din vänstra hand på tangenten <b>f</b>.</p>
                <p>Tryck på <b>${(jIsCorrect ? 'f' : 'j')}</b> för att fortsätta när du har placerat båda fingrarna.</p>
              `;
            default:
              break;
          }
        },
        choices: [(jIsCorrect ? 'f' : 'j')],
        on_finish: function() {
          jsPsych.setProgressBar(0.03);

          console.log(jsPsych.finishTrial);
        }
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
                
                <p>For at begynde, tryk på den tast, der angiver, at affaldet hører til i fraktionen.</p>
              `;
            case 'sv':
              return `
                <p>På varje sida kommer du att se en bild på ett avfall tillsammans med en bild på en avfallskategori.</p>

                <p>Din uppgift kommer vara att att avgöra om den visade bilden tillhör den visade avfallskategorin eller ej.</p>
                
                <p>Tryck på <b>${(jIsCorrect ? 'j' : 'f')}</b>, om du tror att avfallet <b>tillhör</b> kategorin.<br />
                Tryck på <b>${(jIsCorrect ? 'f' : 'j')}</b>, om du tror att avfallet <b>inte tillhör</b> kategorin.</p>
                
                <p>För att börja, tryck på tangenten som anger att avfallet tillhör kategorin.</p>
              `;
            default:
              break;
          }
        },
        choices: [(jIsCorrect ? 'j' : 'f')],
        on_finish: function() {
          jsPsych.setProgressBar(0.04);
        }
      }
    ]
  });

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
                <p>Press <b>${(jIsCorrect ? 'f' : 'j')}</b> to continue.</p>
              `;
            case 'da':
              return `
                <p>Bemærk: Nu kommer der en ny affaldsfraktion.</p>
                <p>>Tryk på <b>${(jIsCorrect ? 'f' : 'j')}</b> for at fortsætte.</p>
              `;
            case 'sv':
              return `
                <p>Observera: Nu kommer det en ny avfallskategori.</p>
                <p>Tryck på <b>${(jIsCorrect ? 'f' : 'j')}</b> för att fortsätta.</p>
              `;
            default:
              break;
          }
        },
        choices: [(jIsCorrect ? 'f' : 'j')],
        on_finish: function(data) {
          experiment.timeLimitSetTime = new Date().getTime();
          experiment.timeLimit = 1000 * 60 * 7/*number of minutes for this setup*/ /experiment.stimuli.fractions.length;
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
                <p class="prompt">Tryck på <b>${(jIsCorrect ? 'j' : 'f')}</b>, om du tror att avfallet <b>tillhör</b> avfallskategorin.<br />
                Tryck på <b>${(jIsCorrect ? 'f' : 'j')}</b>, om du tror att avfallet <b>inte tillhör</b> avfallskategorin.</p>
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
            // console.log("Still " + (experiment.timeLimit - (new Date().getTime() - experiment.timeLimitSetTime)) + " ms left")

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
      {
        timeline: [{ // Atention check
          type: HtmlKeyboardResponsePlugin,
          stimulus: function() {
            switch (experiment.detectLanguage()) {
              case 'en':
                return `
                  <p>This screen is an attention check.</p>
                  <p>Please do not press <b>f</b> or <b>j</b>.<br />Instead, press the spacebar to continue.</p>
                `;
              case 'da':
                return `
                  <p>Dette skærmbillede er et opmærksomhedstjek.</p>
                  <p>Vær venlig ikke at trykke på <b>f</b> eller <b>j</b>.<br />Tryk i stedet på mellemrumstasten for at fortsætte.</p>
                `;
              case 'sv':
                return `
                  <p>Denna skärmbild är en uppmärksamhetskontroll.</p>
                  <p>Var vänlig tryck inte på <b>f</b> eller <b>j</b>.<br />Tryck istället på mellanslagstangenten för att fortsätta.</p>
                `;
              default:
                break;
            }
          },
          on_finish: function(data) {
            // Save the button text (value) in addition to its index
            if (data.response == " ") {
              data.attention_check_response = 'Successful attention check!';
            } else {
              data.attention_check_response = 'Failed attention check! This key should not have been pressed';
            }
          },
          choices: 'ALL_KEYS'
        }],
        conditional_function: function(){
          return (Math.random() > .7)
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