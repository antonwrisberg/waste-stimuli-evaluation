// Odd-one-out with reason
export default function (jsPsych, timeline, HtmlSliderResponsePlugin, waste_fraction_signs_as_items) {
  timeline.push({
    timeline: [
      {
        type: HtmlSliderResponsePlugin,
        stimulus: function(){
          return `
            <div class="stimulus">
              <p>How familar is this sign to you?</p>
              <img src="${jsPsych.timelineVariable('item')}">
            </div>
          `;
        },          
        require_movement: true,
        labels: ['Very unfamiliar', 'Neither familiar nor unfamiliar', 'Very familiar'],
        css_classes: "slider-with-stimulus"
      },
    ],
    timeline_variables: waste_fraction_signs_as_items,
    randomize_order: true
  });
};