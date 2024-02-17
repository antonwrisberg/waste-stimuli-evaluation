/**
 * @title Waste Stimuli Evaluation
 * @description An experiment to evaluate waste items for later sorting experiments
 * @version 0.1.3
 *
 * @assets assets/img/betaset-sorted/,assets/img/signs/
 */

/**
 * Settings
 */

let recognitionTrialCount = 10;
let frequencyTrialCount = 8;
let prototypicalityTrialPerFractionCount = 12;
let prototypicalityFractionCount = 1;
let oddOneOutTrialCount = 20;

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";

// Import jsPsych plugins
import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import SurveyTextPlugin from "@jspsych/plugin-survey-text";
import PreloadPlugin from "@jspsych/plugin-preload";
import HtmlSliderResponsePlugin from '@jspsych/plugin-html-slider-response';
import VideoSliderResponsePlugin from '@jspsych/plugin-video-slider-response';
import ImageChoicePlugin from "/node_modules/@antonwrisberg/plugin-image-choice/dist";
import HtmlChoicePlugin from "@jspsych-contrib/plugin-html-choice";
import SurveyHtmlFormPlugin from '@jspsych/plugin-survey-html-form';
import AnimationPlugin from '@jspsych/plugin-animation';
import ImageKeyboardResponsePlugin from "@jspsych/plugin-image-keyboard-response";

// Import trials
import LanguageSelectionTrial from "./trials/select-language";
import FullScreenTrial from "./trials/full-screen";
import OddOneOutTrial from "./trials/odd-one-out-trial";
import OddOneOutWithReasonTrial from "./trials/odd-one-out-with-reason";
import RecognitionTrial from "./trials/recognition";
import FamiliarityTrial from "./trials/familiarity";
import FrequencyNumericInputTrial from "./trials/frequency-numeric-input";
import FrequencyNumericInputTrialNewText from "./trials/frequency-numeric-input.2";
import PrototypicalityFromOwnReferenceTrialNewText from "./trials/prototypicality-own-reference.2";
import PrototypicalityFromWonReferenceTrial from "./trials/prototypicality-own-reference";
import ExamplenessTrial from "./trials/exampleness";
import CategorisationTrial from "./trials/categorisation";
import CategorisationWithCertaintyTrial from "./trials/categorisation-with-certainty";
import CategorisationSubset from "./trials/categorisation-subset";
import CategorisationSubsetNegative from "./trials/categorisation-subset-negative";
import CategorisationWithArrowsTrial from "./trials/categorisation-arrows";
import FrequencyWithOptionsTrial from "./trials/frequency-options";
import SignageFamiliarityTrial from "./trials/familiarity-signage";
import ShowcaseAllTrial from "./trials/showcase";
import CommonAndUncommonWasteItemsTrial from "./trials/common-uncommon";

