// Switch to fullscreen
export default function (experiment) {
  experiment.timeline.push({
    type: experiment.plugins.FullscreenPlugin,
    fullscreen_mode: true,
    message: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return `
            <p>The experiment will switch to full screen mode when you press the button below.</p>
            <p>You can exit full screen mode by pressing the 'esc'-key.</p>
          `;
        case 'da':
          return `
            <p>Eksperimentet skifter til fuldskærmstilstand, når du trykker på knappen nedenfor.</p>
            <p>Du kan afslutte fuldskærmsfunktionen ved at trykke på 'esc'-tasten.</p>
          `;
        case 'sv':
          return `
            <p>När du trycker på knappen nedan kommer du att gå in i fullskärmsläge.</p>
            <p>Du kan avsluta fullskärmsläget genom att trycka på 'esc'-tangenten.</p>
          `;
        default:
          break;
      }
    },
    button_label: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return 'Enter full screen';
        case 'da':
          return 'Gå til fuldskærm';
        case 'sv':
          return 'Gå till helskärm';
        default:
          break;
      }
    }
  });
};