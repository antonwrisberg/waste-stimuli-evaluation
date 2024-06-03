/**
 * @title Waste Stimuli Evaluation
 * @description An experiment to evaluate waste items for later sorting experiments
 * @version 0.1.5
 *
 * @assets assets/img/stimuli-800x800-sorted/,assets/img/signs_se,assets/img/logos/,assets/img/screendumps/
 */

/**
 * Earlier assets: assets/img/betaset-sorted/,assets/img/signs/,assets/img/signs_se,assets/img/logos
 */

// Import stylesheets
import "../styles/main.scss";

// Import trials
import PreLoadTrial from "./trials/preload";
import WelcomeTrial from "./trials/welcome";
import LanguageSelectionTrial from "./trials/select-language";
import BrowserCheckTrial from "./trials/browser-check";
import FullScreenTrial from "./trials/full-screen";
import BreakTrial from "./trials/break";
import AttentionCheckButtonTrial from "./trials/attention-check-button";
import AttentionCheckKeypressTrial from "./trials/attention-check-keypress";
import FrequencyRelativeKeypressTimerTrial from "./trials/frequency-relative-keypress-timer";
import FrequencyOnArrowTrial from "./trials/frequency-on-arrow";
import PrototypicalityLineSortTimerTrial from "./trials/prototypicality-free-sort-line-timer";
import CategorisationForSsmTimerTrial from "./trials/categorisation-for-ssm-timer";
import CategorisationSwipeTrial from "./trials/categorisation-swipe";
import backgroundQuestionsTrial from "./trials/background";

// Import stimuli
import betasetTwoZero from "./stimuli/combined";

