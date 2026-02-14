/* ============================================
   MOESTUIN VOGELENZANG - DASHBOARD APP
   Klimaat: Kustklimaat, Zone 8b
   Bodem: Zandgrond
   ============================================ */

// ============================================
// DATA: Maanden
// ============================================
const MAANDEN = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
const MAANDEN_LANG = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];

const currentMonth = new Date().getMonth(); // 0-indexed
const currentYear = new Date().getFullYear();

// ============================================
// DATA: Activiteitstypes
// ============================================
const ACTIVITY_TYPES = {
    voorzaaien: { label: 'Voorzaaien (binnen)', color: '#7E57C2', short: 'Voorzaaien' },
    zaaien: { label: 'Buiten zaaien', color: '#43A047', short: 'Zaaien' },
    uitplanten: { label: 'Uitplanten', color: '#FB8C00', short: 'Uitplanten' },
    poten: { label: 'Poten', color: '#FB8C00', short: 'Poten' },
    voorkiemen: { label: 'Voorkiemen', color: '#7E57C2', short: 'Voorkiemen' },
    oogsten: { label: 'Oogsten', color: '#E53935', short: 'Oogsten' },
    onderhoud: { label: 'Onderhoud', color: '#6D4C41', short: 'Onderhoud' }
};

// ============================================
// DATA: Bed types met gewassen en kalender
// Aangepast voor Vogelenzang (kust, zandgrond)
// ============================================
const BED_TYPES = {
    vrucht: {
        name: 'Vruchtbed',
        icon: '\u{1F345}',
        color: '#E8A838',
        description: 'Vruchtdragende gewassen: tomaten, courgettes, pompoenen, komkommers. Zware voedingsbehoefte.',
        soilTip: 'Zandgrond: Voeg veel compost toe voor vochtvasthoudend vermogen. Mulch dik rond de planten. Regelmatig water geven, zeker bij droogte.',
        crops: [
            {
                name: 'Tomaten',
                activities: [
                    { type: 'voorzaaien', start: 1, end: 2 },  // feb-mrt
                    { type: 'uitplanten', start: 4, end: 4 },   // mei (na ijsheiligen)
                    { type: 'oogsten', start: 6, end: 9 }       // jul-okt
                ],
                tips: 'Pas na de IJsheiligen (half mei) uitplanten. Diep planten voor sterke wortelvorming. Op zandgrond extra mulchen tegen uitdroging.'
            },
            {
                name: 'Courgette',
                activities: [
                    { type: 'voorzaaien', start: 3, end: 3 },   // apr
                    { type: 'uitplanten', start: 4, end: 4 },   // mei
                    { type: 'oogsten', start: 5, end: 9 }       // jun-okt
                ],
                tips: 'Veel ruimte nodig (1m\u00B2 per plant). Op zandgrond extra compost in het plantgat. Regelmatig oogsten voor doorgroei.'
            },
            {
                name: 'Pompoen',
                activities: [
                    { type: 'voorzaaien', start: 3, end: 3 },   // apr
                    { type: 'uitplanten', start: 4, end: 4 },   // mei
                    { type: 'oogsten', start: 8, end: 9 }       // sep-okt
                ],
                tips: 'Kan ook op het apart pompoenbed. Laat ranken over het pad groeien. Oogst als de steel kurkt.'
            },
            {
                name: 'Komkommer',
                activities: [
                    { type: 'voorzaaien', start: 3, end: 3 },   // apr
                    { type: 'uitplanten', start: 4, end: 5 },   // mei-jun
                    { type: 'oogsten', start: 6, end: 8 }       // jul-sep
                ],
                tips: 'Beschut plekje kiezen (kustwind!). Regelmatig water op zandgrond, niet over het blad.'
            }
        ]
    },

    wortel: {
        name: 'Wortelbed',
        icon: '\u{1F955}',
        color: '#D4649A',
        description: 'Wortel- en knolgewassen. Profiteren van de losse zandgrond!',
        soilTip: 'Zandgrond is ideaal voor wortelgewassen: ze groeien recht en zijn makkelijk te oogsten. Niet te vers bemesten (geeft vertakte wortels).',
        crops: [
            {
                name: 'Wortelen',
                activities: [
                    { type: 'zaaien', start: 2, end: 5 },       // mrt-jun
                    { type: 'oogsten', start: 5, end: 9 }       // jun-okt
                ],
                tips: 'Zandgrond = perfecte wortelgrond! Zaai om de 3 weken voor continu-oogst. Niet bemesten met verse mest.'
            },
            {
                name: 'Pastinaken',
                activities: [
                    { type: 'zaaien', start: 2, end: 3 },       // mrt-apr
                    { type: 'oogsten', start: 9, end: 11 }      // okt-dec
                ],
                tips: 'Geduld nodig: kieming duurt 3-4 weken. Worden zoeter na de eerste vorst. Kunnen in de grond overwinteren.'
            },
            {
                name: 'Rode biet',
                activities: [
                    { type: 'zaaien', start: 3, end: 5 },       // apr-jun
                    { type: 'oogsten', start: 6, end: 10 }      // jul-nov
                ],
                tips: 'Houdt van vochtige grond, dus op zandgrond extra watergeven. Kan ook goed in de herfst.'
            },
            {
                name: 'Radijs',
                activities: [
                    { type: 'zaaien', start: 2, end: 8 },       // mrt-sep
                    { type: 'oogsten', start: 3, end: 9 }       // apr-okt
                ],
                tips: 'Snelle oogst (4-6 weken). Ideaal als tussenteelt. Zaai elke 2 weken een rijke bij.'
            },
            {
                name: 'Knolselderij',
                activities: [
                    { type: 'voorzaaien', start: 1, end: 2 },   // feb-mrt
                    { type: 'uitplanten', start: 4, end: 4 },   // mei
                    { type: 'oogsten', start: 9, end: 10 }      // okt-nov
                ],
                tips: 'Lange groeiperiode. Op zandgrond veel water nodig. Goed mulchen.'
            }
        ]
    },

    aardappel: {
        name: 'Aardappelbed',
        icon: '\u{1F954}',
        color: '#5B8BD4',
        description: 'Vroege en bewaaraardappelen. Goede voorvrucht die de bodem loswerkt.',
        soilTip: 'Zandgrond warmt snel op in het voorjaar, waardoor je eerder kunt poten. Wel aanaarden tegen vergroening. Extra water bij knolvorming.',
        crops: [
            {
                name: 'Vroege aardappelen',
                activities: [
                    { type: 'voorkiemen', start: 1, end: 2 },   // feb-mrt
                    { type: 'poten', start: 2, end: 3 },        // mrt-apr
                    { type: 'oogsten', start: 5, end: 6 }       // jun-jul
                ],
                tips: 'Voorkiemen op lichte, koele plek (10-15\u00B0C). Op zandgrond kun je al begin maart poten bij zacht weer.'
            },
            {
                name: 'Bewaaraardappelen',
                activities: [
                    { type: 'poten', start: 3, end: 4 },        // apr-mei
                    { type: 'oogsten', start: 7, end: 8 }       // aug-sep
                ],
                tips: 'Regelmatig aanaarden. Op zandgrond extra watergeven tijdens bloei (= knolvorming). Loof laten afsterven voor oogst.'
            }
        ]
    },

    'bonen-hoog': {
        name: 'Bonen hoog',
        icon: '\u{1FAD8}',
        color: '#4CAF50',
        description: 'Stokbonen en pronkbonen met andijvie als tussenteelt. Bonen verrijken de bodem met stikstof.',
        soilTip: 'Bonen binden stikstof uit de lucht en verbeteren zo de zandgrond. Laat na de oogst de wortels in de grond zitten!',
        crops: [
            {
                name: 'Stokbonen',
                activities: [
                    { type: 'zaaien', start: 4, end: 5 },       // mei-jun
                    { type: 'oogsten', start: 6, end: 9 }       // jul-okt
                ],
                tips: 'Pas na IJsheiligen zaaien. Stevig stokkenrek plaatsen (kustwind!). Regelmatig plukken = langer oogsten.'
            },
            {
                name: 'Pronkbonen',
                activities: [
                    { type: 'zaaien', start: 4, end: 5 },       // mei-jun
                    { type: 'oogsten', start: 6, end: 9 }       // jul-okt
                ],
                tips: 'Mooie rode bloemen, ook decoratief. Stevige stokken nodig. Oogst jong voor malse bonen.'
            },
            {
                name: 'Andijvie (tussen)',
                activities: [
                    { type: 'voorzaaien', start: 4, end: 5 },   // mei-jun
                    { type: 'uitplanten', start: 5, end: 6 },   // jun-jul
                    { type: 'oogsten', start: 7, end: 9 }       // aug-okt
                ],
                tips: 'Plant tussen de bonenstokken voor optimaal ruimtegebruik. Profiteert van de (half)schaduw van de bonen.'
            }
        ]
    },

    'bonen-laag': {
        name: 'Bonen laag',
        icon: '\u{1FAD1}',
        color: '#81C784',
        description: 'Peultjes, doperwten, sperziebonen en tuinbonen. Laagblijvende peulvruchten.',
        soilTip: 'Net als hoge bonen verbeteren lage peulvruchten de bodem. Op zandgrond kunnen erwten vroeg in het seizoen al gezaaid worden.',
        crops: [
            {
                name: 'Tuinbonen',
                activities: [
                    { type: 'zaaien', start: 1, end: 3 },       // feb-apr
                    { type: 'oogsten', start: 5, end: 6 }       // jun-jul
                ],
                tips: 'Kunnen vroeg gezaaid op zandgrond (warmt snel op). Toppen afknijpen tegen zwarte luis.'
            },
            {
                name: 'Peultjes',
                activities: [
                    { type: 'zaaien', start: 2, end: 3 },       // mrt-apr
                    { type: 'oogsten', start: 5, end: 6 }       // jun-jul
                ],
                tips: 'Vroege oogst! Steungaas of takken nodig. Oogst als peulen nog plat zijn.'
            },
            {
                name: 'Doperwten',
                activities: [
                    { type: 'zaaien', start: 2, end: 4 },       // mrt-mei
                    { type: 'oogsten', start: 5, end: 7 }       // jun-aug
                ],
                tips: 'Houden van koeler weer. In Vogelenzang goed te doen door het kustklimaat. Oogst als de erwten de peul vullen.'
            },
            {
                name: 'Sperziebonen',
                activities: [
                    { type: 'zaaien', start: 4, end: 6 },       // mei-jul
                    { type: 'oogsten', start: 6, end: 9 }       // jul-okt
                ],
                tips: 'Warmteminnend: wacht tot de grond 12\u00B0C is. Zaai in 2 rondes voor langere oogst.'
            }
        ]
    },

    kolen: {
        name: 'Kolenbed',
        icon: '\u{1F966}',
        color: '#2E7D32',
        description: 'Koolgewassen: boerenkool, broccoli, bloemkool, spruitjes, rode/witte kool.',
        soilTip: 'Kolen zijn zware eters en hebben op zandgrond extra compost nodig. Kalk kan helpen tegen knolvoet. Wind van de kust houdt rupsen enigszins in bedwang.',
        crops: [
            {
                name: 'Boerenkool',
                activities: [
                    { type: 'voorzaaien', start: 4, end: 5 },   // mei-jun
                    { type: 'uitplanten', start: 5, end: 6 },   // jun-jul
                    { type: 'oogsten', start: 9, end: 11 }      // okt-dec+
                ],
                tips: 'Wordt lekkerder na vorst! Kan de hele winter door geoogst worden. Sterk gewas voor de kust.'
            },
            {
                name: 'Broccoli',
                activities: [
                    { type: 'voorzaaien', start: 2, end: 3 },   // mrt-apr
                    { type: 'uitplanten', start: 4, end: 5 },   // mei-jun
                    { type: 'oogsten', start: 6, end: 8 }       // jul-sep
                ],
                tips: 'Oogst de hoofdkool, daarna groeien er nog zijscheuten. Op zandgrond stevig aandrukken bij planten.'
            },
            {
                name: 'Bloemkool',
                activities: [
                    { type: 'voorzaaien', start: 1, end: 3 },   // feb-apr
                    { type: 'uitplanten', start: 4, end: 5 },   // mei-jun
                    { type: 'oogsten', start: 6, end: 9 }       // jul-okt
                ],
                tips: 'Bladeren over de kool vouwen voor witte kleur. Regelmatig water op zandgrond.'
            },
            {
                name: 'Spruitjes',
                activities: [
                    { type: 'voorzaaien', start: 2, end: 3 },   // mrt-apr
                    { type: 'uitplanten', start: 4, end: 4 },   // mei
                    { type: 'oogsten', start: 9, end: 11 }      // okt-dec+
                ],
                tips: 'Lange groeitijd. Top eraf in september voor grotere spruiten. Lekkerder na vorst.'
            },
            {
                name: 'Rode kool',
                activities: [
                    { type: 'voorzaaien', start: 2, end: 3 },   // mrt-apr
                    { type: 'uitplanten', start: 4, end: 5 },   // mei-jun
                    { type: 'oogsten', start: 8, end: 10 }      // sep-nov
                ],
                tips: 'Stevig aanplanten op zandgrond. Goede bewaargroente.'
            },
            {
                name: 'Koolrabi',
                activities: [
                    { type: 'voorzaaien', start: 2, end: 5 },   // mrt-jun
                    { type: 'uitplanten', start: 3, end: 6 },   // apr-jul
                    { type: 'oogsten', start: 4, end: 9 }       // mei-okt
                ],
                tips: 'Snelle groei, oogst bij tennisbalgrootte. Goede tussenteelt.'
            }
        ]
    },

    blad: {
        name: 'Bladbed',
        icon: '\u{1F96C}',
        color: '#26A69A',
        description: 'Bladgroenten: sla, rucola, spinazie, snijbiet, raapstelen, veldsla.',
        soilTip: 'Bladgroenten groeien snel op zandgrond maar hebben wel regelmatig water nodig. Mulch helpt enorm. Zaai in meerdere rondes.',
        crops: [
            {
                name: 'Kropsla',
                activities: [
                    { type: 'voorzaaien', start: 1, end: 2 },   // feb-mrt
                    { type: 'zaaien', start: 2, end: 7 },       // mrt-aug
                    { type: 'oogsten', start: 4, end: 9 }       // mei-okt
                ],
                tips: 'Zaai elke 3 weken een nieuwe rij bij. Op zandgrond snel watergeven bij droogte (anders schiet het door).'
            },
            {
                name: 'Pluksla',
                activities: [
                    { type: 'zaaien', start: 2, end: 7 },       // mrt-aug
                    { type: 'oogsten', start: 4, end: 9 }       // mei-okt
                ],
                tips: 'Pluk de buitenste bladeren, het hart groeit door. Ideale zaai voor continu-oogst.'
            },
            {
                name: 'Rucola',
                activities: [
                    { type: 'zaaien', start: 2, end: 8 },       // mrt-sep
                    { type: 'oogsten', start: 3, end: 9 }       // apr-okt
                ],
                tips: 'Schiet snel door in droge, warme perioden. Op zandgrond extra watergeven. Blijf plukken.'
            },
            {
                name: 'Spinazie',
                activities: [
                    { type: 'zaaien', start: 2, end: 4 },       // mrt-mei
                    { type: 'oogsten', start: 4, end: 5 },      // mei-jun
                    { type: 'onderhoud', start: 7, end: 8 }     // aug-sep (najaarsteelt)
                ],
                tips: 'Voorjaars- \u00E9n najaarsteelt mogelijk. Schiet door bij warmte. Het kustklimaat in Vogelenzang is ideaal (koeler).'
            },
            {
                name: 'Snijbiet',
                activities: [
                    { type: 'zaaien', start: 3, end: 5 },       // apr-jun
                    { type: 'oogsten', start: 5, end: 10 }      // jun-nov
                ],
                tips: 'Zeer productief! Pluk de buitenste bladeren. Kan tegen lichte vorst. Kleurrijke stelen.'
            },
            {
                name: 'Raapstelen',
                activities: [
                    { type: 'zaaien', start: 7, end: 8 },       // aug-sep
                    { type: 'oogsten', start: 8, end: 10 }      // sep-nov
                ],
                tips: 'Typisch najaarsteelt. Snel klaar (6 weken). Vult het bed na de zomeroogst.'
            },
            {
                name: 'Veldsla',
                activities: [
                    { type: 'zaaien', start: 7, end: 9 },       // aug-okt
                    { type: 'oogsten', start: 9, end: 11 }      // okt-dec+
                ],
                tips: 'Winterharde sla! Groeit door tot in de winter. Op zandgrond goed tegen natte voeten.'
            }
        ]
    },

    aardbeien: {
        name: 'Aardbeienbed',
        icon: '\u{1F353}',
        color: '#E53935',
        description: 'Vast bed (roteert niet). Aardbeien staan 3-4 jaar op dezelfde plek.',
        soilTip: 'Zandgrond draineert goed, wat aardbeien fijn vinden (minder vruchtrot). Wel extra compost en regelmatig water.',
        crops: [
            {
                name: 'Aardbeien',
                activities: [
                    { type: 'onderhoud', start: 2, end: 2 },    // mrt: opschonen
                    { type: 'onderhoud', start: 4, end: 4 },    // mei: stro aanbrengen
                    { type: 'oogsten', start: 5, end: 6 },      // jun-jul
                    { type: 'onderhoud', start: 6, end: 7 },    // jul-aug: uitlopers
                ],
                tips: 'Maart: dood blad verwijderen, bemesten. Mei: stro onder de vruchten. Jun-Jul: oogsten! Jul-Aug: uitlopers verwijderen (of verplanten). Vernieuw planten na 3-4 jaar.'
            }
        ]
    }
};

