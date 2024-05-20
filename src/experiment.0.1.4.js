/**
 * @title Waste Stimuli Evaluation
 * @description An experiment to evaluate waste items for later sorting experiments
 * @version 0.1.3
 *
 * @assets assets/img/betaset.2.0_800x800/,assets/img/betaset-sorted/,assets/img/signs_se
 */

/**
 * Earlier assets: assets/img/betaset-sorted/,assets/img/signs/,assets/img/signs_se,assets/img/logos
 */

/**
 * Settings
 */

let recognitionTrialCount = 150;
let frequencyTrialCount = 30;
let prototypicalityTrialPerFractionCount = 12;
let prototypicalityFractionCount = 1;
let prototypicalityFreeSortCongruentCount = 10;
let prototypicalityFreeSortIncongruentCount = 6;
let oddOneOutTrialCount = 100;
let categorisationCount = 100;
let categorisationFractionCount = 1;
let frequencyRelativeTrialCount = 25;

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
import ImageChoicePlugin from "/node_modules/@antonwrisberg/plugin-images-choice/dist";
import HtmlChoicePlugin from "@jspsych-contrib/plugin-html-choice";
import SurveyHtmlFormPlugin from '@jspsych/plugin-survey-html-form';
import AnimationPlugin from '@jspsych/plugin-animation';
import ImageKeyboardResponsePlugin from "@jspsych/plugin-image-keyboard-response";
import FreeSortPlugin from '@jspsych/plugin-free-sort';

// Import trials
import LanguageSelectionTrial from "./trials/select-language";
import FullScreenTrial from "./trials/full-screen";
import OddOneOutTrial from "./trials/odd-one-out-trial";
import OddOneOutWithReasonTrial from "./trials/odd-one-out-with-reason";
import OddOneOutSimplifiedTrial from "./trials/odd-one-out-trial-simplified";
import RecognitionSimplifiedWithTimerTrial from "./trials/recognition-simplified-buttons-and-mobile-time-select";
import RecognitionWithTimerTrial from "./trials/recognition-buttons-and-mobile-time-select";
import RecognitionMobileFriendlyTrial from "./trials/recognition-buttons-and-mobile";
import RecognitionTrial from "./trials/recognition";
import FamiliarityTrial from "./trials/familiarity";
import FrequencyWithOptionsTrial from "./trials/frequency-options";
import FrequencyNumericInputTrial from "./trials/frequency-numeric-input";
import FrequencyNumericInputTrialNewText from "./trials/frequency-numeric-input.2";
import FrequencyNumericInputTrialNewText2 from "./trials/frequency-numeric-input.3";
import FrequencyNumericInputTrialNewText3 from "./trials/frequency-numeric-input.4";
import FrequencyDaysSinceLastExpendTrial from "./trials/frequency-since-last-disposal";
import FrequencyRelativeTrial from "./trials/frequency-relative";
import FrequencyRelativeTrialKeypress from "./trials/frequency-relative-keypress";
import FrequencyOnArrowTrial from "./trials/frequency-on-arrow";
import PrototypicalityFromOwnReferenceWithPromptAndExamplesTrial from "./trials/prototypicality-own-reference-with-prompt-and-examples";
import PrototypicalityFromOwnReferenceWithPromptTrial from "./trials/prototypicality-own-reference-with-prompt";
import PrototypicalityFromOwnReferenceTrialNewText from "./trials/prototypicality-own-reference.2";
import PrototypicalityFromWonReferenceTrial from "./trials/prototypicality-own-reference";
import prototypicalityFreeSort from "./trials/prototypicality-free-sort";
import prototypicalityFreeSortLineTrial from "./trials/prototypicality-free-sort-line";
import ExamplenessTrial from "./trials/exampleness";
import CategorisationTrial from "./trials/categorisation";
import CategorisationWithCertaintyTrial from "./trials/categorisation-with-certainty";
import CategorisationSubset from "./trials/categorisation-subset";
import CategorisationSubsetNegative from "./trials/categorisation-subset-negative";
import CategorisationWithArrowsTrial from "./trials/categorisation-arrows";
import CategorisationTrialWithIntroduction from "./trials/categorisation.i18n";
import CategorisationPreparedForSSMTrial from "./trials/categorisation-for-ssm";
import CategorisationPreparedForSSMImprovedTrial from "./trials/categorisation-for-ssm-improved";
import SignageFamiliarityTrial from "./trials/familiarity-signage";
import SignageFamiliarityWithExplanationTrial from "./trials/familiarity-signage-explanation";
import ShowcaseAllTrial from "./trials/showcase";
import CommonAndUncommonWasteItemsTrial from "./trials/common-uncommon";

