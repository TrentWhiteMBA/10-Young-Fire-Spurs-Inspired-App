/**
 * YoungFire Imperial Biblical Journeys Data
 * Consecrated maps & apostolic journey trajectories for character exploration.
 */

export interface JourneyStop {
  name: string;
  scripture: string;
  coords: [number, number];
  note: string;
  bookId: string;
  chapter: number;
}

export interface CharacterJourney {
  id: string;
  title: string;
  character: string;
  period: string;
  scriptures: string[];
  stops: JourneyStop[];
}

export const BIBLICAL_JOURNEYS: CharacterJourney[] = [
  // 1. KING DAVID'S COVENANT HERO TRAJECTORY
  {
    id: 'king_david',
    title: "King David: From Shepherd to Crowned King",
    character: 'David, Son of Jesse',
    period: 'c. 1040 – 970 BC',
    scriptures: ['1 Samuel 16–31', '2 Samuel 1–6', '1 Chronicles 11–16'],
    stops: [
      {
        name: 'Bethlehem (Anointing by Samuel)',
        scripture: '1 Samuel 16:1–13',
        coords: [31.7054, 35.2024],
        note: 'Samuel is sent to Jesse’s house to anoint young David as God’s chosen king while he tends the sheep in the pastures of Judea.',
        bookId: '1SA',
        chapter: 16
      },
      {
        name: 'Valley of Elah (Goliath Defeated)',
        scripture: '1 Samuel 17:1–58',
        coords: [31.6833, 34.9833],
        note: 'David confronts Goliath with a sling and five smooth stones, proclaiming: "The battle is the Lord’s!" and delivering Israel.',
        bookId: '1SA',
        chapter: 17
      },
      {
        name: 'Cave of Adullam (Outcast Band)',
        scripture: '1 Samuel 22:1–5',
        coords: [31.6500, 34.9667],
        note: 'Fleeing King Saul, David shelters in the stronghold of Adullam; 400 distressed, indebted, and discontented men gather to become his mighty warriors.',
        bookId: '1SA',
        chapter: 22
      },
      {
        name: 'En-Gedi (Wilderness Mercy & Spring)',
        scripture: '1 Samuel 24:1–22',
        coords: [31.4667, 35.3833],
        note: 'In the crags of the wild goats by the Dead Sea, David cuts the corner of Saul’s robe but spares his life, refusing to touch the Lord’s anointed.',
        bookId: '1SA',
        chapter: 24
      },
      {
        name: 'Hebron (Crowned King of Judah & Israel)',
        scripture: '2 Samuel 2:1–4 & 5:1–5',
        coords: [31.5297, 35.0938],
        note: 'David is anointed king over Judah at Hebron, reigning 7 years before the elders of all 12 tribes unite to crown him over all Israel.',
        bookId: '2SA',
        chapter: 2
      },
      {
        name: 'Jerusalem (City of David & Ark Return)',
        scripture: '2 Samuel 5:6–10 & 6:12–19',
        coords: [31.7767, 35.2356],
        note: 'David captures Mount Zion stronghold, establishing the City of David, and dances with all his might as the Ark of the Covenant enters the holy city.',
        bookId: '2SA',
        chapter: 6
      }
    ]
  },

  // 2. APOSTLE JOHN: THE BELOVED WITNESS
  {
    id: 'apostle_john',
    title: "Apostle John: Calling, Witness, Ephesus & Patmos",
    character: 'Apostle John the Beloved',
    period: 'c. AD 30 – 98',
    scriptures: ['Matthew 4:21–22', 'John 19:25–27', 'Acts 8:14–17', 'Revelation 1:9–19'],
    stops: [
      {
        name: 'Sea of Galilee (Calling of the Fishermen)',
        scripture: 'Matthew 4:21–22',
        coords: [32.8800, 35.5700],
        note: 'Jesus calls John and his brother James (Sons of Thunder) mending their nets; they immediately leave their boat and father to follow Christ.',
        bookId: 'MAT',
        chapter: 4
      },
      {
        name: 'Jerusalem (Upper Room & The Cross)',
        scripture: 'John 19:25–27 & Acts 1:13–14',
        coords: [31.7683, 35.2137],
        note: 'John reclines on Jesus’ bosom at the Last Supper, stands faithfully at Calvary where Jesus entrusts Mary to him, and witnesses the empty tomb.',
        bookId: 'JHN',
        chapter: 19
      },
      {
        name: 'Samaria (Apostolic Witness & Holy Ghost)',
        scripture: 'Acts 8:14–17',
        coords: [32.2778, 35.1889],
        note: 'Sent with Peter from Jerusalem to Samaria; they prayed and laid hands on Samaritan believers so they received the Holy Ghost.',
        bookId: 'ACT',
        chapter: 8
      },
      {
        name: 'Ephesus (Elder & Pillar of the Church)',
        scripture: '1 John 1:1–4 & 2 John 1:1',
        coords: [37.9497, 27.3639],
        note: 'John shepherds the churches of Asia Minor from Ephesus, writing his Gospel and Epistles proclaiming: "God is love; and he that dwelleth in love dwelleth in God."',
        bookId: '1JN',
        chapter: 1
      },
      {
        name: 'Isle of Patmos (Revelation of Jesus Christ)',
        scripture: 'Revelation 1:9–19',
        coords: [37.3090, 26.5450],
        note: 'Exiled to the Aegean island of Patmos for the Word of God; in the Spirit on the Lord’s Day, he beholds the glorified Christ and receives the Apocalypse.',
        bookId: 'REV',
        chapter: 1
      }
    ]
  },

  // 3. APOSTLE PAUL: 2ND MISSIONARY JOURNEY
  {
    id: 'paul_missionary',
    title: "Apostle Paul: 2nd Missionary Journey",
    character: 'Paul & Silas',
    period: 'AD 49–52',
    scriptures: ['Acts 15:36–18:22'],
    stops: [
      { name: 'Antioch (Commissioning)', scripture: 'Acts 15:36–41', coords: [36.2021, 36.1606], note: 'Strengthening churches across Syria and Cilicia.', bookId: 'ACT', chapter: 15 },
      { name: 'Troas (Macedonian Call)', scripture: 'Acts 16:8–10', coords: [39.75, 26.16], note: 'Vision of the man of Macedonia pleading: "Come over and help us!"', bookId: 'ACT', chapter: 16 },
      { name: 'Philippi (Midnight Praise)', scripture: 'Acts 16:11–40', coords: [41.0133, 24.2867], note: 'Lydia baptized; jailer saved when an earthquake shook open prison gates.', bookId: 'ACT', chapter: 16 },
      { name: 'Thessalonica & Berea', scripture: 'Acts 17:1–14', coords: [40.6401, 22.9444], note: 'Berean believers searched the Scriptures daily to verify the truth.', bookId: 'ACT', chapter: 17 },
      { name: 'Athens (Mars Hill)', scripture: 'Acts 17:16–34', coords: [37.9715, 23.7257], note: 'Preaching the "Unknown God" and Resurrection at the Areopagus.', bookId: 'ACT', chapter: 17 },
      { name: 'Corinth (18 Months Stay)', scripture: 'Acts 18:1–18', coords: [37.9056, 22.8797], note: 'Ministry with Priscilla and Aquila; written correspondence to churches.', bookId: 'ACT', chapter: 18 }
    ]
  },

  // 4. ABRAHAM: THE COVENANT JOURNEY OF FAITH
  {
    id: 'abraham_faith',
    title: "Abraham: The Covenant Journey of Faith",
    character: 'Abraham & Sarah',
    period: 'c. 2000 BC',
    scriptures: ['Genesis 12:1–9', 'Hebrews 11:8–10'],
    stops: [
      { name: 'Ur of the Chaldees', scripture: 'Genesis 11:31', coords: [30.9622, 46.1031], note: 'Original ancestral home in southern Mesopotamia.', bookId: 'GEN', chapter: 11 },
      { name: 'Haran (The Divine Call)', scripture: 'Genesis 12:1–4', coords: [36.8667, 39.0333], note: '"Get thee out of thy country... unto a land that I will shew thee."', bookId: 'GEN', chapter: 12 },
      { name: 'Shechem (First Altar)', scripture: 'Genesis 12:6–7', coords: [32.2133, 35.2833], note: 'God appeared and promised the land to Abraham’s seed.', bookId: 'GEN', chapter: 12 },
      { name: 'Hebron (Oak of Mamre)', scripture: 'Genesis 13:18', coords: [31.5297, 35.0938], note: 'Covenant confirmed; burial place of the Patriarchs in Machpelah.', bookId: 'GEN', chapter: 13 }
    ]
  },

  // 5. MOSES: EXODUS & WILDERNESS DELIVERANCE
  {
    id: 'exodus_deliverance',
    title: "Moses: Exodus & Wilderness Wonderings",
    character: 'Moses & Israel',
    period: 'c. 1446 BC',
    scriptures: ['Exodus 12–19', 'Deuteronomy 34:1–5'],
    stops: [
      { name: 'Rameses & Goshen', scripture: 'Exodus 12:37', coords: [30.8, 31.8], note: 'Passover night of deliverance from Egyptian bondage.', bookId: 'EXO', chapter: 12 },
      { name: 'Red Sea Crossing', scripture: 'Exodus 14:21–31', coords: [29.9, 32.5], note: 'Waters parted miraculously; pillar of cloud and fire.', bookId: 'EXO', chapter: 14 },
      { name: 'Mount Sinai', scripture: 'Exodus 19:1–20:21', coords: [28.5394, 33.9753], note: 'Giving of the Law and blueprint of the Tabernacle.', bookId: 'EXO', chapter: 20 },
      { name: 'Mount Nebo', scripture: 'Deuteronomy 34:1–4', coords: [31.7683, 35.725], note: 'Moses viewed the Promised Land across Jordan before his rest.', bookId: 'DEU', chapter: 34 }
    ]
  },

  // 6. ELIJAH: CARMEL TO HOREB
  {
    id: 'elijah_revival',
    title: "Elijah: Mount Carmel to Mount Horeb",
    character: 'Elijah the Tishbite',
    period: 'c. 860 BC',
    scriptures: ['1 Kings 18–19'],
    stops: [
      { name: 'Mount Carmel (Fire from Heaven)', scripture: '1 Kings 18:20–40', coords: [32.73, 35.05], note: 'Contest with 450 prophets of Baal; fire of God consumed the sacrifice; people cried "The LORD, he is the God!"', bookId: '1KI', chapter: 18 },
      { name: 'Beersheba (Strengthened by Angel)', scripture: '1 Kings 19:3–4', coords: [31.25, 34.79], note: 'Fled south to Beersheba; prayed under the broom tree; angel provided baked cake and cruse of water.', bookId: '1KI', chapter: 19 },
      { name: 'Mount Horeb (The Still Small Voice)', scripture: '1 Kings 19:8–18', coords: [28.5394, 33.9753], note: 'Walked 40 days to the mount of God; the LORD revealed Himself not in wind or quake, but in a still small voice.', bookId: '1KI', chapter: 19 }
    ]
  },

  // 7. JESUS: GALILEAN MINISTRY & PASSION WEEK
  {
    id: 'jesus_ministry',
    title: "Jesus: Galilean Ministry & Passion Week",
    character: 'Jesus the Messiah',
    period: 'c. AD 30–33',
    scriptures: ['Matthew 4–28', 'Luke 4–24'],
    stops: [
      { name: 'Nazareth', scripture: 'Luke 4:16–30', coords: [32.70, 35.30], note: 'Childhood home; proclaimed Isaiah 61 in the synagogue.', bookId: 'LUK', chapter: 4 },
      { name: 'Capernaum', scripture: 'Matthew 4:13–17', coords: [32.88, 35.57], note: 'Base of Galilean ministry; healing of centurion’s servant.', bookId: 'MAT', chapter: 4 },
      { name: 'Caesarea Philippi', scripture: 'Matthew 16:13–20', coords: [33.24, 35.69], note: 'Peter’s confession: "Thou art the Christ, Son of the Living God!"', bookId: 'MAT', chapter: 16 },
      { name: 'Jericho', scripture: 'Luke 19:1–10', coords: [31.86, 35.46], note: 'Encounter with Zacchaeus; healing of blind Bartimaeus.', bookId: 'LUK', chapter: 19 },
      { name: 'Jerusalem & Mount Calvary', scripture: 'Luke 22–24', coords: [31.778, 35.234], note: 'The Last Supper, Gethsemane, Crucifixion, and glorious Resurrection!', bookId: 'LUK', chapter: 24 }
    ]
  },

  // 8. PAUL: VOYAGE TO ROME
  {
    id: 'paul_rome',
    title: "Paul: Voyage to Rome & Shipwreck at Malta",
    character: 'Apostle Paul',
    period: 'c. AD 59–62',
    scriptures: ['Acts 27–28'],
    stops: [
      { name: 'Caesarea Maritima', scripture: 'Acts 27:1', coords: [32.50, 34.89], note: 'Paul appealed to Caesar and boarded ship for Italy.', bookId: 'ACT', chapter: 27 },
      { name: 'Fair Havens, Crete', scripture: 'Acts 27:8', coords: [34.92, 24.81], note: 'Paul advised against sailing; tempest Euroclydon struck.', bookId: 'ACT', chapter: 27 },
      { name: 'Malta (Shipwreck & Snake)', scripture: 'Acts 28:1–10', coords: [35.93, 14.37], note: 'All 276 souls saved; viper shook off into fire without harm.', bookId: 'ACT', chapter: 28 },
      { name: 'Rome (Hired House)', scripture: 'Acts 28:16–31', coords: [41.9028, 12.4964], note: 'Paul preached the kingdom of God unhindered for 2 full years.', bookId: 'ACT', chapter: 28 }
    ]
  },

  // 9. JOSEPH: PIT TO PALACE
  {
    id: 'joseph_providence',
    title: "Joseph: From the Pit of Dothan to the Throne of Egypt",
    character: 'Joseph, Son of Jacob',
    period: 'c. 1898 – 1805 BC',
    scriptures: ['Genesis 37–50'],
    stops: [
      { name: 'Hebron Valley (Coat of Many Colors)', scripture: 'Genesis 37:14', coords: [31.53, 35.09], note: 'Sent by father Jacob to check on his brothers pasturing flocks.', bookId: 'GEN', chapter: 37 },
      { name: 'Dothan (The Pit & Sold into Slavery)', scripture: 'Genesis 37:17–28', coords: [32.41, 35.24], note: 'Stripped of coat; cast into empty cistern; sold to Ishmeelite caravan for 20 pieces of silver.', bookId: 'GEN', chapter: 37 },
      { name: 'On / Heliopolis & Potiphar House', scripture: 'Genesis 39:1–20', coords: [30.13, 31.31], note: 'Served faithfully; fled Potiphar’s wife; falsely accused and cast into prison.', bookId: 'GEN', chapter: 39 },
      { name: 'Memphis / Pharaoh Court (Viceroy)', scripture: 'Genesis 41:37–45', coords: [29.85, 31.25], note: 'Interpreted Pharaoh’s 7-year famine dream; elevated to Governor over all Egypt.', bookId: 'GEN', chapter: 41 },
      { name: 'Land of Goshen (Family Reconciliation)', scripture: 'Genesis 45:1–10 & Genesis 50:20', coords: [30.75, 31.85], note: '"Ye thought evil against me; but God meant it unto good, to save much people alive."', bookId: 'GEN', chapter: 50 }
    ]
  },

  // 10. JONAH: FLIGHT & AWAKENING
  {
    id: 'jonah_nineveh',
    title: "Jonah: Flight to Tarshish & The Nineveh Awakening",
    character: 'Jonah the Prophet',
    period: 'c. 760 BC',
    scriptures: ['Jonah 1–4', 'Matthew 12:40'],
    stops: [
      { name: 'Gath-hepher (Galilee Home)', scripture: '2 Kings 14:25', coords: [32.74, 35.33], note: 'Jonah’s hometown; received the Word of the Lord to cry against Nineveh.', bookId: 'JON', chapter: 1 },
      { name: 'Joppa (Port of Flight)', scripture: 'Jonah 1:3', coords: [32.05, 34.75], note: 'Fled from presence of the Lord; paid fare onto ship destined for Tarshish.', bookId: 'JON', chapter: 1 },
      { name: 'Mediterranean Deep (Great Fish)', scripture: 'Jonah 1:17 & 2:1–10', coords: [33.50, 32.00], note: 'Cast into sea; swallowed by great fish 3 days and 3 nights; prayed prayer of salvation.', bookId: 'JON', chapter: 2 },
      { name: 'Nineveh (A Great City Repents)', scripture: 'Jonah 3:1–10', coords: [36.36, 43.15], note: 'Preached 40-day judgment; King and 120,000 citizens fasted in sackcloth and ashes.', bookId: 'JON', chapter: 3 }
    ]
  },

  // 11. PHILIP: DESERT ROAD & COASTAL REVIVAL
  {
    id: 'philip_evangelist',
    title: "Philip: Jerusalem to Desert Road, Azotus & Caesarea",
    character: 'Philip the Evangelist',
    period: 'c. AD 34–36',
    scriptures: ['Acts 8:26–40'],
    stops: [
      { name: 'Jerusalem (Commission to Desert Road)', scripture: 'Acts 8:26', coords: [31.7683, 35.2137], note: 'Angel commanded: "Arise, and go toward the south unto the way that goeth down from Jerusalem unto Gaza, which is desert."', bookId: 'ACT', chapter: 8 },
      { name: 'Desert Road of Gaza (Ethiopian Eunuch)', scripture: 'Acts 8:27–38', coords: [31.50, 34.46], note: 'Joined chariot; opened Isaiah 53; baptized the Ethiopian superintendent of Candace.', bookId: 'ACT', chapter: 8 },
      { name: 'Azotus / Ashdod (Caught Away by Spirit)', scripture: 'Acts 8:39–40', coords: [31.80, 34.65], note: 'The Spirit caught away Philip; found at Azotus preaching through all the coastal towns.', bookId: 'ACT', chapter: 8 },
      { name: 'Caesarea (Evangelist Base)', scripture: 'Acts 8:40', coords: [32.50, 34.89], note: 'Settled in Caesarea, hosting believers and proclaiming the gospel across the Levant.', bookId: 'ACT', chapter: 8 }
    ]
  },

  // 12. PETER: JOPPA TO CAESAREA
  {
    id: 'peter_apostle',
    title: "Peter: Joppa to Caesarea (Cornelius Revival)",
    character: 'Apostle Peter',
    period: 'c. AD 38–41',
    scriptures: ['Acts 10:1–48'],
    stops: [
      { name: 'Joppa (Rooftop Vision of Great Sheet)', scripture: 'Acts 10:9–23', coords: [32.05, 34.75], note: 'Trance vision on rooftop by the sea: "What God hath cleansed, that call not thou common."', bookId: 'ACT', chapter: 10 },
      { name: 'Caesarea (House of Cornelius & Gentile Pentecost)', scripture: 'Acts 10:24–48', coords: [32.50, 34.89], note: 'Gentiles heard the Word; Holy Ghost fell upon all; baptized in Jesus name.', bookId: 'ACT', chapter: 10 }
    ]
  }
];
