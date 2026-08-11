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

export const SAMPLE_DRAFTS: readonly SampleDraft[] = [
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
    id: "river-oaks-prank",
    chip: "River Oaks shooter-scare prank",
    kind: "breaking news",
    title: "Felony charges filed after social media prank caused office shooter scare",
    basedOnUrl:
      "https://www.houstonchronicle.com/news/houston-texas/trending/article/active-shooter-river-oaks-social-media-prank-22382541.php",
    basedOnLabel: "Houston Chronicle: Houston pranksters caused River Oaks shooter scare, court docs allege",
    text:
      `Two Houston men face felony charges after a prank staged for social media convinced workers in a River Oaks office tower that an active shooter was in the building, according to Harris County court records filed Monday.

Edward Gonzales, 35, and Anthony Aguirre Jr., 38, were charged in connection with the scare last Wednesday at the River Oaks Tower on Kirby Drive. Arrest warrants have been issued for both men.

Court records allege Gonzales and another man entered the building dressed as delivery workers, yelled "safety check" and banged on office doors. Aguirre told police he was paid $200 to film the pair.

One worker told police she heard a man threaten to shoot outside her door. She was on a video call at the time and asked the person on the other end to call 911, then texted family members to do the same. Another employee said three men stormed into his office, demanded he sign for a package and drank from his and his client's drinks.

Houston police responded with all available units and placed the building on lockdown, holding occupants in a first-floor room while officers searched the tower. Aguirre was detained at the scene and later told police the men travel the country recording confrontation-bait pranks for social media.

Gonzales has twice pleaded guilty to misdemeanors for earlier stunts, including throwing cash into downtown traffic last fall. An attorney listed for him did not immediately respond to a request for comment.`,
  },
  {
    id: "tropics-watch",
    chip: "Atlantic tropics watch",
    kind: "weather",
    title: "Three Atlantic systems bear watching; Texas coast quiet for now",
    basedOnUrl:
      "https://www.houstonchronicle.com/news/houston-weather/hurricanes/article/tropical-disturbances-atlantic-ocean-west-africa-22381595.php",
    basedOnLabel: "Houston Chronicle: 3 tropical systems emerge in Atlantic, Texas Gulf Coast quiet for now",
    text:
      `The National Hurricane Center is monitoring three areas of possible tropical development in the Atlantic, though forecasters say none of the systems appears likely to reach the Gulf of Mexico anytime soon.

The most organized system, a cluster of thunderstorms a few hundred miles south of the Cabo Verde Islands, was given a 60% chance of becoming a tropical depression within seven days. Forecasters expect it to merge with a tropical wave moving off West Africa and develop by late week as it tracks westward across the central Atlantic. If it strengthens into a named storm, it would be called Cristobal.

A second wave midway between Africa and the Lesser Antilles has only a 10% chance of development, with upper-level winds expected to turn hostile as it approaches the Caribbean. A third system northwest of Bermuda should lose its window for development by midweek as it drifts over cooler water.

This year's season has been comparatively quiet, which forecasters attribute to a strong El Niño producing wind shear across the tropical Atlantic. The season's first two named storms, Arthur and Bertha, both made landfall on the Gulf Coast but stayed weak.

Forecasters cautioned that a Cabo Verde system that survives the crossing would have a long runway of warm water ahead of it.`,
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
      `Bristol Myers Squibb will build a $2.3 billion advanced manufacturing plant in Houston's Generation Park, the company announced Monday, the second multibillion-dollar pharmaceutical investment to land in the northeast Houston development in less than a year.

The 600,000-square-foot facility is expected to create 500 permanent jobs and about 2,000 construction jobs, with work beginning next year and completion targeted for 2030. The New Jersey-based drugmaker said the site is designed to expand well beyond its opening configuration.

The announcement follows Eli Lilly's decision in September to build a $6.5 billion plant in the same development, described by state leaders as the largest biotech manufacturing investment in Texas history.

Craig Rhodes, senior vice president of economic development at the Greater Houston Partnership, said the back-to-back commitments from two Fortune 100 drugmakers show momentum for the region's push to build a for-profit life sciences sector alongside the Texas Medical Center. The partnership hosted company executives on site visits in January and May as part of the recruitment.

Regional leaders have pointed to workforce training programs at San Jacinto College, Lone Star College and Texas A&M University as part of the case for Houston as a biomanufacturing hub.`,
  },
  {
    id: "lottery-commissions",
    chip: "Lottery retailers kept $1M",
    kind: "investigative",
    title: "Retailers in $95M lottery sweep kept commissions despite rule findings",
    basedOnUrl:
      "https://www.houstonchronicle.com/news/investigations/article/lottery-retailers-broken-rules-commissions-22362263.php",
    basedOnLabel: "Houston Chronicle: Texas Lottery retailers kept $1M in commissions after rule violations",
    text:
      `Texas lottery regulators concluded that retailers who helped a gambling syndicate corner a $95 million jackpot violated state rules — but the state has made no apparent effort to recover roughly $1.3 million in commissions and bonuses those retailers collected.

The April 2023 Lotto Texas draw was effectively bought out by an entity called Rook TX, which purchased nearly all 25.8 million number combinations and collected a $57.8 million lump-sum payout. Four licensed retailers processed more than 25 million of the roughly 28 million tickets sold, using pre-programmed QR codes scanned from personal devices — a method the state's own follow-up inspection later concluded was not approved.

State inspectors initially cleared the sale. After news reporting detailed the QR-code method, regulators re-inspected and, records at the State Office of Administrative Hearings show, filed compliance letters against two of the retailers. Both surrendered their lottery licenses rather than contest the allegations. The other two retailers involved let their licenses lapse or withdrew renewal applications.

Retailers earn a 5% commission on ticket sales, plus a $25,000 bonus for selling a jackpot winner. The store that processed the most tickets would have collected close to $600,000.

The state's former lottery director faces a felony charge in Travis County over his role in facilitating the draw. Lottery officials declined to comment, citing ongoing litigation.`,
  },
] as const;

export interface StoryIdea {
  id: string;
  chip: string;
  text: string;
}

/* storm-readiness leads because it carries a recorded result — the
 * instant-demo path should be visible without expanding the list. */
export const STORY_IDEAS: readonly StoryIdea[] = [
  {
    id: "storm-readiness",
    chip: "Hurricane-season readiness check",
    text: "Houston readies for the peak of hurricane season — checking whether promised fixes to power, drainage and emergency shelters actually happened.",
  },
  {
    id: "heat-outages",
    chip: "Grid stress and vulnerable Houston",
    text: "Texas grid operator warns of record summer demand — looking at what another multi-day outage would mean for Houston's most vulnerable neighborhoods.",
  },
  {
    id: "flood-buyouts",
    chip: "Harvey buyouts, a decade on",
    text: "Harris County's home buyout program a decade after Harvey: who got bought out, who is still waiting, and where the money went.",
  },
  {
    id: "hisd-takeover",
    chip: "HISD takeover, two years in",
    text: "Two years into the state takeover of Houston ISD — measuring what changed for students, teachers and test scores.",
  },
  {
    id: "port-expansion",
    chip: "Port growth and Ship Channel air",
    text: "The Port of Houston is expanding again. What the growth means for air quality in the communities along the Ship Channel.",
  },
  {
    id: "rent-evictions",
    chip: "Inside eviction court",
    text: "Evictions in Harris County are running above pre-pandemic levels. Following one week inside the county's busiest eviction court.",
  },
] as const;