import betasetTwoZero from "./stimuli/combined";

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
  experiment.frequencyRelativeTrialCount = frequencyRelativeTrialCount;
  experiment.prototypicalityFractionCount = prototypicalityFractionCount;
  experiment.oddOneOutTrialCount = oddOneOutTrialCount;
  experiment.categorisationCount = categorisationCount;
  experiment.recognitionTrialCount = recognitionTrialCount;
  experiment.categorisationFractionCount = categorisationFractionCount;
  experiment.prototypicalityFreeSortCongruentCount = prototypicalityFreeSortCongruentCount
  experiment.prototypicalityFreeSortIncongruentCount = prototypicalityFreeSortIncongruentCount

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
  experiment.timeline.push({
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
      fraction_sv: "pappersförpackningar",
      fraction_en: "cardboard",
      fraction_da: "pap",
      sign_sv: "assets/img/signs_se/pappers-forpackningar.png" // or: "assets/img/signs_se/wellpapp.png"
    },
    {
      key: "bio",
      fraction_sv: "matavfall",
      fraction_en: "food waste",
      fraction_da: "madaffald",
      sign_sv: "assets/img/signs_se/matavfall.png"
    },
    {
      key: "glass",
      fraction_sv: "glasförpackningar",
      fraction_en: "glass",
      fraction_da: "glas",
      sign_sv: "assets/img/signs_se/glasforpackningar.png",
    },
    // {
    //   key: "metal",
    //   fraction_sv: "metallförpackningar",
    //   fraction_en: "metal",
    //   fraction_da: "metal",
    //   sign_sv: "assets/img/signs_se/metallforpackningar.png" // or: "assets/img/signs_se/metall.png"
    // },
    {
      key: "paper",
      fraction_sv: "papper",
      fraction_en: "paper",
      fraction_da: "papir",
      sign_sv: "assets/img/signs_se/papper.png" // or: "assets/img/signs_se/tidningar.png"
    },
    {
      key: "plastic",
      fraction_sv: "plastförpackningar",
      fraction_en: "plastic",
      fraction_da: "plast",
      sign_sv: "assets/img/signs_se/plastforpackningar.png" // or: "assets/img/signs_se/plastforpackningar-alt.png",
    },
    {
      key: "residual",
      fraction_sv: "restavfall",
      fraction_en: "residual waste",
      fraction_da: "restaffald",
      sign_sv: "assets/img/signs_se/restavfall.png"
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

  // Betaset 2.0
  // let betasetTwoZero = [
  //   "5h5a7323-cropped_800x800.jpg",
  //   "img-7939-cropped_800x800.jpg",
  //   "5h5a7333-cropped_800x800.jpg",
  //   "img-7942-cropped_800x800.jpg",
  //   "5h5a7334-cropped_800x800.jpg",
  //   "img-7944-cropped_800x800.jpg",
  //   "5h5a7335-cropped_800x800.jpg",
  //   "img-7946-cropped_800x800.jpg",
  //   "5h5a7337-cropped_800x800.jpg",
  //   "img-7949-cropped_800x800.jpg",
  //   "5h5a7340-cropped_800x800.jpg",
  //   "img-7951-cropped_800x800.jpg",
  //   "5h5a7343-cropped_800x800.jpg",
  //   "img-7955-cropped_800x800.jpg",
  //   "5h5a7346-cropped_800x800.jpg",
  //   "img-7960-cropped_800x800.jpg",
  //   "5h5a7348-cropped_800x800.jpg",
  //   "img-7962-cropped_800x800.jpg",
  //   "5h5a7354-cropped_800x800.jpg",
  //   "img-7963-cropped_800x800.jpg",
  //   "5h5a7358-cropped_800x800.jpg",
  //   "img-7964-cropped_800x800.jpg",
  //   "5h5a7362-cropped_800x800.jpg",
  //   "img-7967-cropped_800x800.jpg",
  //   "5h5a7364-cropped_800x800.jpg",
  //   "img-7974-cropped_800x800.jpg",
  //   "5h5a7365-cropped_800x800.jpg",
  //   "img-7980-cropped_800x800.jpg",
  //   "5h5a7367-cropped_800x800.jpg",
  //   "img-7985-cropped_800x800.jpg",
  //   "5h5a7383-cropped_800x800.jpg",
  //   "img-7986-cropped_800x800.jpg",
  //   "5h5a7388-cropped_800x800.jpg",
  //   "img-7991-cropped_800x800.jpg",
  //   "5h5a7391-cropped_800x800.jpg",
  //   "img-7996-cropped_800x800.jpg",
  //   "5h5a7393-cropped_800x800.jpg",
  //   "img-7997-cropped_800x800.jpg",
  //   "5h5a7408-cropped_800x800.jpg",
  //   "img-8001-cropped_800x800.jpg",
  //   "5h5a7409-cropped_800x800.jpg",
  //   "img-8005-cropped_800x800.jpg",
  //   "5h5a7410-cropped_800x800.jpg",
  //   "img-8241-cropped_800x800.jpg",
  //   "5h5a7411-cropped_800x800.jpg",
  //   "img-8244-cropped_800x800.jpg",
  //   "5h5a7413-cropped_800x800.jpg",
  //   "img-8245-cropped_800x800.jpg",
  //   "5h5a7414-cropped_800x800.jpg",
  //   "img-8250-cropped_800x800.jpg",
  //   "5h5a7415-cropped_800x800.jpg",
  //   "img-8254-cropped_800x800.jpg",
  //   "5h5a7417-cropped_800x800.jpg",
  //   "img-8256-cropped_800x800.jpg",
  //   "5h5a7419-cropped_800x800.jpg",
  //   "img-8257-cropped_800x800.jpg",
  //   "5h5a7421-cropped_800x800.jpg",
  //   "img-8259-cropped_800x800.jpg",
  //   "5h5a7423-cropped_800x800.jpg",
  //   "img-8264-cropped_800x800.jpg",
  //   "5h5a7425-cropped_800x800.jpg",
  //   "img-8267-cropped_800x800.jpg",
  //   "5h5a7427-cropped_800x800.jpg",
  //   "img-8269-cropped_800x800.jpg",
  //   "5h5a7428-cropped_800x800.jpg",
  //   "img-8274-cropped_800x800.jpg",
  //   "5h5a7439-cropped_800x800.jpg",
  //   "img-8279-cropped_800x800.jpg",
  //   "5h5a7441-cropped_800x800.jpg",
  //   "img-8281-cropped_800x800.jpg",
  //   "5h5a7443-cropped_800x800.jpg",
  //   "img-8284-cropped_800x800.jpg",
  //   "5h5a7447-cropped_800x800.jpg",
  //   "img-8287-cropped_800x800.jpg",
  //   "5h5a7449-cropped_800x800.jpg",
  //   "img-8288-cropped_800x800.jpg",
  //   "5h5a7450-cropped_800x800.jpg",
  //   "img-8291-cropped_800x800.jpg",
  //   "5h5a7457-cropped_800x800.jpg",
  //   "img-8293-cropped_800x800.jpg",
  //   "5h5a7459-cropped_800x800.jpg",
  //   "img-8295-cropped_800x800.jpg",
  //   "5h5a7463-cropped_800x800.jpg",
  //   "img-8296-cropped_800x800.jpg",
  //   "5h5a7466-cropped_800x800.jpg",
  //   "img-8300-cropped_800x800.jpg",
  //   "5h5a7468-cropped_800x800.jpg",
  //   "img-8304-cropped_800x800.jpg",
  //   "5h5a7469-cropped_800x800.jpg",
  //   "img-8306-cropped_800x800.jpg",
  //   "5h5a7472-cropped_800x800.jpg",
  //   "img-8307-cropped_800x800.jpg",
  //   "5h5a7475-cropped_800x800.jpg",
  //   "img-8309-cropped_800x800.jpg",
  //   "5h5a7478-cropped_800x800.jpg",
  //   "img-8313-cropped_800x800.jpg",
  //   "5h5a7479-cropped_800x800.jpg",
  //   "img-8314-cropped_800x800.jpg",
  //   "5h5a7481-cropped_800x800.jpg",
  //   "img-8315-cropped_800x800.jpg",
  //   "5h5a7485-cropped_800x800.jpg",
  //   "img-8318-cropped_800x800.jpg",
  //   "5h5a7489-cropped_800x800.jpg",
  //   "img-8320-cropped_800x800.jpg",
  //   "5h5a7490-cropped_800x800.jpg",
  //   "img-8322-cropped_800x800.jpg",
  //   "5h5a7491-cropped_800x800.jpg",
  //   "img-8323-cropped_800x800.jpg",
  //   "5h5a7492-cropped_800x800.jpg",
  //   "img-8327-cropped_800x800.jpg",
  //   "5h5a7493-cropped_800x800.jpg",
  //   "img-8328-cropped_800x800.jpg",
  //   "5h5a7495-cropped_800x800.jpg",
  //   "img-8331-cropped_800x800.jpg",
  //   "5h5a7496-cropped_800x800.jpg",
  //   "img-8332-cropped_800x800.jpg",
  //   "5h5a7502-cropped_800x800.jpg",
  //   "img-8336-cropped_800x800.jpg",
  //   "5h5a7503-cropped_800x800.jpg",
  //   "img-8338-cropped_800x800.jpg",
  //   "5h5a7504-cropped_800x800.jpg",
  //   "img-8339-cropped_800x800.jpg",
  //   "5h5a7508-cropped_800x800.jpg",
  //   "img-8342-cropped_800x800.jpg",
  //   "5h5a7509-cropped_800x800.jpg",
  //   "img-8344-cropped_800x800.jpg",
  //   "5h5a7516-cropped_800x800.jpg",
  //   "img-8345-cropped_800x800.jpg",
  //   "5h5a7518-cropped_800x800.jpg",
  //   "img-8347-cropped_800x800.jpg",
  //   "5h5a7519-cropped_800x800.jpg",
  //   "img-8348-cropped_800x800.jpg",
  //   "5h5a7520-cropped_800x800.jpg",
  //   "img-8350-cropped_800x800.jpg",
  //   "5h5a7522-cropped_800x800.jpg",
  //   "img-8351-cropped_800x800.jpg",
  //   "5h5a7524-cropped_800x800.jpg",
  //   "img-8353-cropped_800x800.jpg",
  //   "5h5a7526-cropped_800x800.jpg",
  //   "img-8354-cropped_800x800.jpg",
  //   "5h5a7527-cropped_800x800.jpg",
  //   "img-8356-cropped_800x800.jpg",
  //   "5h5a7528-cropped_800x800.jpg",
  //   "img-8357-cropped_800x800.jpg",
  //   "5h5a7529-cropped_800x800.jpg",
  //   "img-8360-cropped_800x800.jpg",
  //   "5h5a7530-cropped_800x800.jpg",
  //   "img-8361-cropped_800x800.jpg",
  //   "5h5a7531-cropped_800x800.jpg",
  //   "img-8363-cropped_800x800.jpg",
  //   "5h5a7532-cropped_800x800.jpg",
  //   "img-8366-cropped_800x800.jpg",
  //   "5h5a7535-cropped_800x800.jpg",
  //   "img-8367-cropped_800x800.jpg",
  //   "5h5a7536-cropped_800x800.jpg",
  //   "img-8368-cropped_800x800.jpg",
  //   "5h5a7538-cropped_800x800.jpg",
  //   "img-8369-cropped_800x800.jpg",
  //   "5h5a7540-cropped_800x800.jpg",
  //   "img-8371-cropped_800x800.jpg",
  //   "5h5a7541-cropped_800x800.jpg",
  //   "img-8376-cropped_800x800.jpg",
  //   "5h5a7542-cropped_800x800.jpg",
  //   "img-8380-cropped_800x800.jpg",
  //   "5h5a7547-cropped_800x800.jpg",
  //   "img-8381-cropped_800x800.jpg",
  //   "5h5a7549-cropped_800x800.jpg",
  //   "img-8383-cropped_800x800.jpg",
  //   "5h5a7552-cropped_800x800.jpg",
  //   "img-8385-cropped_800x800.jpg",
  //   "5h5a7554-cropped_800x800.jpg",
  //   "img-8386-cropped_800x800.jpg",
  //   "5h5a7555-cropped_800x800.jpg",
  //   "img-8389-cropped_800x800.jpg",
  //   "5h5a7557-cropped_800x800.jpg",
  //   "img-8390-cropped_800x800.jpg",
  //   "5h5a7560-cropped_800x800.jpg",
  //   "img-8391-cropped_800x800.jpg",
  //   "5h5a7562-cropped_800x800.jpg",
  //   "img-8393-cropped_800x800.jpg",
  //   "5h5a7563-cropped_800x800.jpg",
  //   "img-8396-cropped_800x800.jpg",
  //   "5h5a7564-cropped_800x800.jpg",
  //   "img-8398-cropped_800x800.jpg",
  //   "5h5a7566-cropped_800x800.jpg",
  //   "img-8399-cropped_800x800.jpg",
  //   "5h5a7567-cropped_800x800.jpg",
  //   "img-8401-cropped_800x800.jpg",
  //   "5h5a7570-cropped_800x800.jpg",
  //   "img-8402-cropped_800x800.jpg",
  //   "5h5a7572-cropped_800x800.jpg",
  //   "img-8404-cropped_800x800.jpg",
  //   "5h5a7576-cropped_800x800.jpg",
  //   "img-8406-cropped_800x800.jpg",
  //   "5h5a7579-cropped_800x800.jpg",
  //   "img-8408-cropped_800x800.jpg",
  //   "5h5a7581-cropped_800x800.jpg",
  //   "img-8410-cropped_800x800.jpg",
  //   "5h5a7583-cropped_800x800.jpg",
  //   "img-8412-cropped_800x800.jpg",
  //   "5h5a7584-cropped_800x800.jpg",
  //   "img-8413-cropped_800x800.jpg",
  //   "5h5a7586-cropped_800x800.jpg",
  //   "img-8414-cropped_800x800.jpg",
  //   "5h5a7588-cropped_800x800.jpg",
  //   "img-8416-cropped_800x800.jpg",
  //   "5h5a7592-cropped_800x800.jpg",
  //   "img-8417-cropped_800x800.jpg",
  //   "5h5a7595-cropped_800x800.jpg",
  //   "img-8418-cropped_800x800.jpg",
  //   "5h5a7598-cropped_800x800.jpg",
  //   "img-8420-cropped_800x800.jpg",
  //   "5h5a7600-cropped_800x800.jpg",
  //   "img-8421-cropped_800x800.jpg",
  //   "5h5a7602-cropped_800x800.jpg",
  //   "img-8422-cropped_800x800.jpg",
  //   "5h5a7604-cropped_800x800.jpg",
  //   "img-8423-cropped_800x800.jpg",
  //   "5h5a7606-cropped_800x800.jpg",
  //   "img-8426-cropped_800x800.jpg",
  //   "5h5a7607-cropped_800x800.jpg",
  //   "img-8428-cropped_800x800.jpg",
  //   "5h5a7608-cropped_800x800.jpg",
  //   "img-8433-cropped_800x800.jpg",
  //   "5h5a7610-cropped_800x800.jpg",
  //   "img-8439-cropped_800x800.jpg",
  //   "5h5a7611-cropped_800x800.jpg",
  //   "img-8443-cropped_800x800.jpg",
  //   "5h5a7614-cropped_800x800.jpg",
  //   "img-8445-cropped_800x800.jpg",
  //   "5h5a7618-cropped_800x800.jpg",
  //   "img-8448-cropped_800x800.jpg",
  //   "5h5a7620-cropped_800x800.jpg",
  //   "img-8451-cropped_800x800.jpg",
  //   "5h5a7622-cropped_800x800.jpg",
  //   "img-8453-cropped_800x800.jpg",
  //   "5h5a7623-cropped_800x800.jpg",
  //   "img-8456-cropped_800x800.jpg",
  //   "5h5a7625-cropped_800x800.jpg",
  //   "img-8462-cropped_800x800.jpg",
  //   "5h5a7628-cropped_800x800.jpg",
  //   "img-8465-cropped_800x800.jpg",
  //   "5h5a7629-cropped_800x800.jpg",
  //   "img-8470-cropped_800x800.jpg",
  //   "5h5a7631-cropped_800x800.jpg",
  //   "img-8473-cropped_800x800.jpg",
  //   "5h5a7634-cropped_800x800.jpg",
  //   "img-8477-cropped_800x800.jpg",
  //   "5h5a7635-cropped_800x800.jpg",
  //   "img-8481-cropped_800x800.jpg",
  //   "5h5a7638-cropped_800x800.jpg",
  //   "img-8483-cropped_800x800.jpg",
  //   "5h5a7640-cropped_800x800.jpg",
  //   "img-8486-cropped_800x800.jpg",
  //   "5h5a7641-cropped_800x800.jpg",
  //   "img-8493-cropped_800x800.jpg",
  //   "5h5a7643-cropped_800x800.jpg",
  //   "img-8497-cropped_800x800.jpg",
  //   "5h5a7645-cropped_800x800.jpg",
  //   "img-8499-cropped_800x800.jpg",
  //   "5h5a7646-cropped_800x800.jpg",
  //   "img-8500-cropped_800x800.jpg",
  //   "5h5a7649-cropped_800x800.jpg",
  //   "img-8504-cropped_800x800.jpg",
  //   "5h5a7650-cropped_800x800.jpg",
  //   "img-8507-cropped_800x800.jpg",
  //   "5h5a7651-cropped_800x800.jpg",
  //   "img-8510-cropped_800x800.jpg",
  //   "5h5a7653-cropped_800x800.jpg",
  //   "img-8511-cropped_800x800.jpg",
  //   "5h5a7654-cropped_800x800.jpg",
  //   "img-8518-cropped_800x800.jpg",
  //   "5h5a7655-cropped_800x800.jpg",
  //   "img-8520-cropped_800x800.jpg",
  //   "5h5a7656-cropped_800x800.jpg",
  //   "img-8525-cropped_800x800.jpg",
  //   "5h5a7658-cropped_800x800.jpg",
  //   "img-8527-cropped_800x800.jpg",
  //   "5h5a7659-cropped_800x800.jpg",
  //   "img-8529-cropped_800x800.jpg",
  //   "5h5a7662-cropped_800x800.jpg",
  //   "img-8535-cropped_800x800.jpg",
  //   "5h5a7663-cropped_800x800.jpg",
  //   "img-8536-cropped_800x800.jpg",
  //   "5h5a7665-cropped_800x800.jpg",
  //   "img-8539-cropped_800x800.jpg",
  //   "5h5a7666-cropped_800x800.jpg",
  //   "img-8544-cropped_800x800.jpg",
  //   "5h5a7669-cropped_800x800.jpg",
  //   "img-8547-cropped_800x800.jpg",
  //   "5h5a7670-cropped_800x800.jpg",
  //   "img-8549-cropped_800x800.jpg",
  //   "5h5a7671-cropped_800x800.jpg",
  //   "img-8553-cropped_800x800.jpg",
  //   "5h5a7673-cropped_800x800.jpg",
  //   "img-8557-cropped_800x800.jpg",
  //   "5h5a7674-cropped_800x800.jpg",
  //   "img-8559-cropped_800x800.jpg",
  //   "5h5a7676-cropped_800x800.jpg",
  //   "img-8561-cropped_800x800.jpg",
  //   "5h5a7678-cropped_800x800.jpg",
  //   "img-8565-cropped_800x800.jpg",
  //   "5h5a7680-cropped_800x800.jpg",
  //   "img-8567-cropped_800x800.jpg",
  //   "5h5a7681-cropped_800x800.jpg",
  //   "img-8570-cropped_800x800.jpg",
  //   "5h5a7682-cropped_800x800.jpg",
  //   "img-8573-cropped_800x800.jpg",
  //   "5h5a7683-cropped_800x800.jpg",
  //   "img-8574-cropped_800x800.jpg",
  //   "5h5a7685-cropped_800x800.jpg",
  //   "img-8578-cropped_800x800.jpg",
  //   "5h5a7688-cropped_800x800.jpg",
  //   "img-8583-cropped_800x800.jpg",
  //   "5h5a7690-cropped_800x800.jpg",
  //   "img-8592-cropped_800x800.jpg",
  //   "5h5a7691-cropped_800x800.jpg",
  //   "img-8596-cropped_800x800.jpg",
  //   "5h5a7692-cropped_800x800.jpg",
  //   "img-8598-cropped_800x800.jpg",
  //   "5h5a7693-cropped_800x800.jpg",
  //   "img-8600-cropped_800x800.jpg",
  //   "5h5a7694-cropped_800x800.jpg",
  //   "img-8601-cropped_800x800.jpg",
  //   "5h5a7696-cropped_800x800.jpg",
  //   "img-8604-cropped_800x800.jpg",
  //   "5h5a7697-cropped_800x800.jpg",
  //   "img-8606-cropped_800x800.jpg",
  //   "5h5a7698-cropped_800x800.jpg",
  //   "img-8611-cropped_800x800.jpg",
  //   "5h5a7699-cropped_800x800.jpg",
  //   "img-8615-cropped_800x800.jpg",
  //   "5h5a7701-cropped_800x800.jpg",
  //   "img-8616-cropped_800x800.jpg",
  //   "5h5a7703-cropped_800x800.jpg",
  //   "img-8617-cropped_800x800.jpg",
  //   "5h5a7705-cropped_800x800.jpg",
  //   "img-8618-cropped_800x800.jpg",
  //   "5h5a7707-cropped_800x800.jpg",
  //   "img-8622-cropped_800x800.jpg",
  //   "5h5a7709-cropped_800x800.jpg",
  //   "img-8623-cropped_800x800.jpg",
  //   "5h5a7710-cropped_800x800.jpg",
  //   "img-8627-cropped_800x800.jpg",
  //   "5h5a7712-cropped_800x800.jpg",
  //   "img-8631-cropped_800x800.jpg",
  //   "5h5a7713-cropped_800x800.jpg",
  //   "img-8633-cropped_800x800.jpg",
  //   "5h5a7717-cropped_800x800.jpg",
  //   "img-8637-cropped_800x800.jpg",
  //   "5h5a7718-cropped_800x800.jpg",
  //   "img-8642-cropped_800x800.jpg",
  //   "5h5a7719-cropped_800x800.jpg",
  //   "img-8645-cropped_800x800.jpg",
  //   "5h5a7722-cropped_800x800.jpg",
  //   "img-8648-cropped_800x800.jpg",
  //   "5h5a7723-cropped_800x800.jpg",
  //   "img-8652-cropped_800x800.jpg",
  //   "5h5a7724-cropped_800x800.jpg",
  //   "img-8653-cropped_800x800.jpg",
  //   "5h5a7725-cropped_800x800.jpg",
  //   "img-8655-cropped_800x800.jpg",
  //   "5h5a7726-cropped_800x800.jpg",
  //   "img-8658-cropped_800x800.jpg",
  //   "5h5a7727-cropped_800x800.jpg",
  //   "img-8660-cropped_800x800.jpg",
  //   "5h5a7729-cropped_800x800.jpg",
  //   "img-8662-cropped_800x800.jpg",
  //   "5h5a7731-cropped_800x800.jpg",
  //   "img-8664-cropped_800x800.jpg",
  //   "5h5a7736-cropped_800x800.jpg",
  //   "img-8668-cropped_800x800.jpg",
  //   "5h5a7737-cropped_800x800.jpg",
  //   "img-8672-cropped_800x800.jpg",
  //   "5h5a7738-cropped_800x800.jpg",
  //   "img-8674-cropped_800x800.jpg",
  //   "5h5a7739-cropped_800x800.jpg",
  //   "img-8676-cropped_800x800.jpg",
  //   "5h5a7740-cropped_800x800.jpg",
  //   "img-8678-cropped_800x800.jpg",
  //   "5h5a7741-cropped_800x800.jpg",
  //   "img-8683-cropped_800x800.jpg",
  //   "5h5a7742-cropped_800x800.jpg",
  //   "img-8687-cropped_800x800.jpg",
  //   "5h5a7743-cropped_800x800.jpg",
  //   "img-8690-cropped_800x800.jpg",
  //   "5h5a7744-cropped_800x800.jpg",
  //   "img-8694-cropped_800x800.jpg",
  //   "5h5a7745-cropped_800x800.jpg",
  //   "img-8698-cropped_800x800.jpg",
  //   "5h5a7747-cropped_800x800.jpg",
  //   "img-8700-cropped_800x800.jpg",
  //   "5h5a7749-cropped_800x800.jpg",
  //   "img-8703-cropped_800x800.jpg",
  //   "5h5a7751-cropped_800x800.jpg",
  //   "img-8706-cropped_800x800.jpg",
  //   "5h5a7752-cropped_800x800.jpg",
  //   "img-8710-cropped_800x800.jpg",
  //   "5h5a7753-cropped_800x800.jpg",
  //   "img-8712-cropped_800x800.jpg",
  //   "5h5a7754-cropped_800x800.jpg",
  //   "img-8717-cropped_800x800.jpg",
  //   "5h5a7755-cropped_800x800.jpg",
  //   "img-8722-cropped_800x800.jpg",
  //   "5h5a7756-cropped_800x800.jpg",
  //   "img-8727-cropped_800x800.jpg",
  //   "5h5a7757-cropped_800x800.jpg",
  //   "img-8728-cropped_800x800.jpg",
  //   "5h5a7758-cropped_800x800.jpg",
  //   "img-8732-cropped_800x800.jpg",
  //   "5h5a7759-cropped_800x800.jpg",
  //   "img-8733-cropped_800x800.jpg",
  //   "5h5a7761-cropped_800x800.jpg",
  //   "img-8739-cropped_800x800.jpg",
  //   "5h5a7763-cropped_800x800.jpg",
  //   "img-8741-cropped_800x800.jpg",
  //   "5h5a7765-cropped_800x800.jpg",
  //   "img-8746-cropped_800x800.jpg",
  //   "5h5a7768-cropped_800x800.jpg",
  //   "img-8747-cropped_800x800.jpg",
  //   "5h5a7769-cropped_800x800.jpg",
  //   "img-8749-cropped_800x800.jpg",
  //   "5h5a7773-cropped_800x800.jpg",
  //   "img-8753-cropped_800x800.jpg",
  //   "5h5a7774-cropped_800x800.jpg",
  //   "img-8756-cropped_800x800.jpg",
  //   "5h5a7776-cropped_800x800.jpg",
  //   "img-8759-cropped_800x800.jpg",
  //   "5h5a7777-cropped_800x800.jpg",
  //   "img-8761-cropped_800x800.jpg",
  //   "5h5a7778-cropped_800x800.jpg",
  //   "img-8764-cropped_800x800.jpg",
  //   "5h5a7780-cropped_800x800.jpg",
  //   "img-8768-cropped_800x800.jpg",
  //   "5h5a7781-cropped_800x800.jpg",
  //   "img-8770-cropped_800x800.jpg",
  //   "5h5a7782-cropped_800x800.jpg",
  //   "img-8772-cropped_800x800.jpg",
  //   "5h5a7786-cropped_800x800.jpg",
  //   "img-8776-cropped_800x800.jpg",
  //   "5h5a7790-cropped_800x800.jpg",
  //   "img-8778-cropped_800x800.jpg",
  //   "5h5a7793-cropped_800x800.jpg",
  //   "img-8783-cropped_800x800.jpg",
  //   "5h5a7795-cropped_800x800.jpg",
  //   "img-8784-cropped_800x800.jpg",
  //   "5h5a7797-cropped_800x800.jpg",
  //   "img-8786-cropped_800x800.jpg",
  //   "5h5a7799-cropped_800x800.jpg",
  //   "img-8789-cropped_800x800.jpg",
  //   "5h5a7801-cropped_800x800.jpg",
  //   "img-8790-cropped_800x800.jpg",
  //   "5h5a7802-cropped_800x800.jpg",
  //   "img-8792-cropped_800x800.jpg",
  //   "img-7929-cropped_800x800.jpg",
  //   "img-8794-cropped_800x800.jpg",
  //   "img-7936-cropped_800x800.jpg",
  //   "img-8797-cropped_800x800.jpg"
  // ]

  // let betasetTwoZero = [
  //   "img-8633-cropped_800x800.jpg",
  //   "img-8616-cropped_800x800.jpg",
  //   "img-8622-cropped_800x800.jpg",
  //   "img-8561-cropped_800x800.jpg",
  //   "img-8637-cropped_800x800.jpg",
  //   "5h5a7654-cropped_800x800.jpg",
  //   "img-8761-cropped_800x800.jpg",
  //   "5h5a7754-cropped_800x800.jpg",
  //   "5h5a7755-cropped_800x800.jpg",
  //   "5h5a7415-cropped_800x800.jpg",
  //   "img-8381-cropped_800x800.jpg",
  //   "img-8418-cropped_800x800.jpg",
  //   "img-8794-cropped_800x800.jpg",
  //   "img-8507-cropped_800x800.jpg",
  //   "5h5a7650-cropped_800x800.jpg",
  //   "img-8623-cropped_800x800.jpg",
  //   "img-8598-cropped_800x800.jpg",
  //   "img-7996-cropped_800x800.jpg",
  //   "img-8600-cropped_800x800.jpg",
  //   "5h5a7795-cropped_800x800.jpg",
  //   "img-8604-cropped_800x800.jpg",
  //   "img-7985-cropped_800x800.jpg",
  //   "img-8631-cropped_800x800.jpg",
  //   "5h5a7743-cropped_800x800.jpg",
  //   "img-8601-cropped_800x800.jpg",
  //   "5h5a7538-cropped_800x800.jpg",
  //   "img-8345-cropped_800x800.jpg",
  //   "img-8668-cropped_800x800.jpg",
  //   "img-7964-cropped_800x800.jpg",
  //   "5h5a7562-cropped_800x800.jpg",
  //   "5h5a7744-cropped_800x800.jpg",
  //   "5h5a7595-cropped_800x800.jpg",
  //   "img-8728-cropped_800x800.jpg",
  //   "5h5a7439-cropped_800x800.jpg",
  //   "img-8483-cropped_800x800.jpg",
  //   "img-8698-cropped_800x800.jpg",
  //   "img-8470-cropped_800x800.jpg",
  //   "img-8386-cropped_800x800.jpg",
  //   "5h5a7490-cropped_800x800.jpg",
  //   "5h5a7669-cropped_800x800.jpg",
  //   // "5h5a7334-cropped_800x800.jpg",
  //   // "5h5a7478-cropped_800x800.jpg",
  //   // "5h5a7726-cropped_800x800.jpg",
  //   // "5h5a7531-cropped_800x800.jpg",
  //   // "img-8565-cropped_800x800.jpg",
  //   // "img-8256-cropped_800x800.jpg",
  //   // "img-8683-cropped_800x800.jpg",
  //   // "img-7974-cropped_800x800.jpg",
  //   // "img-8578-cropped_800x800.jpg",
  //   // "img-8399-cropped_800x800.jpg",
  //   // "5h5a7801-cropped_800x800.jpg",
  //   // "5h5a7696-cropped_800x800.jpg",
  //   // "5h5a7354-cropped_800x800.jpg",
  //   // "img-8465-cropped_800x800.jpg",
  //   // "img-8525-cropped_800x800.jpg",
  //   // "img-8606-cropped_800x800.jpg",
  //   // "img-8547-cropped_800x800.jpg",
  //   // "5h5a7492-cropped_800x800.jpg",
  //   // "img-8790-cropped_800x800.jpg",
  //   // "5h5a7441-cropped_800x800.jpg",
  //   // "5h5a7640-cropped_800x800.jpg",
  //   // "5h5a7691-cropped_800x800.jpg",
  //   // "5h5a7572-cropped_800x800.jpg",
  //   // "5h5a7653-cropped_800x800.jpg",
  //   // "5h5a7745-cropped_800x800.jpg",
  //   // "5h5a7564-cropped_800x800.jpg",
  //   // "5h5a7671-cropped_800x800.jpg",
  //   // "img-7944-cropped_800x800.jpg",
  //   // "img-8747-cropped_800x800.jpg",
  //   // "5h5a7683-cropped_800x800.jpg",
  //   // "img-8574-cropped_800x800.jpg",
  //   // "5h5a7540-cropped_800x800.jpg",
  //   // "5h5a7738-cropped_800x800.jpg",
  //   // "5h5a7581-cropped_800x800.jpg",
  //   // "5h5a7536-cropped_800x800.jpg",
  //   // "5h5a7362-cropped_800x800.jpg",
  //   // "img-8687-cropped_800x800.jpg",
  //   // "img-8336-cropped_800x800.jpg",
  //   // "img-8549-cropped_800x800.jpg",
  //   // "5h5a7712-cropped_800x800.jpg",
  //   // "5h5a7736-cropped_800x800.jpg",
  //   // "5h5a7666-cropped_800x800.jpg",
  //   // "img-8722-cropped_800x800.jpg",
  //   // "5h5a7759-cropped_800x800.jpg",
  //   // "5h5a7459-cropped_800x800.jpg",
  //   // "5h5a7527-cropped_800x800.jpg",
  //   // "5h5a7681-cropped_800x800.jpg",
  //   // "5h5a7643-cropped_800x800.jpg",
  //   // "5h5a7600-cropped_800x800.jpg",
  //   // "img-8797-cropped_800x800.jpg",
  //   // "5h5a7491-cropped_800x800.jpg",
  //   // "5h5a7576-cropped_800x800.jpg",
  //   // "5h5a7690-cropped_800x800.jpg",
  //   // "img-8371-cropped_800x800.jpg",
  //   // "5h5a7655-cropped_800x800.jpg",
  //   // "5h5a7584-cropped_800x800.jpg",
  //   // "5h5a7479-cropped_800x800.jpg",
  //   // "img-8784-cropped_800x800.jpg",
  //   // "5h5a7560-cropped_800x800.jpg",
  //   // "5h5a7566-cropped_800x800.jpg",
  //   // "5h5a7758-cropped_800x800.jpg",
  //   // "5h5a7606-cropped_800x800.jpg",
  //   // "5h5a7674-cropped_800x800.jpg",
  //   // "img-8451-cropped_800x800.jpg",
  //   // "5h5a7685-cropped_800x800.jpg",
  //   // "5h5a7502-cropped_800x800.jpg",
  //   // "img-7963-cropped_800x800.jpg"
  // ]

  console.log(betasetTwoZero);

  experiment.betasetTwoZero = [];
  experiment.betasetTwoZero.allAsItem = [];
  betasetTwoZero.forEach(function(val, i) {
    experiment.betasetTwoZero.allAsItem.push(
      {item: val}
    );
  });

  // console.log(experiment.betasetTwoZero.allAsItem);
  
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

  experiment.stimuli.inFractions = stimuli;
  experiment.stimuli.all = stimuliAll;
  experiment.stimuli.allAsItem = stimuliAllAsItem;

  var stimuliSet = fractions;
  stimuliSet.forEach(function(val, i) {
    stimuliSet[i].congruent = jsPsych.randomization.sampleWithoutReplacement(stimuli[val.key], prototypicalityFreeSortCongruentCount);

    var remainingStimuli = [];
    
    for (const [key, value] of Object.entries(stimuli)) {
      if (key != val.key) {
        remainingStimuli.push(value);
      }
    }
  
    stimuliSet[i].incongruent = jsPsych.randomization.sampleWithoutReplacement(remainingStimuli.flat(), prototypicalityFreeSortIncongruentCount);
  });

  experiment.stimuli.set = stimuliSet;

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

  let waste_fraction_signs_sv = [
    "assets/img/signs_se/batterier.png",
    "assets/img/signs_se/pappers-forpackningar.png",
    "assets/img/signs_se/farligt-avfall.png",
    "assets/img/signs_se/plastforpackningar-alt.png",
    "assets/img/signs_se/glasforpackningar-fargade.png",
    "assets/img/signs_se/plastforpackningar.png",
    "assets/img/signs_se/glasforpackningar-ofargade.png",
    "assets/img/signs_se/restavfall-grovavfall.png",
    "assets/img/signs_se/glasforpackningar.png",
    "assets/img/signs_se/restavfall.png",
    "assets/img/signs_se/ljuskallor.png",
    "assets/img/signs_se/smaelektronik.png",
    "assets/img/signs_se/matavfall.png",
    "assets/img/signs_se/tidningar.png",
    "assets/img/signs_se/metall.png",
    "assets/img/signs_se/tradgardsavfall.png",
    "assets/img/signs_se/metallforpackningar.png",
    "assets/img/signs_se/wellpapp.png",
    "assets/img/signs_se/papper.png"
  ];

  var waste_fraction_signs_as_items = [];
  waste_fraction_signs.forEach(function(val) {
    waste_fraction_signs_as_items.push(
      {item: val}
    );
  })

  experiment.stimuli.signs = {};
  experiment.stimuli.signs.asLinks = waste_fraction_signs;
  experiment.stimuli.signs.asItems = waste_fraction_signs_as_items;

  // Functionality to show a mixture of fraction-congruent and -incongruent stimuli
  let congruencyRecipe = [ // Note that this samples from the selection made for the prototypicality, so make sure to include enough congruent and incongruent exemplars in that one!
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
    "congruent",
    "congruent"
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

  // Select language
  experiment.addTrial(LanguageSelectionTrial);
  //LanguageSelectionTrial(jsPsych, timeline, HtmlChoicePlugin); // Necessary for running detectLanguage!!

  // Welcome screen
  // experiment.timeline.push({
  //   type: HtmlButtonResponsePlugin,
  //   stimulus: function() {
  //     switch (experiment.detectLanguage()) {
  //       case 'sv':
  //         return `
  //           <img src="assets/img/logos/Lunds_universitet_C2r_RGB.png" style="height:120px">
  //           <p>Hej och välkommen till vår undersökning av hur du tänker kring avfall och avfallsortering.</p>
  //           <p>Undersökningen består av X delar. Totalt tar den 15-20 minuter att genomföra.<br />Innan varje del kommer du att få instruktioner om vad du kommer att få se och vad du ska göra.</p>
  //           <p>Var snäll och läs instruktionerna noggrant.</p>
  //           <p>Ingen kommer att kunna titta på dina svar och veta att det var du, som  person som svarade.<br />All insamlad data kommer att hanteras enligt gällande GDPR-lagstiftning.</p>
  //           <p>Du kan när som helst välja att avsluta din medverkan genom att stänga fönstret. Då kommer ingen data att sparas!</p>
  //           <p>Undersökningen genomförs av Anton Wrisberg, doktorand vid Lunds Universitet.<br />Vid frågor kan han nås på <a href="mailto:anton.wrisberg@lucs.lu.se">anton.wrisberg@lucs.lu.se</a>.</p>
  //           <p>Tack för att du vill delta!</p>
  //         `;
  //       default:
  //         break;
  //     }
  //   },
  //   choices: function() {
  //     switch (experiment.detectLanguage()) {
  //       case 'en':
  //         return ["Start"];
  //       case 'da':
  //         return ["Start"];
  //       case 'sv':
  //         return ["Start"];
  //       default:
  //         break;
  //     }
  //   }
  // });

  // Switch to full screen
  // experiment.addTrial(FullScreenTrial);
  // FullScreenTrial(jsPsych, timeline, FullscreenPlugin, detectLanguage);

  // Frequency 0.0.9
  experiment.addTrial(FrequencyOnArrowTrial);
  
  // Frequency 0.0.8
  // experiment.addTrial(FrequencyRelativeTrialKeypress);

  // Frequency 0.0.7
  // experiment.addTrial(FrequencyRelativeTrial);

  // Frequency 0.0.6
  // experiment.addTrial(FrequencyDaysSinceLastExpendTrial);

  // Frequency 0.0.5
  // experiment.addTrial(FrequencyNumericInputTrialNewText3);

  // Frequency 0.0.4
  // experiment.addTrial(FrequencyNumericInputTrialNewText2);
  
  // Frequency 0.0.3
  // experiment.addTrial(FrequencyNumericInputTrialNewText);

  // Frequency 0.0.2
  // FrequencyNumericInputTrial(jsPsych, timeline, HtmlButtonResponsePlugin, SurveyHtmlFormPlugin, detectLanguage, frequencyTrialCount, stimuliAllAsItem);

  // Frequency 0.0.1
  // FrequencyWithOptionsTrial(jsPsych, timeline, HtmlButtonResponsePlugin, stimuliAllAsItem);

  // Prototypicality 0.0.7
  // experiment.addTrial(prototypicalityFreeSortLineTrial);

  // Prototypicality 0.0.6
  // experiment.addTrial(prototypicalityFreeSort);
  
  // Prototypicality 0.0.5
  // experiment.addTrial(PrototypicalityFromOwnReferenceWithPromptAndExamplesTrial);
  
  // Prototypicality 0.0.4
  // experiment.addTrial(PrototypicalityFromOwnReferenceWithPromptTrial);

  // Prototypicality 0.0.3
  // experiment.addTrial(PrototypicalityFromOwnReferenceTrialNewText);

  // Prototypicality 0.0.2
  // PrototypicalityFromWonReferenceTrial(jsPsych, timeline, HtmlButtonResponsePlugin, HtmlSliderResponsePlugin, detectLanguage, prototypicalityFractionCount, congruencymix, fractions);

  // Prototypicality 0.0.1
  // ExamplenessTrial(jsPsych, timeline, HtmlSliderResponsePlugin, stimuliAll, waste_fraction_signs);

  // Signage familiarity 0.0.2
  // experiment.addTrial(SignageFamiliarityWithExplanationTrial);
  
  // Signage familiarity 0.0.1
  // SignageFamiliarityTrial(jsPsych, timeline, HtmlSliderResponsePlugin, waste_fraction_signs_as_items);

  // Categorisation 0.0.8
  // experiment.addTrial(CategorisationPreparedForSSMImprovedTrial);
  
  // Categorisation 0.0.7
  // experiment.addTrial(CategorisationPreparedForSSMTrial);
  
  // Categorisation 0.0.5
  // CategorisationWithArrowsTrial(jsPsych, timeline, ImageChoicePlugin, waste_fraction_signs, stimuliAllAsItem);

  // Categorisation 0.0.4
  // CategorisationSubsetNegative(jsPsych, timeline, ImageChoicePlugin, stimuliAllAsItem, waste_fraction_signs);

  // Categorisation 0.0.3
  // CategorisationSubset(jsPsych, timeline, ImageChoicePlugin, stimuliAllAsItem, waste_fraction_signs);

  // Categorisation 0.0.2
  // CategorisationWithCertaintyTrial(jsPsych, timeline, ImageChoicePlugin, HtmlSliderResponsePlugin, waste_fraction_signs, stimuliAllAsItem);

  // Categorisation 0.0.1
  // experiment.addTrial(CategorisationTrialWithIntroduction);
  // CategorisationTrial(jsPsych, timeline, ImageChoicePlugin, waste_fraction_signs, stimuliAllAsItem);

  // Odd-one-out 0.0.3
  // experiment.addTrial(OddOneOutSimplifiedTrial);

  // Odd-one-out 0.0.2
  // OddOneOutTrial(jsPsych, timeline, HtmlButtonResponsePlugin, ImageChoicePlugin, detectLanguage, oddOneOutTrialCount, stimuliAll);

  // Odd-one-out 0.0.1
  // OddOneOutWithReasonTrial(jsPsych, timeline, ImageChoicePlugin, SurveyTextPlugin, stimuliAll, oddOneOutTrialCount);

  // Familiarity v0.0.5
  // experiment.addTrial(RecognitionSimplifiedWithTimerTrial);
  
  // Familiarity v0.0.4
  // experiment.addTrial(RecognitionWithTimerTrial);
  
  // Familiarity v0.0.3
  // experiment.addTrial(RecognitionMobileFriendlyTrial);
  
  // Familiarity v0.0.2
  // RecognitionTrial(jsPsych, timeline, HtmlButtonResponsePlugin, detectLanguage, recognitionTrialCount, stimuliAllAsItem);

  // Familarity 0.0.1
  // FamiliarityTrial(jsPsych, timeline, HtmlSliderResponsePlugin, stimuliAllAsItem);
  
  // Showcase all (0.0.1)
  // ShowcaseAllTrial(jsPsych, timeline, ImageChoicePlugin, stimuliAll);

  // Common-uncommon (0.0.1)
  // CommonAndUncommonWasteItemsTrial(jsPsych, timeline, SurveyTextPlugin, fractions);

  await jsPsych.run(experiment.timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
