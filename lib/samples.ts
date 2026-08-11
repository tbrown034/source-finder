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

/* Four examples only: a focused mix of hyper-local accountability, sports,
 * language access, and education funding. */
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
] as const;

export interface StoryIdea {
  id: string;
  kind: string; // small tag before the chip label, mirroring draft chips
  chip: string;
  text: string;
}

/* Four examples only: storm readiness, sports/health, a bilingual
 * neighborhood project, and education accountability. */
export const STORY_IDEAS: readonly StoryIdea[] = [
  {
    id: "storm-readiness",
    kind: "weather",
    chip: "Hurricane-season readiness check",
    text: "Houston readies for the peak of hurricane season — checking whether promised fixes to power, drainage and emergency shelters actually happened.",
  },
  {
    id: "hisd-takeover",
    kind: "education beat",
    chip: "HISD takeover, year three",
    text: "Three years into the state takeover of Houston ISD — with the TEA extension running to 2027 and a dozen campuses closing, what has changed for students and teachers.",
  },
  {
    id: "gulfton-rebuild",
    kind: "neighborhoods",
    chip: "Gulfton's $43M street rebuild",
    text: "Gulfton, one of Houston's densest immigrant neighborhoods, is getting a $43 million federally funded street, drainage and tree-planting overhaul. Who was asked, and in what language.",
  },
  {
    id: "uil-heat-rules",
    kind: "sports",
    chip: "New UIL heat rules, week one",
    text: "New UIL rules now force Texas schools to shorten or cancel outdoor practice on wet-bulb heat readings. What Houston-area districts, athletes and band parents are living with.",
  },
] as const;