import { initJsPsych } from "jspsych";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths, input = {}, environment, title, version }) {
  const jsPsych = initJsPsych({
    // show_progress_bar: true,
    // on_finish: function(){
    //   window.location = "https://app.prolific.co/submissions/complete?cc=XXXXXXX"
    // }
    minimum_valid_rt: 150 // Note: Also valid for image choice plugin
  });

  let experiment = {};
  experiment.timeline = [];
  experiment.jsPsych = jsPsych;

  experiment.plugins = {
    FullscreenPlugin: FullscreenPlugin
  }

  experiment.addTrial = function(trialModule) {
    trialModule(this);
  }

  experiment.frequencyTrialCount = frequencyTrialCount;
  experiment.prototypicalityFractionCount = prototypicalityFractionCount;

  // experiment.addTrial();

  const timeline = [];

  // jsPsych.test = function() {
  //   console.log("test1");
  //   console.log(this);
  //   // test();
  // }

  // jsPsych.test = test;

  // jsPsych.test();

  // jsPsych.addTrial = function(trialObject) {
  //   test();
  //   console.log(this);
  // }

  // jsPsych.addTrial("test");

  // console.log(this);

  // this.test = function() {
  //   console.log(this);
  // }

  // this.test();

  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images,
    audio: assetPaths.audio,
    video: assetPaths.video,
    on_success: function(data) {
      // console.log(data);
    }
  });

  // Array to populate experiment (and a bit of i18n)
  let fractions = [
    {
      key: "cardboard",
      fraction_sv: "pap",
      fraction_en: "cardboard",
      fraction_da: "pap"
    },
    {
      key: "bio",
      fraction_sv: "matavfall",
      fraction_en: "food waste",
      fraction_da: "madaffald"
    },
    {
      key: "glass",
      fraction_sv: "glas",
      fraction_en: "glass",
      fraction_da: "glas"
    },
    {
      key: "metal",
      fraction_sv: "metall",
      fraction_en: "metal",
      fraction_da: "metal"
    },
    {
      key: "paper",
      fraction_sv: "paper",
      fraction_en: "paper",
      fraction_da: "papir"
    },
    {
      key: "plastic",
      fraction_sv: "plast",
      fraction_en: "plastic",
      fraction_da: "plast"
    },
    {
      key: "residual",
      fraction_sv: "restavfall",
      fraction_en: "residual waste",
      fraction_da: "restaffald"
    },
  ]

  experiment.stimuli = {};
  experiment.stimuli.fractions = fractions;

  // Populate stimuli array
  let stimuliCounts = {
    bio: 29,
    cardboard: 26,
    foodandbeverage: 8,
    glass: 32,
    hazardous: 1,
    metal: 14,
    paper: 33,
    plastic: 79,
    residual: 24,
    textile: 1,
  };
  
  var stimuli = {};
  var stimuliAll = [];
  var stimuliAllAsItem = [];
  for (const [key, value] of Object.entries(stimuliCounts)) {
    stimuli[key] = [];

    for(var i = 0; i < value; i ++) {
      stimuli[key].push(
        key + "-" + ((i < 9) ? '0' : '') + (i + 1) + ".jpg"
      );

      stimuliAll.push(
        key + "-" + ((i < 9) ? '0' : '') + (i + 1) + ".jpg"
      );

      stimuliAllAsItem.push({
        item: key + "-" + ((i < 9) ? '0' : '') + (i + 1) + ".jpg"
      });

      // stimuli[key].push({
      //   stimulus: "assets/img/betaset-sorted/" + key + "-" + ((i < 9) ? '0' : '') + (i + 1) + ".jpg"
      // });
    }
  }

  experiment.stimuli.all = stimuliAll;
  experiment.stimuli.allAsItem = stimuliAllAsItem;

  var stimuliSet = fractions;
  stimuliSet.forEach(function(val, i) {
    stimuliSet[i].congruent = jsPsych.randomization.sampleWithoutReplacement(stimuli[val.key], 10);

    var remainingStimuli = [];
    
    for (const [key, value] of Object.entries(stimuli)) {
      if (key != val.key) {
        remainingStimuli.push(value);
      }
    }
  
    stimuliSet[i].incongruent = jsPsych.randomization.sampleWithoutReplacement(remainingStimuli.flat(), 10);
  });

  let waste_fraction_signs = [
    "assets/img/signs/CARDBOARD/CARDBOARD_rgb_72dpi.jpg",
    "assets/img/signs/FOOD_WASTE/FOOD_WASTE_rgb_72dpi.jpg",
    "assets/img/signs/GLASS/GLASS_rgb_72rgb.jpg",
    "assets/img/signs/HAZARDOUS_WASTE/HAZARDOUS_WASTE_rgb_72dpi.jpg",
    "assets/img/signs/METAL/METAL_rgb_72dpi.jpg",
    "assets/img/signs/PAPER/PAPER_rgb_72dpi.jpg",
    "assets/img/signs/PLASTICS/PLASTICS_rgb_72dpi.jpg",
    "assets/img/signs/RESIDUAL_WASTE/RESIDUAL_WASTE_rgb_72dpi.jpg",
    "assets/img/signs/TEXTILE_WASTE/TEXTILE_WASTE_rgb_72dpi.jpg",
  ];

  var waste_fraction_signs_as_items = [];
  waste_fraction_signs.forEach(function(val) {
    waste_fraction_signs_as_items.push(
      {item: val}
    );
  })

  // Functionality to show a mixture of fraction-congruent and -incongruent stimuli
  let congruencyRecipe = [
    "incongruent",
    "congruent",
    "congruent",
    "congruent",
    "incongruent",
    "congruent",
    "congruent",
    "incongruent",
    "incongruent",
    "congruent",
    "incongruent",
    "incongruent",
  ]
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
          return "<img src='assets/img/betaset-sorted/" + jsPsych.timelineVariable(val)[index] + "'>";
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

  let detectLanguage = function() {
    let detectedLanguage = jsPsych.data.get().trials[0].lang;
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

  // Select language
  experiment.addTrial(LanguageSelectionTrial);
  //LanguageSelectionTrial(jsPsych, timeline, HtmlChoicePlugin); // Necessary for running detectLanguage!!

  // Switch to full screen
  // experiment.addTrial(FullScreenTrial);
  // FullScreenTrial(jsPsych, timeline, FullscreenPlugin, detectLanguage);

  // Odd-one-out 0.0.2
  // OddOneOutTrial(jsPsych, timeline, HtmlButtonResponsePlugin, ImageChoicePlugin, detectLanguage, oddOneOutTrialCount, stimuliAll);

  // Odd-one-out 0.0.1
  // OddOneOutWithReasonTrial(jsPsych, timeline, ImageChoicePlugin, SurveyTextPlugin, stimuliAll, oddOneOutTrialCount);

  // Familiarity v0.0.2
  // RecognitionTrial(jsPsych, timeline, HtmlButtonResponsePlugin, detectLanguage, recognitionTrialCount, stimuliAllAsItem);

  // Familarity 0.0.1
  // FamiliarityTrial(jsPsych, timeline, HtmlSliderResponsePlugin, stimuliAllAsItem);

  // Frequency 0.0.3
  // experiment.addTrial(FrequencyNumericInputTrialNewText);

  // Frequency 0.0.2
  // FrequencyNumericInputTrial(jsPsych, timeline, HtmlButtonResponsePlugin, SurveyHtmlFormPlugin, detectLanguage, frequencyTrialCount, stimuliAllAsItem);

  // Frequency 0.0.1
  // FrequencyWithOptionsTrial(jsPsych, timeline, HtmlButtonResponsePlugin, stimuliAllAsItem);
  
  // Prototypicality 0.0.3
  experiment.addTrial(PrototypicalityFromOwnReferenceTrialNewText);

  // Prototypicality 0.0.2
  // PrototypicalityFromWonReferenceTrial(jsPsych, timeline, HtmlButtonResponsePlugin, HtmlSliderResponsePlugin, detectLanguage, prototypicalityFractionCount, congruencymix, fractions);

  // Prototypicality 0.0.1
  // ExamplenessTrial(jsPsych, timeline, HtmlSliderResponsePlugin, stimuliAll, waste_fraction_signs);

  // Categorisation 0.0.5
  // CategorisationWithArrowsTrial(jsPsych, timeline, ImageChoicePlugin, waste_fraction_signs, stimuliAllAsItem);

  // Categorisation 0.0.4
  // CategorisationSubsetNegative(jsPsych, timeline, ImageChoicePlugin, stimuliAllAsItem, waste_fraction_signs);

  // Categorisation 0.0.3
  // CategorisationSubset(jsPsych, timeline, ImageChoicePlugin, stimuliAllAsItem, waste_fraction_signs);

  // Categorisation 0.0.2
  // CategorisationWithCertaintyTrial(jsPsych, timeline, ImageChoicePlugin, HtmlSliderResponsePlugin, waste_fraction_signs, stimuliAllAsItem);

  // Categorisation 0.0.1
  // CategorisationTrial(jsPsych, timeline, ImageChoicePlugin, waste_fraction_signs, stimuliAllAsItem);

  // Signage familiarity 0.0.1
  // SignageFamiliarityTrial(jsPsych, timeline, HtmlSliderResponsePlugin, waste_fraction_signs_as_items);
  
  // Showcase all (0.0.1)
  // ShowcaseAllTrial(jsPsych, timeline, ImageChoicePlugin, stimuliAll);

  // Common-uncommon (0.0.1)
  // CommonAndUncommonWasteItemsTrial(jsPsych, timeline, SurveyTextPlugin, fractions);

  await jsPsych.run(experiment.timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
