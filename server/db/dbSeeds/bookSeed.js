const Book = require("../Book");
const bookSeed = async () => {
  /***********************  SEEDING EVENMOREBOOKS BY ROSE *****************/
  const evenMorebooks = [
    {
      title: "Parasyte",
      author: "Hitoshi Iwaaki",
      volume: 1,
      description: `The sci-fi horror manga classic returns, in a fully-colorized, premium-quality hardcover for the first time! If you've never read the story of Shinichi and the polite and murderous alien infesting his right arm--or even if you already own the series--there's never been a better way to collect it.
      Presented in eight volumes containing about 300 pages of manga each.
      They arrive in silence, out of dark skies. They infest human hosts and consume them. And they are everywhere.
      They are Parasites: alien creatures who must invade and take control of human hosts to survive. Once they have infected their victims, they can twist their hosts's bodies into any abominable shapes they choose: craniums splitting to reveal mouths of sharp teeth, batlike wings erupting from backs, blades tearing through soft hands. But most have chosen to conceal their lethal purposes behind ordinary human faces. No one knows their secret, except an ordinary high school student. Shinichi managed to stop the infestation of his body by an alien parasite, but can he find a way to warn humanity of the horrors to come?
      For more than 30 years, new generations of readers have been riveted to this unlikely buddy story that unfolds amid a world of monstrosities that never stay hidden for long. Since its first release, in 1988, Parasyte has inspired live-action films, spinoffs, and, in 2015, a global hit anime series. The Full Color Collection presents Hitoshi Iwaaki's original manga in hardcover for the first time, with each page carefully colorized and a revised translation for 2022. There's never been a better time to stay up late and get your hand on Parasyte!`,
      imageURL: "/static/bookImages/parasyte-fc-1.jpeg",
      genre: "drama",
      edition: "Full Color Edition",
      price: 2000,
      stock: 100,
    },
    {
      title: "Parasyte",
      author: "Hitoshi Iwaaki",
      volume: 2,
      description: `
      Parasyte Full Color Collection manga volume 2 is presented in this fully-colorized, premium quality hardcover featuring story and art by Hitoshi Iwaaki.
Shinichi Izumi might seem like an ordinary high school boy, but he harbors a deadly secret--an alien parasite has taken him as its host. After failing to subsume him completely, the parasite was forced to settle in his right arm, and a strange partnership was born. With threats around every corner--parasite and human alike--they must learn to work together or perish. But this parasite is ruthless, deadly, and utterly indifferent to human suffering...and it seems to have an influence on Shinichi that's more than skin deep. As Shinichi fights for control of his body, can he also hold on to his humanity?
For more than 30 years, new generations of readers have been riveted to this unlikely buddy story that unfolds amid a world of monstrosities that never stay hidden for long. Since its first release, in 1988, Parasyte has inspired live-action films, spinoffs, and, in 2015, a global hit anime series. The Full Color Collection presents Hitoshi Iwaaki's original manga in hardcover for the first time, with each page carefully colorized and a revised translation for 2022. There's never been a better time to stay up late and get your hand on Parasyte!
`,
      imageURL: "/static/bookImages/parasyte-fc-2.jpg",
      genre: "drama",
      edition: "Full Color Edition",
      price: 2000,
      stock: 100,
    },
    {
      title: "Parasyte",
      author: "Hitoshi Iwaaki",
      volume: 1,
      description: `
      They arrive in silence and darkness. They descend from the skies. They have a hunger for human flesh. They are everywhere. They are parasites, alien creatures who must invade - and take control of - a human host to survive.
      Once they have infected their victims, they can assume any deadly form they choose: monsters with giant teeth, winged demons, creatures with blades for hands. But most have chosen to conceal their lethal purpose behind ordinary human faces. No one knows their secret - except an ordinary high school student. Shin is battling for control of his own body against an alien parasite, but can he find a way to warn humanity of the horrors to come?
      `,
      imageURL: "/static/bookImages/parasyte-1.jpg",
      genre: "drama",
      price: 1000,
      stock: 100,
    },
    {
      title: "Parasyte",
      author: "Hitoshi Iwaaki",
      volume: 2,
      description: `
      Shin looks like an ordinary high school boy, but he has a terrible secret: an alien parasite has infected his body. This mysterious creature is ruthless, deadly, and utterly indifferent to human suffering... and it is beginning to assert itself over Shin. As Shin fights for control of his body, can he also hold on to his humanity?
      `,
      imageURL: "/static/bookImages/parasyte-2.jpg",
      genre: "drama",
      price: 1000,
      stock: 100,
    },
    {
      title: "Parasyte",
      author: "Hitoshi Iwaaki",
      volume: 8,
      description: `
      Shinichi vows to destroy Goto, one of the deadliest of the alien parasites that have invaded Earth - and people's bodies. But at the moment of truth, Shinichi discovers something unexpected in his heart: sympathy for the monster. Soon Shinichi, who harbors his own alien parasite, will come to a stunning realization about the dark side of human nature - and his own soul.
      `,
      imageURL: "/static/bookImages/parasyte-8.jpg",
      genre: "drama",
      price: 1000,
      stock: 100,
    },
    {
      title: "Cutie Honey The Classic Collection",
      author: "Nagai Go",
      description: `
      Cutie Honey, one of the most recognized superheroines in manga history, will finally have her original story in print! Experience the ultimate collection of both volumes of Go Nagai’s 1973 cult classic in one oversized hardcover tome. With a career spanning 50 years, Go Nagai created many immensely popular series including Devilman and Getter Robo, and Cutie Honey–his edgy magical girl aimed at boys–remains one of his most influential works to this day.
      Beautiful but unassuming schoolgirl Kisaragi Honey has a secret–she’s actually an android! Through her father’s amazing technology, she can transform into the unstoppable Cutie Honey. It’s a power that the nefarious criminal organization known as Panther Claw will stop at nothing to possess, even if it means destroying that which Honey loves the most. Experience the original saga of Japan’s iconic super-heroine by Go Nagai, the author of Devilman!      
      `,
      edition: "classic",
      imageURL: "/static/bookImages/cutiehoney.jpg",
      genre: "adventure",
      price: 2799,
      stock: 100,
    },
    {
      title: "Ping Pong",
      author: "Taiyo Matsumoto",
      volume: 1,
      description: `
      Ace high school table tennis players push their passion to the limit in this story of self-discovery, told by Eisner Award winner Taiyo Matsumoto.
Makoto "Smile" Tsukimoto doesn’t smile even though he’s got a natural talent for playing ping pong. As one of the best players in school, all hopes are on him to win the regional high school tournament, but winning is not what Smile really wants to do. Will the fierce competition to be number one bring out his best or drive him away from the game? Ping Pong is Taiyo Matsumoto’s masterwork reflection on friendship and self-discovery, presented here in two volumes, featuring color art, the bonus story Tamura and an afterward by the original Japanese series editor.
      `,
      imageURL: "/static/bookImages/pingpong1.jpg",
      genre: "sports",
      price: 2799,
      stock: 100,
    },
    {
      title: "Ping Pong",
      author: "Taiyo Matsumoto",
      volume: 2,
      description: `
      FINAL VOLUME!
Things have changed since the last inter-high tournament. Peco has quit the game, and "Smile" Tsukimoto's desire to play is gone. Even "Demon" Sakuma has been kicked off the Kaio team. But Coach Koizumi isn't going to let all that talent go to waste and launches a plan to get Tsukimoto back on the team and into top condition. Every great athlete needs a great rival to push them past their limits, and Peco and Smile—friends since they were children—must now challenge each other to become the heroes they always dreamed they could be.`,
      imageURL: "/static/bookImages/pingpong2.jpg",
      genre: "sports",
      price: 2799,
      stock: 100,
    },
    {
      title: "Barefoot Gen",
      author: "Keiji Nakazawa",
      volume: 1,
      description: `
      Cartoonist Keiji Nakazawa was seven years old and living in Hiroshima in the early days of August 1945 when the city was destroyed by an atomic bomb dropped by the U.S.A. Starting a few months before that event, this ten-volume saga shows life in Japan after years of war and privations as seen through the eyes of seven-year-old Gen Nakaoka. Volume One begins shortly before the bomb was dropped and ends on the day of the bombing itself. This edition features an all-new translation.
      `,
      yearOfPublish: 2007,
      imageURL: "/static/bookImages/barefoot1.jpg",
      genre: "Slice of Life",
      price: 1350,
      stock: 100,
    },
    {
      title: "Barefoot Gen",
      author: "Keiji Nakazawa",
      volume: 4,
      description: `
      Nine days after the bomb, Gen and his mother continue to struggle for food, shelter and water amid chaos and vast human suffering. Though confronted with the most despicable aspects of humankind, Gen acts with love and compassion. Story and art by Keiji Nakazawa.
      `,
      yearOfPublish: 2007,
      imageURL: "/static/bookImages/barefoot4.jpg",
      genre: "Slice of Life",
      price: 1350,
      stock: 100,
    },
    {
      title: "Barefoot Gen",
      author: "Keiji Nakazawa",
      volume: 5,
      description: `
      Hiroshima's citizens face massive food shortages and horrendous health problems. Gen is in school, but he is forced to choose between making money to support his family or staying in school. His choice is further complicated when his mother becomes sick, and his old friends reappear as part of a street gang.There is no help for his mother, save for the costly medicine procured on the black market. Gen becomes entangled with black market gangs and faces an internal struggle of honor, ethics, and duty to resolve his problems.      `,
      yearOfPublish: 2007,
      imageURL: "/static/bookImages/barefoot5.jpg",
      genre: "Slice of Life",
      price: 1350,
      stock: 100,
    },
    {
      title: "Buddha",
      author: "Osamu Tezuka",
      volume: 1,
      description: `
      This story of Buddha actually begins with the adventures of the slave boy Chapra (a Tezuka creation). As the restive youth's fate unfolds, Siddhartha is born near the city of Kapilavastu amongst a steaming, vivid Indian caste society.`,
      yearOfPublish: 2006,
      imageURL: "/static/bookImages/buddha1.jpg",
      genre: "Historical",
      price: 1190,
      stock: 100,
    },
    {
      title: "Buddha",
      author: "Osamu Tezuka",
      volume: 7,
      description: `
      Prince Ajatasattu, the headstrong young prince, must reconcile with a prediction that he will murder his own father. He plans instead the assassination of the Buddha, blaming him for making his father believe this "bogus" prediction.
Meanwhile, the Buddha's closest disciple, Devadatta, sees a great political opportunity to step the Buddha up in politics while the king and the prince are at odds. He confronts the Buddha with his plan, but Devadatta's opportunism leads to his excommunication from the Buddhist community.
Throughout the backstabbing and assassination attempts, the Buddha remains steadfast in his mission to spread the message of the sanctity of life and love.
      `,
      yearOfPublish: 2007,
      imageURL: "/static/bookImages/buddha7.jpg",
      genre: "Historical",
      price: 1190,
      stock: 100,
    },
    {
      title: "Princess Knight The Twin Knights",
      author: "Osamu Tezuka",
      description: `
      Prince Ajatasattu, the headstrong young prince, must reconcile with a prediction that he will murder his own father. He plans instead the assassination of the Buddha, blaming him for making his father believe this "bogus" prediction.
Meanwhile, the Buddha's closest disciple, Devadatta, sees a great political opportunity to step the Buddha up in politics while the king and the prince are at odds. He confronts the Buddha with his plan, but Devadatta's opportunism leads to his excommunication from the Buddhist community.
Throughout the backstabbing and assassination attempts, the Buddha remains steadfast in his mission to spread the message of the sanctity of life and love.
      `,
      yearOfPublish: 2013,
      imageURL: "/static/bookImages/princessknight.jpg",
      genre: "Adventure",
      price: 1190,
      stock: 100,
    },
    {
      title: "I am a hero",
      author: "Kengo Hanazawa",
      volume: 1,
      edition: "omnibus",
      description: `
      A mentally unhinged manga artist witnesses the beginning of a zombie outbreak in Tokyo, and he’s certain of only two things: he's destined to be the city's hero, and he possesses something quite rare in Japan -- an actual firearm! The Shogakukan Manga Award winner comes to Dark Horse!
      `,
      yearOfPublish: 2016,
      imageURL: "/static/bookImages/iamahero1.jpg",
      genre: "Horror",
      price: 1600,
      stock: 100,
      isDeactivated: true,
    },
    {
      title: "I am a hero",
      author: "Kengo Hanazawa",
      volume: 2,
      edition: "omnibus",
      description: `
      Having avoided being eaten by his zombie girlfriend and torn apart by his infected coworkers, Hideo Suzuki continues to head away from civilization and the bloodthirsty hordes taking over Japan. In a "suicide forest," Hideo finds a young girl who needs help -- and who could also help him more than he realizes!      `,
      yearOfPublish: 2016,
      imageURL: "/static/bookImages/iamahero2.jpg",
      price: 1600,
      stock: 100,
      isDeactivated: true,
      genre: "horror",
    },
    {
      title: "Genshiken",
      author: "Shimoku Kio",
      volume: 1,
      edition: "omnibus",
      description: `
      It's spring of freshman year, and Kanji Sasahara has a difficult dilemma. Should he declare his love for manga and anime fandom by joining an otaku club, like he has always wanted to? Is he prepared to deal with the social stigma attached to being an otaku? Meanwhile, Saki Kasakabe has her own otaku conundrum. How can she turn her boyfriend, anime fanboy Makoto, into a normal guy?
      Kanji follows his heart, as does Saki. When both Kanji and Makoto join Genshiken: The Society for the Study of Modern Visual Culture, Saki chases Makoto through the various activities of the club, from costume-playing and comic conventions to video gaming and anime model figures. Saki finds otaku to be more than she imagined, but not necessarily in a good way.
      `,
      yearOfPublish: 2012,
      imageURL: "/static/bookImages/genshiken1.jpg",
      price: 1599,
      stock: 0,
      isDeactivated: true,
      genre: "slice of life",
    },
    {
      title: "Genshiken",
      author: "Shimoku Kio",
      volume: 2,
      edition: "omnibus",
      description: `
      When Madarame resigns from office as president of Genshiken, he selects Kanji as the best candidate to take his place. As the new president, Kanji attempts to shake the sluggish members of Genshiken out of their apathy by proposing they create a fanzine to sell at the next Comic-Fest. When Genshiken is accepted as an official vendor at the summer Comic-Fest, they find themselves with a deadly short deadline to create a real doujinshi. Can President Sasahara get his slacker constituents to level up their productivity?`,
      yearOfPublish: 2012,
      imageURL: "/static/bookImages/genshiken2.jpg",
      price: 1599,
      stock: 0,
      isDeactivated: true,
      genre: "slice of life",
    },
    {
      title: "Genshiken Second Season",
      author: "Shimoku Kio",
      volume: 5,
      description: `
      Hato's past drove him to cross-dressing, Yajima's got a complex about her looks, and no matter what happens, no one seems to be able to tell what's going on in Yoshitake's head. Still, this newbie trio has finally made themselves at home in the Genshiken. Which makes it a perfect time for a visit by the old boys of the club, in town for the school festival! But when generations collide, Madarame ends up alone in the club room with Saki, with his back against the wall. Everyone expects him to confess his feelings, but what will come out of his mouth at this pivotal moment?
      `,
      yearOfPublish: 2012,
      imageURL: "/static/bookImages/genshikensecondseason5.jpg",
      price: 879,
      stock: 100,
      genre: "slice of life",
    },
  ];
  await Promise.all(evenMorebooks.map((book) => Book.create(book)));

  /***********************  SEEDING DEC.20 BY ROSE *****************/

  const hellboys = [
    {
      title: "Hellboy: Seed of Destruction",
      author: "Mike Mignola",
      volume: 1,
      description: `
      Hellboy bursts onto the film noir monster detective scene. From his apocalyptic origin in WWII England to the modern-day case of the sole survivor of a doomed Arctic expedition, Hellboy must battle vampire frog creatures and worse in his debut miniseries. Created by Mike Mignola, with script by John Byrne, and colors by Mark Chiarello. Hellboy -- World's Greatest Paranormal Investigator. Also featuring chapter one in the astounding origin of Monkeyman and O'Brien, the most dynamic duo since a talking scientific genius (who also happens to be an ape) and a beautiful, super-strong blonde (who also happens to be a scientist) teamed up to battle extra-dimensional menaces while looking for a way to return Monkeyman to his home dimension!`,
      imageURL: "/static/bookImages/hellboy-sd-1.jpg",
      genre: "crime",
      price: 9999,
      yearOfPublish: 1994,
      stock: 100,
      edition: "first press",
    },
    {
      title: "Hellboy: Seed of Destruction",
      author: "Mike Mignola",
      volume: 3,
      description: `
      Things get uglier as Hellboy explores the decaying temple beneath the Cavendish mansion and discovers an ancient evil that threatens to unleash upon the world dark, unholy forces from the dawn of time, using Hellboy's companion Liz as its unwitting tool. Earth teeters on the brink of destruction, with only Hellboy, the World's Greatest Paranormal Investigator, there to right the balance. Also featuring chapter three in the incredible origin of Monkeyman and O'Brien, wherein Monkeyman pits himself against the horrors of learning the English language.
      `,
      imageURL: "/static/bookImages/hellboy-sd-3.jpg",
      genre: "crime",
      edition: "first press",
      price: 9999,
      yearOfPublish: 1994,
      stock: 100,
    },
    {
      title: "Hellboy: The Wild Hunt",
      author: "Mike Mignola",
      volume: 1,
      description: `
      When ancient giants begin to rise from their graves across England, Hellboy is invited to join a mysterious group called the Wild Hunt and help bring them down. But the hunt leads to betrayal, and Hellboy finds himself up against enemies as angry about what he is as what he's done. "The fading children of the earth" gather in the shadows, waiting for the promised return of the Queen of Blood, and a chance to once again "shake the trees, crack mountains, and make the daytime world weep in fear."`,
      imageURL: "/static/bookImages/hellboy-wh-1.jpg",
      genre: "crime",
      edition: "first press",
      price: 4999,
      yearOfPublish: 2008,
      stock: 49,
    },
    {
      title: "Hellboy: The Wild Hunt",
      author: "Mike Mignola",
      volume: 2,
      description: `
      Hellboy contends with treacherous huntsmen, mystic visions, newly awakened bands of vicious giants, and a talking bird as he continues his journey across the rolling hills of England. Things far stranger await, should Hellboy's enemies succeed in resurrecting the Queen of Blood . . .
      `,
      imageURL: "/static/bookImages/hellboy-wh-2.jpg",
      genre: "crime",
      edition: "first press",
      price: 4999,
      yearOfPublish: 2009,
      stock: 49,
    },
    {
      title: "Hellboy: The Wild Hunt",
      author: "Mike Mignola",
      volume: 3,
      description: `
      Hellboy sets out across the bleak hills of Ireland to find out what the recent omens he’s experienced have been referring to—while the newly resurrected Queen of Blood rises to take control of the witches of England, torturing the ones who betrayed her, and preparing the rest for an even more bloody campaign against the race of man. Hot on the heels of the 2008 summer film release Hellboy II: The Golden Army, Mike Mignola and Duncan Fegredo reunite with Hellboy: The Wild Hunt to follow-up on the events of their best-selling 2007 series Hellboy: Darkness Calls. This issue also includes a back-up story written by Mike Mignola and drawn by B.P.R.D. artist Guy Davis!      `,
      imageURL: "/static/bookImages/hellboy-wh-3.jpg",
      genre: "crime",
      edition: "first press",
      price: 4999,
      yearOfPublish: 2009,
      stock: 49,
    },
    {
      title: "Hellboy: The Wild Hunt",
      author: "Mike Mignola",
      volume: 4,
      description: `
      The Queen of Blood is rallying her monstrous army and preparing to march against the human race, and humanity's survival depends on Hellboy and Alice finding a supernatural army of their own. But the monsters Hellboy has killed over the years had powerful friends, and a vicious horde out for revenge has lured the pair into a trap. Now Hellboy and Alice's only hope for survival rests with three strange little birds, and their even stranger mistress.`,
      imageURL: "/static/bookImages/hellboy-wh-4.jpg",
      genre: "crime",
      edition: "first press",
      price: 4999,
      yearOfPublish: 2009,
      stock: 49,
    },
  ];

  await Promise.all(hellboys.map((book) => Book.create(book)));

  const sailormoons = [
    {
      title: "Sailor Moon",
      author: "Naoko Takeuchi",
      volume: 1,
      description: `
      One of the most-beloved of all Japanese manga titles, Naoko Takeuchi's Sailor Moon has enthralled millions of readers worldwide since its debut in book form in early 1992. When Usagi Tsukino adopts a stray cat, she gets more than she bargains for The talking cat, Luna, informs Usagi that she is actually Sailor Moon, a magical princess from the future and protector of the Solar System. With the help of her new friends, the Sailor Scouts, and the mysterious Tuxedo Mask, Sailor Moon embarks on a quest to save us all from the evil powers of the Negaverse.
    `,
      imageURL: "/static/bookImages/sailormoon1.jpg",
      genre: "action",
      price: 999,
      yearOfPublish: 1998,
      stock: 20,
    },
    {
      title: "Sailor Moon",
      author: "Naoko Takeuchi",
      volume: 11,
      description: `
      One of the most-beloved of all Japanese manga titles, Naoko Takeuchi's Sailor Moon has enthralled millions of readers worldwide since its debut in book form in early 1992. When Usagi Tsukino adopts a stray cat, she gets more than she bargains for The talking cat, Luna, informs Usagi that she is actually Sailor Moon, a magical princess from the future and protector of the Solar System. With the help of her new friends, the Sailor Scouts, and the mysterious Tuxedo Mask, Sailor Moon embarks on a quest to save us all from the evil powers of the Negaverse.
    `,
      imageURL: "/static/bookImages/sailormoon11.jpg",
      genre: "action",
      price: 999,
      yearOfPublish: 1999,
      stock: 20,
    },
    {
      title: "Sailor Moon",
      author: "Naoko Takeuchi",
      volume: 28,
      description: `
      One of the most-beloved of all Japanese manga titles, Naoko Takeuchi's Sailor Moon has enthralled millions of readers worldwide since its debut in book form in early 1992. When Usagi Tsukino adopts a stray cat, she gets more than she bargains for The talking cat, Luna, informs Usagi that she is actually Sailor Moon, a magical princess from the future and protector of the Solar System. With the help of her new friends, the Sailor Scouts, and the mysterious Tuxedo Mask, Sailor Moon embarks on a quest to save us all from the evil powers of the Negaverse.
    `,
      imageURL: "/static/bookImages/sailormoon28.jpg",
      genre: "action",
      price: 999,
      yearOfPublish: 2001,
      stock: 20,
    },
    {
      title: "Sailor Moon",
      author: "Naoko Takeuchi",
      volume: 35,
      description: `
      One of the most-beloved of all Japanese manga titles, Naoko Takeuchi's Sailor Moon has enthralled millions of readers worldwide since its debut in book form in early 1992. When Usagi Tsukino adopts a stray cat, she gets more than she bargains for The talking cat, Luna, informs Usagi that she is actually Sailor Moon, a magical princess from the future and protector of the Solar System. With the help of her new friends, the Sailor Scouts, and the mysterious Tuxedo Mask, Sailor Moon embarks on a quest to save us all from the evil powers of the Negaverse.
    `,
      imageURL: "/static/bookImages/sailormoon35.jpg",
      genre: "action",
      price: 999,
      yearOfPublish: 2001,
      stock: 20,
    },
  ];

  await Promise.all(sailormoons.map((book) => Book.create(book)));

  /***************************************************************/

  const [
    devilman1,
    adamStrange1,
    wonderWoman,
    silverSurfer,
    xmen,
    berserk1,
    berserk2,
    berserk3,
    berserk4,
    berserk5,
    berserkDeluxe1,
    berserkDeluxe2,
    kaiji1,
    kaiji2,
    akagi36,
    chainsawMan1,
    chainsawMan2,
    chainsawMan3,
    chainsawMan4,
    odishogun1,
  ] = await Promise.all([
    Book.create({
      title: "Devilman",
      author: "Nagai Go",
      description:
        "For ages, the demons that once ravaged the earth have been trapped, leaving earth to enjoy a time of relative peace. But that peace is coming to an end. Demons have risen once again, tipping the world ever closer to Armageddon. Gentle Akira Fudo may seem like an unlikely hero, but due to his pure heart, he is able to become Devilman—a human with demonic powers, and the planet’s only hope of salvation!",
      genre: "action",
      volume: 1,
      yearOfPublish: 1972,
      imageURL: "/static/bookImages/devilman1.jpg",
      price: 1000,
      stock: 5,
    }),
    Book.create({
      title: "Adam Strange",
      author: "Andy Diggle",
      description:
        "Things have changed drastically for Strange. Once the greatest hero of the distant planet Rann, he's now a wanted man on Earth. Pursued by the police and hunted by aliens, Strange has learned that his adopted planet has been destroyed. With his wife and daughter gone, is there any hope left, or is this the end of the space hero? Sit back for a thrilling ride that takes one man on a trek though the DC Universe to rediscover the remnants of the L.E.G.I.O.N., the Darkstars, the Omega Men and more, as he faces a threat that will herald a galactic war!",
      genre: "action",
      volume: 1,
      yearOfPublish: 2004,
      imageURL: "/static/bookImages/adamStrange.webp",
      price: 500,
      stock: 20,
    }),
    Book.create({
      title: "Wonder Woman",
      author: "Christopher Priest",
      description:
        "Wonder Woman learns a disturbing truth about her home of Themyscira and the villainess Circe offers the Amazon Warrior a choice: kill an innocent soul or never see home again!",
      genre: "action",
      volume: 89,
      yearOfPublish: 1994,
      imageURL: "/static/bookImages/wonderWoman.jpeg",
      price: 500,
      stock: 20,
    }),
    Book.create({
      title: "The Silver Surfer",
      author: "Stan Lee",
      description:
        "Mephisto has yet another plan to obtain the Silver Surfer's soul. He disguises himself and walks among the humans.",
      genre: "action",
      volume: 16,
      yearOfPublish: 1970,
      imageURL: "/static/bookImages/silverSurfer.png",
      price: 2000,
      stock: 5,
    }),
    Book.create({
      title: "The X-Men",
      author: "Chris Claremont",
      description:
        "Thirty-three years in the future, North America is controlled by Sentinels. The few surviving X-Men - Kitty Pryde, Storm, Colossus, Wolverine and Franklin Richards, son of Mr. Fantastic and Invisible Woman, along with Magneto, plan to change history by having Rachel Summers exchange the psyche of the adult Kate Pryde with that of her younger self.",
      genre: "action",
      volume: 141,
      yearOfPublish: 1981,
      imageURL: "/static/bookImages/xmen.jpeg",
      price: 2000,
      stock: 5,
    }),

    // Berserks 1 - 5, standard...
    Book.create({
      title: "Berserk",
      volume: 1,
      author: "Kentaro Miura",
      description: `
        Created by Kentaro Miura, Berserk is manga mayhem to the extreme - violent, horrifying, and mercilessly funny - and the wellspring for the internationally popular anime series. Not for the squeamish or the easily offended, Berserk asks for no quarter - and offers none!
His name is Guts, the Black Swordsman, a feared warrior spoken of only in whispers. Bearer of a gigantic sword, an iron hand, and the scars of countless battles and tortures, his flesh is also indelibly marked with The Brand, an unholy symbol that draws the forces of darkness to him and dooms him as their sacrifice. But Guts won't take his fate lying down; he'll cut a crimson swath of carnage through the ranks of the damned - and anyone else foolish enough to oppose him! Accompanied by Puck the Elf, more an annoyance than a companion, Guts relentlessly follows a dark, bloodstained path that leads only to death...or vengeance.`,
      genre: "action",
      yearOfPublish: 1990,
      edition: "standard",
      imageURL: "/static/bookImages/berserk-vol-1.jpg",
      price: 999,
      stock: 1,
    }),

    Book.create({
      title: "Berserk",
      volume: 2,
      author: "Kentaro Miura",
      description: `The evil Count uses his dark powers to transform a defeated guard captain into an inhuman horror to combat Guts, the Black Swordsman. Puck, Guts’ pint-sized fairy sidekick, is captured when he attempts to stop an old doctor’s execution, and he is given as a gift to the count’s daughter, a sweet girl in a gilded cage, imprisoned by her father in her own room. Guts, determined to make mincemeat of the Count, assaults the castle and carves a swath of blood-soaked destruction through the Count’s minions. Face-to-face with the Black Swordsman at last, the Count reveals his true form, and even Guts’ super-sized sword may not be big enough to contend with this demonic monstrosity!`,
      genre: "action",
      yearOfPublish: 1991,
      edition: "standard",
      imageURL: "/static/bookImages/berserk-vol-2.jpg",
      price: 999,
      stock: 2,
    }),

    Book.create({
      title: "Berserk",
      volume: 3,
      author: "Kentaro Miura",
      description: `Guts, the feared Black Swordsman, finishes his desperate battle with the monstrous Count, cutting and blasting him to gory scraps when the presence of the Count's daughter makes the monster hesitate. But Guts won't even have the time to clean his gigantic sword when the Count's dying pleas activate the Behelit, summoning the five God Hands, demon lords of immeasurable power. Guts' journey so far has been a long road of pain and death, but that's a walk in the park compared to fighting his way out of Hell itself!`,
      genre: "action",
      yearOfPublish: 1991,
      edition: "standard",
      imageURL: "/static/bookImages/berserk-vol-3.jpg",
      price: 999,
      stock: 3,
    }),

    Book.create({
      title: "Berserk",
      volume: 4,
      author: "Kentaro Miura",
      description: `Now that the evil Count has been killed and dragged to Hell by the demon lords of the Godhand, Guts, the Black Swordsman, hooks up with his former benefactor, the mercenary Gambino. But it’s a deadly reunion, one that nearly takes Guts’ life. The following years see Guts wandering from battlefield to battlefield, where his awesome skills as a slayer catch the eye of both warring parties, including the legendary Griffith, warrior leader of the Band of the Hawk, who is eager to test his combat skills against those of the Black Swordsman. As usual, anytime that Guts is involved there will be hell to pay!
        `,
      genre: "action",
      yearOfPublish: 1992,
      edition: "standard",
      imageURL: "/static/bookImages/berserk-vol-4.jpg",
      price: 999,
      stock: 4,
    }),

    Book.create({
      title: "Berserk",
      volume: 5,
      author: "Kentaro Miura",
      description: `He is Guts, the Black Swordsman, a warrior of legendary prowess - relentless, fearless, merciless. As cold and brutal as the iron of the massive sword he wields. Bent on revenge against the unholy forces that have branded him for sacrifice, but especially on Griffith, one of the demon lords of the Godhand. But Griffith was once a man, the leader of the Hawks, a renowned cadre of elite fighters with a young Guts as its fiercest champion. Though forged in a crucible of cruelty and violence, nothing could prepare Guts for a confrontation with Nosferatu Zodd, a superhuman beast who slaughters Guts' comrades as easily as a scythe cuts wheat. Even Guts and Griffith are no match for the abomination's power...but something Griffith wears around his neck may well be!`,
      genre: "action",
      yearOfPublish: 1992,
      edition: "standard",
      imageURL: "/static/bookImages/berserk-vol-5.jpg",
      price: 999,
      stock: 5,
    }),

    Book.create({
      title: "Berserk",
      volume: 1,
      author: "Kentaro Miura",
      description: `Have you got the Guts? Kentaro Miura's Berserk has ouraged, horrified, and delighted manga and anime fanatics since 1989, creating an international legion of hardcore devotees and inspiring a plethora of TV series, feature films, and video games. And now the badass champion of adult fantasy manga is presented in an oversized 7'' x 10'' deluxe hardcover edition, nearly 700 pages amassing the first three Berserk volumes, with following volumes to come to serve up the entire series in handsome bookshelf collections. No Guts, no glory! Collects volumes 1-3.`,
      genre: "action",
      yearOfPublish: 2019,
      edition: "deluxe",
      imageURL: "/static/bookImages/berserk-deluxe-vol-1.jpg",
      price: 2999,
      stock: 5,
    }),

    Book.create({
      title: "Berserk",
      volume: 2,
      author: "Kentaro Miura",
      description: `The ultimate adult fantasy manga, now in 7''x10'' hardcover editions! Raised in torment, young Guts is hardened into a fearsome warrior, drawing the attention of the charismatic Griffith, commander of the elite Band of the Hawk. This crossroads will take Guts to fame and glory . . . and damnation! Collects Berserk volumes 4, 5, and 6.
Over 1.5 million copies sold of Dark Horse's Berserk manga! Inspired the hit anime TV series and feature films, video games, a trading card game, and more!`,
      genre: "action",
      yearOfPublish: 2019,
      edition: "deluxe",
      imageURL: "/static/bookImages/berserk-deluxe-vol-2.jpg",
      price: 2999,
      stock: 5,
    }),

    Book.create({
      title: "Gambling Apocalypse: KAIJI",
      volume: 1,
      author: "Nobuyuki Fukumoto",
      description: `Ne'er-do-well Kaiji Itou's shiftless existence is suddenly rattled by a visit from the yakuza. Burdened by debt and resentment, Kaiji is coerced into gambling for his worthless life. As the stakes grow higher and the rules become increasingly more bizarre, Kaiji must finally take the future into his own hands! Legendary mangaka Nobuyuki Fukumoto finally makes his English-language debut. The inspiration for the infamous anime by the same name and the Netflix live-action film Animal World takes readers into the dark side of Japan's post-bubble economic society by thrusting them into a world of debt, debauchery, and delusion.
        Nobuyuki Fukomoto made his manga debut in 1980 and has penned more than one-hundred and fifty volumes over his illustrious career. In 1998 he was presented the Kodansha Manga Award's Comic of the Year for his work on Gambling Apocalypse: Kaiji.
        Known to incorporate both elements of gambling and finance in his works, Fukumoto's most memorable titles tend to focus on the consequences of Japan's economic culture. Kaiji was recognized by the publishing world for how it rendered a changing social landscape after Japan's economic bubble had burst. Outside of Kaiji, Fukumoto is best known for his other international best-sellers, which include: Akagi (Take Shobo), Gin and Kin (Futabasha) and Kurosawa: The Strongest Man (Shogakukan).`,
      genre: "crime",
      edition: "deluxe",
      imageURL: "/static/bookImages/kaiji-vol-1.jpg",
      price: 2000,
      stock: 1,
    }),

    Book.create({
      title: "Gambling Apocalypse: KAIJI",
      volume: 2,
      author: "Nobuyuki Fukumoto",
      description: `Aboard the illegal gambling ship, the Espoir, Kaiji has now amassed an additional ten-million yen in debt. Taking his total debt before interest to over thirteen-million yen. With few resources left and less than an hour to win back some funds, the young man's options appear to be running out. Knowing that the endgame is near, panic begins to set. In an effort to even earn himself a lifeline, Kaiji decides to go all-in; betting away all his funds and those of his colleagues. The lives of three men hang in the balance in this deathmatch.
        Will the final curtain fall on Kaiji, or will he finally find a reason for hope aboard the Espoir?`,
      genre: "crime",
      edition: "deluxe",
      imageURL: "/static/bookImages/kaiji-vol-2.jpg",
      price: 2000,
      stock: 1,
    }),

    Book.create({
      title: "Akagi: Yami ni Oritatta Tensai",
      volume: 36,
      author: "Nobuyuki Fukumoto",
      description: "The final volume.",
      genre: "crime",
      edition: "standard",
      imageURL: "/static/bookImages/akagi-vol-36.jpg",
      price: 999,
      stock: 0,
    }),
    Book.create({
      title: "Chainsaw Man",
      volume: 1,
      author: "Fujimoto Tatsuki",
      description:
        "Broke young man + chainsaw dog demon = Chainsaw Man! Denji was a small-time devil hunter just trying to survive in a harsh world. After being killed on a job, he is revived by his pet devil Pochita and becomes something new and dangerous-Chainsaw Man! Denji's a poor young man who'll do anything for money, even hunting down devils with his pet devil-dog Pochita. He's a simple man with simple dreams, drowning under a mountain of debt. But his sad life gets turned upside down one day when he's betrayed by someone he trusts. Now with the power of a devil inside him, Denji's become a whole new man-Chainsaw Man!",
      genre: "action",
      edition: "standard",
      imageURL: "/static/bookImages/chainsawman1.jpg",
      price: 999,
      stock: 15,
    }),
    Book.create({
      title: "Chainsaw Man",
      volume: 2,
      author: "Fujimoto Tatsuki",
      description:
        "Broke young man + chainsaw dog demon = Chainsaw Man! Denji was a small-time devil hunter just trying to survive in a harsh world. After being killed on a job, he is revived by his pet devil Pochita and becomes something new and dangerous-Chainsaw Man! In order to achieve the greatest goal in human history-to touch a boob-Denji will risk everything in a fight against the dangerous Bat Devil. But will getting what he wants actually make him happy...?",
      genre: "action",
      edition: "standard",
      imageURL: "/static/bookImages/chainsawman2.jpg",
      price: 999,
      stock: 22,
    }),
    Book.create({
      title: "Chainsaw Man",
      volume: 3,
      author: "Fujimoto Tatsuki",
      description:
        "After being killed on a job, Denji is revived by his pet devil-dog Pochita and becomes something new and dangerous-Chainsaw Man! A mysterious devil is demanding Denji's heart! But will the devil hunters from Division 4 agree to this deal to save themselves? Or will Denji have to do what Denji does best-turn into a chainsaw and carve up everything that gets in his way?!",
      genre: "action",
      edition: "standard",
      imageURL: "/static/bookImages/chainsawman3.jpg",
      price: 999,
      stock: 15,
    }),
    Book.create({
      title: "Chainsaw Man",
      volume: 4,
      author: "Fujimoto Tatsuki",
      description:
        "Devil Extermination Special Division 4 is in serious trouble as a devil has sent a whole team of assassins to take Denji's heart. In order to survive the onslaught, Denji, Power and Aki will have to get stronger. But is Denji smart enough to learn how to control his devil powers? Can you can teach an old chainsaw-dog-devil new tricks?",
      genre: "action",
      edition: "standard",
      imageURL: "/static/bookImages/chainsawman4.jpg",
      price: 999,
      stock: 15,
    }),
    Book.create({
      title: "Odishogun, The Merge Conflict Saga",
      volume: 1,
      author: "Yifan Chen",
      description:
        "The year is 20XX. Code War III has devastated the planet. An ex-bootcamper Benimaru Odishogun arrives in the city of Github, searching for revenge for his fallen comrades. What nobody expected was.. THE MERGE CONFLICT!! Will Odishogun defeat the greatest empire of codes and edge cases that has ever existed?",
      genre: "action",
      edition: "deluxe",
      imageURL: "/static/bookImages/Odishogun_cover-01.jpg",
      price: 1000000,
      stock: 15,
    }),
  ]);

  return {
    books: {
      devilman1,
      adamStrange1,
      wonderWoman,
      silverSurfer,
      xmen,
      berserk1,
      berserk2,
      berserk3,
      berserk4,
      berserk5,
      berserkDeluxe1,
      berserkDeluxe2,
      kaiji1,
      kaiji2,
      akagi36,
      chainsawMan1,
      chainsawMan2,
      chainsawMan3,
      chainsawMan4,
      odishogun1,
    },
  };
};

module.exports = bookSeed;
