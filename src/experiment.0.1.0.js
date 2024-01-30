/**
 * @title Waste Stimuli Evaluation
 * @description An experiment to evaluate waste items for later sorting experiments
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";

import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import SurveyTextPlugin from "@jspsych/plugin-survey-text";
import PreloadPlugin from "@jspsych/plugin-preload";
import HtmlSliderResponsePlugin from '@jspsych/plugin-html-slider-response';
import ImageChoicePlugin from "/node_modules/@antonwrisberg/plugin-image-choice/dist";
import AnimationPlugin from '@jspsych/plugin-animation';
import ImageKeyboardResponsePlugin from "@jspsych/plugin-image-keyboard-response";
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
  });

  const timeline = [];

  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images,
    audio: assetPaths.audio,
    video: assetPaths.video,
    on_success: function(data) {
      console.log(data);
    }
  });

  // let stimuli = [
  //   {stimulus: "assets/img/items/alkaline-battery.jpg"},
  //   {stimulus: "assets/img/items/apple-core.jpg"},
  //   {stimulus: "assets/img/items/banana-peel.jpg"},
  //   {stimulus: "assets/img/items/jam-jar.jpg"},
  // ];

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

  var waste_fraction_signs_as_stimulus = [];
  for(var i = 0; i < waste_fraction_signs.length; i ++) {
    waste_fraction_signs_as_stimulus.push({sign: waste_fraction_signs[i]});
  }

  console.log(waste_fraction_signs_as_stimulus);

  let waste_fraction_signs_black = [
    "assets/img/signs/CARDBOARD/CARDBOARD_rgb_72dpi_black.jpg",
    "assets/img/signs/FOOD_WASTE/FOOD_WASTE_rgb_72dpi_black.jpg",
    "assets/img/signs/GLASS/GLASS_rgb_72dpi_black.jpg",
    "assets/img/signs/HAZARDOUS_WASTE/HAZARDOUS_WASTE_rgb_72dpi_black.jpg",
    "assets/img/signs/METAL/METAL_rgb_72dpi_black.jpg",
    "assets/img/signs/PAPER/PAPER_rgb_72dpi_black.jpg",
    "assets/img/signs/PLASTICS/PLASTICS_rgb_72dpi_black.jpg",
    "assets/img/signs/RESIDUAL_WASTE/RESIDUAL_WASTE_rgb_72dpi.jpg",
    "assets/img/signs/TEXTILE_WASTE/TEXTILE_WASTE_rgb_72dpi_black.jpg",
  ];

  let stimuli = [
    "assets/img/items/alkaline-battery.jpg",
    "assets/img/items/apple-core.jpg",
    "assets/img/items/banana-peel.jpg",
    "assets/img/items/jam-jar.jpg",
  ];

  let newStimuli = [
    "5H5A7323_Cropped.jpg",
    "5H5A7447_Cropped.jpg",
    "5H5A7529_Cropped.jpg",
    "5H5A7604_Cropped.jpg",
    "5H5A7669_Cropped.jpg",
    "5H5A7725_Cropped.jpg",
    "5H5A7780_Cropped.jpg",
    "5H5A7333_Cropped.jpg",
    "5H5A7449_Cropped.jpg",
    "5H5A7530_Cropped.jpg",
    "5H5A7606_Cropped.jpg",
    "5H5A7670_Cropped.jpg",
    "5H5A7726_Cropped.jpg",
    "5H5A7781_Cropped.jpg",
    "5H5A7334_Cropped.jpg",
    "5H5A7450_Cropped.jpg",
    "5H5A7531_Cropped.jpg",
    "5H5A7607_Cropped.jpg",
    "5H5A7671_Cropped.jpg",
    "5H5A7727_Cropped.jpg",
    "5H5A7782_Cropped.jpg",
    "5H5A7335_Cropped.jpg",
    "5H5A7457_Cropped.jpg",
    "5H5A7532_Cropped.jpg",
    "5H5A7608_Cropped.jpg",
    "5H5A7673_Cropped.jpg",
    "5H5A7729_Cropped.jpg",
    "5H5A7786_Cropped.jpg",
    "5H5A7337_Cropped.jpg",
    "5H5A7459_Cropped.jpg",
    "5H5A7535_Cropped.jpg",
    "5H5A7610_Cropped.jpg",
    "5H5A7674_Cropped.jpg",
    "5H5A7731_Cropped.jpg",
    "5H5A7790_Cropped.jpg",
    "5H5A7340_Cropped.jpg",
    "5H5A7463_Cropped.jpg",
    "5H5A7536_Cropped.jpg",
    "5H5A7611_Cropped.jpg",
    "5H5A7676_Cropped.jpg",
    "5H5A7736_Cropped.jpg",
    "5H5A7793_Cropped.jpg",
    "5H5A7343_Cropped.jpg",
    "5H5A7466_Cropped.jpg",
    "5H5A7538_Cropped.jpg",
    "5H5A7614_Cropped.jpg",
    "5H5A7678_Cropped.jpg",
    "5H5A7737_Cropped.jpg",
    "5H5A7795_Cropped.jpg",
    "5H5A7346_Cropped.jpg",
    "5H5A7468_Cropped.jpg",
    "5H5A7540_Cropped.jpg",
    "5H5A7618_Cropped.jpg",
    "5H5A7680_Cropped.jpg",
    "5H5A7738_Cropped.jpg",
    "5H5A7797_Cropped.jpg",
    "5H5A7348_Cropped.jpg",
    "5H5A7469_Cropped.jpg",
    "5H5A7541_Cropped.jpg",
    "5H5A7620_Cropped.jpg",
    "5H5A7681_Cropped.jpg",
    "5H5A7739_Cropped.jpg",
    "5H5A7799_Cropped.jpg",
    "5H5A7354_Cropped.jpg",
    "5H5A7472_Cropped.jpg",
    "5H5A7542_Cropped.jpg",
    "5H5A7622_Cropped.jpg",
    "5H5A7682_Cropped.jpg",
    "5H5A7740_Cropped.jpg",
    "5H5A7801_Cropped.jpg",
    "5H5A7358_Cropped.jpg",
    "5H5A7475_Cropped.jpg",
    "5H5A7547_Cropped.jpg",
    "5H5A7623_Cropped.jpg",
    "5H5A7683_Cropped.jpg",
    "5H5A7741_Cropped.jpg",
    "5H5A7802_Cropped.jpg",
    "5H5A7362_Cropped.jpg",
    "5H5A7478_Cropped.jpg",
    "5H5A7549_Cropped.jpg",
    "5H5A7625_Cropped.jpg",
    "5H5A7685_Cropped.jpg",
    "5H5A7742_Cropped.jpg",
    "IMG_7929_Cropped.jpg",
    "5H5A7364_Cropped.jpg",
    "5H5A7479_Cropped.jpg",
    "5H5A7552_Cropped.jpg",
    "5H5A7628_Cropped.jpg",
    "5H5A7688_Cropped.jpg",
    "5H5A7743_Cropped.jpg",
    "IMG_7936_Cropped.jpg",
    "5H5A7365_Cropped.jpg",
    "5H5A7481_Cropped.jpg",
    "5H5A7554_Cropped.jpg",
    "5H5A7629_Cropped.jpg",
    "5H5A7690_Cropped.jpg",
    "5H5A7744_Cropped.jpg",
    "IMG_7939_Cropped.jpg",
    "5H5A7367_Cropped.jpg",
    "5H5A7485_Cropped.jpg",
    "5H5A7555_Cropped.jpg",
    "5H5A7631_Cropped.jpg",
    "5H5A7691_Cropped.jpg",
    "5H5A7745_Cropped.jpg",
    "IMG_7942_Cropped.jpg",
    "5H5A7383_Cropped.jpg",
    "5H5A7489_Cropped.jpg",
    "5H5A7557_Cropped.jpg",
    "5H5A7634_Cropped.jpg",
    "5H5A7692_Cropped.jpg",
    "5H5A7747_Cropped.jpg",
    "IMG_7944_Cropped.jpg",
    "5H5A7388_Cropped.jpg",
    "5H5A7490_Cropped.jpg",
    "5H5A7560_Cropped.jpg",
    "5H5A7635_Cropped.jpg",
    "5H5A7693_Cropped.jpg",
    "5H5A7749_Cropped.jpg",
    "IMG_7946_Cropped.jpg",
    "5H5A7391_Cropped.jpg",
    "5H5A7491_Cropped.jpg",
    "5H5A7562_Cropped.jpg",
    "5H5A7638_Cropped.jpg",
    "5H5A7694_Cropped.jpg",
    "5H5A7751_Cropped.jpg",
    "IMG_7949_Cropped.jpg",
    "5H5A7393_Cropped.jpg",
    "5H5A7492_Cropped.jpg",
    "5H5A7563_Cropped.jpg",
    "5H5A7640_Cropped.jpg",
    "5H5A7696_Cropped.jpg",
    "5H5A7752_Cropped.jpg",
    "IMG_7951_Cropped.jpg",
    "5H5A7408_Cropped.jpg",
    "5H5A7493_Cropped.jpg",
    "5H5A7564_Cropped.jpg",
    "5H5A7641_Cropped.jpg",
    "5H5A7697_Cropped.jpg",
    "5H5A7753_Cropped.jpg",
    "IMG_7955_Cropped.jpg",
    "5H5A7409_Cropped.jpg",
    "5H5A7495_Cropped.jpg",
    "5H5A7566_Cropped.jpg",
    "5H5A7643_Cropped.jpg",
    "5H5A7698_Cropped.jpg",
    "5H5A7754_Cropped.jpg",
    "IMG_7960_Cropped.jpg",
    "5H5A7410_Cropped.jpg",
    "5H5A7496_Cropped.jpg",
    "5H5A7567_Cropped.jpg",
    "5H5A7645_Cropped.jpg",
    "5H5A7699_Cropped.jpg",
    "5H5A7755_Cropped.jpg",
    "IMG_7962_Cropped.jpg",
    "5H5A7411_Cropped.jpg",
    "5H5A7502_Cropped.jpg",
    "5H5A7570_Cropped.jpg",
    "5H5A7646_Cropped.jpg",
    "5H5A7701_Cropped.jpg",
    "5H5A7756_Cropped.jpg",
    "IMG_7963_Cropped.jpg",
    "5H5A7413_Cropped.jpg",
    "5H5A7503_Cropped.jpg",
    "5H5A7572_Cropped.jpg",
    "5H5A7649_Cropped.jpg",
    "5H5A7703_Cropped.jpg",
    "5H5A7757_Cropped.jpg",
    "IMG_7964_Cropped.jpg",
    "5H5A7414_Cropped.jpg",
    "5H5A7504_Cropped.jpg",
    "5H5A7576_Cropped.jpg",
    "5H5A7650_Cropped.jpg",
    "5H5A7705_Cropped.jpg",
    "5H5A7758_Cropped.jpg",
    "IMG_7967_Cropped.jpg",
    "5H5A7415_Cropped.jpg",
    "5H5A7508_Cropped.jpg",
    "5H5A7579_Cropped.jpg",
    "5H5A7651_Cropped.jpg",
    "5H5A7707_Cropped.jpg",
    "5H5A7759_Cropped.jpg",
    "IMG_7974_Cropped.jpg",
    "5H5A7417_Cropped.jpg",
    "5H5A7509_Cropped.jpg",
    "5H5A7581_Cropped.jpg",
    "5H5A7653_Cropped.jpg",
    "5H5A7709_Cropped.jpg",
    "5H5A7761_Cropped.jpg",
    "IMG_7980_Cropped.jpg",
    "5H5A7419_Cropped.jpg",
    "5H5A7516_Cropped.jpg",
    "5H5A7583_Cropped.jpg",
    "5H5A7654_Cropped.jpg",
    "5H5A7710_Cropped.jpg",
    "5H5A7763_Cropped.jpg",
    "IMG_7985_Cropped.jpg",
    "5H5A7421_Cropped.jpg",
    "5H5A7518_Cropped.jpg",
    "5H5A7584_Cropped.jpg",
    "5H5A7655_Cropped.jpg",
    "5H5A7712_Cropped.jpg",
    "5H5A7765_Cropped.jpg",
    "IMG_7986_Cropped.jpg",
    "5H5A7423_Cropped.jpg",
    "5H5A7519_Cropped.jpg",
    "5H5A7586_Cropped.jpg",
    "5H5A7656_Cropped.jpg",
    "5H5A7713_Cropped.jpg",
    "5H5A7768_Cropped.jpg",
    "IMG_7991_Cropped.jpg",
    "5H5A7425_Cropped.jpg",
    "5H5A7520_Cropped.jpg",
    "5H5A7588_Cropped.jpg",
    "5H5A7658_Cropped.jpg",
    "5H5A7717_Cropped.jpg",
    "5H5A7769_Cropped.jpg",
    "IMG_7996_Cropped.jpg",
    "5H5A7427_Cropped.jpg",
    "5H5A7522_Cropped.jpg",
    "5H5A7592_Cropped.jpg",
    "5H5A7659_Cropped.jpg",
    "5H5A7718_Cropped.jpg",
    "5H5A7773_Cropped.jpg",
    "IMG_7997_Cropped.jpg",
    "5H5A7428_Cropped.jpg",
    "5H5A7524_Cropped.jpg",
    "5H5A7595_Cropped.jpg",
    "5H5A7662_Cropped.jpg",
    "5H5A7719_Cropped.jpg",
    "5H5A7774_Cropped.jpg",
    "IMG_8001_Cropped.jpg",
    "5H5A7439_Cropped.jpg",
    "5H5A7526_Cropped.jpg",
    "5H5A7598_Cropped.jpg",
    "5H5A7663_Cropped.jpg",
    "5H5A7722_Cropped.jpg",
    "5H5A7776_Cropped.jpg",
    "IMG_8005_Cropped.jpg",
    "5H5A7441_Cropped.jpg",
    "5H5A7527_Cropped.jpg",
    "5H5A7600_Cropped.jpg",
    "5H5A7665_Cropped.jpg",
    "5H5A7723_Cropped.jpg",
    "5H5A7777_Cropped.jpg",
    "5H5A7443_Cropped.jpg",
    "5H5A7528_Cropped.jpg",
    "5H5A7602_Cropped.jpg",
    "5H5A7666_Cropped.jpg",
    "5H5A7724_Cropped.jpg",
    "5H5A7778_Cropped.jpg"
  ];

  var newStimuliPath = [];
  for(var i = 0; i < newStimuli.length; i ++) {
    newStimuliPath.push(
      "assets/img/betaset/" + newStimuli[i]
    )
  }

  console.log(newStimuliPath);
  
  var triads = [];
  for(var i = 0; i < 20; i ++) {
    triads.push(
      {triad: jsPsych.randomization.sampleWithoutReplacement(newStimuliPath, 3)}
    );
  }

  var random_four_waste_fraction_signs = [];
  for(var i = 0; i < stimuli.length; i ++) {
    random_four_waste_fraction_signs.push({
      item: stimuli[i],
      signs4: jsPsych.randomization.sampleWithoutReplacement(waste_fraction_signs, 4),
      randomSign: jsPsych.randomization.sampleWithoutReplacement(waste_fraction_signs, 1)
    });
  }

  let factors = {
    item: stimuli
  }

  let fractions = [
    {fraction: "cardboard"},
    {fraction: "bio-materials"},
    {fraction: "glass"},
    {fraction: "metal"},
    {fraction: "paper"},
    {fraction: "plastic"},
    {fraction: "textile"},
  ]

  console.log(fractions);

  let full_design = jsPsych.randomization.factorial(factors, 1);

  // // Show beta set stimuli
  // timeline.push({
  //   type: AnimationPlugin,
  //   stimuli: newStimuliPath,
  //   sequence_reps: 1,
  //   frame_time: 100,
  //   choices: "NO_KEYS",
  //   render_on_canvas: true
  // });

  // Welcome screen
  // timeline.push({
  //   type: HtmlButtonResponsePlugin,
  //   stimulus: "<p>Welcome to Waste Stimuli Evaluation Experiment!<p/><p>Here more data will follow (such as instructions, etc).</p>",
  //   choices: ["Begin"],
  // })

  // Switch to fullscreen
  timeline.push({
    type: FullscreenPlugin,
    fullscreen_mode: true,
  });

  // Showcase all
  timeline.push({
    type: ImageChoicePlugin,
    img_array: newStimuliPath,
    css_classes: ["showcase"],
    prompt: "<p>Here is an overview of the <strong>250</strong> images currently in the beta set.</p><p>Click any one of them to continue.</p>",
  });

  // // Common and uncommon waste items
  // timeline.push({
  //   timeline: [
  //     {
  //       type: SurveyTextPlugin,
  //       preamble: function(){
  //         return `Please think back on the items made out of <strong>${jsPsych.timelineVariable('fraction')}</strong> that you have recently disposed of.</p><p>Now, list three to five of them that you <strong>often</strong> dispose of.</p>`;
  //       },
  //       questions: [
  //         {required: true, name: "common-item1", prompt: 'Item 1:' },
  //         {required: true, name: "common-item2", prompt: 'Item 2:', },
  //         {required: true, name: "common-item3", prompt: 'Item 3:', },
  //         {name: "common-item4", prompt: 'Item 4:', },
  //         {name: "common-item5", prompt: 'Item 5:', }
  //       ]
  //     },
  //     {
  //       type: SurveyTextPlugin,
  //       preamble: function(){
  //         return `Please think back on the items made out of <strong>${jsPsych.timelineVariable('fraction')}</strong> that you have recently disposed of.</p><p>Now, list two to four of them that you <strong>rarely</strong> dispose of.</p>`;
  //       },
  //       questions: [
  //         {required: true, name: "uncommon-item1", prompt: 'Item 1:' },
  //         {required: true, name: "uncommon-item2", prompt: 'Item 2:', },
  //         {name: "uncommon-item3", prompt: 'Item 3:', },
  //         {name: "uncommon-item4", prompt: 'Item 4:', }
  //       ]
  //     }
  //   ],
  //   timeline_variables: fractions,
  //   randomize_order: true
  // });

  // Imposterness
  timeline.push({
    timeline: [
      {
        type: ImageChoicePlugin,
        img_array: jsPsych.timelineVariable('triad'),
        prompt: "<p>Below are three waste items.<br />Please identify a quality/dimension in which two of them align while the last differs.</p><p>Now, click the one that differs:</p>",
        css_classes: ["select-the-imposter", "three-options"],
        data: {
          question: 'imposterness',
          options: jsPsych.timelineVariable('triad')
        }
      },
      {
        type: SurveyTextPlugin,
        questions: [
          {prompt: 'How does this item differ?', required: true}
        ]
      },
    ],
    timeline_variables: triads,
    randomize_order: true
  });

  // Familarity
  // timeline.push({
  //   timeline: [
  //     {
  //       type: HtmlSliderResponsePlugin,
  //       stimulus: function(){
  //         var html = `
  //         <div class="stimulus">
  //             <p>How familar is this type of item to you?</p>
  //             <img src="${jsPsych.timelineVariable('item')}">
  //           </div>`;
  //         return html;
  //       },          
  //       require_movement: true,
  //       labels: ['Very unfamiliar', 'Neither familiar nor unfamiliar', 'Very familiar'],
  //       css_classes: "slider-with-stimulus",
  //       data: {
  //         question: 'familiarity',
  //         item: jsPsych.timelineVariable('item')
  //       }
  //     },
  //   ],
  //   timeline_variables: full_design,
  //   randomize_order: true
  // });

  // // Frequency
  // timeline.push({
  //   timeline: [
  //     {
  //       type: HtmlButtonResponsePlugin,
  //       stimulus: function(){
  //         var html = `
  //           <div class="stimulus">
  //             <p>How often do you dispose of something like this (approximately)?</p>
  //             <img src="${jsPsych.timelineVariable('item')}">
  //           </div>`;
  //         return html;
  //       },          
  //       choices: ['Once daily', 'Once weekly', 'Once Monthly', 'Once Yearly or less often'],
  //       css_classes: "buttons-with-stimulus",
  //       data: {
  //         question: 'frequency',
  //         item: jsPsych.timelineVariable('item')
  //       },
  //       on_finish: function(data) {
  //         // Save the button text on top of its index
  //         data.response_index = data.response;
  //         data.response = ['Once daily', 'Once weekly', 'Once Monthly', 'Once Yearly or less often'][data.response_index];
  //       }
  //     },
  //   ],
  //   timeline_variables: full_design,
  //   randomize_order: true
  // });

      // {
      //   type: ImageChoicePlugin,
      //   img_array: waste_fraction_signs_black,
      //   prompt: "<p>Which of the waste fractions on the right do you believe that the waste item on the left fit into?<br /> <br />Click a waste fraction to select it.</p>",
      //   values: ["cardboard", "food", "glass", "hazardous", "metal", "paper", "plastics", "residual", "textile"],
      //   css_classes: ["choice-with-stimulus", "nine-options"],
      //   stimulus: jsPsych.timelineVariable('item')
      // },
  
  // Exampleness
  // timeline.push({
  //   timeline: [
  //     {
  //       type: HtmlSliderResponsePlugin,
  //       stimulus: function(){
  //         var html = `
  //         <div class="stimulus two-images">
  //             <p>How good an example do you think that the waste item on the left is of the waste fraction on the right?</p>
  //             <img src="${jsPsych.timelineVariable('item')}">
  //             <img src="${jsPsych.timelineVariable('randomSign')}">
  //           </div>`;
  //         return html;
  //       },          
  //       require_movement: true,
  //       labels: ['Very bad', 'Neither good nor bad', 'Very good'],
  //       css_classes: "slider-with-stimulus",
  //       data: {
  //         question: 'exampleness',
  //         item: jsPsych.timelineVariable('item'),
  //         fraction: jsPsych.timelineVariable('randomSign')
  //       }
  //     },
  //   ],
  //   timeline_variables: random_four_waste_fraction_signs,
  //   randomize_order: true
  // });

  // // Full selection available
  // timeline.push({
  //   timeline: [
  //     {
  //       type: ImageChoicePlugin,
  //       img_array: waste_fraction_signs,
  //       prompt: "<p>Which of the waste fractions on the right do you believe that the waste item on the left fit into?<br /> <br />Click a waste fraction to select it.</p>",
  //       values: ["cardboard", "food", "glass", "hazardous", "metal", "paper", "plastics", "residual", "textile"],
  //       css_classes: ["choice-with-stimulus", "nine-options"],
  //       data: {
  //         question: 'fraction-belongingness',
  //         item: jsPsych.timelineVariable('item')
  //       },
  //       stimulus: jsPsych.timelineVariable('item')
  //     }
  //   ],
  //   timeline_variables: full_design,
  //   randomize_order: true
  // });

  // // Subset of waste fractions available
  // timeline.push({
  //   timeline: [
  //     {
  //       type: ImageChoicePlugin,
  //       img_array: jsPsych.timelineVariable('signs4'),
  //       prompt: "<p>If you have to choose one, which of the waste fractions on the right do you think that the waste item on the left best fit into?<br /> <br />Click a waste fraction to select it.</p>",
  //       css_classes: ["choice-with-stimulus", "four-options"],
  //       stimulus: jsPsych.timelineVariable('item'),
  //       data: {
  //         question: 'subset-belongingness',
  //         item: jsPsych.timelineVariable('item'),
  //         fraction: jsPsych.timelineVariable('signs4')
  //       }
  //     },
  //   ],
  //   timeline_variables: random_four_waste_fraction_signs,
  //   randomize_order: true
  // });

  // // Full selection available with certainty evaluation
  // timeline.push({
  //   timeline: [
  //     {
  //       type: ImageChoicePlugin,
  //       img_array: waste_fraction_signs,
  //       prompt: "<p>Which of the waste fractions on the right do you believe that the waste item on the left fit into?<br /> <br />Click a waste fraction to select it.</p>",
  //       values: ["cardboard", "food", "glass", "hazardous", "metal", "paper", "plastics", "residual", "textile"],
  //       css_classes: ["choice-with-stimulus", "nine-options"],
  //       stimulus: jsPsych.timelineVariable('item')
  //     },
  //     {
  //       type: HtmlSliderResponsePlugin,
  //       stimulus: `<p>How certain are you of that selection?</p>`,
  //       require_movement: true,
  //       labels: ['Very uncertain', 'Neither certain nor uncertain', 'Very certain'],
  //       css_classes: "slider-with-stimulus",
  //     },
  //   ],
  //   timeline_variables: full_design,
  //   randomize_order: true
  // });

  // // Subset of waste fractions available
  // timeline.push({
  //   timeline: [
  //     {
  //       type: ImageChoicePlugin,
  //       img_array: jsPsych.timelineVariable('signs4'),
  //       prompt: "<p>If you have to choose one, which of the waste fractions on the right do you think that the waste item on the left fits <bold>the worst</bold> into?<br /> <br />Click a waste fraction to select it.</p>",
  //       css_classes: ["choice-with-stimulus", "four-options"],
  //       stimulus: jsPsych.timelineVariable('item')
  //     },
  //   ],
  //   timeline_variables: random_four_waste_fraction_signs,
  //   randomize_order: true
  // });

  // // Familiarity of signage
  // timeline.push({
  //   timeline: [
  //     {
  //       type: HtmlSliderResponsePlugin,
  //       stimulus: function(){
  //         var html = `
  //           <div class="stimulus">
  //             <p>How familar is this sign to you?</p>
  //             <img src="${jsPsych.timelineVariable('sign')}">
  //           </div>`;
  //         return html;
  //       },          
  //       require_movement: true,
  //       labels: ['Very unfamiliar', 'Neither familiar nor unfamiliar', 'Very familiar'],
  //       css_classes: "slider-with-stimulus"
  //     },
  //   ],
  //   timeline_variables: waste_fraction_signs_as_stimulus,
  //   randomize_order: true
  // });

// timeline.push({
//   type: ImageChoicePlugin,
//   img_array: waste_fraction_signs,
//   stimulus: "assets/img/items/apple-core.jpg",
//   prompt: "<p>Which of the waste fractions on the right (→) do you believe that the waste item on the left (←) fit into?<br /> <br />Click a waste fraction to select it.</p>",
//   css_classes: "choice-with-stimulus",
//   timeline: full_design
// });



  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych;
}
