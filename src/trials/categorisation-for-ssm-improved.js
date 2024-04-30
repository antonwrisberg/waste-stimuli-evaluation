import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";

// Categorisation
export default function (experiment) {
  jsPsych = experiment.jsPsych;

  experiment.timeline.push({
    timeline: [
      {
        type: HtmlKeyboardResponsePlugin,
        stimulus: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <p>Please place a finger from your right hand on the <b>j</b> key and a finger from your left hand on the <b>f</b> key.</p>
                <p>When you have placed both fingers, press <b>f</b> to continue.</p>
              `;
            case 'da':
              return `
                <p>Placér en finger fra din højre hånd på <b>j</b>-tasten og en finger fra din venstre hånd på <b>f</b>-tasten.</p>
                <p>Tryk på <b>f</b> for at fortsætte, når du har placeret begge fingre.</p>
              `;
            case 'sv':
              return `
                <p>Placera ett finger från din högra hand på tangenten <b>j</b> och ett finger från din vänstra hand på tangenten <b>f</b>.</p>
                <p>Tryck på <b>f</b> för att fortsätta när du har placerat båda fingrarna.</p>
              `;
            default:
              break;
          }
        },
        choices: ["f"],
      }
    ]
  });

  let jIsCorrect = (Math.random() > .5);

  experiment.timeline.push({
    timeline: [
      {
        type: HtmlKeyboardResponsePlugin,
        stimulus: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <p>In a moment, you will see ${experiment.categorisationCount} waste items and a random waste fraction.</p>
                <p>For each item, you must decide if you believe the item to belong in the the waste fraction.</p>

                <p>Press <b>${(jIsCorrect ? 'j' : 'f')}</b>, if you believe that the item <b>belongs</b> in the fraction.<br />
                Press <b>${(jIsCorrect ? 'f' : 'j')}</b>, if you believe that the item <b>does no belong</b> in the fraction.</p>

                <p>To begin, please press <b>j</b>.</p>
              `;
            case 'da':
              return `
                <p>Om et øjeblik vil du se ${experiment.categorisationCount} affaldsprodukter og en tilfældig affaldsfraktion.</p>
                <p>For hvert stykle affald skal du afgøre, om du tror, at det hører til i affaldsfraktionen.</p>
                
                <p>Tryk på <b>${(jIsCorrect ? 'j' : 'f')}</b>, hvis du tror, at affaldet <b>hører til</b> i fraktionen.<br />
                Tryk på <b>${(jIsCorrect ? 'f' : 'j')}</b>, hvis du tror, at affaldet <b>ikke hører til</b> i fraktionen.</p>
                
                <p>For at begynde, tryk på <b>j</b>.</p>
              `;
            case 'sv':
              return `
                <p>Inom en kort stund kommer du att få se ${experiment.stimuli.congruencymix.length} olika avfall och en slumpmässig avfallskategori.</p>
                <p>För varje avfall ska du avgöra om du tror att den tillhör just den avfallskategori.</p>

                <p>Tryck på <b>${(jIsCorrect ? 'j' : 'f')}</b>, om du tror att avfallet <b>tillhör</b> fraktionen.<br />
                Tryck på <b>${(jIsCorrect ? 'f' : 'j')}</b>, om du tror att avfallet <b>inte tillhör</b> fraktionen.</p>
                
                <p>För att börja, tryck på <b>j</b>.</p>
              `;
            default:
              break;
          }
        },
        choices: ["j"],
      },
      {
        type: HtmlKeyboardResponsePlugin,
        prompt: function() {
          switch (experiment.detectLanguage()) {
            case 'en':
              return `
                <p class="prompt">Press <b>${(jIsCorrect ? 'j' : 'f')}</b>, if you believe that this item <b>belongs</b> in this waste fraction.<br />
                Press <b>${(jIsCorrect ? 'f' : 'j')}</b>, if you believe that this item <b>does no belong</b> in this waste fraction.</p>
                <img class="fraction" src="${jsPsych.timelineVariable('sign_sv')}" />
              `;
            case 'da':
              return "<p>Hvilken af affaldsfraktionerne til højre tror du, at affaldet til venstre passer ind i?<br /> <br />Klik på en affaldsfraktion for at vælge den.</p>";
            case 'sv':
              return `
                <p class="prompt">Tryck på <b>${(jIsCorrect ? 'j' : 'f')}</b>, om du tror att avfallet <b>tillhör</b> fraktionen.<br />
                Tryck på <b>${(jIsCorrect ? 'f' : 'j')}</b>, om du tror att avfallet <b>inte tillhör</b> fraktionen.</p>
                <img class="fraction" src="${jsPsych.timelineVariable('sign_sv')}" />
                `;
            default:
              break;
          }
        },
        css_classes: ["choice-with-stimulus", "one-option"],
        data: {
          question: 'fraction-belongingness',
          item: jsPsych.timelineVariable('item'),
          fraction: jsPsych.timelineVariable('key'),
          keyIndicatingBelongingness: (jIsCorrect ? 'j' : 'f')
        },
        choices: ["j", "f"],
        stimulus: function() {
          return `<img src="assets/img/betaset-sorted/${jsPsych.timelineVariable('item')}" />`;
        },
        timeline: experiment.stimuli.congruencymix
      }
    ],
    timeline_variables: experiment.stimuli.fractions,
    sample: {
      type: 'without-replacement',
      size: experiment.categorisationFractionCount
    }
  });
};