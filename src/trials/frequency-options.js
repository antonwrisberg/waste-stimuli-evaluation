// Frequency with options
export default function (jsPsych, timeline, HtmlButtonResponsePlugin, stimuliAllAsItem) {
  timeline.push({
    timeline: [
      {
        type: HtmlButtonResponsePlugin,
        stimulus: function(){
          var html = `
            <div class="stimulus">
              <p>How often do you dispose of something like this (approximately)?</p>
              <img src="assets/img/betaset-sorted/${jsPsych.timelineVariable('item')}">
            </div>`;
          return html;
        },          
        choices: ['Once daily', 'Once weekly', 'Once Monthly', 'Once Yearly or less often'],
        css_classes: "buttons-with-stimulus",
        data: {
          question: 'frequency',
          item: jsPsych.timelineVariable('item')
        },
        on_finish: function(data) {
          // Save the button text on top of its index
          data.response_index = data.response;
          data.response = ['Once daily', 'Once weekly', 'Once Monthly', 'Once Yearly or less often'][data.response_index];
        }
      },
    ],
    timeline_variables: stimuliAllAsItem,
    randomize_order: true
  });
};