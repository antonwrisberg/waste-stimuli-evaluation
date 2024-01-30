// Common and uncommen waste items
export default function (jsPsych, timeline, SurveyTextPlugin, fractions) {
  timeline.push({
    timeline: [
      {
        type: SurveyTextPlugin,
        preamble: function(){
          return `Please think back on the items made out of <strong>${jsPsych.timelineVariable('fraction_en')}</strong> that you have recently disposed of.</p><p>Now, list three to five of them that you <strong>often</strong> dispose of.</p>`;
        },
        questions: [
          {required: true, name: "common-item1", prompt: 'Item 1:' },
          {required: true, name: "common-item2", prompt: 'Item 2:', },
          {required: true, name: "common-item3", prompt: 'Item 3:', },
          {name: "common-item4", prompt: 'Item 4:', },
          {name: "common-item5", prompt: 'Item 5:', }
        ]
      },
      {
        type: SurveyTextPlugin,
        preamble: function(){
          return `Please think back on the items made out of <strong>${jsPsych.timelineVariable('fraction_en')}</strong> that you have recently disposed of.</p><p>Now, list two to four of them that you <strong>rarely</strong> dispose of.</p>`;
        },
        questions: [
          {required: true, name: "uncommon-item1", prompt: 'Item 1:' },
          {required: true, name: "uncommon-item2", prompt: 'Item 2:', },
          {name: "uncommon-item3", prompt: 'Item 3:', },
          {name: "uncommon-item4", prompt: 'Item 4:', }
        ]
      }
    ],
    timeline_variables: fractions,
    randomize_order: true
  });
};