// ============================================
// DATA: Bessenstruiken
// ============================================
const BESSEN = {
    aalbes: {
        name: 'Aalbes (rode bes)',
        icon: '\u{1FAD0}',
        color: '#C62828',
        tasks: [
            { months: [11, 0, 1], task: 'Snoeien', desc: 'Verwijder oud hout (ouder dan 3 jaar). Houd 8-10 sterke takken. Snoei na bladval.' },
            { months: [2], task: 'Bemesten', desc: 'Geef compost of organische mest rond de struik.' },
            { months: [3], task: 'Mulchen', desc: 'Breng een laag mulch aan om vocht vast te houden op de zandgrond.' },
            { months: [4, 5], task: 'Oogsten', desc: 'Pluk hele trossen als de bessen diep rood zijn.' },
            { months: [6, 7], task: 'Nazorg', desc: 'Water geven bij droogte. Eventueel zomersnoei van te lange scheuten.' }
        ]
    },
    blauwe_bessen: {
        name: 'Blauwe bessen',
        icon: '\u{1FAD0}',
        color: '#283593',
        tasks: [
            { months: [1, 2], task: 'Snoeien', desc: 'Verwijder dood en kruisend hout. Neem oude takken (>4 jaar) weg.' },
            { months: [2, 3], task: 'Bemesten', desc: 'Gebruik zure meststof (rododendronmest). Blauwe bessen houden van zure grond (pH 4-5).' },
            { months: [3], task: 'Mulchen', desc: 'Mulch met dennennaalden of veencompost voor zuurgraad. Extra belangrijk op kalkrijke zandgrond.' },
            { months: [6, 7], task: 'Oogsten', desc: 'Pluk als de bessen diepblauw zijn en makkelijk loslaten. Meerdere plukbeurten.' },
            { months: [8], task: 'pH controleren', desc: 'Test de zuurgraad. Voeg eventueel zwavel of veencompost toe.' }
        ]
    },
    zwarte_bessen: {
        name: 'Zwarte bessen',
        icon: '\u{1FAD0}',
        color: '#37474F',
        tasks: [
            { months: [10, 11, 0, 1], task: 'Snoeien', desc: 'Snoei 1/3 van de oudste takken weg tot de grond. Zwarte bessen dragen het best op 1-2 jaar oud hout.' },
            { months: [2], task: 'Bemesten', desc: 'Royaal compost of verteerde mest rond de struik.' },
            { months: [3], task: 'Mulchen', desc: 'Dikke laag mulch voor vochtbehoud (zandgrond!).' },
            { months: [6, 7], task: 'Oogsten', desc: 'Pluk hele trossen als bessen zwart en glanzend zijn. Verwerk snel (jam, sap, invriezen).' }
        ]
    },
    frambozen: {
        name: 'Frambozen',
        icon: '\u{1FAD0}',
        color: '#AD1457',
        tasks: [
            { months: [1, 2], task: 'Snoeien (zomerdragend)', desc: 'Verwijder de afgedragen stengels (bruin). Bind nieuwe groene scheuten op aan draden.' },
            { months: [1, 2], task: 'Snoeien (herfstdragend)', desc: 'Snoei alle stengels kort boven de grond af.' },
            { months: [2], task: 'Bemesten', desc: 'Geef compost of organische mest. Frambozen zijn oppervlakkige wortels - niet spitten!' },
            { months: [3, 4], task: 'Opbinden & mulchen', desc: 'Bind nieuwe scheuten op. Mulch dik tegen onkruid en uitdroging.' },
            { months: [5, 6], task: 'Oogsten (zomerdragend)', desc: 'Pluk als de frambozen makkelijk loslaten. Elke 2-3 dagen plukken.' },
            { months: [7, 8, 9], task: 'Oogsten (herfstdragend)', desc: 'Herfstframbozen dragen van augustus tot de vorst.' },
            { months: [5, 6, 7, 8], task: 'Water geven', desc: 'Op zandgrond regelmatig water! Frambozen hebben oppervlakkige wortels.' }
        ]
    }
};

