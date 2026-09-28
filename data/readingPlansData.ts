/**
 * YoungFire Dedicated Bible Reading Plans & Day-by-Day Discipleship Engine
 * Tailored for General Discipleship, Men On Fire (Brotherhood), and Women Ignited (Sisterhood).
 */

export interface ReadingPlanDay {
  dayNumber: number;
  title: string;
  scriptureReference: string;
  bookId: string; // Canon Book ID (e.g. "ROM", "EPH", "1TI", "PSA", etc.)
  chapter: number;
  devotionalFocus: string;
  keyVerse: string;
  reflectionPrompt: string;
  practicalAction: string;
}

export interface ReadingPlan {
  id: string;
  title: string;
  subtitle: string;
  category: 'general' | 'men' | 'women';
  durationDays: number;
  badge: string;
  description: string;
  accentColor: 'orange' | 'amber' | 'rose' | 'cyan' | 'purple' | 'emerald';
  themeScripture: string;
  coverImage?: string;
  days: ReadingPlanDay[];
}

export const READING_PLANS: ReadingPlan[] = [
  // -------------------------------------------------------------
  // 1. GENERAL DISCIPLESHIP PLANS
  // -------------------------------------------------------------
  {
    id: 'yf_foundations_7day',
    title: '7-Day Foundations of Young Fire',
    subtitle: 'Consecration, Holy Identity, and Living Sacrifices',
    category: 'general',
    durationDays: 7,
    badge: '7-DAY GENERAL DISCIPLESHIP',
    accentColor: 'amber',
    themeScripture: '1 Timothy 4:12 — Let no man despise thy youth; but be thou an example of the believers.',
    coverImage: '/image_4.png',
    description: 'An apostolic immersion into true biblical discipleship for young adults. Discover the power of consecrated minds, spiritual gifts fanned into flame, and authentic fellowship at Joshua House of Worship.',
    days: [
      {
        dayNumber: 1,
        title: 'Living Sacrifices & Renewed Minds',
        scriptureReference: 'Romans 12:1-21',
        bookId: 'ROM',
        chapter: 12,
        keyVerse: 'Romans 12:2 — And be not conformed to this world: but be ye transformed by the renewing of your mind...',
        devotionalFocus: 'Consecration is not passive; it is laying your life as an intentional, holy sacrifice. Do not allow worldly culture to squeeze you into its mold.',
        reflectionPrompt: 'What area of your daily routine currently mirrors the culture more than the Kingdom of God?',
        practicalAction: 'Surrender one ungodly habit or digital distraction today in specific prayer.'
      },
      {
        dayNumber: 2,
        title: 'Unity, Gifts & Maturity in Christ',
        scriptureReference: 'Ephesians 4:1-32',
        bookId: 'EPH',
        chapter: 4,
        keyVerse: 'Ephesians 4:16 — From whom the whole body fitly joined together and compacted by that which every joint supplieth...',
        devotionalFocus: 'The 2026 YoungFire Theme passage. True discipleship cannot happen in isolation. Every joint supplieth strength to the body of Christ.',
        reflectionPrompt: 'How are you actively supplying spiritual encouragement to your brothers and sisters in the sanctuary?',
        practicalAction: 'Reach out to one YoungFire member today with a scripture of encouragement.'
      },
      {
        dayNumber: 3,
        title: 'Exemplary Youth & Consecrated Standard',
        scriptureReference: '1 Timothy 4:1-16',
        bookId: '1TI',
        chapter: 4,
        keyVerse: '1 Timothy 4:12 — Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity.',
        devotionalFocus: 'Youth is not an excuse for moral compromise or spiritual delay. Paul commanded Timothy to set the pace in holy conduct and purity.',
        reflectionPrompt: 'Does your speech, social media, and conduct set an undeniable standard of holiness for other young people?',
        practicalAction: 'Take 15 minutes of uninterrupted prayer to consecrate your words and eyes today.'
      },
      {
        dayNumber: 4,
        title: 'Running the Kingdom Race with Endurance',
        scriptureReference: 'Hebrews 12:1-29',
        bookId: 'HEB',
        chapter: 12,
        keyVerse: 'Hebrews 12:1 — ...let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us.',
        devotionalFocus: 'Weights are not always sins; sometimes they are legitimate things that slow down spiritual acceleration. Cast them aside and fix your eyes on Jesus.',
        reflectionPrompt: 'What "weight" is currently draining your spiritual hunger and prayer life?',
        practicalAction: 'Confess and lay that weight at the altar in prayer today.'
      },
      {
        dayNumber: 5,
        title: 'Salt, Light & Kingdom Character',
        scriptureReference: 'Matthew 5:1-48',
        bookId: 'MAT',
        chapter: 5,
        keyVerse: 'Matthew 5:14 — Ye are the light of the world. A city that is set on an hill cannot be hid.',
        devotionalFocus: 'Jesus does not suggest you become light; He proclaims that you ARE the light. Let your righteous deeds bring glory to your Father in heaven.',
        reflectionPrompt: 'Are you hiding your light in workplace, school, or social circles out of intimidation?',
        practicalAction: 'Boldly proclaim your faith or share a biblical truth with someone today.'
      },
      {
        dayNumber: 6,
        title: 'Walking in the Spirit & Holy Fruit',
        scriptureReference: 'Galatians 5:1-26',
        bookId: 'GAL',
        chapter: 5,
        keyVerse: 'Galatians 5:22-23 — But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance...',
        devotionalFocus: 'The flesh and the Spirit are in perpetual war. You will feed whichever nature you spend the most time cultivating.',
        reflectionPrompt: 'Which fruit of the Spirit is the Holy Spirit calling you to cultivate this season?',
        practicalAction: 'Memorize Galatians 5:22-23 and declare it when temptation arises today.'
      },
      {
        dayNumber: 7,
        title: 'Fan the Flame: Power, Love & Sound Mind',
        scriptureReference: '2 Timothy 1:1-18',
        bookId: '2TI',
        chapter: 1,
        keyVerse: '2 Timothy 1:7 — For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.',
        devotionalFocus: 'The fire of God must be deliberately stoked through daily prayer, scripture intake, and apostolic fellowship.',
        reflectionPrompt: 'Has your spiritual flame felt like dying embers or a blazing torch recently? What will you do to fan it?',
        practicalAction: 'Join the next YoungFire Small Group or OpenBible study with a heart ablaze.'
      }
    ]
  },
  {
    id: 'yf_renewing_mind_5day',
    title: '5-Day Renewing the Mind',
    subtitle: 'Overcoming Anxiety, Unclean Thoughts & Worldly Conformity',
    category: 'general',
    durationDays: 5,
    badge: '5-DAY MENTAL SANCTUARY',
    accentColor: 'cyan',
    themeScripture: 'Philippians 4:8 — Whatsoever things are true, honest, just, pure, lovely... think on these things.',
    coverImage: '/image_6.png',
    description: 'A 5-day spiritual weapon against anxiety, depression, mental clutter, and double-mindedness. Ground your thought life in the sovereign Word of God.',
    days: [
      {
        dayNumber: 1,
        title: 'Guarded by the Supernatural Peace of God',
        scriptureReference: 'Philippians 4:1-23',
        bookId: 'PHP',
        chapter: 4,
        keyVerse: 'Philippians 4:6-7 — Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.',
        devotionalFocus: 'Anxiety loses its stranglehold when prayer replaces worry. God’s peace acts as an armed garrison guarding your mind.',
        reflectionPrompt: 'What fear or anxious thought have you been carrying instead of casting onto the Lord?',
        practicalAction: 'Write down your 3 biggest anxieties and pray over each with thanksgiving.'
      },
      {
        dayNumber: 2,
        title: 'Setting Your Affections on Heavenly Realities',
        scriptureReference: 'Colossians 3:1-25',
        bookId: 'COL',
        chapter: 3,
        keyVerse: 'Colossians 3:2 — Set your affection on things above, not on things on the earth.',
        devotionalFocus: 'Where your mind dwells determines your spiritual altitude. Mortify the earthly deeds of the flesh and put on Christ.',
        reflectionPrompt: 'Are you filling your mental bandwidth with earthly trends or eternal truths?',
        practicalAction: 'Replace 30 minutes of social media scrolling with reading Colossians 3 aloud.'
      },
      {
        dayNumber: 3,
        title: 'A Clean Heart & Steadfast Spirit',
        scriptureReference: 'Psalm 51:1-19',
        bookId: 'PSA',
        chapter: 51,
        keyVerse: 'Psalm 51:10 — Create in me a clean heart, O God; and renew a right spirit within me.',
        devotionalFocus: 'David did not offer excuses; he offered brokenness and contrition. A pure mind begins with honest repentance before a holy God.',
        reflectionPrompt: 'Is there unconfessed sin or moral compromise dulling your fellowship with the Holy Spirit?',
        practicalAction: 'Pray Psalm 51 slowly on your knees as a personal cry of consecration.'
      },
      {
        dayNumber: 4,
        title: 'Demolishing Strongholds & Taking Thoughts Captive',
        scriptureReference: '2 Corinthians 10:1-18',
        bookId: '2CO',
        chapter: 10,
        keyVerse: '2 Corinthians 10:5 — Casting down imaginations, and every high thing that exalteth itself against the knowledge of God...',
        devotionalFocus: 'Your mind is the battlefield. Every rogue thought of shame, lust, fear, or bitterness must be arrested and brought into obedience to Christ.',
        reflectionPrompt: 'Which persistent thought pattern exalts itself against what God says about you?',
        practicalAction: 'Quote scripture aloud the exact instant a negative or unclean thought enters your mind.'
      },
      {
        dayNumber: 5,
        title: 'Taming the Double Mind with Kingdom Wisdom',
        scriptureReference: 'James 1:1-27',
        bookId: 'JAS',
        chapter: 1,
        keyVerse: 'James 1:8 — A double minded man is unstable in all his ways.',
        devotionalFocus: 'Do not be a hearer of the Word who forgets what he looks like. Become a doer whose mind is firmly established in truth.',
        reflectionPrompt: 'Where are you currently hesitating between God’s command and personal comfort?',
        practicalAction: 'Take immediate action on one conviction the Holy Spirit has brought to your attention.'
      }
    ]
  },

  // -------------------------------------------------------------
  // 2. MEN ON FIRE (BROTHERHOOD TAILORED) PLANS
  // -------------------------------------------------------------
  {
    id: 'mof_warrior_priest_7day',
    title: '7-Day Warrior & Priest: The Davidic Standard',
    subtitle: 'Kingdom Courage, Spiritual Warfare & Holy Integrity for Men',
    category: 'men',
    durationDays: 7,
    badge: 'MEN ON FIRE BROTHERHOOD',
    accentColor: 'orange',
    themeScripture: '1 Corinthians 16:13 — Watch ye, stand fast in the faith, quit you like men, be strong.',
    coverImage: '/image_4.png',
    description: 'Consecrated for the brothers of Men On Fire. Walk the trajectory of King David from the shepherd fields to the warrior front lines, mastering spiritual courage, brotherhood loyalty, and brokenness before God.',
    days: [
      {
        dayNumber: 1,
        title: 'David & Goliath: Fearless Covenant Faith',
        scriptureReference: '1 Samuel 17:1-58',
        bookId: '1SA',
        chapter: 17,
        keyVerse: '1 Samuel 17:45 — Then said David to the Philistine, Thou comest to me with a sword, and with a spear... but I come to thee in the name of the Lord of hosts...',
        devotionalFocus: 'While an entire army cowered in fear, David remembered the covenant. A godly man does not measure the giant; he measures the giant against Almighty God.',
        reflectionPrompt: 'What cultural or personal giant has been defying your faith and family?',
        practicalAction: 'Confront that fear today in the authority of Jesus Christ.'
      },
      {
        dayNumber: 2,
        title: 'The Lord My Rock, Shield & Fortress',
        scriptureReference: '2 Samuel 22:1-51',
        bookId: '2SA',
        chapter: 22,
        keyVerse: '2 Samuel 22:3 — The God of my rock; in him will I trust: he is my shield, and the horn of my salvation, my high tower, and my refuge...',
        devotionalFocus: 'A warrior’s strength does not originate in his biceps or intellect; it is rooted in the sovereign rock of God. Praise is the warrior’s highest weapon.',
        reflectionPrompt: 'Where are you relying on your own strength rather than making God your fortress?',
        practicalAction: 'Spend 10 minutes in vocal praise for God’s deliverance in your life.'
      },
      {
        dayNumber: 3,
        title: 'Trained for the Fight: Holy Hands for War',
        scriptureReference: 'Psalm 144:1-15',
        bookId: 'PSA',
        chapter: 144,
        keyVerse: 'Psalm 144:1 — Blessed be the Lord my strength which teacheth my hands to war, and my fingers to fight.',
        devotionalFocus: 'Spiritual warfare is not an option for Christian men; it is our primary posting. God trains our fingers to intercede and our hands to protect.',
        reflectionPrompt: 'Are you on spiritual guard duty for your home, church, and brotherhood cohort?',
        practicalAction: 'Pray an intentional hedge of spiritual protection over the men in your small group.'
      },
      {
        dayNumber: 4,
        title: 'Quit You Like Men: The Apostolic Call',
        scriptureReference: '1 Corinthians 16:1-24',
        bookId: '1CO',
        chapter: 16,
        keyVerse: '1 Corinthians 16:13 — Watch ye, stand fast in the faith, quit you like men, be strong.',
        devotionalFocus: 'To "quit you like men" means to act with spiritual maturity, steadfast conviction, and sacrificial love. Passive Christianity is dead Christianity.',
        reflectionPrompt: 'In what area of your life have you been passive instead of stepping forward as a spiritual leader?',
        practicalAction: 'Take initiative in prayer, leadership, or service in your home or fellowship.'
      },
      {
        dayNumber: 5,
        title: 'Sword and Trowel: Rebuilding and Guarding',
        scriptureReference: 'Nehemiah 4:1-23',
        bookId: 'NEH',
        chapter: 4,
        keyVerse: 'Nehemiah 4:14 — ...Be not ye afraid of them: remember the Lord, which is great and terrible, and fight for your brethren, your sons, and your daughters...',
        devotionalFocus: 'Nehemiah’s builders held a trowel in one hand to construct the wall and a sword in the other to repel the enemy. Build the Kingdom while defending the brotherhood.',
        reflectionPrompt: 'Who are the brothers, family members, or youth you are called to fight for spiritually?',
        practicalAction: 'Fast a meal today and dedicate that time to praying for your family’s spiritual wall.'
      },
      {
        dayNumber: 6,
        title: 'Strong & Courageous: The Joshua Mandate',
        scriptureReference: 'Joshua 1:1-18',
        bookId: 'JOS',
        chapter: 1,
        keyVerse: 'Joshua 1:9 — Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest.',
        devotionalFocus: 'The mandate for Joshua House of Worship. Courage is not the absence of fear, but obedience to God in the presence of fear.',
        reflectionPrompt: 'What territory or spiritual promise is God calling you to possess with courage?',
        practicalAction: 'Mediate on Joshua 1:8 day and night; let not the Book of the Law depart from your mouth.'
      },
      {
        dayNumber: 7,
        title: 'Brothers in Unity: The Anointing at the Altar',
        scriptureReference: 'Psalm 133:1-3',
        bookId: 'PSA',
        chapter: 133,
        keyVerse: 'Psalm 133:1 — Behold, how good and how pleasant it is for brethren to dwell together in unity!',
        devotionalFocus: 'The precious oil poured on Aaron’s beard only flows where brethren dwell in unbroken unity. An isolated man is an easy target for Satan.',
        reflectionPrompt: 'Are you being vulnerable and accountable with other brothers in Men On Fire?',
        practicalAction: 'Reach out to a brother in Men On Fire and pray together before the day ends.'
      }
    ]
  },
  {
    id: 'mof_consecrated_purity_5day',
    title: '5-Day Consecrated Brotherhood & Purity',
    subtitle: 'A Covenant with the Eyes, Moral Armor & Holy Integrity',
    category: 'men',
    durationDays: 5,
    badge: 'MEN ON FIRE BROTHERHOOD',
    accentColor: 'orange',
    themeScripture: 'Psalm 119:9 — Wherewithal shall a young man cleanse his way? by taking heed thereto according to thy word.',
    coverImage: '/image_6.png',
    description: 'An uncompromising, practical 5-day scriptural weapon against sexual temptation, secret compromise, and double-mindedness. Build ironclad brotherhood accountability.',
    days: [
      {
        dayNumber: 1,
        title: 'The Covenant with the Eyes',
        scriptureReference: 'Job 31:1-40',
        bookId: 'JOB',
        chapter: 31,
        keyVerse: 'Job 31:1 — I made a covenant with mine eyes; why then should I think upon a maid?',
        devotionalFocus: 'Job knew that moral failure does not start with physical touch; it starts with the second look and the unguarded imagination.',
        reflectionPrompt: 'What visual triggers or digital content do you need to cut out with holy violence?',
        practicalAction: 'Install blockers, delete compromising apps, or establish a digital boundary today.'
      },
      {
        dayNumber: 2,
        title: 'Cleansing the Way Through the Word',
        scriptureReference: 'Psalm 119:9-16',
        bookId: 'PSA',
        chapter: 119,
        keyVerse: 'Psalm 119:11 — Thy word have I hid in mine heart, that I might not sin against thee.',
        devotionalFocus: 'The Word of God stored in the heart is the only defensive armor capable of repelling burning arrows of lust and deceit.',
        reflectionPrompt: 'Is scripture merely in your head, or is it deeply hidden in your heart?',
        practicalAction: 'Memorize Psalm 119:9-11 word-for-word today.'
      },
      {
        dayNumber: 3,
        title: 'Flee Youthful Lusts, Pursue Righteousness',
        scriptureReference: '2 Timothy 2:1-26',
        bookId: '2TI',
        chapter: 2,
        keyVerse: '2 Timothy 2:22 — Flee also youthful lusts: but follow righteousness, faith, charity, peace, with them that call on the Lord out of a pure heart.',
        devotionalFocus: 'You cannot dialogue with temptation; Joseph ran! Run from lust and run toward righteousness in company with pure-hearted brothers.',
        reflectionPrompt: 'Who are the brothers you run with who help you guard your purity?',
        practicalAction: 'Send a quick text to your accountability partner letting them know how your walk is going.'
      },
      {
        dayNumber: 4,
        title: 'Guarding the Wellspring of Life',
        scriptureReference: 'Proverbs 4:1-27',
        bookId: 'PRO',
        chapter: 4,
        keyVerse: 'Proverbs 4:23 — Keep thy heart with all diligence; for out of it are the issues of life.',
        devotionalFocus: 'Your heart is the fountainhead. If the fountain is poisoned with bitterness or lust, every stream flowing from your life will be contaminated.',
        reflectionPrompt: 'What toxic input have you allowed into your emotional and spiritual spring?',
        practicalAction: 'Guard your gates: practice a 24-hour fast from secular media.'
      },
      {
        dayNumber: 5,
        title: 'Sober Vigilance: Resisting the Roaring Lion',
        scriptureReference: '1 Peter 5:1-14',
        bookId: '1PE',
        chapter: 5,
        keyVerse: '1 Peter 5:8 — Be sober, be vigilant; because your adversary the devil, as a roaring lion, walketh about, seeking whom he may devour.',
        devotionalFocus: 'The enemy attacks when a man is tired, isolated, or ungrateful. Stay sober-minded, clad in God’s armor, and rooted in the church body.',
        reflectionPrompt: 'When are you most vulnerable to spiritual attacks (HALT: Hungry, Angry, Lonely, Tired)?',
        practicalAction: 'Set up an emergency prayer protocol with a brother for when temptation strikes.'
      }
    ]
  },

  // -------------------------------------------------------------
  // 3. WOMEN IGNITED (SISTERHOOD TAILORED) PLANS
  // -------------------------------------------------------------
  {
    id: 'woi_esther_ruth_7day',
    title: '7-Day Esther & Ruth: Bold Faith Under Fire',
    subtitle: 'Kingdom Audacity, Covenant Loyalty & Holy Dignity for Sisters',
    category: 'women',
    durationDays: 7,
    badge: 'WOMEN IGNITED SISTERHOOD',
    accentColor: 'rose',
    themeScripture: 'Esther 4:14 — Who knoweth whether thou art come to the kingdom for such a time as this?',
    coverImage: '/image_2.png',
    description: 'Consecrated for the sisters of Women Ignited. Walk with Queen Esther through life-or-death intercession and Ruth through radical covenant loyalty, uncovering your royal identity as a daughter of the King of Glory.',
    days: [
      {
        dayNumber: 1,
        title: 'For Such a Time as This',
        scriptureReference: 'Esther 4:1-17',
        bookId: 'EST',
        chapter: 4,
        keyVerse: 'Esther 4:16 — ...and so will I go in unto the king, which is not according to the law: and if I perish, I perish.',
        devotionalFocus: 'Esther’s beauty opened doors, but her holy consecration and fearless intercession saved an entire nation. You were born for this exact hour.',
        reflectionPrompt: 'Where is God calling you to stand up boldly for truth, even if it feels intimidating?',
        practicalAction: 'Fast and pray for someone currently facing impossible odds.'
      },
      {
        dayNumber: 2,
        title: 'Covenant Loyalty: Where You Go, I Go',
        scriptureReference: 'Ruth 1:1-22',
        bookId: 'RUT',
        chapter: 1,
        keyVerse: 'Ruth 1:16 — ...Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God.',
        devotionalFocus: 'Ruth chose poverty and covenant over Moabite comfort. Holy sisterhood requires sticking close when life is hard and grief is heavy.',
        reflectionPrompt: 'Are you showing unconditional loyalty and spiritual support to your sisters in Christ?',
        practicalAction: 'Reach out to a sister who is going through a hard trial and let her know she is not alone.'
      },
      {
        dayNumber: 3,
        title: 'Favor Under His Wings: Humility in the Field',
        scriptureReference: 'Ruth 2:1-23',
        bookId: 'RUT',
        chapter: 2,
        keyVerse: 'Ruth 2:12 — The Lord recompense thy work, and a full reward be given thee of the Lord God of Israel, under whose wings thou art come to trust.',
        devotionalFocus: 'Ruth did not demand honor; she quietly served and gleaned in the fields. God’s providence guided her directly to the field of Boaz.',
        reflectionPrompt: 'Are you trusting God in the quiet, unglamorous seasons of gleaning and serving?',
        practicalAction: 'Perform an unseen act of kindness or service in church or fellowship today.'
      },
      {
        dayNumber: 4,
        title: 'The Threshing Floor: Sacred Consecration',
        scriptureReference: 'Ruth 3:1-18',
        bookId: 'RUT',
        chapter: 3,
        keyVerse: 'Ruth 3:11 — And now, my daughter, fear not; I will do to thee all that thou requirest: for all the city of my people doth know that thou art a virtuous woman.',
        devotionalFocus: 'Before anything happened in public, Ruth was recognized as a virtuous woman in secret. Virtue is your true royal crown.',
        reflectionPrompt: 'What reputation precedes you in your private life and public interactions?',
        practicalAction: 'Ask the Holy Spirit to clothe you in dignity, modesty, and holy wisdom.'
      },
      {
        dayNumber: 5,
        title: 'The Kinsman-Redeemer & Generational Fruit',
        scriptureReference: 'Ruth 4:1-22',
        bookId: 'RUT',
        chapter: 4,
        keyVerse: 'Ruth 4:14 — And the women said unto Naomi, Blessed be the Lord, which hath not left thee this day without a kinsman...',
        devotionalFocus: 'Boaz redeemed Ruth, and from their line came King David and Jesus Christ. God redeems your past and turns ashes into imperial glory.',
        reflectionPrompt: 'Do you believe that God can bring generational blessings out of past pain?',
        practicalAction: 'Praise Jesus today as your supreme Kinsman-Redeemer who bought you with His blood.'
      },
      {
        dayNumber: 6,
        title: 'Clothed with Strength & Dignity',
        scriptureReference: 'Proverbs 31:10-31',
        bookId: 'PRO',
        chapter: 31,
        keyVerse: 'Proverbs 31:25 — Strength and honour are her clothing; and she shall rejoice in time to come.',
        devotionalFocus: 'A Proverbs 31 woman is not an unrealistic checklist; she is a woman whose heart fears the Lord and whose hands bless others.',
        reflectionPrompt: 'Where do you find your true worth: worldly admiration or the fear of the Lord?',
        practicalAction: 'Speak words of wisdom and kindness to someone who needs encouragement today.'
      },
      {
        dayNumber: 7,
        title: 'Decrees of Deliverance & Kingdom Joy',
        scriptureReference: 'Esther 8:1-17',
        bookId: 'EST',
        chapter: 8,
        keyVerse: 'Esther 8:16 — The Jews had light, and gladness, and joy, and honour.',
        devotionalFocus: 'The enemy’s plot was reversed because of a praying woman. Through your intercession, the decrees of darkness in your family are broken.',
        reflectionPrompt: 'What spiritual breakthrough are you standing in faith for right now?',
        practicalAction: 'Declare God’s victory and write down a testimony of God’s faithfulness.'
      }
    ]
  },
  {
    id: 'woi_daughters_grace_5day',
    title: '5-Day Daughters of Grace & Wisdom',
    subtitle: 'Quiet Confidence, Unfading Beauty & Sacred Sisterhood',
    category: 'women',
    durationDays: 5,
    badge: 'WOMEN IGNITED SISTERHOOD',
    accentColor: 'rose',
    themeScripture: '1 Peter 3:4 — But let it be the hidden man of the heart... even the ornament of a meek and quiet spirit.',
    coverImage: '/image_3.png',
    description: 'A 5-day consecration journey for sisters seeking authentic biblical womanhood, emotional anchoring in Christ, and wise mentorship in the sanctuary.',
    days: [
      {
        dayNumber: 1,
        title: 'Mary’s Magnificat: The Soul Magnifies the Lord',
        scriptureReference: 'Luke 1:26-56',
        bookId: 'LUK',
        chapter: 1,
        keyVerse: 'Luke 1:46-47 — And Mary said, My soul doth magnify the Lord, and my spirit hath rejoiced in God my Saviour.',
        devotionalFocus: 'When God spoke impossible things to Mary, she did not calculate; she surrendered. A heart that magnifies God leaves no room for despair.',
        reflectionPrompt: 'Is your soul magnifying the greatness of God or the magnitude of your problems?',
        practicalAction: 'Write a personal Psalm of praise to God for who He is.'
      },
      {
        dayNumber: 2,
        title: 'Reverent in Behavior: The Titus 2 Sisterhood',
        scriptureReference: 'Titus 2:1-15',
        bookId: 'TIT',
        chapter: 2,
        keyVerse: 'Titus 2:3 — The aged women likewise, that they be in behaviour as becometh holiness, not false accusers... teachers of good things.',
        devotionalFocus: 'God designed the church as a multi-generational sisterhood where older women teach younger women sound doctrine and holy living.',
        reflectionPrompt: 'Are you open to godly mentorship and teaching from mature women in the faith?',
        practicalAction: 'Thank an older woman of God who has spoken wisdom into your life.'
      },
      {
        dayNumber: 3,
        title: 'Imperishable Beauty of a Gentle Spirit',
        scriptureReference: '1 Peter 3:1-22',
        bookId: '1PE',
        chapter: 3,
        keyVerse: '1 Peter 3:4 — But let it be the hidden man of the heart, in that which is not corruptible, even the ornament of a meek and quiet spirit, which is in the sight of God of great price.',
        devotionalFocus: 'Worldly beauty fades with every passing year, but the ornament of a holy, meek, and quiet spirit grows more precious to God every day.',
        reflectionPrompt: 'How much time do you invest in outer appearance versus cultivating inner holiness?',
        practicalAction: 'Spend 20 minutes in silence at Jesus’ feet without checking your phone.'
      },
      {
        dayNumber: 4,
        title: 'Sitting at His Feet: Choosing the Good Part',
        scriptureReference: 'Luke 10:38-42',
        bookId: 'LUK',
        chapter: 10,
        keyVerse: 'Luke 10:42 — But one thing is needful: and Mary hath chosen that good part, which shall not be taken away from her.',
        devotionalFocus: 'Martha was distracted with much serving, but Mary recognized that presence precedes production. Never get too busy for Jesus.',
        reflectionPrompt: 'Has religious busyness or daily hustle stolen your intimacy with Jesus?',
        practicalAction: 'Drop your to-do list for 15 minutes today simply to worship and listen.'
      },
      {
        dayNumber: 5,
        title: 'Hannah’s Exultation: The God Who Lifts the Humble',
        scriptureReference: '1 Samuel 2:1-10',
        bookId: '1SA',
        chapter: 2,
        keyVerse: '1 Samuel 2:2 — There is none holy as the Lord: for there is none beside thee: neither is there any rock like our God.',
        devotionalFocus: 'Hannah poured out her soul in bitterness, and God answered with Samuel. Her song of praise celebrates the God who exalts the humble.',
        reflectionPrompt: 'What deep sorrow can you pour out before the Lord, trusting Him to birth a testimony?',
        practicalAction: 'Pour out your heart in raw, honest prayer at God’s altar today.'
      }
    ]
  }
];

// Helper functions for reading progress in localStorage
const PROGRESS_PREFIX = 'youngfire_reading_progress_';

export function getCompletedDays(planId: string): number[] {
  try {
    const raw = localStorage.getItem(`${PROGRESS_PREFIX}${planId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleDayCompleted(planId: string, dayNumber: number): number[] {
  try {
    const current = getCompletedDays(planId);
    let updated: number[];
    if (current.includes(dayNumber)) {
      updated = current.filter(d => d !== dayNumber);
    } else {
      updated = [...current, dayNumber].sort((a, b) => a - b);
    }
    localStorage.setItem(`${PROGRESS_PREFIX}${planId}`, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function getPlanProgress(planId: string, totalDays: number): { completedCount: number; percentage: number; isCompleted: boolean } {
  const completed = getCompletedDays(planId);
  const completedCount = completed.length;
  const percentage = Math.min(100, Math.round((completedCount / totalDays) * 100));
  return {
    completedCount,
    percentage,
    isCompleted: completedCount >= totalDays && totalDays > 0
  };
}

export function resetPlanProgress(planId: string): void {
  try {
    localStorage.removeItem(`${PROGRESS_PREFIX}${planId}`);
  } catch {}
}
