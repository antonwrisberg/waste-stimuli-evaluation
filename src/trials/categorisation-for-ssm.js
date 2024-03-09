import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";

// Categorisation
export default function (experiment) {
  jsPsych = experiment.jsPsych;

  experiment.timeline.push({
    timeline: [
      {
        type: HtmlButtonResponsePlugin,
        stimulus: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <p>In a moment, you will see ${experiment.categorisationCount} waste items.</p>
                <p>For each item, you must select the waste fraction which you believe it belongs into.</p>
              `;
            case 'da':
              return `
                <p>Om et øjeblik vil du se ${experiment.categorisationCount} stykker affald.</p>
                <p>For hvert stykke affald skal du vælge den affaldsfraktion, som du mener, det skal sorteres i.</p>
              `;
            case 'sv':
              return `
                <p>Inom en kort stund kommer du att få se ${experiment.stimuli.congruencymix.length} olika avfall och en avfallskategori.</p>
                <p>För varje avfall kommer vi att be dig att vurdera om avfallet tillhör just den avfallskategori.</p>

                Press <b>j</b>, if you believe that the item on the right <b>belongs</b> in the fraction on the left.<br />
                Press <b>f</b>, if you believe that the item on the right <b>does no belong</b> in the fraction on the left.</p>
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
      },
      {
        type: HtmlKeyboardResponsePlugin,
        prompt: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return "<p>Which of the waste fractions on the right do you believe that the waste item on the left fit into?<br /> <br />Click a waste fraction to select it.</p>";
            case 'da':
              return "<p>Hvilken af affaldsfraktionerne til højre tror du, at affaldet til venstre passer ind i?<br /> <br />Klik på en affaldsfraktion for at vælge den.</p>";
            case 'sv':
              return `<p class="prompt">Press <b>j</b>, if you believe that the item on the right <b>belongs</b> in the fraction on the left.<br />
                Press <b>f</b>, if you believe that the item on the right <b>does no belong</b> in the fraction on the left.</p>
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
          fraction: jsPsych.timelineVariable('key')
        },
        choices: ["j", "f"],
        stimulus: function() {
          return `<img src="assets/img/betaset-sorted/${jsPsych.timelineVariable('item')}" />`;
        },
        timeline: experiment.stimuli.congruencymix
      }
    ],
    timeline_variables: experiment.stimuli.fractions,
    sample: {
      type: 'without-replacement',
      size: experiment.categorisationFractionCount
    }
  });
};