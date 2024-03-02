import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import HtmlSliderResponsePlugin from '@jspsych/plugin-html-slider-response';

// Waste signage recognition
export default function (experiment) {
  jsPsych = experiment.jsPsych;

  // Intro to signage recognition
  experiment.timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return `
            <p>In a moment, you will see 9 waste sorting category signs.</p>
            <p>For each signs, you must decide how well you could explain to someone else what should be sorted into that waste category.</p>
          `;
        case 'da':
          return `
            <p>Om et øjeblik vil du se 9 skilte med affaldssorteringskategorier.</p>
            <p>For hvert skilt skal du vurdere, hvor godt du ville kunne forklare til en anden, hvad der skal sorteres i den affaldskategori.</p>
          `;
        case 'sv':
          return `
            <p>Inom kort kommer du att få se 9 skyltar med avfallskategorier.</p>
            <p>För varje skylt kommer vi att be dig att att på en skala ange hur väl du skulle kunna förklara för någon annan vad som bör sorteras in i avfallskategorin.</p>
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
    }
  });

  // Signage familiarity 0.0.2
  experiment.timeline.push({
    timeline: [
      {
        type: HtmlSliderResponsePlugin,
        stimulus: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <div class="stimulus">
                  <p>How well could you could explain to somebody else, what goes into this category?</p>
                  <img src="${jsPsych.timelineVariable('item')}">
                </div>
              `;
            case 'da':
              return `
                <div class="stimulus">
                    <p>Hvor godt ville du kunne forklare en anden, hvad der hører til denne kategori?</p>
                    <img src="${jsPsych.timelineVariable('item')}">
                </div>
              `;
            case 'sv':
              return `
                <div class="stimulus">
                    <p>Hur bra skulle du kunna förklara för någon annan vad som ingår i denna avfallskategori?</p>
                    <img src="${jsPsych.timelineVariable('item')}">
                </div>
              `;
            default:
              break;
          }
        },     
        require_movement: true,
        labels: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return [`I could not explain it at all`, '← worse&nbsp;&nbsp;&nbsp;better →', `I could explain it perfectly`];
            case 'da':
              return ['Jeg kunne slet ikke forklare det', '← dårligere&nbsp;&nbsp;&nbsp;bedre →&nbsp;&nbsp;&nbsp;', 'Jeg kunne forklare det perfekt'];
            case 'sv':
              return ['Jag kan inte förklara det alls', '← sämre&nbsp;&nbsp;&nbsp;bättre →', 'Jag kan förklara det perfekt'];
            default:
              break;
          }
        },
        button_label: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return "Next";
            case 'da':
              return "Næste";
            case 'sv':
              return "Nästa";
            default:
              break;
          }
        },
        css_classes: "slider-with-stimulus"
      },
    ],
    timeline_variables: experiment.stimuli.signs.asItems,
    randomize_order: true
  });
};