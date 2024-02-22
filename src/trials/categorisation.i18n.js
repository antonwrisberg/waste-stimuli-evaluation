import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import ImageChoicePlugin from "/node_modules/@antonwrisberg/plugin-image-choice/dist";

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
                <p>Inom en kort stund kommer du att se ${experiment.categorisationCount} avfallssaker.</p>
                <p>För varje avfallssak måste du välja avfallsfraktionen som du tror att det tillhör.</p>
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
      }
    ]
  });
  experiment.timeline.push({
    timeline: [
      {
        type: ImageChoicePlugin,
        img_array: experiment.stimuli.signs.asLinks,
        img_path: "",
        prompt: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return "<p>Which of the waste fractions on the right do you believe that the waste item on the left fit into?<br /> <br />Click a waste fraction to select it.</p>";
            case 'da':
              return "<p>Hvilken af affaldsfraktionerne til højre tror du, at affaldet til venstre passer ind i?<br /> <br />Klik på en affaldsfraktion for at vælge den.</p>";
            case 'sv':
              return "<p>Vilken av avfallsfraktionerna till höger tror du att avfallssaken till vänster passar in i?<br /> <br />Klicka på en avfallsfraktion för att välja den.</p>";
            default:
              break;
          }
        },
        values: ["cardboard", "food", "glass", "hazardous", "metal", "paper", "plastics", "residual", "textile"],
        css_classes: ["choice-with-stimulus", "nine-options"],
        data: {
          question: 'fraction-belongingness',
          item: jsPsych.timelineVariable('item')
        },
        stimulus: function() {
          return "assets/img/betaset-sorted/" + jsPsych.timelineVariable('item');
        },
        time_after_response: 400
      }
    ],
    timeline_variables: experiment.stimuli.allAsItem,
    randomize_order: true,
    sample: {
      type: 'without-replacement',
      size: experiment.categorisationCount
    }
  });
};