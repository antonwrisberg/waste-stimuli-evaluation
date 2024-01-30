import HtmlChoicePlugin from "@jspsych-contrib/plugin-html-choice";

// Language selection
export default function (experiment) {
  jsPsych = experiment.jsPsych;

  experiment.timeline.push({
    type: HtmlChoicePlugin,
    html_array: [
      "<div><span>🇩🇰</span><br />Fortsæt på dansk</div>",
      "<div><span>🇸🇪</span><br />Fortsätt på svenska</div>",
      "<div><span>🏴󠁧󠁢󠁥󠁮󠁧󠁿</span><br />Continue in English</div>"
    ],
    css_classes: ["lanauge-selection"],
    on_finish: function(data) {
      if (data.response === 0) {
        jsPsych.data.addProperties({
          lang: "da"
        });
      } else if (data.response === 1) {
        jsPsych.data.addProperties({
          lang: "sv"
        });
      } else if (data.response === 2) {
        jsPsych.data.addProperties({
          lang: "en"
        });
      } else {
        jsPsych.endExperiment(
          '<p>The experiment has ended prematurely due to an error in the language selection', 
          {
            error: "Langauge selection failed"
          }
        );
      }
    },
    on_load: function() {
      console.log(jsPsych.getInitSettings().minimum_valid_rt)
    }
  });

  experiment.detectLanguage = function() {
    let detectedLanguage = this.jsPsych.data.get().trials[0].lang;
    if (["en", "sv", "da"].includes(detectedLanguage)) {
      return detectedLanguage;
    } else {
      jsPsych.endExperiment(
        '<p>The experiment has ended prematurely due to an error in detecting the selected language', 
        {
          error: "Detecting selected langauge failed"
        }
      );
    }
  }
}