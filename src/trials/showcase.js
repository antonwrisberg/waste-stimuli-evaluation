// Showcase
export default function (jsPsych, timeline, ImageChoicePlugin, stimuliAll) {
  timeline.push({
    type: ImageChoicePlugin,
    img_array: stimuliAll,
    img_path: "assets/img/betaset-sorted/",
    css_classes: ["showcase"],
    prompt: "<p>Here is an overview of the <strong>250</strong> images currently in the beta set.</p><p>Click any one of them to get information on it.</p>",
  });
};