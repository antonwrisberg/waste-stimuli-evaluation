import SurveyHtmlFormPlugin from '@jspsych/plugin-survey-html-form';

// Recognition
export default function (experiment) {
  jsPsych = experiment.jsPsych;

  experiment.timeline.push({
    type: SurveyHtmlFormPlugin,
    preamble: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return `
            <h1>Almost done!</h1>
            <p>(thank you again)</p>
            <p>Aswer these two background questions to finish your participation.</p>
          `;
        case 'da':
          return `
            <h1>Næsten færdig!</h1>
            <p>(tak igen)</p>
            <p>Besvar disse to spørgsmål og afslut din deltagelse.</p>
          `;
        case 'sv':
          return `
            <h1>Nästan klar!</h1>
            <p>Vänligen fyll i lite bakgrundsinformation om dig som kommer hjälpa oss förstå dina svar:</p>
          `;
        default:
          break;
      }
    },
    html: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return `
            <p>I was born in year <input type="number" id="birthyear-resp-box" name="birthyear" size="4" min="1900" max="2024" required /></p>
            <p>I identify as <select name="gender" required>
              <option value="" disabled selected>Please select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other / prefer no to answer</option>
            </select></p>
          `;
        case 'da':
          return `
            <p>Jeg blev født i år <input type="number" id="birthyear-resp-box" name="birthyear" size="4" min="1900" max="2024" required /></p>
            <p>Jeg identificerer mig som <select name="gender" required>
              <option value="" disabled selected>Vælg venligst</option>
              <option value="female">Kvinde</option>
              <option value="male">Mand</option>
              <option value="other">Andet / foretrækker ikke at svare</option>
            </select></p>
          `;
        case 'sv':
          return `
            <p>Jag föddes år <input type="number" id="birthyear-resp-box" name="birthyear" size="4" min="1900" max="2024" required /> och identifierar mig som <select name="gender" required>
              <option value="" disabled selected>Vänligen välj</option>
              <option value="female">Kvinna</option>
              <option value="male">Man</option>
              <option value="" disabled>-----</option>
              <option value="other">Annat / föredrar att inte svara</option>
            </select>.</p>
             
            <p>Jag bor i <select name="municipality" required>
              <option value="" disabled selected>Vänligen välj</option>

              <option value="1440">Ale kommun</option>
              <option value="1489">Alingsås kommun</option>
              <option value="0764">Alvesta kommun</option>
              <option value="0604">Aneby kommun</option>
              <option value="1984">Arboga kommun</option>
              <option value="2506">Arjeplogs kommun</option>
              <option value="2505">Arvidsjaurs kommun</option>
              <option value="1784">Arvika kommun</option>
              <option value="1882">Askersunds kommun</option>
              <option value="2084">Avesta kommun</option>
              <option value="1460">Bengtsfors kommun</option>
              <option value="2326">Bergs kommun</option>
              <option value="2403">Bjurholms kommun</option>
              <option value="1260">Bjuvs kommun</option>
              <option value="2582">Bodens kommun</option>
              <option value="1443">Bollebygds kommun</option>
              <option value="2183">Bollnäs kommun</option>
              <option value="0885">Borgholms kommun</option>
              <option value="2081">Borlänge kommun</option>
              <option value="1490">Borås kommun</option>
              <option value="0127">Botkyrka kommun</option>
              <option value="0560">Boxholms kommun</option>
              <option value="1272">Bromölla kommun</option>
              <option value="2305">Bräcke kommun</option>
              <option value="1231">Burlövs kommun</option>
              <option value="1278">Båstads kommun</option>
              <option value="1438">Dals-Eds kommun</option>
              <option value="0162">Danderyds kommun</option>
              <option value="1862">Degerfors kommun</option>
              <option value="2425">Dorotea kommun</option>
              <option value="1730">Eda kommun</option>
              <option value="0125">Ekerö kommun</option>
              <option value="0686">Eksjö kommun</option>
              <option value="0862">Emmaboda kommun</option>
              <option value="0381">Enköpings kommun</option>
              <option value="0484">Eskilstuna kommun</option>
              <option value="1285">Eslövs kommun</option>
              <option value="1445">Essunga kommun</option>
              <option value="1982">Fagersta kommun</option>
              <option value="1382">Falkenbergs kommun</option>
              <option value="1499">Falköpings kommun</option>
              <option value="2080">Falu kommun</option>
              <option value="1782">Filipstads kommun</option>
              <option value="0562">Finspångs kommun</option>
              <option value="0482">Flens kommun</option>
              <option value="1763">Forshaga kommun</option>
              <option value="1439">Färgelanda kommun</option>
              <option value="2026">Gagnefs kommun</option>
              <option value="0662">Gislaveds kommun</option>
              <option value="0461">Gnesta kommun</option>
              <option value="0617">Gnosjö kommun</option>
              <option value="0980">Gotlands kommun</option>
              <option value="1764">Grums kommun</option>
              <option value="1444">Grästorps kommun</option>
              <option value="1447">Gullspångs kommun</option>
              <option value="2523">Gällivare kommun</option>
              <option value="2180">Gävle kommun</option>
              <option value="1480">Göteborgs kommun</option>
              <option value="1471">Götene kommun</option>
              <option value="0643">Habo kommun</option>
              <option value="1783">Hagfors kommun</option>
              <option value="1861">Hallsbergs kommun</option>
              <option value="1961">Hallstahammars kommun</option>
              <option value="1380">Halmstads kommun</option>
              <option value="1761">Hammarö kommun</option>
              <option value="0136">Haninge kommun</option>
              <option value="2583">Haparanda kommun</option>
              <option value="0331">Heby kommun</option>
              <option value="2083">Hedemora kommun</option>
              <option value="1283">Helsingborgs kommun</option>
              <option value="1466">Herrljunga kommun</option>
              <option value="1497">Hjo kommun</option>
              <option value="2104">Hofors kommun</option>
              <option value="0126">Huddinge kommun</option>
              <option value="2184">Hudiksvalls kommun</option>
              <option value="0860">Hultsfreds kommun</option>
              <option value="1315">Hylte kommun</option>
              <option value="0305">Håbo kommun</option>
              <option value="1863">Hällefors kommun</option>
              <option value="2361">Härjedalens kommun</option>
              <option value="2280">Härnösands kommun</option>
              <option value="1401">Härryda kommun</option>
              <option value="1293">Hässleholms kommun</option>
              <option value="1284">Höganäs kommun</option>
              <option value="0821">Högsby kommun</option>
              <option value="1266">Hörby kommun</option>
              <option value="1267">Höörs kommun</option>
              <option value="2510">Jokkmokks kommun</option>
              <option value="0123">Järfälla kommun</option>
              <option value="0680">Jönköpings kommun</option>
              <option value="2514">Kalix kommun</option>
              <option value="0880">Kalmar kommun</option>
              <option value="1446">Karlsborgs kommun</option>
              <option value="1082">Karlshamns kommun</option>
              <option value="1883">Karlskoga kommun</option>
              <option value="1080">Karlskrona kommun</option>
              <option value="1780">Karlstads kommun</option>
              <option value="0483">Katrineholms kommun</option>
              <option value="1715">Kils kommun</option>
              <option value="0513">Kinda kommun</option>
              <option value="2584">Kiruna kommun</option>
              <option value="1276">Klippans kommun</option>
              <option value="0330">Knivsta kommun</option>
              <option value="2282">Kramfors kommun</option>
              <option value="1290">Kristianstads kommun</option>
              <option value="1781">Kristinehamns kommun</option>
              <option value="2309">Krokoms kommun</option>
              <option value="1881">Kumla kommun</option>
              <option value="1384">Kungsbacka kommun</option>
              <option value="1960">Kungsörs kommun</option>
              <option value="1482">Kungälvs kommun</option>
              <option value="1261">Kävlinge kommun</option>
              <option value="1983">Köpings kommun</option>
              <option value="1381">Laholms kommun</option>
              <option value="1282">Landskrona kommun</option>
              <option value="1860">Laxå kommun</option>
              <option value="1814">Lekebergs kommun</option>
              <option value="2029">Leksands kommun</option>
              <option value="1441">Lerums kommun</option>
              <option value="0761">Lessebo kommun</option>
              <option value="0186">Lidingö kommun</option>
              <option value="1494">Lidköpings kommun</option>
              <option value="1462">Lilla Edets kommun</option>
              <option value="1885">Lindesbergs kommun</option>
              <option value="0580">Linköpings kommun</option>
              <option value="0781">Ljungby kommun</option>
              <option value="2161">Ljusdals kommun</option>
              <option value="1864">Ljusnarsbergs kommun</option>
              <option value="1262">Lomma kommun</option>
              <option value="2085">Ludvika kommun</option>
              <option value="2580">Luleå kommun</option>
              <option value="1281">Lunds kommun</option>
              <option value="2481">Lycksele kommun</option>
              <option value="1484">Lysekils kommun</option>
              <option value="1280">Malmö kommun</option>
              <option value="2023">Malung-Sälens kommun</option>
              <option value="2418">Malå kommun</option>
              <option value="1493">Mariestads kommun</option>
              <option value="1463">Marks kommun</option>
              <option value="0767">Markaryds kommun</option>
              <option value="1461">Melleruds kommun</option>
              <option value="0586">Mjölby kommun</option>
              <option value="2062">Mora kommun</option>
              <option value="0583">Motala kommun</option>
              <option value="0642">Mullsjö kommun</option>
              <option value="1430">Munkedals kommun</option>
              <option value="1762">Munkfors kommun</option>
              <option value="1481">Mölndals kommun</option>
              <option value="0861">Mönsterås kommun</option>
              <option value="0840">Mörbylånga kommun</option>
              <option value="0182">Nacka kommun</option>
              <option value="1884">Nora kommun</option>
              <option value="1962">Norbergs kommun</option>
              <option value="2132">Nordanstigs kommun</option>
              <option value="2401">Nordmalings kommun</option>
              <option value="0581">Norrköpings kommun</option>
              <option value="0188">Norrtälje kommun</option>
              <option value="2417">Norsjö kommun</option>
              <option value="0881">Nybro kommun</option>
              <option value="0140">Nykvarns kommun</option>
              <option value="0480">Nyköpings kommun</option>
              <option value="0192">Nynäshamns kommun</option>
              <option value="0682">Nässjö kommun</option>
              <option value="2101">Ockelbo kommun</option>
              <option value="1060">Olofströms kommun</option>
              <option value="2034">Orsa kommun</option>
              <option value="1421">Orusts kommun</option>
              <option value="1273">Osby kommun</option>
              <option value="0882">Oskarshamns kommun</option>
              <option value="2121">Ovanåkers kommun</option>
              <option value="0481">Oxelösunds kommun</option>
              <option value="2521">Pajala kommun</option>
              <option value="1402">Partille kommun</option>
              <option value="1275">Perstorps kommun</option>
              <option value="2581">Piteå kommun</option>
              <option value="2303">Ragunda kommun</option>
              <option value="2409">Robertsfors kommun</option>
              <option value="1081">Ronneby kommun</option>
              <option value="2031">Rättviks kommun</option>
              <option value="1981">Sala kommun</option>
              <option value="0128">Salems kommun</option>
              <option value="2181">Sandvikens kommun</option>
              <option value="0191">Sigtuna kommun</option>
              <option value="1291">Simrishamns kommun</option>
              <option value="1265">Sjöbo kommun</option>
              <option value="1495">Skara kommun</option>
              <option value="2482">Skellefteå kommun</option>
              <option value="1904">Skinnskattebergs kommun</option>
              <option value="1264">Skurups kommun</option>
              <option value="1496">Skövde kommun</option>
              <option value="2061">Smedjebackens kommun</option>
              <option value="2283">Sollefteå kommun</option>
              <option value="0163">Sollentuna kommun</option>
              <option value="0184">Solna kommun</option>
              <option value="2422">Sorsele kommun</option>
              <option value="1427">Sotenäs kommun</option>
              <option value="1230">Staffanstorps kommun</option>
              <option value="1415">Stenungsunds kommun</option>
              <option value="0180">Stockholms kommun</option>
              <option value="1760">Storfors kommun</option>
              <option value="2421">Storumans kommun</option>
              <option value="0486">Strängnäs kommun</option>
              <option value="1486">Strömstads kommun</option>
              <option value="2313">Strömsunds kommun</option>
              <option value="0183">Sundbybergs kommun</option>
              <option value="2281">Sundsvalls kommun</option>
              <option value="1766">Sunne kommun</option>
              <option value="1907">Surahammars kommun</option>
              <option value="1214">Svalövs kommun</option>
              <option value="1263">Svedala kommun</option>
              <option value="1465">Svenljunga kommun</option>
              <option value="1785">Säffle kommun</option>
              <option value="2082">Säters kommun</option>
              <option value="0684">Sävsjö kommun</option>
              <option value="2182">Söderhamns kommun</option>
              <option value="0582">Söderköpings kommun</option>
              <option value="0181">Södertälje kommun</option>
              <option value="1083">Sölvesborgs kommun</option>
              <option value="1435">Tanums kommun</option>
              <option value="1472">Tibro kommun</option>
              <option value="1498">Tidaholms kommun</option>
              <option value="0360">Tierps kommun</option>
              <option value="2262">Timrå kommun</option>
              <option value="0763">Tingsryds kommun</option>
              <option value="1419">Tjörns kommun</option>
              <option value="1270">Tomelilla kommun</option>
              <option value="1737">Torsby kommun</option>
              <option value="0834">Torsås kommun</option>
              <option value="1452">Tranemo kommun</option>
              <option value="0687">Tranås kommun</option>
              <option value="1287">Trelleborgs kommun</option>
              <option value="1488">Trollhättans kommun</option>
              <option value="0488">Trosa kommun</option>
              <option value="0138">Tyresö kommun</option>
              <option value="0160">Täby kommun</option>
              <option value="1473">Töreboda kommun</option>
              <option value="1485">Uddevalla kommun</option>
              <option value="1491">Ulricehamns kommun</option>
              <option value="2480">Umeå kommun</option>
              <option value="0114">Upplands Väsby kommun</option>
              <option value="0139">Upplands-Bro kommun</option>
              <option value="0380">Uppsala kommun</option>
              <option value="0760">Uppvidinge kommun</option>
              <option value="0584">Vadstena kommun</option>
              <option value="0665">Vaggeryds kommun</option>
              <option value="0563">Valdemarsviks kommun</option>
              <option value="0115">Vallentuna kommun</option>
              <option value="2021">Vansbro kommun</option>
              <option value="1470">Vara kommun</option>
              <option value="1383">Varbergs kommun</option>
              <option value="0187">Vaxholms kommun</option>
              <option value="1233">Vellinge kommun</option>
              <option value="0685">Vetlanda kommun</option>
              <option value="2462">Vilhelmina kommun</option>
              <option value="0884">Vimmerby kommun</option>
              <option value="2404">Vindelns kommun</option>
              <option value="0428">Vingåkers kommun</option>
              <option value="1442">Vårgårda kommun</option>
              <option value="1487">Vänersborgs kommun</option>
              <option value="2460">Vännäs kommun</option>
              <option value="0120">Värmdö kommun</option>
              <option value="0683">Värnamo kommun</option>
              <option value="0883">Västerviks kommun</option>
              <option value="1980">Västerås kommun</option>
              <option value="0780">Växjö kommun</option>
              <option value="0512">Ydre kommun</option>
              <option value="1286">Ystads kommun</option>
              <option value="1492">Åmåls kommun</option>
              <option value="2260">Ånge kommun</option>
              <option value="2321">Åre kommun</option>
              <option value="1765">Årjängs kommun</option>
              <option value="2463">Åsele kommun</option>
              <option value="1277">Åstorps kommun</option>
              <option value="0561">Åtvidabergs kommun</option>
              <option value="0765">Älmhults kommun</option>
              <option value="2039">Älvdalens kommun</option>
              <option value="0319">Älvkarleby kommun</option>
              <option value="2560">Älvsbyns kommun</option>
              <option value="1292">Ängelholms kommun</option>
              <option value="1407">Öckerö kommun</option>
              <option value="0509">Ödeshögs kommun</option>
              <option value="1880">Örebro kommun</option>
              <option value="1257">Örkelljunga kommun</option>
              <option value="2284">Örnsköldsviks kommun</option>
              <option value="2380">Östersunds kommun</option>
              <option value="0117">Österåkers kommun</option>
              <option value="0382">Östhammars kommun</option>
              <option value="1256">Östra Göinge kommun</option>
              <option value="2513">Överkalix kommun</option>
              <option value="2518">Övertorneå kommun</option>

              <option value="" disabled>-----</option>
              <option value="other">Annat / föredrar att inte svara</option>
            </select>.</p>
            <p>Där jag vanligtvis sorterar mitt avfall, kan jag sortera i:<br />

            <table>
              <tr>
                <td>
                  <input type="checkbox" name="batterier" value="selected" id="checkbox-batterier" /> <label for="checkbox-batterier">Batterier</label><br />
                  <input type="checkbox" name="elavfall" value="selected" id="checkbox-elavfall" /> <label for="checkbox-elavfall">Elavfall</label><br />
                  <input type="checkbox" name="farligt-avfall" value="selected" id="checkbox-farligt-avfall" /> <label for="checkbox-farligt-avfall">Farligt avfall</label><br />
                  <input type="checkbox" name="glas" value="selected" id="checkbox-glas" /> <label for="checkbox-glas">Glas (fargat och ofargat)</label><br />
                  <input type="checkbox" name="grovavfall" value="selected" id="checkbox-grovavfall" /> <label for="checkbox-grovavfall">Grovavfall</label>
                </td>
                <td>
                <input type="checkbox" name="matavfall" value="selected" id="checkbox-matavfall" /> <label for="checkbox-matavfall">Matavfall</label><br />
                  <input type="checkbox" name="metallforpackningar" value="selected" id="checkbox-metallforpackningar" /> <label for="checkbox-metallforpackningar">Metallförpackningar</label><br />
                  <input type="checkbox" name="pappersforpackningar" value="selected" id="checkbox-pappersforpackningar" /> <label for="checkbox-pappersforpackningar">Pappersförpackningar</label><br />
                  <input type="checkbox" name="plastforpackningar" value="selected" id="checkbox-plastforpackningar" /> <label for="checkbox-plastforpackningar">Plastförpackningar</label><br />
                  <input type="checkbox" name="restavfall" value="selected" id="checkbox-restavfall" /> <label for="checkbox-restavfall">Restavfall</label>
                </td>
                <td>
                  <input type="checkbox" name="textil" value="selected" id="checkbox-textil" /> <label for="checkbox-textil">Textil</label><br />
                  <input type="checkbox" name="tidningar" value="selected" id="checkbox-tidningar" /> <label for="checkbox-tidningar">Tidningar och andra trycksaker</label><br />
                  <input type="checkbox" name="tradgardsavfall" value="selected" id="checkbox-tradgardsavfall" /> <label for="checkbox-tradgardsavfall">Trädgårdsavfall</label><br />
                  <input type="checkbox" name="aterbruk" value="selected" id="checkbox-aterbruk" /> <label for="checkbox-aterbruk">Återbruk</label><br />
                  <input type="checkbox" name="other" value="selected" id="checkbox-other" /> <label for="checkbox-other">Annat</label>
                </td>
              </tr>
            </table>

            <p>Det är <select name="sorting convenience" required>
              <option value="" disabled selected>Vänligen välj</option>
besværligt og ubesværligt!!
              <option value="very inconvenient">Mycket obekvämt</option>
              <option value="inconvenient">Obekvämt</option>
              <option value="neither convenient nor inconvenient">Varken obekvämt eller bekvämt</option>
              <option value="convenient">Bekvämt</option>
              <option value="very convenient">Mycket bekvämt</option>
              <option value="" disabled>-----</option>
              <option value="other">Annat / föredrar att inte svara</option>
            </select> för mig att sortera avfall hemma.</p>

            <p>Jag är <select name="sorting abilities" required>
              <option value="" disabled selected>Vänligen välj</option>
              <option value="very bad">Väldigt dålig</option>
              <option value="bad">Dålig</option>
              <option value="neither bad nor good">Varken dålig eller god</option>
              <option value="good">Bra</option>
              <option value="very good">Väldigt bra</option>
              <option value="" disabled>-----</option>
              <option value="other">Annat / föredrar att inte svara</option>
            </select> på att sortera avfall.</p>

            <p>Jag sorterar <select name="sorting frequency" required>
              <option value="" disabled selected>Vänligen välj</option>  
              <option value="never">Aldrig</option>
              <option value="seldom">Sällan</option>
              <option value="sometimes">Ibland</option>
              <option value="often">Ofta</option>
              <option value="always">Alltid</option>
              <option value="" disabled>-----</option>
              <option value="other">Annat / föredrar att inte svara</option>
            </select> mitt avfall.</p>

            <p>Att sortera avfall är <select name="sorting importance" required>
              <option value="" disabled selected>Vänligen välj</option>  
              <option value="very unimportant">Väldigt oviktigt</option>
              <option value="unimportant">Oviktigt</option>
              <option value="neither unimportant nor important">Varken oviktigt eller viktigt</option>
              <option value="important">Viktigt</option>
              <option value="very important">Väldigt viktigt</option>
              <option value="" disabled>-----</option>
              <option value="other">Annat / föredrar att inte svara</option>
            </select> för mig.</p>

            <p>Jag oroar mig <select name="envrionmental concern" required>
              <option value="" disabled selected>Vänligen välj</option>  
              <option value="very little">Väldigt lite</option>
              <option value="little">Lite</option>
              <option value="somewhat">Något</option>
              <option value="much">Mycket</option>
              <option value="very much">Väldigt mycket</option>
              <option value="" disabled>-----</option>
              <option value="other">Annat / föredrar att inte svara</option>
            </select> för miljön.</p>
          `;
        default:
          break;
      }
    },
    autofocus: 'birthyear-resp-box',
    css_classes: ["background-survey"],
    button_label: function() {
      switch (experiment.detectLanguage()) {
        case 'en':
          return 'Finish and save responses';
        case 'da':
          return 'Afslut og gem svar';
        case 'sv':
          return 'Avsluta och spara svar';
        default:
          break;
      }
    }
  });
};