// ============================================
// DATA: Tuinkaart layout
// ============================================
const GARDEN_LAYOUT = {
    topRow: [
        { type: 'compost', label: 'Compost', sublabel: 'bakken', fixed: true },
        { type: 'bloemen', label: 'Bloemen', sublabel: 'Margreeth', fixed: true },
        { type: 'bloemen', label: 'Bloemen', sublabel: 'Margreeth', fixed: true },
        { type: 'aardbeien', label: 'Aardbeien', sublabel: '', fixed: true },
        { type: 'vrucht', label: 'Vrucht', sublabel: 'courgettes', rotates: true, rotateIndex: 0 },
        { type: 'vrucht', label: 'Vrucht', sublabel: 'courgettes', rotates: true, rotateIndex: 1 },
        { type: 'wortel', label: 'Wortel', sublabel: '', rotates: true, rotateIndex: 2 },
        { type: 'aardappel', label: 'Aardappel', sublabel: '', rotates: true, rotateIndex: 3 },
        { type: 'bonen-hoog', label: 'Bonen hoog', sublabel: '+ andijvie', rotates: true, rotateIndex: 4 },
        { type: 'kolen', label: 'Kolen', sublabel: '', rotates: true, rotateIndex: 5 },
        { type: 'blad', label: 'Blad', sublabel: 'raapst/rucola', rotates: true, rotateIndex: 6 },
        { type: 'blad', label: 'Blad', sublabel: '', rotates: true, rotateIndex: 7 },
        { type: 'vrucht', label: 'Vrucht', sublabel: '', rotates: true, rotateIndex: 8 },
        { type: 'vrucht', label: 'Vrucht', sublabel: '', rotates: true, rotateIndex: 9 }
    ],
    bottomRow: [
        { type: 'zitje', label: 'Zitje', sublabel: '', fixed: true },
        { type: 'bloemen', label: 'Bloemen', sublabel: 'Margreeth', fixed: true },
        { type: 'bloemen', label: 'Bloemen', sublabel: 'Margreeth', fixed: true },
        { type: 'aardbeien', label: 'Aardbeien', sublabel: '', fixed: true },
        { type: 'vrucht', label: 'Vrucht', sublabel: 'tomaten', rotates: true, rotateIndex: 0 },
        { type: 'vrucht', label: 'Vrucht', sublabel: 'courgettes', rotates: true, rotateIndex: 1 },
        { type: 'wortel', label: 'Wortel', sublabel: '', rotates: true, rotateIndex: 2 },
        { type: 'bonen-laag', label: 'Bonen laag', sublabel: 'peultjes e.d.', rotates: true, rotateIndex: 3 },
        { type: 'bonen-laag', label: 'Bonen laag', sublabel: '', rotates: true, rotateIndex: 4 },
        { type: 'bonen-hoog', label: 'Bonen hoog', sublabel: '+ andijvie', rotates: true, rotateIndex: 5 },
        { type: 'kolen', label: 'Kolen', sublabel: '', rotates: true, rotateIndex: 6 },
        { type: 'bloemen', label: 'Bloemen', sublabel: 'Margreeth', fixed: true },
        { type: 'blad', label: 'Blad', sublabel: 'kroppen', rotates: true, rotateIndex: 7 },
        { type: 'vrucht', label: 'Vrucht', sublabel: '', rotates: true, rotateIndex: 8 }
    ]
};

