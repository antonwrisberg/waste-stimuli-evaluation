import PreloadPlugin from "@jspsych/plugin-preload";

// Preload
export default function (experiment) {
  jsPsych = experiment.jsPsych;
  
  // Preload assets
  experiment.timeline.push({
    type: PreloadPlugin,
    images: experiment.assetPaths.images,
    audio: experiment.assetPaths.audio,
    video: experiment.assetPaths.video
  });
};