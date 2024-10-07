/**
 * @title Waste Stimuli Evaluation - categorisation
 * @description An experiment to evaluate waste items for later sorting experiments
 * @version 0.1.6
 *
 * @assets assets/img/stimuli-1.2-800x800-sorted/,assets/img/signs_se/tinified/,assets/img/logos,assets/img/screendumps/tinified/,assets/img/attention-checks/800x800se/tinified/
 */

// Import stylesheets
import "../styles/main.scss";

// Import trials
import WelcomeTrial from "./trials/welcome";
import LanguageSelectionTrial from "./trials/select-language";
import BrowserCheckTrial from "./trials/browser-check";
import FullScreenTrial from "./trials/full-screen";
import FrequencyTrial from "./trials/frequency-final";
import PrototypicalityTrial from "./trials/prototypicality-final";
import CategorisationTrial from "./trials/categorisation-final";
import backgroundQuestionsTrial from "./trials/background";

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
      experiment.requiresDesktop = false;
      experiment.stimuli = {};
      experiment.stimuli.items = {};
      experiment.stimuli.items.all = [];
      experiment.stimuli.items.inCurrentTrial = [];
      experiment.stimuli.items.inFractions = {};
      experiment.prototypicalityFreeSortCongruentCount = 10;
      experiment.prototypicalityFreeSortIncongruentCount = 6;

      experiment.addTrial = function(trialModule) {
        trialModule(this); // Automatically pass on jsPsych and timeline to modules to alter
      }

  // Populate stimuli array
  // console.log(experiment.assetPaths.images);
  
  experiment.assetPaths.images.forEach(function(val) {
    let path = val.split("/");
    if (path[2] == "stimuli-1.2-800x800-sorted") {

      if (!Array.isArray(experiment.stimuli.items.inFractions[path[3]])) {
        experiment.stimuli.items.inFractions[path[3]] = [];
      }

      experiment.stimuli.items.inFractions[path[3]].push(path[4])
      experiment.stimuli.items.all.push(path[3] + '/' + path[4])
    }
  });

  console.log(experiment.stimuli.items.inFractions);


  // Array to populate experiment (and a bit of i18n)
  experiment.stimuli.fractions = [
    {
      key: "pappersforpackningar",
      fraction_sv: "pappersförpackningar",
      fraction_en: "cardboard- and paper-based containers",
      fraction_da: "pap- og papircontainere",
      sign_sv: "assets/img/signs_se/tinified/pappers-forpackningar.png"
    },
    {
      key: "glasforpackningar_ofargade",
      fraction_sv: "ofärgade glasförpackningar",
      fraction_en: "non-coloured glass",
      fraction_da: "ufarvet glas",
      sign_sv: "assets/img/signs_se/tinified/glasforpackningar-ofargade.png",
    },
    {
      key: "metallforpackningar",
      fraction_sv: "metallförpackningar",
      fraction_en: "metal",
      fraction_da: "metal",
      sign_sv: "assets/img/signs_se/tinified/metallforpackningar.png"
    },
    {
      key: "plastforpackningar",
      fraction_sv: "plastförpackningar",
      fraction_en: "plastic",
      fraction_da: "plast",
      sign_sv: "assets/img/signs_se/tinified/plastforpackningar-alt.png" // or: "assets/img/signs_se/plastforpackningar.png" 
    },
    {
      key: "tidningar_och_andra_trycksaker",
      fraction_sv: "tidningar och andra trycksaker",
      fraction_en: "newspapers and other print materials",
      fraction_da: "aviser og andre tryksager",
      sign_sv: "assets/img/signs_se/tinified/tidningar.png"
    },
    {
      key: "farligt_avfall",
      fraction_sv: "farligt avfall",
      fraction_en: "hazardous waste",
      fraction_da: "farligt affald",
      sign_sv: "assets/img/signs_se/tinified/farligt-avfall.png"
    },
    {
      key: "restavfall",
      fraction_sv: "restavfall",
      fraction_en: "residual waste",
      fraction_da: "restaffald",
      sign_sv: "assets/img/signs_se/tinified/restavfall.png"
    },
    {
      key: "matavfall",
      fraction_sv: "matavfall",
      fraction_en: "food waste",
      fraction_da: "madaffald",
      sign_sv: "assets/img/signs_se/tinified/matavfall.png"
    }//,
    // {
    //   key: "other" // Dummy category to ensure frequency evaluation of non-target fraction stimuli
    // }
  ];

  // Populate congruent and incongruent stimuli to fraction arrays
  experiment.stimuli.fractions.forEach(function(val, i) {

    // console.log(val);
    // console.log(experiment.stimuli.items.inFractions);
    
    var congruentStimuli = [];

    if (val.key != 'other') {
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

    } else {
      const targetKeys = [];
      experiment.stimuli.fractions.forEach(function (value, j) {
        targetKeys.push(value.key);
      });

      for (const [key, value] of Object.entries(experiment.stimuli.items.inFractions)) {
        if (!targetKeys.includes(key)) {
          value.forEach(function(elem) {
            congruentStimuli.push(key + '/' + elem);
          })
        }
      }

      experiment.stimuli.fractions[i].congruent = jsPsych.randomization.shuffle(congruentStimuli);
    }
  });

  // Count images for each fraction for weighting
  experiment.stimuli.fractionCounts = [];

  experiment.stimuli.fractions.forEach(function (val) {
    experiment.stimuli.fractionCounts.push(val.congruent.length)
  })

  console.log(experiment.stimuli.fractions);
  console.log(experiment.stimuli.fractionCounts);

  experiment.stimuliCounts = {};
  experiment.stimuliCounts.congruent = Math.min(...experiment.stimuli.fractionCounts);
  experiment.stimuliCounts.incongruent = Math.min(...experiment.stimuli.fractionCounts) * 1.5;

  // Functionality to show a mixture of fraction-congruent and -incongruent stimuli
  let congruencyRecipe = jsPsych.randomization.shuffle([...Array(experiment.stimuliCounts.congruent)].fill('congruent').concat([...Array(Math.floor(experiment.stimuliCounts.incongruent))].fill('incongruent')));
  // console.debug(congruencyRecipe);
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
          return "<img src='assets/img/stimuli-1.2-800x800-sorted/" + jsPsych.timelineVariable(val)[index] + "'>";
        },
        condition: val,
        item: function() {
          return jsPsych.timelineVariable(val)[index];
        }
      }
    );
  });

  congruencymix.push(
    {
      stimulus: function() {
        if (new Date().getSeconds() % 2 == 0) {
          return "<img src='assets/img/attention-checks/800x800se/tinified/tillhör.png'>";
        } else {
          return "<img src='assets/img/attention-checks/800x800se/tinified/intetillhör.png'>";
        }
      },
      condition: function() {
        if (new Date().getSeconds() % 2 == 0) {
          return "congruent";
        } else {
          return "incongruent";
        }
      },
      item: function() {
        if (new Date().getSeconds() % 2 == 0) {
          return "attention-checks/800x800se/tinified/tillhör.png";
        } else {
          return "attention-checks/800x800se/tinified/intetillhör.png";
        }
      }
    }
  );

  experiment.stimuli.congruencymix = jsPsych.randomization.shuffle(congruencymix);

  console.log(experiment.stimuli.congruencymix);

  // Grab and save altid for PFM Research participants
  if (typeof jatos !== "undefined") {
    jsPsych.data.addProperties({
      PFM_participant_id: jatos.urlQueryParameters.altid
    });
  } else {
    jsPsych.data.addProperties({
      PFM_participant_id: jsPsych.data.getURLVariable('altid')
    });
  }

  // Select language
  experiment.addTrial(LanguageSelectionTrial);

  // Browser check 
  experiment.addTrial(BrowserCheckTrial);

  // Welcome screen
  experiment.addTrial(WelcomeTrial);

  // Switch to full screen
  experiment.addTrial(FullScreenTrial);

  // // Frequency on arrow with timer and learning trial
  // experiment.addTrial(FrequencyTrial);

  // // Prototypicality with timer and learning trial
  // experiment.addTrial(PrototypicalityTrial);
  
  // Browser-size dependent categorisation trial - use this one
  experiment.addTrial(CategorisationTrial);

  // Background questions
  experiment.addTrial(backgroundQuestionsTrial);

  // Run the experiment timeline
  await jsPsych.run(experiment.timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results
  return jsPsych;
}
