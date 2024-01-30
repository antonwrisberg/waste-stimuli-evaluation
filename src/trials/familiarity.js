// Familiarity
export default function (jsPsych, timeline, HtmlSliderResponsePlugin, stimuliAllAsItem) {
  timeline.push({
    timeline: [
      {
        type: HtmlSliderResponsePlugin,
        stimulus: function(){
          var html = `
          <div class="stimulus">
              <p>How familar is this type of item to you?</p>
              <img src="assets/img/betaset-sorted/${jsPsych.timelineVariable('item')}">
            </div>`;
          return html;
        },          
        require_movement: true,
        labels: ['Very unfamiliar', 'Neither familiar nor unfamiliar', 'Very familiar'],
        css_classes: "slider-with-stimulus",
        data: {
          question: 'familiarity',
          item: jsPsych.timelineVariable('item')
        }
      },
    ],
    timeline_variables: stimuliAllAsItem,
    randomize_order: true
  });
};