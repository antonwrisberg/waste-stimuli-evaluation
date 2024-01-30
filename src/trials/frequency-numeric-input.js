// Frequency
export default function (jsPsych, timeline, HtmlButtonResponsePlugin, SurveyHtmlFormPlugin, detectLanguage, frequencyTrialCount, stimuliAllAsItem) {
  // Intro to frequency
  timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: function() {
      switch (detectLanguage()) {
        case 'en':
          return `
            <p>In a moment, you will see ${frequencyTrialCount} images of waste.</p>
            <p>For each piece of waste, you must indicate how many times you have thrown it away in the past week.</p>
          `;
        case 'da':
          return `
            <p>Om et øjeblik vil du se ${frequencyTrialCount} billeder af affald.</p>
            <p>For hvert stykke affald, skal du angive, hvor mange gange, du har smidt det ud i løbet af den seneste uge.</p>
          `;
        case 'sv':
          return `
            <p>Inom kort kommer du att se ${frequencyTrialCount} bilder på avfall.</p>
            <p>För varje avfallsstycke måste du ange hur många gånger du har kastat det bort under den senaste veckan.</p>
          `;
        default:
          break;
      }
    },
    choices: function() {
      switch (detectLanguage()) {
        case 'en':
          return ["Start"];
        case 'da':
          return ["Start"];
        case 'sv':
          return ["Start"];
        default:
          break;
      }
    }
  });

  // Frequency
  timeline.push({
    timeline: [
      {
        type: SurveyHtmlFormPlugin,
        preamble: function() {
          return `<img src="assets/img/betaset-sorted/${jsPsych.timelineVariable('item')}">`;
        },
        html: function() {
          switch (detectLanguage()) {
            case 'en':
              return '<p>In the past week, I have disposed of waste items like this <input type="number" id="resp-box" name="response" required /> times.</p>';
            case 'da':
              return '<p>I den forgangne uge har jeg bortskaffet affald som det her <input type="number" id="resp-box" name="response" required /> gange.</p>'
            case 'sv':
              return '<p>Under den senaste veckan har jag kastat bort avfallssaker som den här <input type="number" id="resp-box" name="response" required /> gånger.</p>';
            default:
              break;
          }
        },
        button_label: function() {
          switch (detectLanguage()) {
            case 'en':
              return 'Continue (⏎)';
            case 'da':
              return 'Fortsæt (⏎)'
            case 'sv':
              return 'Fortsätt (⏎)';
            default:
              break;
          }
        },
        autofocus: 'resp-box',
        css_classes: "image-with-count",
        data: {
          question: 'frequency',
          item: jsPsych.timelineVariable('item')
        },
        on_finish: function(data) {
          data.response = data.response.response;
        }
      },
    ],
    timeline_variables: stimuliAllAsItem,
    sample: {
      type: 'without-replacement',
      size: frequencyTrialCount
    },
  });
};