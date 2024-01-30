// Odd-one-out
export default function (jsPsych, timeline, HtmlButtonResponsePlugin, ImageChoicePlugin, detectLanguage, oddOneOutTrialCount, stimuliAll) {
  // Intro to odd-one-out
  timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: function() {
      switch (detectLanguage()) {
        case 'en':
          return `
            <p>In a moment, you will see ${oddOneOutTrialCount} triads (a set of three) images of waste.</p>
            <p>For each triad, you must select the waste item that differs most from the others.</p>
          `;
        case 'da':
          return `
            <p>Om et øjeblik vil du se ${oddOneOutTrialCount} triader (sæt af tre) billeder af affald.</p>
            <p>For hver triade skal du vælge det stykke affald, der adskiller sig mest fra de andre.</p>
          `;
        case 'sv':
          return `
            <p>Inom kort kommer du att se ${oddOneOutTrialCount} triader (en uppsättning tre) bilder på avfall.</p>
            <p>För varje triad måste du välja det avfallsobjekt som skiljer sig mest från de andra.</p>
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

  // Odd-one-out
  timeline.push({
    timeline: [
      {
        type: ImageChoicePlugin,
        img_array: jsPsych.timelineVariable('triad'),
        img_path: "assets/img/betaset-sorted/",
        prompt: function() {
          switch (detectLanguage()) {
            case 'en':
              return `<p>Below are three waste items.<br />Please click the one that differs the most from the two others.</p>`;
            case 'da':
              return `<p>Nedenfor er tre stykker affald.<br />Klik på det, der adskiller sig mest fra de to andre.</p>`;
            case 'sv':
              return `<p>Nedan finns tre avfallsobjekt.<br />Klicka på det som skiljer sig mest från de andra två.</p>`;
            default:
              break;
          }
        },
        css_classes: ["select-the-imposter", "three-options"],
        data: {
          question: 'odd-one-out'
        },
        time_after_response: 400
      }
    ],
    timeline_variables: [{
      triad: function() {
        return jsPsych.randomization.sampleWithoutReplacement(stimuliAll, 3);
      }
    }],
    repetitions: oddOneOutTrialCount
  });
};