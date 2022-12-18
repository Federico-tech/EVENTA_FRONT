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
    description: "Cocò Snow PartySabato 10 Dicembre, vestiti a tema neve e vinci ricchi premi! Stupiscici col tuo outfit e vinci un tavolo al Cocò ",
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