// Rotation sequence: the types assigned to rotateIndex positions
// These are the initial (year 0) types for the rotating beds in top row
const ROTATION_TYPES_TOP = ['vrucht', 'vrucht', 'wortel', 'aardappel', 'bonen-hoog', 'kolen', 'blad', 'blad', 'vrucht', 'vrucht'];
const ROTATION_TYPES_BOTTOM = ['vrucht', 'vrucht', 'wortel', 'bonen-laag', 'bonen-laag', 'bonen-hoog', 'kolen', 'blad', 'vrucht'];

const TYPE_COLORS = {
    vrucht: '#E8A838',
    wortel: '#D4649A',
    aardappel: '#5B8BD4',
    'bonen-hoog': '#4CAF50',
    'bonen-laag': '#81C784',
    kolen: '#2E7D32',
    blad: '#26A69A',
    bloemen: '#BA68C8',
    aardbeien: '#E53935',
    compost: '#8D6E63',
    zitje: '#9E9E9E',
    pompoen: '#FF8F00',
    bessen: '#7B1FA2'
};

const TYPE_LABELS = {
    vrucht: 'Vrucht',
    wortel: 'Wortel',
    aardappel: 'Aardappel',
    'bonen-hoog': 'Bonen hoog',
    'bonen-laag': 'Bonen laag',
    kolen: 'Kolen',
    blad: 'Blad',
    bloemen: 'Bloemen',
    aardbeien: 'Aardbeien',
    compost: 'Compost',
    zitje: 'Zitje',
    pompoen: 'Pompoen',
    bessen: 'Bessen'
};

