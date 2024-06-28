/**
 * @title Waste Stimuli Evaluation
 * @description An experiment to evaluate waste items for later sorting experiments
 * @version rf
 *
 * @assets assets/img/logos/,assets/img/attention-checks/da_en/,assets/img/stimuli-rf-sorted/,assets/img/signs_en/,assets/img/signs_da/
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
import CategorisationSwipeRFTrial from "./trials/categorisation-swipe-rf";
import CategorisationDeviceDependentTrial from "./trials/categorisation-device-dependent";
import backgroundQuestionsTrial from "./trials/background";
import CategorisationForSortingTrial from "./trials/categorisation-for-sorting";
import PreloadPlugin from "@jspsych/plugin-preload";
import CallFunctionPlugin from "@jspsych/plugin-call-function";
import backgroundQuestionsRFTrial from "./trials/background-rf";

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
    message_progress_bar: '',
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
      experiment.stimuli.items.RFasItems = [];
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
    if (path[2] == "stimuli-rf-sorted") {

      if (!Array.isArray(experiment.stimuli.items.inFractions[path[3]])) {
        experiment.stimuli.items.inFractions[path[3]] = [];
      }

      experiment.stimuli.items.inFractions[path[3]].push(path[4]);
    }

    // if (path[2] == 'JPG_sorted_RFsubset') {
    //   experiment.stimuli.items.RFasItems.push({item: path[3]});
    // }
  });


  // Array to populate experiment (and a bit of i18n)
  experiment.stimuli.fractions = [
    {
      key: "cardboard",
      fraction_sv: "pappersförpackningar",
      fraction_en: "cardboard",
      fraction_da: "pap",
      sign_sv: "assets/img/signs_se/pappers-forpackningar.png",
      sign_da: "assets/img/signs_da/PAP_cmyk_300dpi.jpg",
      sign_en: "assets/img/signs_en/CARDBOARD_cmyk_300dpi.jpg",
    },
    {
      key: "food",
      fraction_sv: "matavfall",
      fraction_en: "food waste",
      fraction_da: "madaffald",
      sign_sv: "assets/img/signs_se/matavfall.png",
      sign_da: "assets/img/signs_da/MADAFFALD_cmyk_300dpi.jpg",
      sign_en: "assets/img/signs_en/FOOD_WASTE_cmyk_300dpi.jpg",
    },
    {
      key: "food-containers",
      fraction_sv: "mat- och dryksförpackningar",
      fraction_en: "beverage and food cartons",
      fraction_da: "mad- og drikkekartoner",
      sign_sv: "assets/img/signs_se/matavfall.png",
      sign_da: "assets/img/signs_da/MAD_DRIKKEKARTONER_cmyk_300dpi.jpg",
      sign_en: "assets/img/signs_en/BEVERAGE_FOOD_CARTONS_cmyk_300dpi.jpg",
    },
    {
      key: "glass",
      fraction_sv: "glas",
      fraction_en: "glass",
      fraction_da: "glas",
      sign_sv: "assets/img/signs/glasforpackningar-fargade.png",
      sign_da: "assets/img/signs_da/GLAS_cmyk_300dpi.jpg",
      sign_en: "assets/img/signs_en/GLASS_cmyk_300dpi.jpg",
    },
    {
      key: "hazardous",
      fraction_sv: "farligt avfall",
      fraction_en: "hazardous waste",
      fraction_da: "farligt affald",
      sign_sv: "assets/img/signs_se/farligt-avfall.png",
      sign_da: "assets/img/signs_da/FARLIGT_AFFALD_cmyk_300dpi.jpg",
      sign_en: "assets/img/signs_en/HAZARDOUS_WASTE_cmyk_300dpi.jpg",
    },
    {
      key: "metal",
      fraction_sv: "metall",
      fraction_en: "metal",
      fraction_da: "metal",
      sign_sv: "assets/img/signs_se/metallforpackningar.png",
      sign_da: "assets/img/signs_da/METAL_cmyk_300dpi.jpg",
      sign_en: "assets/img/signs_en/METAL_cmyk_300dpi.jpg",
    },
    {
      key: "paper",
      fraction_sv: "papper",
      fraction_en: "paper",
      fraction_da: "papir",
      sign_sv: "assets/img/signs_se/tidningar.png",
      sign_da: "assets/img/signs_da/PAPIR_cmyk_300dpi.jpg",
      sign_en: "assets/img/signs_en/PAPER_cmyk_300dpi.jpg",
    },
    {
      key: "plastics",
      fraction_sv: "plast",
      fraction_en: "plastics",
      fraction_da: "plast",
      sign_sv: "assets/img/signs_se/plastforpackningar-alt.png",
      sign_da: "assets/img/signs_da/PLAST_cmyk_300dpi.jpg",
      sign_en: "assets/img/signs_en/PLASTICS_cmyk_300dpi.jpg",
    },
    {
      key: "residual",
      fraction_sv: "restavfall",
      fraction_en: "residual waste",
      fraction_da: "restaffald",
      sign_sv: "assets/img/signs_se/restavfall.png",
      sign_da: "assets/img/signs_da/RESTAFFALD_cmyk_300dpi.jpg",
      sign_en: "assets/img/signs_en/RESIDUAL_WASTE_cmyk_300dpi.jpg",
    }, 
  ];

  console.log(experiment.stimuli.items.inFractions);

  // Populate congruent and incongruent stimuli to fraction arrays
  experiment.stimuli.fractions.forEach(function(val, i) {

    // console.log(val);
    // console.log(experiment.stimuli.items.inFractions);
    
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

  experiment.stimuliCounts = {};
  experiment.stimuliCounts.congruent = Math.min(...experiment.stimuli.fractionCounts);
  experiment.stimuliCounts.incongruent = Math.min(...experiment.stimuli.fractionCounts) * 2;

  // console.log(experiment.stimuli.fractions);
  // console.log(experiment.stimuli.fractionCounts);

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
          return "<img src='assets/img/stimuli-rf-sorted/" + jsPsych.timelineVariable(val)[index] + "'>";
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

  congruencymix.push(
    {
      stimulus: function() {
        if (new Date().getSeconds() % 2 == 0) {
          return "<img src='assets/img/attention-checks/da_en/belong.png'>";
        } else {
          return "<img src='assets/img/attention-checks/da_en/no_belong.png'>";
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
          return "attention-checks/da_en/belong.png";
        } else {
          return "attention-checks/da_en/no_belong.png";
        }
      }
    }
  );

  experiment.stimuli.congruencymix = congruencymix;

  // console.log(experiment.stimuli.congruencymix);

  // Grab and save altid for PFM Research participants
  // if (typeof jatos !== "undefined") {
  //   jsPsych.data.addProperties({
  //     PFM_participant_id: jatos.urlQueryParameters.altid
  //   });
  // } else {
  //   jsPsych.data.addProperties({
  //     PFM_participant_id: jsPsych.data.getURLVariable('altid')
  //   });
  // }

  // Select language
  experiment.addTrial(LanguageSelectionTrial);

  // Preload logos
  experiment.timeline.push({
    type: PreloadPlugin,
    images: function() {
      var imgSrc = [
        'assets/img/attention-checks/da_en/belong.png',
        'assets/img/attention-checks/da_en/no_belong.png'
      ]
      switch (experiment.detectLanguage()) {
        case 'en':
          imgSrc.push('assets/img/logos/LundUniversity_C2line_RGB.png');
          break;
        case 'da':
        case 'sv':
          imgSrc.push(['assets/img/logos/Lunds_universitet_C2r_RGB.png']);
          break;
        default:
          break;
      }

      return imgSrc;
    }
  });
  
  // Welcome screen
  experiment.addTrial(WelcomeTrial);

  // Tinder for waste categorisation @ RF24 (with respoinsive preloading)
  experiment.addTrial(CategorisationSwipeRFTrial);

  // Background questions @ RF24
  experiment.addTrial(backgroundQuestionsRFTrial);

  // Redirect to results page for JATOS
  experiment.timeline.push({
    type: CallFunctionPlugin,
    func: function() {
      let results = {};
      let trials = jsPsych.data.get().filter({trial_type: 'tinder-waste'}).trials;

      console.log(trials);

      trials.forEach(function (el) {
        if (results[el.fraction] === undefined) {
          results[el.fraction] = {
            correct: 0,
            wrong: 0
          };
        }

        if (el.correctResponse === true) {
          results[el.fraction].correct ++;
        } else {
          results[el.fraction].wrong ++;
        }
      });

      console.log(JSON.stringify(results));

      if (typeof jatos !== "undefined") {
        jatos.endStudyAndRedirect("https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/results.html?results=" + JSON.stringify(results) + (trials[0].lang == "da" ? '&isDanish=true' : ''));
      }

      // console.log(results);

      // results.forEach(function (el) {
      //   el.sum = el.correct + el.wrong;
      //   el.percentageCorrect = el.correct / el.sum * 100;
      // })

      // console.log(results);
    }
  });

  // Run the experiment timeline
  await jsPsych.run(experiment.timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results
  return jsPsych;
}
