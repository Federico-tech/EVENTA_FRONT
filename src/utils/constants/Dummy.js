import Assets from "./Assets"

const EventData = [
  {
    id: "EVENT01",
    name: "COCO CRAZY PARTY",
    organiser: {
        name: 'COCOCLUBBING',
        adress: "Via del Cantiere, 15, 24065 Lovere, BG",
        profileImage: Assets.OrganiserImage1
    },
    nPerson: 34,
    time: '10:30 PM',
    date: 'sab, 20 Nov 2022', 
    adress: "Via del Cantiere, 15, 24065 Lovere, BG",
    description: "La notte in discoteca promette di essere un evento indimenticabile, con musica per tutti i gusti e un'atmosfera coinvolgente. Alle 21:00 apriranno le porte del locale, dove sarà possibile entrare e prendere posto nella sala principale, decorata con luci soffuse e colorate. A partire dalle 22:00 si alterneranno alla consolle DJ di fama internazionale, che faranno ballare il pubblico fino all'alba con le loro performance esclusive. Durante la serata sarà possibile gustare una selezione di drink e cocktail presso il bar, situato nella parte posteriore della sala. Per chi vuole rinfrescarsi, ci sarà anche un'area all'aperto dove sarà possibile prendere una boccata d'aria. Per rendere l'atmosfera ancora più coinvolgente, ci saranno anche spettacoli di ballo e animazione a tema, che intratterranno il pubblico durante le pause tra un DJ e l'altro. All'interno della discoteca sarà presente anche un'area riservata ai fumatori, dove sarà possibile accendersi una sigaretta in tutta tranquillità. Insomma, non mancherà davvero nulla per trascorrere una notte indimenticabile in compagnia di amici e conoscenti, ballando fino all'alba al ritmo della migliore musica internazionale. Non perdere l'occasione di vivere un'esperienza unica e prenota subito il tuo ingresso per la prossima notte in discoteca!",
    image: Assets.EventImage1,
    likes: 350,
    whosGoing: [
      {
        id: 'Person1',
        name: 'RiccardoCarizzoni',
        surname: 'Riccardo_Carizzoni',
        profileImage: Assets.ProfileImage1
      },
      {
        id: 'Person2',
        name: 'FedericoLentini',
        surname: 'Federico_Lentini',
        profileImage: Assets.ProfileImage2
      },
      {
        id: 'Person3',
        name: 'RiccardoCarizzoni',
        surname: 'Riccardo_Carizzoni',
        profileImage: Assets.ProfileImage3
      },
      {
        id: 'Person4',
        name: 'RiccardoCarizzoni',
        surname: 'Riccardo_Carizzoni',
        profileImage: Assets.ProfileImage4
      },
    ]
  },

  {
    id: "EVENT02",
    name: "ONESPACE CRAZY PARTY",
    organiser: {
        name: 'OneSpace',
        adress: "Via del Cantiere, 15, 24065 Lovere, BG",
        profileImage: Assets.OrganiserImage2
    },
    nPerson: 24,
    time: '10:30 PM',
    date: 'mar, 30 Dic 2022',
    adress: "Via Toroselle, 12/C, 25040 Esine BS",
    description: "Cocò Snow PartySabato 10 Dicembre, vestiti a tema neve e vinci ricchi premi! Stupiscici col tuo outfit e vinci un tavolo al Cocò ",
    image: Assets.EventImage2,
    likes: 437,
    whosGoing: [
      {
        id: 'Person1',
        name: 'RiccardoCarizzoni',
        surname: 'Riccardo_Carizzoni',
        profileImage: Assets.ProfileImage1
      },
      {
        id: 'Person2',
        name: 'FedericoLentini',
        surname: 'Federico_Lentini',
        profileImage: Assets.ProfileImage2
      },
      {
        id: 'Person3',
        name: 'RiccardoCarizzoni',
        surname: 'Riccardo_Carizzoni',
        profileImage: Assets.ProfileImage3
      },
      {
        id: 'Person4',
        name: 'RiccardoCarizzoni',
        surname: 'Riccardo_Carizzoni',
        profileImage: Assets.ProfileImage4
      },
    ]
  },

  {
    id: "EVENT03",
    name: "NUMBER CRAZY PARTY",
    organiser: {
        name: 'NumberOneDisco',
        adress: "Via Provinciale, 1/B Cortefranca (Bs)",
        profileImage: Assets.OrganiserImage3
    },
    nPerson: 54,
    time: '10:30 PM',
    date: 'Lun, 20 Dic 2022',
    adress: "Via Provinciale, 1/B Cortefranca (Bs)",
    description: "Cocò Snow PartySabato 10 Dicembre, vestiti a tema neve e vinci ricchi premi! Stupiscici col tuo outfit e vinci un tavolo al Cocò ",
    image: Assets.EventImage3,
    likes: 277,
    whosGoing: [
      {
        id: 'Person1',
        name: 'RiccardoCarizzoni',
        surname: 'Riccardo_Carizzoni',
        profileImage: Assets.ProfileImage1
      },
      {
        id: 'Person2',
        name: 'FedericoLentini',
        surname: 'Federico_Lentini',
        profileImage: Assets.ProfileImage2
      },
      {
        id: 'Person3',
        name: 'RiccardoCarizzoni',
        surname: 'Riccardo_Carizzoni',
        profileImage: Assets.ProfileImage3
      },
      {
        id: 'Person4',
        name: 'RiccardoCarizzoni',
        surname: 'Riccardo_Carizzoni',
        profileImage: Assets.ProfileImage4
      },
    ]
  },
]

export { EventData }