// ============================================
// STATE
// ============================================
let selectedYear = 0; // 0 = this year, 1 = next year, etc.

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initTabs();
    initOverview();
    initGardenMap();
    initBedDetails();
    initBerrySection();
});

// ============================================
// HEADER
// ============================================
function initHeader() {
    const badge = document.getElementById('currentMonthBadge');
    badge.textContent = MAANDEN_LANG[currentMonth] + ' ' + currentYear;

    const intro = document.getElementById('currentMonthIntro');
    intro.textContent = `Taken voor ${MAANDEN_LANG[currentMonth].toLowerCase()} in de moestuin`;
}

// ============================================
// TAB NAVIGATION
// ============================================
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Set active
            tab.classList.add('active');
            const target = document.getElementById('tab-' + tab.dataset.tab);
            if (target) target.classList.add('active');

            // Scroll tab into view
            tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });
}

function switchToTab(tabId) {
    const tab = document.querySelector(`.tab[data-tab="${tabId}"]`);
    if (tab) tab.click();
}

// ============================================
// OVERVIEW: Current month tasks + yearly overview
// ============================================
function initOverview() {
    renderNowCards();
    renderOverviewGrid();
}

function renderNowCards() {
    const container = document.getElementById('nowCards');
    const cards = [];

    // Gather current month activities from all bed types
    Object.entries(BED_TYPES).forEach(([key, bed]) => {
        const currentTasks = [];
        bed.crops.forEach(crop => {
            crop.activities.forEach(act => {
                if (isMonthInRange(currentMonth, act.start, act.end)) {
                    currentTasks.push({
                        crop: crop.name,
                        activity: ACTIVITY_TYPES[act.type]?.short || act.type,
                        type: act.type
                    });
                }
            });
        });

        if (currentTasks.length > 0) {
            cards.push({
                bedKey: key,
                bedName: bed.name,
                icon: bed.icon,
                color: bed.color,
                tasks: currentTasks
            });
        }
    });

    // Berry bushes current tasks
    const berryTasks = [];
    Object.values(BESSEN).forEach(berry => {
        berry.tasks.forEach(task => {
            if (task.months.includes(currentMonth)) {
                berryTasks.push({
                    crop: berry.name,
                    activity: task.task,
                    type: 'onderhoud'
                });
            }
        });
    });

    if (berryTasks.length > 0) {
        cards.push({
            bedKey: 'bessen',
            bedName: 'Bessenstruiken',
            icon: '\u{1FAD0}',
            color: '#7B1FA2',
            tasks: berryTasks
        });
    }

    container.innerHTML = cards.map(card => `
        <div class="now-card" style="border-left-color: ${card.color}" onclick="switchToTab('${card.bedKey}')">
            <div class="now-card-header">
                <span class="now-card-icon">${card.icon}</span>
                <span class="now-card-type" style="color: ${card.color}">${card.bedName}</span>
            </div>
            <ul class="now-card-tasks">
                ${card.tasks.map(t => `
                    <li>
                        <span class="activity-badge ${t.type}">${t.activity}</span>
                        ${t.crop}
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

function renderOverviewGrid() {
    const container = document.getElementById('overviewGrid');
    const beds = Object.entries(BED_TYPES);

    container.innerHTML = beds.map(([key, bed]) => `
        <div class="overview-bed" onclick="switchToTab('${key}')">
            <div class="overview-bed-header">
                <span class="bed-color-dot" style="background: ${bed.color}"></span>
                <h3>${bed.icon} ${bed.name}</h3>
            </div>
            <div class="overview-bed-calendar">
                ${renderCalendarTable(bed.crops)}
            </div>
        </div>
    `).join('');
}

function renderCalendarTable(crops) {
    const monthHeaders = MAANDEN.map((m, i) =>
        `<th class="${i === currentMonth ? 'current-month' : ''}">${m}</th>`
    ).join('');

    const rows = [];
    crops.forEach(crop => {
        // For each activity type of this crop, create a row
        crop.activities.forEach(act => {
            const cells = [];
            for (let m = 0; m < 12; m++) {
                const active = isMonthInRange(m, act.start, act.end);
                const cls = m === currentMonth ? 'current-month-col' : '';
                cells.push(`<td class="${cls}">${active ? `<div class="cal-bar ${act.type}"></div>` : ''}</td>`);
            }
            rows.push(`<tr><td class="crop-name">${crop.name} <small style="color:${ACTIVITY_TYPES[act.type]?.color || '#999'}">${ACTIVITY_TYPES[act.type]?.short || act.type}</small></td>${cells.join('')}</tr>`);
        });
    });

    return `
        <table class="calendar-table">
            <thead><tr><th style="width:120px;min-width:120px">Gewas</th>${monthHeaders}</tr></thead>
            <tbody>${rows.join('')}</tbody>
        </table>
    `;
}

function isMonthInRange(month, start, end) {
    if (start <= end) {
        return month >= start && month <= end;
    }
    // Wraps around year (e.g., okt-feb)
    return month >= start || month <= end;
}

// ============================================
// GARDEN MAP
// ============================================
function initGardenMap() {
    const yearLabel = document.getElementById('yearLabel');
    const yearPrev = document.getElementById('yearPrev');
    const yearNext = document.getElementById('yearNext');

    yearPrev.addEventListener('click', () => {
        selectedYear = Math.max(-2, selectedYear - 1);
        renderGardenMap();
    });

    yearNext.addEventListener('click', () => {
        selectedYear = Math.min(5, selectedYear + 1);
        renderGardenMap();
    });

    renderGardenMap();
}

function getRotatedType(types, index, yearOffset) {
    const len = types.length;
    // Rotating right means the crop at index i came from index (i - yearOffset) mod len
    const sourceIndex = ((index - yearOffset) % len + len) % len;
    return types[sourceIndex];
}

function renderGardenMap() {
    const container = document.getElementById('gardenMap');
    const yearLabel = document.getElementById('yearLabel');
    const displayYear = currentYear + selectedYear;

    yearLabel.textContent = selectedYear === 0 ? `${displayYear} (huidig)` :
                            selectedYear > 0 ? `${displayYear} (+${selectedYear} jaar)` :
                            `${displayYear} (${selectedYear} jaar)`;

    // Build top row with rotation
    const topBeds = GARDEN_LAYOUT.topRow.map(bed => {
        if (bed.rotates) {
            const newType = getRotatedType(ROTATION_TYPES_TOP, bed.rotateIndex, selectedYear);
            return { ...bed, type: newType, label: TYPE_LABELS[newType] || newType, sublabel: '' };
        }
        return bed;
    });

    // Build bottom row with rotation
    const bottomBeds = GARDEN_LAYOUT.bottomRow.map(bed => {
        if (bed.rotates) {
            const newType = getRotatedType(ROTATION_TYPES_BOTTOM, bed.rotateIndex, selectedYear);
            return { ...bed, type: newType, label: TYPE_LABELS[newType] || newType, sublabel: '' };
        }
        return bed;
    });

    container.innerHTML = `
        <div class="garden-water">Sloot (noordzijde)</div>
        <div class="garden-row-label">Bovenste rij</div>
        <div class="garden-row">
            ${topBeds.map(bed => renderGardenBed(bed)).join('')}
        </div>
        <div class="garden-path">Houtsnipper pad</div>
        <div class="garden-row-label">Onderste rij</div>
        <div class="garden-row">
            ${bottomBeds.map(bed => renderGardenBed(bed)).join('')}
        </div>
        <div class="garden-water" style="margin-top: 0.5rem;">Sloot (oostzijde) &nbsp; | &nbsp; Bessenstruiken &nbsp; | &nbsp; Pompoenbed</div>
    `;

    // Render legend
    const legendContainer = document.getElementById('gardenLegend');
    const usedTypes = new Set();
    [...topBeds, ...bottomBeds].forEach(b => usedTypes.add(b.type));

    legendContainer.innerHTML = Array.from(usedTypes).map(type => `
        <div class="garden-legend-item">
            <span class="garden-legend-color" style="background: ${TYPE_COLORS[type] || '#999'}"></span>
            ${TYPE_LABELS[type] || type}
        </div>
    `).join('');
}

function renderGardenBed(bed) {
    const color = TYPE_COLORS[bed.type] || '#999';
    return `
        <div class="garden-bed" style="background: ${color}">
            <span class="bed-label">${bed.label}</span>
            ${bed.sublabel ? `<span class="bed-sublabel">${bed.sublabel}</span>` : ''}
        </div>
    `;
}

// ============================================
// BED DETAIL PAGES
// ============================================
function initBedDetails() {
    Object.entries(BED_TYPES).forEach(([key, bed]) => {
        const section = document.getElementById('tab-' + key);
        if (!section) return;

        section.innerHTML = `
            <div class="bed-detail-header" style="border-left-color: ${bed.color}">
                <span class="bed-detail-icon">${bed.icon}</span>
                <div class="bed-detail-info">
                    <h2>${bed.name}</h2>
                    <p>${bed.description}</p>
                </div>
            </div>

            <div class="legend" style="margin-bottom: 1rem;">
                <div class="legend-item"><span class="legend-color" style="background:#7E57C2"></span> Voorzaaien (binnen)</div>
                <div class="legend-item"><span class="legend-color" style="background:#43A047"></span> Buiten zaaien</div>
                <div class="legend-item"><span class="legend-color" style="background:#FB8C00"></span> Uitplanten / Poten</div>
                <div class="legend-item"><span class="legend-color" style="background:#E53935"></span> Oogsten</div>
                <div class="legend-item"><span class="legend-color" style="background:#6D4C41"></span> Onderhoud</div>
            </div>

            ${bed.crops.map((crop, i) => renderCropCard(crop, i, bed.color)).join('')}

            <div class="crop-tips sandy-soil-tip" style="margin-top: 1rem;">
                <h4>Tip zandgrond Vogelenzang</h4>
                <p>${bed.soilTip}</p>
            </div>
        `;

        // Add click handlers for accordion
        section.querySelectorAll('.crop-card-header').forEach(header => {
            header.addEventListener('click', () => {
                header.parentElement.classList.toggle('open');
            });
        });
    });
}

function renderCropCard(crop, index, bedColor) {
    // Find if any activity is current
    const isCurrentlyActive = crop.activities.some(act =>
        isMonthInRange(currentMonth, act.start, act.end)
    );

    return `
        <div class="crop-card ${index === 0 || isCurrentlyActive ? 'open' : ''}">
            <div class="crop-card-header">
                <h3>${crop.name} ${isCurrentlyActive ? '<span style="color:#2E7D32; font-size:0.8rem;">actief</span>' : ''}</h3>
                <span class="crop-card-toggle">\u25BC</span>
            </div>
            <div class="crop-card-body">
                <div class="crop-calendar-wrapper">
                    ${renderCropTimeline(crop)}
                </div>
                <div class="crop-tips">
                    <h4>Tips</h4>
                    <p>${crop.tips}</p>
                </div>
            </div>
        </div>
    `;
}

function renderCropTimeline(crop) {
    // Month headers
    const monthHeaders = MAANDEN.map((m, i) =>
        `<th class="${i === currentMonth ? 'current-month' : ''}" style="font-size:0.7rem;padding:0.3rem 0.15rem;text-align:center">${m}</th>`
    ).join('');

    // Activity rows
    const rows = crop.activities.map(act => {
        const cells = [];
        for (let m = 0; m < 12; m++) {
            const active = isMonthInRange(m, act.start, act.end);
            const cls = m === currentMonth ? 'current-month-col' : '';
            cells.push(`<td class="${cls}" style="padding:0.2rem 0.1rem">${active ? `<div class="cal-bar ${act.type}" title="${ACTIVITY_TYPES[act.type]?.label || act.type}"></div>` : ''}</td>`);
        }
        const label = ACTIVITY_TYPES[act.type]?.short || act.type;
        return `<tr><td class="crop-name" style="width:100px;min-width:100px"><small style="color:${ACTIVITY_TYPES[act.type]?.color || '#999'};font-weight:600">${label}</small></td>${cells.join('')}</tr>`;
    });

    return `
        <table class="calendar-table" style="min-width:500px">
            <thead><tr><th style="width:100px;min-width:100px"></th>${monthHeaders}</tr></thead>
            <tbody>${rows.join('')}</tbody>
        </table>
    `;
}

// ============================================
// BERRY BUSHES SECTION
// ============================================
function initBerrySection() {
    const section = document.getElementById('tab-bessen');
    if (!section) return;

    section.innerHTML = `
        <div class="bed-detail-header" style="border-left-color: #7B1FA2">
            <span class="bed-detail-icon">\u{1FAD0}</span>
            <div class="bed-detail-info">
                <h2>Bessenstruiken</h2>
                <p>Aalbes, blauwe bessen, zwarte bessen en frambozen. Onderhoud en oogstkalender.</p>
            </div>
        </div>

        <div class="berry-grid">
            ${Object.values(BESSEN).map(berry => renderBerryCard(berry)).join('')}
        </div>

        <div class="crop-tips sandy-soil-tip">
            <h4>Bessen op zandgrond in Vogelenzang</h4>
            <ul>
                <li><strong>Mulchen is cruciaal:</strong> zandgrond droogt snel uit. Gebruik een dikke laag compost, stro of houtsnippers.</li>
                <li><strong>Blauwe bessen:</strong> hebben zure grond nodig (pH 4-5). Zandgrond is vaak neutraal/basisch. Gebruik veencompost en dennennaalden.</li>
                <li><strong>Wind:</strong> bessenstruiken bieden ook beschutting aan de moestuin tegen de kustwind.</li>
                <li><strong>Water:</strong> geef regelmatig water in droge perioden, vooral tijdens de vruchtvorming.</li>
            </ul>
        </div>
    `;
}

function renderBerryCard(berry) {
    const allMonthTasks = [];
    for (let m = 0; m < 12; m++) {
        const monthTasks = berry.tasks.filter(t => t.months.includes(m));
        if (monthTasks.length > 0) {
            allMonthTasks.push({
                month: m,
                tasks: monthTasks,
                isCurrent: m === currentMonth
            });
        }
    }

    return `
        <div class="berry-card">
            <div class="berry-card-header" style="background: ${berry.color}">
                ${berry.icon} ${berry.name}
            </div>
            <div class="berry-card-body">
                ${allMonthTasks.map(mt => `
                    <div class="berry-task ${mt.isCurrent ? 'berry-task-active' : ''}">
                        <span class="berry-task-month">${MAANDEN[mt.month]}</span>
                        <span class="berry-task-desc">
                            ${mt.tasks.map(t => `<strong>${t.task}:</strong> ${t.desc}`).join('<br>')}
                        </span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}
