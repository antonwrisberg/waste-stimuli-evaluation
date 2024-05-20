import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import ImagesKeyboardResponsePlugin from "/node_modules/@antonwrisberg/plugin-images-keyboard-response";

// Relative frequency
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
            <p>In a moment, you will see image pairs of waste.</p>
            <p>For each pair, you must select the waste item that you have most recently expended.</p>
            <p>Press the f and j keys to select the left and right image respectively.</p>
            <p>This part of the survey automatically ends after 6 minutes.<br />Then you have the option to take a break.</p>
          `;
        case 'da':
          return `
            <h1>Del 1</h1>  
            <p>Om et øjeblik vil du se billedpar af affald.</p>
            <p>For hvert par skal du vælge det stykke affald, du senest har færdigopbrugt.</p>
            <p>Tryk på f- og j-tasterne for at vælge henholdsvis venstre og højre billede.</p>
            <p>Denne del af undersøgelsen slutter automatisk efter 6 minutter.<br />Herefter har du mulighed for at holde en pause.</p>
          `;
        case 'sv':
          return `
            <h1>Del 1</h1>
            <p>Inom kort kommer du att få se bildpar på avfall.</p>
            <p>För varje par kommer vi att be dig att välja det avbildade avfall som du senast har förbrukat/använt slut på.</p>
            <p>Tryck på f- och j-tangenterna för att välja den vänstra och högra bild respektive.</p>
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



  // Odd-one-out-inspired relative frequency
  experiment.timeline.push({
    timeline: [
      {
        type: ImagesKeyboardResponsePlugin,
        img_array: function() {
          return jsPsych.randomization.sampleWithoutReplacement(experiment.stimuli.items.inFractions[jsPsych.timelineVariable('key')], 2);
        },
        img_path: function() {
          return `assets/img/stimuli-800x800-sorted/` + jsPsych.timelineVariable('key') + "/";
        },
        prompt: function() {
          console.log(jsPsych.getAllTimelineVariables());
          switch (experiment.detectLanguage()) {
            case 'en':
              return `<p class="prompt">Choose the image that depicts the waste you most recently expended.<br />Press the f and j keys to select the left and right image respectively.</p>`;
            case 'da':
              return `<p class="prompt">Vælg det billede, der afbilder det affald, du senest har færdigforbrugt.<br />Tryk på f- og j-tasterne for at vælge henholdsvis venstre og højre billede.</p>`;
            case 'sv':
              return `<p class="prompt">Välj den bild som avbildar det avfall som du senast har förbrukat/använt slut på.<br />Tryck på f- och j-tangenterna för att välja den vänstra och högra bild respektive.</p>`;
            default:
              break;
          }
        },
        choices: ["f", "j"],
        css_classes: ["select-the-imposter", "two-options"],
        data: {
          question: 'frequency-relative-keypress',
          fraction: jsPsych.timelineVariable('fraction_sv')
        },
        time_after_response: 400,
        on_finish: function(data) {
          if (new Date().getTime() - experiment.timeLimitSetTime > experiment.timeLimit) {
            jsPsych.endCurrentTimeline();
          }
          console.log(data);
        },
      }
    ],
    timeline_variables: experiment.stimuli.fractions,
    sample: {
      type: 'with-replacement',
      size: 60 * 6,
      weights: experiment.stimuli.fractionCounts
    }
  });
};