// Import JsPsych
import { initJsPsych } from "jspsych";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths, input = {}, environment, title, version }) {
  const jsPsych = initJsPsych({
    minimum_valid_rt: 150, // Note: Also valid for image choice plugin
    show_progress_bar: true,
    auto_update_progress_bar: false,
    message_progress_bar: 'Framsteg',
    on_trial_finish: function(data) {
      // jsPsych.setProgressBar(data.time_elapsed / (6 * 60 * 1000));
      // console.log(data)
    }
  });

  // Set up internal experiment variable to link timeline across trial modules
  let experiment = {};
      experiment.jsPsych = jsPsych;
      experiment.assetPaths = assetPaths;
      experiment.timeline = [];
      experiment.stimuli = {};
      experiment.stimuli.items = {};
      experiment.stimuli.items.all = [];
      experiment.stimuli.items.inFractions = {};
      experiment.prototypicalityFreeSortCongruentCount = 10;
      experiment.prototypicalityFreeSortIncongruentCount = 6;

      experiment.addTrial = function(trialModule) {
        trialModule(this); // Automatically pass on jsPsych and timeline to modules to alter
      }

  // Populate stimuli array
  console.log(experiment.assetPaths.images);
  
  experiment.assetPaths.images.forEach(function(val) {
    let path = val.split("/");
    if (path[2] == "stimuli-800x800-sorted") {

      if (!Array.isArray(experiment.stimuli.items.inFractions[path[3]])) {
        experiment.stimuli.items.inFractions[path[3]] = [];
      }

      experiment.stimuli.items.inFractions[path[3]].push(path[4]);
    }
  });

  // Array to populate experiment (and a bit of i18n)
  experiment.stimuli.fractions = [
    {
      key: "pappersforpackningar",
      fraction_sv: "pappersförpackningar",
      fraction_en: "cardboard- and paper-based containers",
      fraction_da: "pap- og papircontainere",
      sign_sv: "assets/img/signs_se/pappers-forpackningar.png"
    },
    {
      key: "glasforpackningar_fargede",
      fraction_sv: "färgade glasförpackningar",
      fraction_en: "coloured glass",
      fraction_da: "farvet glas",
      sign_sv: "assets/img/signs_se/glasforpackningar-fargade.png",
    },
    {
      key: "glasforpackningar_ofargede",
      fraction_sv: "ofärgade glasförpackningar",
      fraction_en: "non-coloured glass",
      fraction_da: "ufarvet glas",
      sign_sv: "assets/img/signs_se/glasforpackningar-ofargade.png",
    },
    {
      key: "metallforpackningar",
      fraction_sv: "metallförpackningar",
      fraction_en: "metal",
      fraction_da: "metal",
      sign_sv: "assets/img/signs_se/metallforpackningar.png"
    },
    {
      key: "plastforpackningar",
      fraction_sv: "plastförpackningar",
      fraction_en: "plastic",
      fraction_da: "plast",
      sign_sv: "assets/img/signs_se/plastforpackningar-alt.png" // or: "assets/img/signs_se/plastforpackningar.png" 
    },
    {
      key: "tidningar_och_andra_trycksaker",
      fraction_sv: "tidningar och andra trycksaker",
      fraction_en: "newspapers and other print materials",
      fraction_da: "aviser og andre tryksager",
      sign_sv: "assets/img/signs_se/tidningar.png"
    },
    {
      key: "farligt_avfall",
      fraction_sv: "farligt avfall",
      fraction_en: "hazardous waste",
      fraction_da: "farligt affald",
      sign_sv: "assets/img/signs_se/farligt-avfall.png"
    },
    {
      key: "restavfall",
      fraction_sv: "restavfall",
      fraction_en: "residual waste",
      fraction_da: "restaffald",
      sign_sv: "assets/img/signs_se/restavfall.png"
    },
    // { PANT DOES NOT HAVE A FRACTION AND A PICTOGRAM
    //   key: "pant",
    //   fraction_sv: "pant",
    //   fraction_en: "refund",
    //   fraction_da: "pant",
    //   sign_sv: "assets/img/signs_se/pant.png"
    // },
    {
      key: "matavfall",
      fraction_sv: "matavfall",
      fraction_en: "food waste",
      fraction_da: "madaffald",
      sign_sv: "assets/img/signs_se/matavfall.png"
    }    
  ];

  // Populate congruent and incongruent stimuli to fraction arrays
  experiment.stimuli.fractions.forEach(function(val, i) {

    console.log(val);
    console.log(experiment.stimuli.items.inFractions);
    
    var congruentStimuli = [];
    
    experiment.stimuli.items.inFractions[val.key].forEach(function (elem) {
      congruentStimuli.push(val.key + '/' + elem);
    })

    experiment.stimuli.fractions[i].congruent = jsPsych.randomization.shuffle(congruentStimuli);

    var remainingStimuli = [];
    
    for (const [key, value] of Object.entries(experiment.stimuli.items.inFractions)) {
      if (key != val.key) {
        value.forEach(function(elem) {
          remainingStimuli.push(key + '/' + elem);
        })
      }
    }
  
    experiment.stimuli.fractions[i].incongruent = jsPsych.randomization.shuffle(remainingStimuli.flat());
  });

  // Count images for each fraction for weighting
  experiment.stimuli.fractionCounts = [];

  experiment.stimuli.fractions.forEach(function (val) {
    experiment.stimuli.fractionCounts.push(experiment.stimuli.items.inFractions[val.key].length)
  })

  console.log(experiment.stimuli.fractions);
  console.log(experiment.stimuli.fractionCounts);

  // Functionality to show a mixture of fraction-congruent and -incongruent stimuli
  let congruencyRecipe = jsPsych.randomization.shuffle([...Array(Math.min(...experiment.stimuli.fractionCounts))].fill('congruent').concat([...Array(Math.floor(Math.min(...experiment.stimuli.fractionCounts) * 1.5))].fill('incongruent')));
  console.debug(congruencyRecipe);
  var congruencymix = [];
  var congruentCount = -1;
  var incongruentCount = -1;
  congruencyRecipe.forEach(function(val) {
    if (val == "congruent") {
      congruentCount ++;
      var index = congruentCount;
    } else if (val == "incongruent") {
      incongruentCount ++;
      var index = incongruentCount;
    } else {
      return; // The correspondent of a "continue" statement in a regular loop
    }

    congruencymix.push(
      {
        stimulus: function() {
          return "<img src='assets/img/stimuli-800x800-sorted/" + jsPsych.timelineVariable(val)[index] + "'>";
        },
        data: {
          condition: val,
          item: function() {
            return jsPsych.timelineVariable(val)[index];
          }
        }
      }
    );
  });

  experiment.stimuli.congruencymix = congruencymix;

  // Grab and save altid for PFM Research participants
  jsPsych.data.addProperties({
    PFM_participant_id: jsPsych.data.getURLVariable('altid')
  });
  }

  // Preload assets
  experiment.addTrial(PreLoadTrial);

  // Select language
  experiment.addTrial(LanguageSelectionTrial);

  // Browser check 

  // // Welcome screen
  // experiment.addTrial(WelcomeTrial);

  // // Attention check button
  // experiment.addTrial(AttentionCheckButtonTrial);

  // // Switch to full screen
  // experiment.addTrial(FullScreenTrial);

  // // Frequency on arrow
  // experiment.addTrial(FrequencyOnArrowTrial);

  // // Break screen
  // experiment.addTrial(BreakTrial);

  // // Attention check button
  // experiment.addTrial(AttentionCheckButtonTrial);

  // // Prototypicality with timer
  // experiment.addTrial(PrototypicalityLineSortTimerTrial);

  // // Attention check button
  // experiment.addTrial(AttentionCheckButtonTrial);

  // // Break screen
  // experiment.addTrial(BreakTrial);

  // // Categorisation with timer
  // experiment.addTrial(CategorisationForSsmTimerTrial);

  // Tinder for waste categorisation
  experiment.addTrial(CategorisationSwipeTrial);

  // Attention check keypress
  // experiment.addTrial(AttentionCheckKeypressTrial);

  // // Background questions
  // experiment.addTrial(backgroundQuestionsTrial);

  // Run the experiment timeline
  await jsPsych.run(experiment.timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results
  return jsPsych;
}
