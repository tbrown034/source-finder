/* Sample drafts and story ideas.
 *
 * Each draft below was written for this demo. The facts come from real
 * Houston Chronicle reporting (linked per sample), but the prose is
 * original — no Chronicle copy is reproduced here. Each draft is
 * deliberately a competent-but-incomplete first pass: officials quoted,
 * affected people thin, data uncited. That is the kind of gap this tool
 * exists to notice.
 *
 * The story-idea examples are one-line assignments of the kind a reporter
 * types before the first interview. */

export interface SampleDraft {
  id: string;
  /* short label for the chip row */
  chip: string;
  kind: string; // shown as a small tag: "beat", "breaking", "enterprise"...
  title: string;
  basedOnUrl: string;
  basedOnLabel: string;
  text: string;
}

/* Order is deliberate: the default four (before "Show more") lead with the
 * hyper-local service story whose missing sources are the most obviously
 * findable, then the language-access policy story, then sports to prove
 * range early, then the suburban money story. The tail is ordered by
 * demo risk; the police-records story sits last on purpose. */
export const SAMPLE_DRAFTS: readonly SampleDraft[] = [
  {
    id: "faded-roads",
    chip: "Roads: 287 faded-lane reports",
    kind: "city services",
    title: "Faded lane markings draw twice as many 311 complaints",
    basedOnUrl:
      "https://www.houstonchronicle.com/news/houston-texas/transportation/article/houston-faded-roads-signs-22316925.php",
    basedOnLabel: "Houston Chronicle: Complaints about faded Houston road lanes doubled. Who's fixing them?",
    text:
      `Houston residents filed 287 reports about faded lane markings, crosswalks and street signs between January and May, more than double the 141 filed over the same stretch of 2025, according to the city's 311 data.

The busiest single month came earlier, in November 2025, when 129 reports arrived — more than any other month in the data.

Worn markings are hardest to see at night and in heavy rain, exactly when drivers most need the line between one lane and the next.

Which agency fixes a given stripe depends on the road it is painted on. Houston Public Works maintains city streets and is the only one of the three agencies that 311 reaches; the department reviews reports, sends inspectors and issues work orders. The Texas Department of Transportation maintains state highways and freeways, running daytime and nighttime inspections and taking retroreflectivity measurements. The Harris County Toll Road Authority covers the toll roads, inspecting daily, reviewing the system annually and replacing markings on a seven- to 10-year cycle, with crews flagging problems in a GIS application that records photos and condition ratings.

Markings wear out under traffic — tire friction, braking and heavy trucks, according to TxDOT's pavement marking handbook — and under UV light, rain and humidity. Tracy Jackson, a Harris County Toll Road Authority spokesperson, pointed to sun exposure as a factor. The reflective sheeting on signs breaks down the same way. Crews rebuild markings with heated thermoplastic, water-based paint and preformed tape, using hot-sprayed thermoplastic for long highway stripes.

Danny Perez, a spokesperson for TxDOT's Houston District, said the agency is replacing large overhead signs ahead of the 2026 FIFA World Cup.

Drivers can report a city street to 311, a state highway through TxDOT's "Road Needs Repair" form, which takes a map pin and a "lane marking visibility" category, or a toll road to HCTRA at 281-584-7500.`,
  },
  {
    id: "hs-football",
    chip: "HS football: 3,502-yard rusher",
    kind: "sports",
    title: "Returning stat leaders shape the 2026 high school football season",
    basedOnUrl:
      "https://www.houstonchronicle.com/sports/high-school/football/article/houston-high-school-football-returning-stat-leader-22357293.php",
    basedOnLabel: "Houston Chronicle: Houston high school football: Top returning stat leaders for 2026",
    text:
      `The 2026 Houston high school football season opens with an unusual amount of production coming back on the field. A review of last season's statistical leaders who are set to return shows a quarterback, a running back and a receiver each bringing back numbers that would have topped most area seasons outright.

Willis sophomore Lincoln Frazier returns as the leading passer after throwing for 4,232 yards. His 43 touchdown passes tie him with two seniors: Summer Creek's Noah Spinks, who threw for 3,690 yards, and Dickinson's Lorenzo Aguirre, who threw for 3,410.

The widest margin in the area belongs to Randle senior Landen Williams-Callis, who ran for 3,502 yards and 59 touchdowns. The next returning rusher, La Porte junior Sean Simon, finished with 2,191 yards and 25 scores, leaving Williams-Callis more than 1,300 yards and 34 touchdowns clear of the field.

Milby returns both halves of a productive passing game: senior Artavion Davis led area receivers with 1,602 yards and 22 touchdowns, and quarterback Gabriel Gutierrez threw for 3,033 yards.

On defense, Willis senior Cayden Williams comes back after 150 tackles. Wheatley junior Peter Dorsey led the area with 43 tackles for loss. North Forest returns two leaders of its own in senior Javeon Taylor, who had 26 sacks, and senior Da'Veon Perkins, who intercepted nine passes. Cypress Falls senior Kaden McCarty had 12 sacks and 26 tackles for loss.

Others worth tracking: Barbers Hill junior Luke Babin, who threw for 3,063 yards and 40 touchdowns, Crawford senior Braylen Fisher and Cy-Fair's Sean Riegler.

Coaches who find an error in these totals are asked to send corrections to the high school sports desk.`,
  },
  {
    id: "cdl-english",
    chip: "Trucking: English-only CDL test",
    kind: "transportation",
    title: "Texas ends Spanish-language CDL knowledge tests",
    basedOnUrl:
      "https://www.houstonchronicle.com/news/houston-texas/transportation/article/texas-cdl-english-tests-22287609.php",
    basedOnLabel: "Houston Chronicle: Texas DPS ends Spanish CDL test, requiring English-only exams",
    text:
      `The Texas Department of Public Safety will give all commercial driver's license and learner's permit knowledge tests in English only, ending the Spanish-language versions of the exams and barring interpreters from the testing room, the agency announced Monday.

DPS described the change as part of its efforts to make roads safer. State troopers and certified commercial vehicle inspectors will continue to evaluate English proficiency during routine traffic stops and at weigh stations, and drivers who fail those evaluations are placed out of service.

The change follows an executive order from President Donald Trump directing the U.S. Department of Transportation and the Federal Motor Carrier Safety Administration to strengthen enforcement of a longstanding federal requirement that commercial drivers be proficient in English. Transportation Secretary Sean Duffy said the safety administration would carry out the order. Earlier federal guidance was rescinded, and officials opened a review of commercial licenses held by non-residents.

Liz Castillo, founder and chief executive of the Greater Houston Trucking Association-Impact, said she supports the safety and communication goals behind the requirement and pointed to the role immigrant and multilingual drivers play in the supply chain. Many come to trucking for the economic opportunity and improve their English over time on the job, she said, and she called for workforce development, English-language instruction and clear guidance for drivers trying to comply.

John D. Esparza, president and chief executive of the Texas Trucking Association, said consistent testing standards promote professionalism, compliance and confidence.

The testing change lands alongside other restrictions. Texas has stopped issuing commercial licenses to refugees, asylum seekers and recipients of Deferred Action for Childhood Arrivals under new federal rules limiting non-citizens. Attorney General Ken Paxton is investigating several Texas truck driving schools, alleging they certified drivers who were unqualified or could not speak English.`,
  },
  {
    id: "cyfair-bond",
    chip: "Cy-Fair ISD $1.6B bond",
    kind: "education beat",
    title: "Cy-Fair ISD sends $1.6B bond and tax rate increase to voters",
    basedOnUrl:
      "https://www.houstonchronicle.com/news/houston-texas/education/article/bond-tax-increase-cy-fair-22372059.php",
    basedOnLabel: "Houston Chronicle: Cy-Fair ISD puts $1.6B bond, tax rate increase on November ballot",
    text:
      `Cypress-Fairbanks ISD trustees voted Monday night to put a 12-cent tax rate increase and a $1.6 billion bond before voters in November, a decision district leaders framed as the only way out of an $80 million deficit.

The tax measure would raise about $100 million a year for operations and fund one-time stipends the district has promised staff — $2,000 for hourly employees and $1,000 for everyone else. The bond, split into four propositions, would pay for building renovations, bus replacements, student laptops and athletics and pool repairs.

Trustee Christine Kalmbach cast the lone vote against the election order. "This is sending this to the voters, to our neighbors, to ask them, 'What do you want?'" trustee Kendra Camarena said.

Superintendent Douglas Killian said bus transportation would be among the first services cut if voters reject the increase, followed by "people and programs." The district has cut roughly $100 million over three years, including librarians, counselors and instructional support positions that were never restored.

An efficiency audit required before the election found Cy-Fair receives about $1,200 less per student than peer districts and nearly $2,000 less than the state average, partly because of a 20% local homestead exemption that costs the district more than $70 million a year.

District officials estimate the increase would cost the owner of a median-value $322,000 home about $160 a year. Killian has sent letters to the state education commissioner for three straight years asking the state to cover part of the gap. He says he has never received a response.`,
  },
  {
    id: "lottery-commissions",
    chip: "Lottery retailers kept $1.3M",
    kind: "investigative",
    title: "Retailers in $95M lottery sweep kept commissions despite rule findings",
    basedOnUrl:
      "https://www.houstonchronicle.com/news/investigations/article/lottery-retailers-broken-rules-commissions-22362263.php",
    basedOnLabel: "Houston Chronicle: Texas Lottery retailers kept $1M in commissions after rule violations",
    text:
      `Texas lottery regulators concluded that the retailers who helped a gambling syndicate corner a $95 million jackpot broke state rules. Three years on, there is no indication the state has tried to recover the roughly $1.3 million in commissions and bonuses those retailers collected on the sale.

The April 2023 Lotto Texas drawing was effectively bought out by Rook TX, an entity backed by a group of international gamblers, which purchased virtually all 25.8 million number combinations and claimed a $57.8 million lump-sum payout. Four licensed retailers, in Colleyville, Waco, Spicewood and Round Rock, processed more than 25 million of the roughly 28 million tickets sold for the drawing.

They did it using pre-programmed QR codes scanned from personal devices, a workaround to lottery rules that let players buy only from a paper play slip or the official app, one set of numbers at a time. State inspectors who reviewed the sale in 2023 found no violations. After the QR-code method was reported publicly, regulators re-inspected and concluded late last year that the practice had never been approved.

Records at the State Office of Administrative Hearings show the agency sent "show compliance" letters to two of the four retailers. Both surrendered their lottery licenses rather than contest the allegations.

Retailers earn about 5% on ticket sales, plus a $25,000 bonus for selling a jackpot winner. The Colleyville store processed roughly 11 million of the tickets, worth close to $600,000 in commission. The Round Rock store's share came to about $400,000, the Spicewood store's to about $280,000.

Gary Grief, who ran the lottery when the drawing was sold, faces a felony charge in Travis County accusing him of misusing his position to facilitate it. A hearing is set for this month. Lottery officials declined to comment, citing the ongoing litigation.`,
  },
  {
    id: "bms-plant",
    chip: "BMS $2.3B Houston plant",
    kind: "business",
    title: "Bristol Myers Squibb picks Houston for $2.3B manufacturing plant",
    basedOnUrl:
      "https://www.houstonchronicle.com/business/article/bristol-myers-squibbs-houston-biotech-22381760.php",
    basedOnLabel: "Houston Chronicle: Bristol Myers Squibb plans $2.3B manufacturing plant in Houston",
    text:
      `Bristol Myers Squibb will build a $2.3 billion advanced manufacturing plant in Houston's Generation Park, the company announced Monday, the second multibillion-dollar pharmaceutical investment to land in the northeast Houston development in under a year.

The 600,000-square-foot facility is expected to employ 500 people once it opens and to support about 2,000 construction jobs while it is built. Work is scheduled to begin next year and to finish by 2030. The New Jersey-based drugmaker said the site is designed to grow "in scale, capability and workforce for decades," language that suggests the opening footprint is a floor rather than a ceiling.

The announcement comes eleven months after Eli Lilly said it would build a $6.5 billion plant in the same development, a project billed at the time as the largest biotech manufacturing investment in Texas history and one that carried 4,000 jobs with it. The two commitments put roughly $8.8 billion of pharmaceutical construction inside a single master-planned development in northeast Houston.

Craig Rhodes, senior vice president of economic development at the Greater Houston Partnership, said the region had now landed "two Fortune 100 companies" in "back-to-back years." The partnership helped recruit the plant and hosted company executives on site visits in January and May.

Regional leaders have spent years pitching Houston as a biomanufacturing hub that could sit alongside the Texas Medical Center and give the region a for-profit life sciences sector to match its hospitals. They have pointed to workforce training programs at San Jacinto College, Lone Star College and Texas A&M University as evidence that the region can staff the plants it is courting, and to the Lilly announcement as evidence that one large employer can attract another.`,
  },
  {
    id: "constable-raises",
    chip: "Constables' $305K raises",
    kind: "county government",
    title: "Harris County constables' pay climbs to $305,000",
    basedOnUrl:
      "https://www.houstonchronicle.com/politics/houston/article/harris-county-constable-raise-2026-22371661.php",
    basedOnLabel: "Houston Chronicle: Harris County constables to earn $305,000 after latest pay raises",
    text:
      `Harris County's eight elected constables are set to earn $305,000 a year after Commissioners Court voted 4-1 Thursday to approve their fourth raise in three years — a run that has more than doubled their pay and now puts them above the vice president of the United States.

County Judge Lina Hidalgo cast the lone final vote against the increase, calling it "an unbelievable number" for politically influential elected officials. Commissioner Rodney Ellis initially opposed the raises but changed his vote after the court agreed to consider matching increases for other elected officials, including the district and county attorneys.

The raises come despite wide differences in the size of the offices. Half of the constable precincts employ fewer than 200 people; the largest, Precinct 4, employed about 750 as of the last fiscal year. The sheriff's office, by comparison, manages more than 5,000 employees. None of the eight constables attended Thursday's meeting.

Commissioner Adrian Garcia said the raises were motivated in part by legislation from state Rep. Sam Harless, R-Spring, requiring pay increases at any Harris County law enforcement agency to be distributed equally across the others. County Attorney Abbie Kamin told the court the raises were not necessarily required under state law but were "recommended and agreed to."

The increases take effect only if they survive the county's budget approval process in September.`,
  },
  {
    id: "tropics-watch",
    chip: "Tropics: 3 systems, none Gulf",
    kind: "weather",
    title: "Three Atlantic systems bear watching; Texas coast quiet for now",
    basedOnUrl:
      "https://www.houstonchronicle.com/news/houston-weather/hurricanes/article/tropical-disturbances-atlantic-ocean-west-africa-22381595.php",
    basedOnLabel: "Houston Chronicle: 3 tropical systems emerge in Atlantic, Texas Gulf Coast quiet for now",
    text:
      `The National Hurricane Center is watching three areas of possible tropical development in the Atlantic, none of which appears likely to reach the Gulf of Mexico in the near term, according to the center's Monday morning outlook.

The most organized of the three is an area of low pressure a few hundred miles south of the Cabo Verde Islands. Forecasters put its odds of developing at 20% over the next two days and 60% over the next seven. They expect it to merge with a tropical wave coming off West Africa and to become a tropical depression later this week as it moves west to west-northwest across the central tropical Atlantic. If it reaches tropical storm strength, it would take the name Cristobal, the third of the season.

A second system, a tropical wave roughly midway between West Africa and the Lesser Antilles, was given a 10% chance of developing. Forecasters expect upper-level winds along its path to turn less favorable later in the week as it nears the Caribbean. The third, a trough northwest of Bermuda, is expected to run out of time after Wednesday as it drifts over cooler water.

The season so far has been comparatively quiet, which forecasters attribute to a strong El Nino and the wind shear it has driven across the tropical Atlantic. The season's first two named storms, Arthur in June and Bertha in July, both came ashore on the U.S. Gulf Coast but stayed weak.

Nothing in Monday's outlook was aimed at the Texas coast. The percentages describe only the chance a system organizes, not where it would end up or how strong it would get. A live storm tracker accompanies this story.`,
  },
  {
    id: "river-oaks-prank",
    chip: "River Oaks prank, 2 charged",
    kind: "breaking news",
    title: "Felony charges filed after social media prank caused office shooter scare",
    basedOnUrl:
      "https://www.houstonchronicle.com/news/houston-texas/trending/article/active-shooter-river-oaks-social-media-prank-22382541.php",
    basedOnLabel: "Houston Chronicle: Houston pranksters caused River Oaks shooter scare, court docs allege",
    text:
      `Two Houston men face felony charges after a prank staged for social media convinced workers in a River Oaks office tower that an active shooter was inside, according to Harris County court records filed Monday.

Edward Gonzales, 35, and Anthony Aguirre Jr., 38, were each charged in connection with the scare last Wednesday at the office tower at 3730 Kirby Drive. Arrest warrants have been issued for both men.

Court records allege Gonzales and a second man, who has not been charged, entered the building dressed as delivery workers, yelled "safety check" and banged on office doors. Aguirre told police he had been paid $200 to film them.

One worker told police she heard a man threaten to shoot outside her door and feared for her life. She was on a video call at the time and asked the person on the other end to call 911, then texted her husband and her ex-husband to do the same. Another employee said three men pushed into his office, demanded he sign for a package he had not ordered, and drank from his and his client's drinks.

Houston police responded with all available units and locked down the building, holding the people inside in a first-floor room while officers searched it. Aguirre was detained at the scene and told officers the group travels the country recording pranks meant to bait confrontation.

Gonzales has two prior misdemeanor convictions over similar stunts: one in October for throwing cash into traffic on Dallas Street, which cost him three days in jail, and one in 2016 for blocking an Interstate 45 feeder road to play basketball.

Court records list an attorney for Gonzales. None is listed for Aguirre.`,
  },
] as const;

