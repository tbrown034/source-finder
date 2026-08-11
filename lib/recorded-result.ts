/* Recorded results for sample mode — captured verbatim from the live
 * Anthropic API on Aug 11, 2026 by scripts/record-sample.mjs, using the
 * exact prompt and grounding gate the serverless function uses. Replayed
 * so the demo works instantly, free, and offline. Labels on the page
 * never blur recorded vs live.
 *
 * searchUrlsNormalized holds every URL the run's web searches returned
 * (normalized by lib/grounding.normalizeUrl) so the fixture-integrity
 * test can re-run the gate over this exact data. */

import type { Suggestion } from "./grounding.ts";

export interface RecordedResult {
  sampleId: string;
  mode: "draft" | "idea";
  suggestions: Suggestion[];
  droppedCount: number;
  searchesRun: number | null;
  searchUrlsNormalized: string[];
  model: string;
  ms: number;
  capturedOn: string;
}

export const RECORDED_RESULTS: readonly RecordedResult[] = [
  {
    "sampleId": "cyfair-bond",
    "mode": "draft",
    "suggestions": [
      {
        "category": "affected",
        "who_or_what": "Cy-Fair ISD hourly and non-teaching staff (bus drivers, custodians, paraprofessionals)",
        "why_needed": "The draft names bus transportation as the first cut if voters reject the increase and promises one-time stipends to hourly workers, yet no hourly or support staff member is quoted about how those cuts or stipends actually affect them.",
        "url": "https://communityimpact.com/cy-fair-jersey-village/education/cy-fair-isd-board-of-trustees-discuss-potential-november-vatre-bond-election/",
        "source_title": "Cy-Fair ISD board of trustees discuss potential November VATRE, bond election | Community Impact",
        "why_good": "These employees are the most directly exposed to both the promised stipend and the threatened layoffs — their perspective is closest to the fiscal stakes the story describes."
      },
      {
        "category": "affected",
        "who_or_what": "Cypress-Fairbanks ISD parent-teacher organizations (PTOs) and the Cy-Fair Educational Foundation",
        "why_needed": "Parents whose children lost librarians, counselors, and instructional support staff during three years of cuts are absent from the story; community organizations can connect reporters to those families.",
        "url": "https://www.thecfef.org/",
        "source_title": "Cy-Fair Educational Foundation | Today's Students - Tomorrow's Future",
        "why_good": "The Cy-Fair Educational Foundation is an independent nonprofit whose mission centers on supporting students and staff in the district, giving it direct knowledge of service gaps without being a district mouthpiece.",
        "contact": "thecfef.org",
        "contact_url": "https://www.thecfef.org/"
      },
      {
        "category": "affected",
        "who_or_what": "Owner of a median-value home in the district's lowest-income ZIP codes",
        "why_needed": "The district's $160-per-year cost estimate uses a $322,000 median home, but the district serves a racially and economically diverse population; the burden on lower-income homeowners proportionally differs and is unexamined.",
        "url": "https://ballotpedia.org/Cypress-Fairbanks_Independent_School_District,_Texas",
        "source_title": "Cypress-Fairbanks Independent School District, Texas - Ballotpedia",
        "why_good": "Harris County Appraisal District public records can be used to identify assessed values by ZIP code, giving the reporter a checkable, localized cost picture rather than a single median."
      },
      {
        "category": "opposing",
        "who_or_what": "Jeff Ivey, member of CFISD's Long Range Planning Committee and vocal bond opponent",
        "why_needed": "The only dissent in the story is a single trustee vote; Ivey is an organized opposition voice with specific objections — particularly about technology spending in the bond — who has said publicly he plans to campaign against it.",
        "url": "https://www.houstonpress.com/news/cy-fair-isds-1-6-billion-bond-is-off-the-table-for-may/",
        "source_title": "Cy-Fair ISD's $1.6 Billion Bond is Off the Table for May - Houston Press",
        "why_good": "As a member of the district's own Long Range Planning Committee, Ivey is an informed insider critic, not an outside agitator, giving his skepticism credibility and specificity."
      },
      {
        "category": "opposing",
        "who_or_what": "Trustee Christine Kalmbach",
        "why_needed": "Kalmbach cast the lone dissenting vote but is given no direct quote or reasoning in the story; readers deserve to understand the strongest case against the election order.",
        "url": "https://ballotpedia.org/Cypress-Fairbanks_Independent_School_District,_Texas",
        "source_title": "Cypress-Fairbanks Independent School District, Texas - Ballotpedia",
        "why_good": "As a sitting trustee with access to the same financial information as her colleagues, her objection represents the most informed internal dissent available.",
        "contact": "281-897-4000",
        "contact_url": "https://ballotpedia.org/Cypress-Fairbanks_Independent_School_District,_Texas"
      },
      {
        "category": "data",
        "who_or_what": "CFISD Efficiency Audit Report (Weaver and Tidwell, LLP, FY 2023)",
        "why_needed": "The story cites audit findings about per-pupil underfunding without linking readers to the underlying document; the full audit can reveal whether the district's peer-group selection flatters or challenges the district's claims.",
        "url": "https://resources.finalsite.net/images/v1728404974/cfisdnet/ch6grwuukq7ntrxerjaj/EfficiencyAuditReport.pdf",
        "source_title": "Cypress-Fairbanks Independent School District Efficiency Audit Report (Weaver and Tidwell)",
        "why_good": "The audit was conducted by a third-party CPA firm and is publicly posted on the district's website, making it a directly checkable primary source for the $1,200 and $2,000 funding-gap figures cited in the story."
      },
      {
        "category": "data",
        "who_or_what": "Texas Education Agency FIRST (Financial Integrity Rating System of Texas) ratings and PEIMS financial data downloads",
        "why_needed": "The story accepts the district's deficit framing without independent verification; TEA's publicly available FIRST ratings and PEIMS data let a reporter audit the district's budget submissions and financial management track record.",
        "url": "https://tea.texas.gov/data-reports/financial-reports",
        "source_title": "Financial Reports | Texas Education Agency",
        "why_good": "FIRST ratings are calculated using standardized indicators including administrative cost ratios and external auditor findings, providing a state-mandated, arms-length financial snapshot."
      },
      {
        "category": "data",
        "who_or_what": "CFISD Board meeting agendas, minutes, and CFO budget presentations (BoardBook public portal)",
        "why_needed": "Chief Financial Officer Karen Smith's presentation to the board contained the underlying budget projections driving the story, but those figures are asserted rather than documented in the draft.",
        "url": "https://meetings.boardbook.org/Public/Organization/668",
        "source_title": "Cypress-Fairbanks ISD Public View - BoardBook Premier",
        "why_good": "Board meeting materials are public records and are posted on the district's BoardBook portal, allowing reporters to verify the $80.9 million shortfall projection and the $94.4 million in prior cuts independently."
      },
      {
        "category": "data",
        "who_or_what": "NCES Common Core of Data — CFISD district profile (staffing, enrollment, per-pupil expenditure)",
        "why_needed": "The story's claims about cuts to librarians, counselors, and support staff over three years could be grounded in federal staffing data that tracks year-over-year changes independently of what the district reports.",
        "url": "https://nces.ed.gov/ccd/districtsearch/district_detail.asp?ID2=4816110",
        "source_title": "Search for Public School Districts — CYPRESS-FAIRBANKS ISD | NCES",
        "why_good": "The National Center for Education Statistics Common Core of Data is a federal dataset compiled from state submissions, providing a neutral, longitudinal record of district staffing and spending."
      },
      {
        "category": "experts",
        "who_or_what": "Ruth N. López Turley, Director, Kinder Institute for Urban Research / Houston Education Research Consortium, Rice University",
        "why_needed": "The story relies solely on the district's own efficiency audit for per-pupil funding comparisons; an independent researcher who has specifically studied Texas school district funding gaps can contextualize whether Cy-Fair's situation is typical, unusual, or self-inflicted.",
        "url": "https://kinder.rice.edu/research/texas-school-district-funding-gaps",
        "source_title": "Texas School District Funding Gaps | Kinder Institute for Urban Research | Rice University",
        "why_good": "Turley co-authored a 2024 peer-reviewed brief finding that 73% of Texas school districts are underfunded, and the Kinder Institute partners directly with Houston-area districts — making her both expert and geographically proximate with no stake in this election.",
        "contact": "kinder@rice.edu",
        "contact_url": "https://eric.ed.gov/?id=ED657500"
      },
      {
        "category": "experts",
        "who_or_what": "Bruce Baker, Professor of Education Policy and Finance, University of Miami (School Finance Indicators Database)",
        "why_needed": "The story presents the state's per-pupil funding gap as a simple fact; Baker can assess whether the efficiency audit's peer-group methodology and the state funding formula produce a fair picture of Cy-Fair's structural disadvantage.",
        "url": "https://www.tpr.org/education/2025-05-13/fact-checking-gov-abbotts-claim-that-public-schools-have-an-all-time-high-of-15k-per-student",
        "source_title": "Fact-checking Gov. Abbott's claim that public schools have an 'all-time high' of $15K per student | TPR",
        "why_good": "Baker is a nationally recognized school finance researcher with no institutional stake in Texas district politics, and he has specifically analyzed Texas funding equity and state fiscal effort for public education."
      },
      {
        "category": "experts",
        "who_or_what": "Intercultural Development Research Association (IDRA) — Texas school finance policy team",
        "why_needed": "The story does not address how the funding gap affects English Language Learner students, who make up a significant share of CFISD enrollment; IDRA has decades of expertise on the intersection of Texas school finance and bilingual/ELL equity.",
        "url": "https://www.idra.org/education_policy/fair-school-funding-in-texas/",
        "source_title": "Fair School Funding in Texas - IDRA",
        "why_good": "IDRA is a nonprofit research and advocacy organization with over 50 years of work on Texas school finance equity, has submitted expert testimony in school finance litigation, and has no financial relationship with Cy-Fair ISD."
      },
      {
        "category": "designed-out",
        "who_or_what": "Spanish-speaking and Vietnamese-speaking homeowner and renter communities in the district",
        "why_needed": "The district's election materials reference Vietnamese-language notices, and CFISD's student population is 22% Hispanic; if the story is written only in English and sources only English-speaking voices, it structurally excludes the communities most reliant on the services threatened by cuts.",
        "url": "https://www.cfisd.net/our-district/board-of-trustees/board-elections/board-election-2025",
        "source_title": "Board Election 2025 - Cypress-Fairbanks Independent School District",
        "why_good": "The district's own board election page includes a Vietnamese-language notice, confirming that non-English-speaking households are a recognized constituency whose tax burden and service exposure deserve direct representation in coverage."
      },
      {
        "category": "designed-out",
        "who_or_what": "Renters within CFISD boundaries",
        "why_needed": "The story frames the tax burden exclusively as a homeowner cost ($160/year on a $322,000 home), erasing renters who bear the cost indirectly through rent increases but get no homestead exemption benefit and have no ballot visibility in the framing.",
        "url": "https://communityimpact.com/cy-fair-jersey-village/education/cy-fair-isd-board-of-trustees-discuss-potential-november-vatre-bond-election/",
        "source_title": "Cy-Fair ISD board of trustees discuss potential November VATRE, bond election | Community Impact",
        "why_good": "Renter households, who are disproportionately lower-income and people of color, are a large share of any suburban Houston community; their exclusion from the story's cost analysis distorts the equity picture of who the bond and tax vote actually affects."
      }
    ],
    "droppedCount": 0,
    "searchesRun": 7,
    "searchUrlsNormalized": [
      "actweb.acttax.com/act_webdev/cyfair/index.jsp",
      "ballotpedia.org/Cypress-Fairbanks_Independent_School_District,_Texas",
      "ballotpedia.org/Cypress-Fairbanks_Independent_School_District,_Texas,_elections_(2025)",
      "bigjolly.com/cypress-fairbanks-isd-asks-for-record-breaking-1-76-billion",
      "bigjolly.com/tag/cypress-fairbanks-isd",
      "capitol.texas.gov/tlodocs/82R/billtext/pdf/HR01580I.pdf",
      "capitol.texas.gov/tlodocs/85R/billtext/pdf/HR00267I.pdf",
      "citizenportal.ai/articles/8344063/Texas/School-Districts/CYPRESS-FAIRBANKS-ISD/Cypress-Fairbanks-ISD-frames-Community-Programs-as-self-sustaining-support-for-families-and-staff",
      "communityimpact.com/cy-fair-jersey-village/education/cy-fair-isd-board-of-trustees-discuss-potential-november-vatre-bond-election",
      "dfertx.org/policy/school-funding",
      "digital.library.txst.edu/bitstreams/d0de3e44-ca02-4eba-8bc0-93c4bd1a13f2/download",
      "en.wikipedia.org/wiki/Stephen_Klineberg",
      "eric.ed.gov/?id=ED657500",
      "files.eric.ed.gov/fulltext/ED657500.pdf",
      "kinder.rice.edu/centers/houston-education-research-consortium?page=1",
      "kinder.rice.edu/research/texas-school-district-funding-gaps",
      "leadiq.com/c/cypress-fairbanks-isd/5a1d95bd2300005c00846898",
      "leadiq.com/c/cypress-fairbanks-isd/5a1d95bd2300005c00846898/employee-directory",
      "link.axios.com/click/35128067.13337/aHR0cHM6Ly93d3cuZ2Npc2QubmV0L2FydGljbGUvMTQyMjk4Nj91dG1fc291cmNlPW5ld3NsZXR0ZXImdXRtX21lZGl1bT1lbWFpbCZ1dG1fY2FtcGFpZ249bmV3c2xldHRlcl9heGlvc2xvY2FsX2RhbGxhcyZzdHJlYW09dG9w/61571d580bb18027b8e26002Bf3aa42d6",
      "meetings.boardbook.org/Public/Organization/668",
      "nces.ed.gov/ccd/districtsearch/district_detail.asp?ID2=4816110",
      "news.rice.edu/news/2024/report-underfunded-texas-school-districts-much-more-likely-have-low-achievement-ratings",
      "projects.propublica.org/nonprofits/organizations/956207244",
      "repository.rice.edu/items/9cc39b03-4a2f-4d82-9b19-88c6c70fbbcd",
      "resources.finalsite.net/images/v1712002697/cfisdnet/fcupdseeqeqw3fzdmpug/adminregs.pdf",
      "resources.finalsite.net/images/v1728404974/cfisdnet/ch6grwuukq7ntrxerjaj/EfficiencyAuditReport.pdf",
      "resources.finalsite.net/images/v1754079660/cfisdnet/sz5wtav7wdqbsaifn36o/Cypress-FairbanksIndependentSchoolDistrict-ImprovementPlan13.pdf",
      "schools.texastribune.org/districts/cypress-fairbanks-isd/wells-elementary-school",
      "tea.texas.gov/about-tea/news-and-multimedia/news-releases/news-2019/tea-releases-preliminary-2018-2019-financial-accountability-ratings",
      "tea.texas.gov/about-tea/news-and-multimedia/news-releases/news-2022/tea-releases-final-2021-2022-financial-accountability-ratings",
      "tea.texas.gov/ar/node/106220",
      "tea.texas.gov/data-reports/financial-accountability/financial-integrity-rating-system-texas-first/charter-first-rating-open-enrollment-charter-schools-and-charter-schools-operated-public-institution-higher-education-ihe",
      "tea.texas.gov/data-reports/financial-reports",
      "tea.texas.gov/sites/default/files/taa-2025-11-06-official-notification-release-of-final-20242025-first-ratings.pdf",
      "tea.texas.gov/taa-letters/preliminary-2021-2022-first-ratings",
      "tea.texas.gov/taa-letters/preliminary-2023-2024-first-ratings",
      "teacherquality.nctq.org/districtPolicy/contractDatabase/district.do?id=40",
      "tealprod.tea.state.tx.us/First/help/Introduction.htm",
      "texasschoolalliance.org/wp-content/uploads/2024/04/Dr-Turley_Funding-Gaps-in-Education_Kinder-Institute_4-3-2024.pdf",
      "www.aol.com/articles/midway-isd-voters-approve-83-045001565.html",
      "www.browardschools.com/Page/9048",
      "www.cbsnews.com/texas/news/expert-poor-texas-school-districts-tax-more-get-less",
      "www.cfisd.net/domain/2617",
      "www.cfisd.net/our-district/board-of-trustees/board-elections/board-election-2025",
      "www.cfisd.net/our-district/financial-information",
      "www.cfisd.net/parents-students01/community-programs",
      "www.cfisd.net/staff",
      "www.click2houston.com/news/local/2024/08/05/report-from-rice-universitys-kinder-institute-shows-over-73-of-texas-schools-are-underfunded",
      "www.click2houston.com/news/local/2025/11/05/cy-fair-isd-board-race-draws-nine-candidates-heavy-spending-and-political-tension",
      "www.facebook.com/cyfairisd/posts/the-board-of-trustees-recently-approved-the-2025-26-budget-with-a-new-starting-s/1162341209267790",
      "www.har.com/school_district/cypress-fairbanks-isd_101907",
      "www.houstonpress.com/news/cy-fair-isds-1-6-billion-bond-is-off-the-table-for-may",
      "www.idra.org/education_policy/fair-school-funding-in-texas",
      "www.idra.org/resource-center/the-status-of-school-finance-equity-in-texas",
      "www.schoolfinancedata.org/page/external-resources",
      "www.science.gov/topicpages/s/school+funding+equity",
      "www.tasbo.org/resources/school-first-resources",
      "www.texasattorneygeneral.gov/news/releases/ag-paxton-files-letter-brief-support-cypress-fairbanks-isd-conducting-campus-development-teachers",
      "www.thecfef.org/",
      "www.tpr.org/education/2025-05-13/fact-checking-gov-abbotts-claim-that-public-schools-have-an-all-time-high-of-15k-per-student",
      "www.urban.org/sites/default/files/publication/99706/school_district_funding_in_texas_1.pdf",
      "www.wcacp.org/everything-you-need-to-know-about-the-cypress-fairbanks-school-district-in-texas",
      "www.wegopublic.com/houston-school-districts/cypress-fairbanks-isd",
      "www.yahoo.com/news/articles/troup-isd-calls-22-million-034159901.html"
    ],
    "model": "claude-sonnet-4-6",
    "ms": 78017,
    "capturedOn": "2026-08-11"
  },
  {
    "sampleId": "constable-raises",
    "mode": "draft",
    "suggestions": [
      {
        "category": "affected",
        "who_or_what": "Harris County residents and advocacy groups facing service cuts tied to the budget deficit — particularly organizations focused on youth mentorship, childcare, and criminal-justice reform programs",
        "why_needed": "The story reports a $130 million budget deficit in the same breath as the raises but never quotes a resident or community organization whose services may be cut; last year's budget eliminated credible messenger mentorship and childcare training programs in the same cycle that funded constable raises.",
        "url": "https://defendernetwork.com/news/local-state/harris-county-budget-2026/",
        "source_title": "Harris County's $2.8 billion budget approved amid controversy - DefenderNetwork.com",
        "why_good": "Community testimony at the FY2026 budget hearing directly connected constable pay raises to cuts in social services, giving these voices direct proximity to the trade-off at the heart of this story."
      },
      {
        "category": "affected",
        "who_or_what": "Harris County Sheriff's Office employees and union — particularly those in the medical division, which was cut 72% in last year's budget even as constable pay rose",
        "why_needed": "The story compares constable office sizes to the Sheriff's 5,000-person operation without asking whether those larger-office employees experienced service degradation as a direct result of the pay parity spending pattern.",
        "url": "https://texasscorecard.com/local/constable-salaries-reach-305000-as-harris-county-faces-growing-deficit/",
        "source_title": "Constable Salaries Reach $305,000 as Harris County Faces Growing Deficit - Texas Scorecard",
        "why_good": "Last year's adopted budget cut the sheriff's medical division by 72% while constable salaries rose, making HCSO staff direct witnesses to the resource competition this story only implies."
      },
      {
        "category": "affected",
        "who_or_what": "Harris County homeowners facing a possible 'greatest tax rate increase in the history of Harris County' tied to the $130 million deficit",
        "why_needed": "The story mentions the budget must survive September approval but never quotes a taxpayer who will bear the cost; the county's effective property tax rate already exceeds the national average by a wide margin.",
        "url": "https://www.appealdesk.com/appeals/texas/harris",
        "source_title": "Harris County TX Property Tax Protest (2026 Guide)",
        "why_good": "Harris County homeowners pay a median $4,416 annually in property taxes — well above the national median — giving them direct financial stake in how the deficit is closed."
      },
      {
        "category": "opposing",
        "who_or_what": "Baker Institute for Public Policy at Rice University — specifically fellow Bill King, who analyzed the county's budget and projected the deficit could climb to $300 million",
        "why_needed": "The story treats the raise as a fait accompli pending budget approval; an independent fiscal analyst who has already modeled the deficit consequences is the strongest-informed skeptic of that framing.",
        "url": "https://abc13.com/post/harris-county-could-face-increased-fees-program-cuts-close-129m-deficit/19515767/",
        "source_title": "Harris County could face increased fees, and program cuts to close its $129M deficit - ABC13 Houston",
        "why_good": "The Baker Institute is an independent, nonpartisan policy research organization at Rice University with no stake in the outcome of the constable pay debate, and King has already gone on record about the budget math."
      },
      {
        "category": "opposing",
        "who_or_what": "Texas state Rep. Sam Harless, R-Spring — author of HB 4205, the pay-parity law cited as motivation for the raises",
        "why_needed": "The story quotes Commissioner Garcia attributing the raises partly to Harless's bill, but Harless withdrew his attorney general letter before a ruling; his own view of whether the raises were legally required or politically chosen is absent.",
        "url": "https://capitol.texas.gov/tlodocs/89R/analysis/doc/HB04205E.docx",
        "source_title": "H.B. 4205 Bill Analysis - Texas Legislature",
        "why_good": "Harless is the legislative architect of the pay-parity statute and has a direct conflict of interest worth disclosing: his biography notes years of service on the Harris County Constable Precinct 4 Training Advisory Board.",
        "contact": "Texas House of Representatives member page",
        "contact_url": "https://house.texas.gov/members/3775/biography"
      },
      {
        "category": "opposing",
        "who_or_what": "Travis County, Tarrant County, and Dallas County — all of which paid constables under $150,000 in 2025, offering a direct policy counterpoint to Harris County's trajectory",
        "why_needed": "The story lacks any Texas peer-county comparison; officials in those counties could explain how they have retained officers and managed pay equity without raises of this magnitude.",
        "url": "https://abc13.com/post/harris-county-commissioner-warns-homeowners-could-soon-see-large-property-tax-increase-officials-salaries/19637938/",
        "source_title": "Harris County commissioner warns homeowners could soon see a large property tax increase - ABC13 Houston",
        "why_good": "These are direct Texas comparators with identical constitutional structures for constables, making their compensation decisions the most legally and contextually relevant counterpoint available."
      },
      {
        "category": "data",
        "who_or_what": "Harris County FY2027 Proposed Budget — the official county budget document that will either ratify or reject the constable raises in September",
        "why_needed": "The story says the raises take effect only if they survive the budget process, but it does not tell readers where to track that process or what the full cost line looks like across all eight constable precincts.",
        "url": "https://budget.harriscountytx.gov/doc/Budget/budgetbook/FY2026/FY26_V2_Proposed_Budget_Volume_I_20250826.pdf",
        "source_title": "Proposed Budget, FY2026 Volume I - Harris County OMB",
        "why_good": "The county's Office of Management and Budget publishes budget documents publicly; the FY2026 proposed budget is already online and shows the template for what reporters should request for FY2027."
      },
      {
        "category": "data",
        "who_or_what": "Texas Tribune Government Salaries Explorer — publicly searchable database of Texas state and local government compensation",
        "why_needed": "The story makes a dramatic VP-salary comparison but does not give readers a way to verify or contextualize Harris County constable pay against other Texas elected officials; this dataset does.",
        "url": "https://salaries.texastribune.org/departments/house-of-representatives/positions/elected-official/",
        "source_title": "Elected Official | Texas Tribune Government Salaries Explorer",
        "why_good": "The Texas Tribune publishes this as a nonpartisan public-interest resource, and it is the standard cross-county salary benchmark used by Texas political reporters."
      },
      {
        "category": "data",
        "who_or_what": "HB 4205 enrolled bill text and legislative analysis — the Harless pay-parity statute that commissioners cited as motivation for the raises",
        "why_needed": "The story says County Attorney Kamin told the court the raises were not necessarily required under state law, but neither the bill's actual language nor its legislative intent analysis is cited; that gap lets an ambiguous legal question drive a $305,000 salary without scrutiny.",
        "url": "https://capitol.texas.gov/tlodocs/89R/analysis/doc/HB04205H.docx",
        "source_title": "H.B. 4205 Committee Report Analysis - Texas Legislature",
        "why_good": "The Capitol bill-analysis documents are primary source legislative records and show the bill's own stated intent — officer-rank pay parity — and the definitional carve-outs that may exclude elected officials."
      },
      {
        "category": "data",
        "who_or_what": "Harris County Constable Precinct 4 budget and procurement records — Precinct 4 operates a nearly $103 million budget and is the largest constable office",
        "why_needed": "The story notes wide size differences among precincts but does not compare what each constable manages in budget dollars, only headcount; precinct-level budget documents would let readers assess whether a $305,000 salary is proportionate to organizational scope.",
        "url": "https://www.constablepct4.com/budget--procurement.html",
        "source_title": "Budget & Procurement - Harris County Constable Precinct 4",
        "why_good": "Precinct 4 publishes its own budget breakdown by branch (patrol, support, staff services, administration), making it one of the few constable offices with a publicly auditable financial footprint."
      },
      {
        "category": "experts",
        "who_or_what": "David Schleicher, Professor of Law at Yale Law School — expert in local government law, state and local finance, and municipal fiscal policy",
        "why_needed": "The story raises unresolved questions about whether state law actually required these raises; a local-government law scholar with no stake in Texas county politics can explain what pay-parity statutes can and cannot compel.",
        "url": "https://iedl.yale.edu/node/51",
        "source_title": "David N. Schleicher - Yale Law School",
        "why_good": "Schleicher is described as a leading authority on local government law with expertise specifically in state-local finance and is institutionally independent of Texas county politics."
      },
      {
        "category": "experts",
        "who_or_what": "UT Austin LBJ School of Public Affairs faculty — the Civitas Institute's executive director lists governance and urban policy as expertise areas",
        "why_needed": "The story needs an academic voice on whether quadrupling elected-official pay in three years is consistent with good local-government compensation practice; a Texas-based public-affairs expert would understand both the policy and the state fiscal context.",
        "url": "https://experts.utexas.edu/subject/US-politics-government",
        "source_title": "UT Experts: US Politics & Government - University of Texas at Austin",
        "why_good": "The LBJ School is an independent public-policy research institution within Texas, giving faculty proximity to Harris County politics without a stake in the outcome of this specific vote.",
        "contact": "ryan.streeter@austin.utexas.edu",
        "contact_url": "https://experts.utexas.edu/subject/US-politics-government"
      },
      {
        "category": "designed-out",
        "who_or_what": "Spanish-speaking and immigrant Harris County residents who rely on county social services targeted for cuts — a community disproportionately affected by both the budget trade-offs and constable enforcement activity",
        "why_needed": "Harris County is majority-minority and has a large Spanish-speaking population, yet the story's framing is entirely institutional; immigrant service organizations testified at the FY2026 budget hearing that funding cuts would harm their communities directly.",
        "url": "https://abc13.com/post/harris-county-could-face-increased-fees-program-cuts-close-129m-deficit/19515767/",
        "source_title": "Harris County could face increased fees, and program cuts to close its $129M deficit - ABC13 Houston",
        "why_good": "The county lost nearly $600 million in federal grants supporting programs including refugee healthcare and legal services for immigrants — connecting constable pay decisions to immigrant community impacts via the shared budget."
      },
      {
        "category": "designed-out",
        "who_or_what": "Residents of smaller constable precincts (those with fewer than 200 employees) whose constables receive the same $305,000 salary as the head of Precinct 4's 750-person, $103 million operation",
        "why_needed": "The story notes the size disparity but does not ask whether taxpayers in low-population precincts are getting proportionate value — a question of equity that community members in those precincts are best placed to answer.",
        "url": "https://texasscorecard.com/local/constable-salaries-reach-305000-as-harris-county-faces-growing-deficit/",
        "source_title": "Constable Salaries Reach $305,000 as Harris County Faces Growing Deficit - Texas Scorecard",
        "why_good": "Half of the eight constable precincts employ fewer than 200 staff, meaning residents in those precincts are paying top-tier executive salaries for what are, by headcount, mid-sized local offices."
      }
    ],
    "droppedCount": 0,
    "searchesRun": 7,
    "searchUrlsNormalized": [
      "abc13.com/post/harris-county-commissioner-warns-homeowners-could-soon-see-large-property-tax-increase-officials-salaries/19637938",
      "abc13.com/post/harris-county-could-face-increased-fees-program-cuts-close-129m-deficit/19515767",
      "abc13.com/post/raises-law-enforcement-expected-discussed-harris-county-commissioners-court-meeting-downtown-houston/17533420",
      "ballotpedia.org/Category:Salaries_of_government_officials,_Texas",
      "ballotpedia.org/Texas_state_government_salary",
      "btanow.com/",
      "budget.harriscountytx.gov/doc/Budget/budgetbook/Day-2-Jan-12/2-CP4.pdf",
      "budget.harriscountytx.gov/doc/Budget/budgetbook/FY2025/OMB_Adopted_Budget_Department%20Detail_Final2.pdf",
      "budget.harriscountytx.gov/doc/Budget/budgetbook/FY2026/FY26_V2_Proposed_Budget_Volume_I_20250826.pdf",
      "cao.harriscountytx.gov/Meet-Our-Divisions/Property-Tax",
      "capitol.texas.gov/tlodocs/89R/analysis/doc/HB04205E.docx",
      "capitol.texas.gov/tlodocs/89R/analysis/doc/HB04205H.docx",
      "communityimpact.com/houston/spring-klein/government/2025/09/12/harris-county-commissioners-negotiate-81k-pay-raise-for-countys-8-elected-constables",
      "comptroller.texas.gov/taxes/property-tax/county-directory/harris.php",
      "defendernetwork.com/news/local-state/harris-county-budget-2026",
      "defendernetwork.com/news/local-state/harris-county-commissioners-clash",
      "en.wikipedia.org/wiki/Harris_County_Sheriff%27s_Office",
      "experts.utexas.edu/college/school-of-law",
      "experts.utexas.edu/subject/US-politics-government",
      "harriscountypropertytaxtrends.com/",
      "house.texas.gov/members/3775/biography",
      "iedl.yale.edu/node/51",
      "mrsc.org/explore-topics/officials/compensation/elected-official-salaries",
      "mrsc.org/stay-informed/mrsc-insight/august-2026/elected-official-salaries",
      "ohioauditor.gov/publications/docs/Elected_Officials_Compensation_Research.pdf",
      "philippstemler.substack.com/p/how-much-should-we-compensate-local",
      "salaries.texastribune.org/departments/house-of-representatives/positions/elected-official",
      "salaries.texastribune.org/departments/house-of-representatives/positions/elected-officials-staff",
      "senate.texas.gov/members/d07/press/en/p20160929a.pdf",
      "texas2036.org/posts/improving-legislative-staff-salaries-is-a-wise-investment",
      "texasscorecard.com/local/constable-salaries-reach-305000-as-harris-county-faces-growing-deficit",
      "twptg.com/harris-county",
      "txproptax.net/",
      "www.appealdesk.com/appeals/texas/harris",
      "www.atascosacounty.texas.gov/upload/page/5347/docs/2022/ATASCOSA%20COUNTY%20-%209-12-22%20-%20PUBLIC%20HEARING%20ON%20SALARY%20INCREASES%20FOR%20ELECTED%20OFFICALS%202023.pdf",
      "www.bexar.org/1590/Elected-Officials",
      "www.cbsnews.com/amp/miami/news/what-miami-dade-residents-need-to-know-as-county-faces-402-million-deficit",
      "www.cbsnews.com/miami/news/what-miami-dade-residents-need-to-know-as-county-faces-402-million-deficit",
      "www.civicpulse.org/post/local-government-compensation",
      "www.click2houston.com/news/local/2025/09/24/harris-county-finalizes-salary-parity-for-law-enforcement-officers",
      "www.constablepct4.com/budget--procurement.html",
      "www.daybook.com/career-research/elected-official",
      "www.facebook.com/100057866940860/posts/this-is-our-proposed-pay-scale-we-have-been-working-so-hard-on-it-will-be-presen/1147970940475127",
      "www.governmentsalaries.org/",
      "www.house.texas.gov/pdfs/newsletters/126/2025-Newsletter-06.30.2025.pdf",
      "www.houstonpublicmedia.org/articles/news/harris-county/2025/09/24/531837/harris-county-commissioners-court-approve-2-8-billion-budget-for-2026-fiscal-year",
      "www.houstonpublicmedia.org/articles/news/harris-county/2026/08/07/558886/harris-county-constables-pay-raises",
      "www.khou.com/article/news/local/2027-harris-county-budget/285-a7524918-915c-47f6-90cb-c21c932c058c",
      "www.khou.com/article/news/local/harris-county/harris-county-budget-2026/285-adfee7aa-f67f-4011-99d8-e1c4efb24680",
      "www.khou.com/article/news/local/harris-county/harris-county-new-budget-cuts/285-6b0ac837-c603-44f0-97e3-9c76ebd28227",
      "www.nyc.gov/assets/quadrennial/downloads/pdf/Review-of-Other-Compensation-Commissions.pdf",
      "www.pressreader.com/usa/houston-chronicle/20170809/281535111085381",
      "www.pressreader.com/usa/houston-chronicle/20240329/281548000898856",
      "www.salary.com/research/salary/hiring/elected-official-salary",
      "www.senate.texas.gov/members/d07/press/en/p20170207a.pdf",
      "www.yahoo.com/news/articles/harris-countys-hiring-freeze-already-221654546.html",
      "www.yahoo.com/news/politics/articles/harris-county-constables-earn-305k-000244897.html"
    ],
    "model": "claude-sonnet-4-6",
    "ms": 75869,
    "capturedOn": "2026-08-11"
  }
];