export interface StoryIdea {
  id: string;
  chip: string;
  text: string;
}

/* Order is deliberate. Position 1 is the reliability decision: a
 * fixture-backed idea whose default click returns a known-good result.
 * Positions 2-4 are the live showcase, ordered by how reliably a search
 * grounds them. Five and six sit behind "Show more". */
export const STORY_IDEAS: readonly StoryIdea[] = [
  {
    id: "storm-readiness",
    chip: "Hurricane-season readiness check",
    text: "Houston readies for the peak of hurricane season — checking whether promised fixes to power, drainage and emergency shelters actually happened.",
  },
  {
    id: "uil-heat-rules",
    chip: "New UIL heat rules, week one",
    text: "New UIL rules now force Texas schools to shorten or cancel outdoor practice on wet-bulb heat readings. What Houston-area districts, athletes and band parents are living with.",
  },
  {
    id: "gulfton-rebuild",
    chip: "Gulfton's $43M street rebuild",
    text: "Gulfton, one of Houston's densest immigrant neighborhoods, is getting a $43 million federally funded street, drainage and tree-planting overhaul. Who was asked, and in what language.",
  },
  {
    id: "hisd-takeover",
    chip: "HISD takeover, year three",
    text: "Three years into the state takeover of Houston ISD — with the TEA extension running to 2027 and a dozen campuses closing, what has changed for students and teachers.",
  },
  {
    id: "ship-channel-air",
    chip: "Ship Channel dredging spoils",
    text: "Port Houston's Project 11 is placing millions of cubic yards of dredged sediment beside Galena Park and Pleasantville. What people living there are breathing.",
  },
  {
    id: "metrolift",
    chip: "METROLift riders left waiting",
    text: "METROLift is the only ride many disabled and older Houstonians have, and it keeps missing pickup windows. Checking METRO's on-time numbers against what riders describe.",
  },
] as const;
