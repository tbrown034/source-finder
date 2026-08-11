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
        "who_or_what": "Cy-Fair ISD hourly employees (bus drivers, custodians, cafeteria workers) and their workplace associations",
        "why_needed": "The story names a $2,000 stipend for hourly employees as a selling point of the tax measure, but no hourly worker is quoted explaining what the cuts over three years — including lost positions — have meant for their daily work or household budgets, making the stipend promise unverifiable from the ground up.",
        "url": "https://www.cfisd.net/staff",
        "source_title": "Staff - Cypress-Fairbanks Independent School District"
      },
      {
        "category": "affected",
        "who_or_what": "Families of students who lost librarians, counselors, and instructional support staff in the $100M in cuts",
        "why_needed": "The draft lists cut positions in a single sentence but includes no parent or student voice on how the elimination of librarians and counselors has changed their children's school experience — the human cost driving the entire deficit framing.",
        "url": "https://schools.texastribune.org/districts/cypress-fairbanks-isd/holbrook-elementary-school",
        "source_title": "Accountability rating (2024-2025) — Texas Tribune Schools"
      },
      {
        "category": "affected",
        "who_or_what": "Renters and non-homestead property owners in the Cy-Fair attendance zone",
        "why_needed": "The district's $160/year cost estimate applies only to a median-value homestead owner; the story omits how renters and commercial property owners — who do not benefit from the local optional homestead exemption — experience the tax burden differently.",
        "url": "https://www.texaspolicyresearch.com/bills/89th-legislature-sjr-2/",
        "source_title": "SJR 2 - 89th Legislature — Texas Policy Research"
      },
      {
        "category": "opposing",
        "who_or_what": "Jeff Ivey, CFISD Long Range Planning Committee member and publicly stated bond opponent",
        "why_needed": "Ivey is already on record opposing the bond and raising specific concerns about technology spending — he represents the best-informed organized skeptic of this election order and his arguments go unaddressed in the draft.",
        "url": "https://www.houstonpress.com/news/cy-fair-isds-1-6-billion-bond-is-off-the-table-for-may/",
        "source_title": "Cy-Fair ISD's $1.6 Billion Bond is Off the Table for May — Houston Press"
      },
      {
        "category": "opposing",
        "who_or_what": "Trustee Christine Kalmbach, the lone dissenting vote against the election order",
        "why_needed": "Kalmbach cast the only 'no' vote but is given no quote explaining her reasoning — the strongest opposing perspective on the board is missing from the story entirely.",
        "url": "https://communityimpact.com/cy-fair-jersey-village/education/cy-fair-isd-board-of-trustees-discuss-potential-november-vatre-bond-election/",
        "source_title": "Cy-Fair ISD board of trustees discuss potential November VATRE, bond election — Community Impact"
      },
      {
        "category": "opposing",
        "who_or_what": "Texas Education Agency — to respond to Superintendent Killian's claim that three years of letters to the state education commissioner went unanswered",
        "why_needed": "Killian's unanswered-letters claim is a serious allegation against a state agency and appears without any attempt at TEA comment; the agency's perspective or any record of correspondence is absent.",
        "url": "https://tea.texas.gov/data-reports/financial-reports",
        "source_title": "Financial Reports — Texas Education Agency"
      },
      {
        "category": "data",
        "who_or_what": "CFISD Official Efficiency Audit Report (Weaver and Tidwell, LLP, FY2023)",
        "why_needed": "The story cites figures from the efficiency audit — $1,200 less per student than peers, $2,000 less than the state average — but does not link readers to the primary document so they can check the methodology and peer-district comparisons themselves.",
        "url": "https://resources.finalsite.net/images/v1728404974/cfisdnet/ch6grwuukq7ntrxerjaj/EfficiencyAuditReport.pdf",
        "source_title": "Cypress-Fairbanks Independent School District Efficiency Audit Report — CFISD"
      },
      {
        "category": "data",
        "who_or_what": "TEA FIRST Financial Integrity Rating System data for CFISD and peer districts",
        "why_needed": "The draft presents the district's deficit as structural and unavoidable; TEA's FIRST ratings and PEIMS financial data would let a reader independently verify CFISD's spending patterns against the peer districts cited in the efficiency audit.",
        "url": "https://tea.texas.gov/data-reports/financial-reports",
        "source_title": "Financial Reports — Texas Education Agency"
      },
      {
        "category": "data",
        "who_or_what": "Harris County Appraisal District property tax records and CFISD Taxpayer Impact Statement",
        "why_needed": "The district's $160/year estimate rests on a single median home value; actual appraisal records would let reporters check the distribution of tax impact across lower- and higher-value properties in a district that spans wide income bands.",
        "url": "https://www.cfisd.net/our-district/financial-information",
        "source_title": "Financial Information — Cypress-Fairbanks Independent School District"
      },
      {
        "category": "data",
        "who_or_what": "Texas Legislature's SB 4 (89th session) fiscal note on school district revenue losses from expanded homestead exemptions",
        "why_needed": "The story attributes the funding gap partly to a 20% local homestead exemption but does not situate CFISD's problem in the broader statewide context of state-mandated exemption expansions reducing district revenue, which a Legislative Budget Board fiscal note documents.",
        "url": "https://tea.texas.gov/about-tea/news-and-multimedia/correspondence/taa-letters/tax-year-2025-maximum-compressed-tax-rates",
        "source_title": "Tax Year 2025 Maximum Compressed Tax Rates — Texas Education Agency"
      },
      {
        "category": "experts",
        "who_or_what": "Houston Education Research Consortium (HERC) / Kinder Institute for Urban Research at Rice University — researchers on Texas school district funding gaps",
        "why_needed": "HERC has published peer-reviewed work specifically on funding gaps in Houston-area districts and how they correlate with student outcomes — they can independently validate or complicate the district's $1,200-per-pupil shortfall claim.",
        "url": "https://kinder.rice.edu/research/texas-school-district-funding-gaps",
        "source_title": "Texas School District Funding Gaps — Kinder Institute for Urban Research, Rice University"
      },
      {
        "category": "experts",
        "who_or_what": "Intercultural Development Research Association (IDRA) — Texas school finance equity researchers",
        "why_needed": "IDRA has documented structural inequities in the Texas school funding formula for decades and can speak to whether CFISD's per-pupil gap is a product of the formula design rather than local mismanagement — a distinction absent from the story.",
        "url": "https://www.idra.org/resource-center/the-status-of-school-finance-equity-in-texas/",
        "source_title": "The Status of School Finance Equity in Texas — IDRA"
      },
      {
        "category": "designed-out",
        "who_or_what": "Spanish- and Vietnamese-speaking families in the district (Cy-Fair's large emergent bilingual population)",
        "why_needed": "CFISD's own improvement plan documents substantial emergent bilingual enrollment across its schools, yet the story — and apparently the board's public framing — addresses voters only in English, leaving non-English-speaking families who will vote on or be affected by the tax measure without representation in the narrative.",
        "url": "https://resources.finalsite.net/images/v1754079660/cfisdnet/sz5wtav7wdqbsaifn36o/Cypress-FairbanksIndependentSchoolDistrict-ImprovementPlan13.pdf",
        "source_title": "Cypress-Fairbanks Independent School District District Improvement Plan"
      },
      {
        "category": "designed-out",
        "who_or_what": "Students at highest-poverty CFISD campuses, where at-risk rates exceed 60% and teacher experience is well below district averages",
        "why_needed": "The deficit and bond are framed at the district level, but campus-level data shows sharp disparities in teacher experience and student risk within CFISD — cuts to 'programs and people' will not land equally, and the story does not examine which schools and communities bear the greatest exposure.",
        "url": "https://schools.texastribune.org/districts/cypress-fairbanks-isd/holbrook-elementary-school",
        "source_title": "Accountability rating (2024-2025) — Texas Tribune Schools"
      }
    ],
    "droppedCount": 0,
    "searchesRun": 6,
    "searchUrlsNormalized": [
      "actweb.acttax.com/act_webdev/cyfair/index.jsp",
      "ballotpedia.org/Cypress-Fairbanks_Independent_School_District,_Texas,_elections_(2025)",
      "ballotpedia.org/Texas_Proposition_13,_Increase_Homestead_Property_Tax_Exemption_Amendment_(2025)",
      "bigjolly.com/cypress-fairbanks-isd-asks-for-record-breaking-1-76-billion",
      "bigjolly.com/tag/cypress-fairbanks-isd",
      "capitol.texas.gov/tlodocs/881/analysis/html/SB00026I.htm",
      "capitol.texas.gov/tlodocs/882/analysis/html/SB00001I.htm",
      "communityimpact.com/cy-fair-jersey-village/education/cy-fair-isd-board-of-trustees-discuss-potential-november-vatre-bond-election",
      "comptroller.texas.gov/economy/fiscal-notes/archive/2023/dec/proptax.php",
      "dfertx.org/policy/school-funding",
      "eric.ed.gov/?id=ED657500",
      "files.eric.ed.gov/fulltext/ED657500.pdf",
      "kinder.rice.edu/research/texas-school-district-funding-gaps",
      "leadiq.com/c/cypress-fairbanks-isd/5a1d95bd2300005c00846898",
      "link.axios.com/click/35128067.13337/aHR0cHM6Ly93d3cuZ2Npc2QubmV0L2FydGljbGUvMTQyMjk4Nj91dG1fc291cmNlPW5ld3NsZXR0ZXImdXRtX21lZGl1bT1lbWFpbCZ1dG1fY2FtcGFpZ249bmV3c2xldHRlcl9heGlvc2xvY2FsX2RhbGxhcyZzdHJlYW09dG9w/61571d580bb18027b8e26002Bf3aa42d6",
      "meetings.boardbook.org/Public/Organization/668",
      "nces.ed.gov/ccd/districtsearch/district_detail.asp?Search=2&ID2=4816110",
      "resources.finalsite.net/images/v1712002697/cfisdnet/fcupdseeqeqw3fzdmpug/adminregs.pdf",
      "resources.finalsite.net/images/v1728404974/cfisdnet/ch6grwuukq7ntrxerjaj/EfficiencyAuditReport.pdf",
      "resources.finalsite.net/images/v1754079660/cfisdnet/sz5wtav7wdqbsaifn36o/Cypress-FairbanksIndependentSchoolDistrict-ImprovementPlan13.pdf",
      "schools.texastribune.org/districts/cypress-fairbanks-isd/holbrook-elementary-school",
      "ssh.barrgroup.com/n60/184/get_nlcgiv_cypress_fairbanks_isd_calendar",
      "stateofeducationfunding.org/state/texas",
      "taxpolicycenter.org/taxvox/eliminating-school-property-taxes-texas-homeowners-could-backfire-sooner-rather-later",
      "tea.texas.gov/about-tea/news-and-multimedia/correspondence/taa-letters/tax-year-2025-maximum-compressed-tax-rates",
      "tea.texas.gov/about-tea/news-and-multimedia/news-releases/news-2019/tea-releases-preliminary-2018-2019-financial-accountability-ratings",
      "tea.texas.gov/about-tea/news-and-multimedia/news-releases/news-2022/tea-releases-final-2021-2022-financial-accountability-ratings",
      "tea.texas.gov/about-tea/news-and-multimedia/news-releases/news-2025/tea-releases-final-2024-2025-financial-accountability-ratings",
      "tea.texas.gov/ar/node/106220",
      "tea.texas.gov/data-reports/financial-accountability/financial-integrity-rating-system-texas-first/charter-first-rating-open-enrollment-charter-schools-and-charter-schools-operated-public-institution-higher-education-ihe",
      "tea.texas.gov/data-reports/financial-reports",
      "txschools.gov/?id=101907&lng=en&view=district",
      "wallethub.com/edu/e/most-least-equitable-school-districts-in-texas/77134",
      "www.aol.com/articles/midway-isd-voters-approve-83-045001565.html",
      "www.cfisd.net/our-district/board-of-trustees/board-elections/board-election-2025",
      "www.cfisd.net/our-district/financial-information",
      "www.cfisd.net/staff",
      "www.click2houston.com/news/local/2025/11/05/cy-fair-isd-board-race-draws-nine-candidates-heavy-spending-and-political-tension",
      "www.facebook.com/cyfairisd/posts/the-board-of-trustees-recently-approved-the-2025-26-budget-with-a-new-starting-s/1162341209267790",
      "www.fwisd.org/departments/financial-services/financial-required-postings/annual-financial-accountability-management-first-reports",
      "www.houstonpress.com/news/cy-fair-isds-1-6-billion-bond-is-off-the-table-for-may",
      "www.idra.org/resource-center/the-status-of-school-finance-equity-in-texas",
      "www.kxxv.com/news/local-news/in-your-neighborhood/tea-releases-final-financial-accountability-ratings-for-2024-2025",
      "www.science.gov/topicpages/s/school+funding+equity",
      "www.tea.texas.gov/finance-and-grants/financial-compliance/financial-integrity-rating-system-of-texas-first",
      "www.texasaft.org/policy/funding/the-great-texas-property-tax-debacle",
      "www.texaspolicyresearch.com/bills/89th-legislature-sb-4",
      "www.texaspolicyresearch.com/bills/89th-legislature-sjr-2",
      "www.texaspolicyresearch.com/homestead-exemption-increases-pass-texas-senate-prospects-in-house-unknown",
      "www.thecfef.org/wp-content/uploads/2025/03/CFEF_Salute-to-the-Stars-BOOK-2025.pdf",
      "www.urban.org/sites/default/files/publication/99706/school_district_funding_in_texas_1.pdf",
      "www.yahoo.com/news/articles/troup-isd-calls-22-million-034159901.html",
      "x.com/CyFairISD/status/1943717191859237145"
    ],
    "model": "claude-sonnet-4-6",
    "ms": 58939,
    "capturedOn": "2026-08-11"
  },
  {
    "sampleId": "constable-raises",
    "mode": "draft",
    "suggestions": [
      {
        "category": "affected",
        "who_or_what": "Harris County homeowners facing a projected property tax increase",
        "why_needed": "The story notes the raises must survive September budget approval while the county faces a deficit of up to $287 million and commissioners are eyeing a historic property tax hike — yet no resident or ratepayer is quoted on how this tradeoff lands on them.",
        "url": "https://abc13.com/post/harris-county-commissioner-warns-homeowners-could-soon-see-large-property-tax-increase-officials-salaries/19637938/",
        "source_title": "Harris County commissioner warns homeowners could soon see a large property tax increase as officials salaries increase – ABC13 Houston"
      },
      {
        "category": "affected",
        "who_or_what": "Harris County Sheriff's Office employees and divisions subject to prior budget cuts",
        "why_needed": "The FY2026 budget cut the sheriff's office medical division by 72% in the same cycle that constable pay rose — rank-and-file sheriff's employees who absorbed those cuts are an affected constituency entirely absent from this story.",
        "url": "https://texasscorecard.com/local/constable-salaries-reach-305000-as-harris-county-faces-growing-deficit/",
        "source_title": "Constable Salaries Reach $305,000 as Harris County Faces Growing Deficit – Texas Scorecard"
      },
      {
        "category": "affected",
        "who_or_what": "Harris County Deputies' Organization (HCDO), the collective bargaining representative for sheriff's deputies",
        "why_needed": "Deputies' pay parity with HPD was a prior flashpoint in this same funding fight; the union can speak to whether constable elected-official raises crowd out rank-and-file compensation.",
        "url": "https://abc13.com/post/raises-law-enforcement-expected-discussed-harris-county-commissioners-court-meeting-downtown-houston/17533420/",
        "source_title": "Harris County Commissioners vote 3-2 to give raise to Constables, but budget still needs approval – ABC13 Houston"
      },
      {
        "category": "opposing",
        "who_or_what": "State Rep. Sam Harless (R-Spring) in his official capacity as author of HB 4205",
        "why_needed": "The story says Garcia cited Harless's bill as motivation, but reporting shows Harless withdrew his AG letter without a ruling and HB 4205 explicitly exempts 'the chief of the department' — Harless should be pressed on whether his bill actually required these raises.",
        "url": "https://www.yahoo.com/news/politics/articles/harris-county-constables-earn-305k-000244897.html",
        "source_title": "Harris County constables to earn $305K, more than U.S. vice president"
      },
      {
        "category": "opposing",
        "who_or_what": "County Attorney Abbie Kamin, in her official capacity",
        "why_needed": "Kamin told the court the raises were 'recommended and agreed to' but 'not necessarily required' under state law — the story needs her to clarify the legal basis (or lack thereof) for treating HB 4205 as a mandate for elected-official pay.",
        "url": "https://capitol.texas.gov/tlodocs/89R/analysis/doc/HB04205E.docx",
        "source_title": "HB 4205 Bill Analysis – Texas Legislature (89th Session)"
      },
      {
        "category": "opposing",
        "who_or_what": "Travis County, Tarrant County, and Dallas County constable pay offices / county judges",
        "why_needed": "Peer Texas counties pay constables under $150,000 — officials from those counties can explain why they have not matched Harris County's trajectory, providing a concrete policy counterpoint.",
        "url": "https://www.houstonpublicmedia.org/articles/news/harris-county/2026/08/07/558886/harris-county-constables-pay-raises/",
        "source_title": "Harris County constables will make $305,000 next year, a 129% increase since 2024 – Houston Public Media"
      },
      {
        "category": "data",
        "who_or_what": "Harris County adopted FY2025 and proposed FY2027 budget documents (budget.harriscountytx.gov)",
        "why_needed": "The official budget books contain precinct-by-precinct staffing counts and line-item constable appropriations that would let readers verify the pay history and check whether raises were funded by cuts elsewhere.",
        "url": "https://budget.harriscountytx.gov/doc/Budget/budgetbook/FY2025/OMB_Adopted_Budget_Department%20Detail_Final2.pdf",
        "source_title": "Fiscal Year 2025 Adopted Budget – Harris County"
      },
      {
        "category": "data",
        "who_or_what": "Texas Legislature's HB 4205 fiscal note from the Legislative Budget Board",
        "why_needed": "The LBB fiscal note states there is 'no fiscal implication to the State' but flags a potential local impact — this document is the authoritative record for whether the law actually compelled the raises or merely provided political cover.",
        "url": "https://capitol.texas.gov/tlodocs/89R/fiscalnotes/html/HB04205I.htm",
        "source_title": "HB 4205 Fiscal Note – Legislative Budget Board (89th Session)"
      },
      {
        "category": "data",
        "who_or_what": "Texas Tribune Government Salaries Explorer (salaries.texastribune.org)",
        "why_needed": "This public database, built from Texas Comptroller records under the Public Information Act, allows direct salary comparisons across Texas state and local officials to ground the 'more than doubled' and VP-comparison claims.",
        "url": "https://salaries.texastribune.org/",
        "source_title": "Government Salaries Explorer – The Texas Tribune"
      },
      {
        "category": "experts",
        "who_or_what": "Rice University Baker Institute Center for Tax and Budget Policy (researchers Bill King, Joyce Beebe, John W. Diamond, Randall Rice)",
        "why_needed": "This team published a July 2026 report specifically on Harris County's structural deficit and budget transparency, making them ideal independent voices on whether successive raises are fiscally sustainable.",
        "url": "https://www.bakerinstitute.org/research/harris-county-faces-growing-budgetary-headwinds",
        "source_title": "Harris County Faces Growing Budgetary Headwinds – Baker Institute for Public Policy"
      },
      {
        "category": "experts",
        "who_or_what": "Nancy Sims, political science lecturer at the University of Houston",
        "why_needed": "Sims was recently cited analyzing Harris County's budget process and low public attention relative to the City of Houston — she can contextualize the political dynamics driving constable pay independent of any stakeholder interest.",
        "url": "https://texasscorecard.com/local/harris-county-departments-brace-for-cuts-amid-nine-figure-budget-deficit/",
        "source_title": "Harris County Departments Brace for Cuts Amid Nine-Figure Budget Deficit – Texas Scorecard"
      },
      {
        "category": "experts",
        "who_or_what": "National Association of Counties (NACo) or International City/County Management Association (ICMA) — researchers on elected-official compensation benchmarks",
        "why_needed": "The story asserts the $305,000 figure is extraordinary, but needs a national benchmark expert who studies elected county-official pay to confirm whether this is genuinely anomalous among large U.S. counties.",
        "url": "https://www.bakerinstitute.org/center/center-tax-and-budget-policy",
        "source_title": "Center for Tax and Budget Policy – Baker Institute"
      },
      {
        "category": "designed-out",
        "who_or_what": "Unincorporated Harris County residents in lower-income precincts who rely on constable deputy contracts for neighborhood patrol",
        "why_needed": "The story covers elected constables' salaries but not the contract-patrol communities — largely lower-income, unincorporated neighborhoods — who could face higher contract costs or reduced service if the raises squeeze precinct operational budgets.",
        "url": "https://www.texastribune.org/?p=136043",
        "source_title": "Texas Tribune – Harris County constable contract patrol legislation coverage"
      },
      {
        "category": "designed-out",
        "who_or_what": "Harris County residents who depend on social services or non-law-enforcement departments facing cuts",
        "why_needed": "The story frames the raises as a law enforcement pay story, but the prior budget cycle cut non-law-enforcement departments to fund similar raises — communities reliant on those services are invisible in the current framing.",
        "url": "https://defendernetwork.com/news/local-state/harris-county-budget-2026/",
        "source_title": "Harris County's $2.8 billion budget approved amid controversy – DefenderNetwork.com"
      }
    ],
    "droppedCount": 0,
    "searchesRun": 7,
    "searchUrlsNormalized": [
      "abc13.com/post/harris-county-commissioner-warns-homeowners-could-soon-see-large-property-tax-increase-officials-salaries/19637938",
      "abc13.com/post/raises-law-enforcement-expected-discussed-harris-county-commissioners-court-meeting-downtown-houston/17533420",
      "ballotpedia.org/Texas_local_government_salary",
      "ballotpedia.org/Texas_state_government_salary",
      "btanow.com/",
      "budget.harriscountytx.gov/doc/Budget/budgetbook/FY2025/FY25_Proposed_Budget_Volume_II_v2.pdf",
      "budget.harriscountytx.gov/doc/Budget/budgetbook/FY2025/FY25_Proposed_Budget_Volume_I_v3.pdf",
      "budget.harriscountytx.gov/doc/Budget/budgetbook/FY2025/OMB_Adopted_Budget_Department%20Detail_Final2.pdf",
      "cao.harriscountytx.gov/Meet-Our-Divisions/About-the-Property-Tax-Division",
      "cao.harriscountytx.gov/Meet-Our-Divisions/Property-Tax",
      "capitol.texas.gov/tlodocs/78R/analysis/html/SJ00019I.htm",
      "capitol.texas.gov/tlodocs/89R/analysis/doc/HB04205E.docx",
      "capitol.texas.gov/tlodocs/89R/fiscalnotes/html/HB04205I.htm",
      "communityimpact.com/houston/spring-klein/government/2026/05/14/early-harris-county-budget-projections-show-257m-shortfall-possibility-for-fy-2026-27",
      "comptroller.texas.gov/taxes/property-tax/county-directory/harris.php",
      "cw39.com/news/local/harris-county-proposes-property-tax-hike",
      "defendernetwork.com/news/local-state/harris-county-budget-2026",
      "en.wikipedia.org/wiki/Baker_Institute",
      "en.wikipedia.org/wiki/Rice_University%27s_Baker_Institute_for_Public_Policy",
      "en.wikipedia.org/wiki/Rice_University's_Baker_Institute_for_Public_Policy",
      "foxnews.com/us/texas-constable-says-he-will-fight-blue-countys-defunding-his-office.amp",
      "house.texas.gov/members/3775/biography",
      "libguides.rice.edu/baker",
      "mmlonline.com/media/2536/classification-and-compensation-studies-for-local-officials.pdf",
      "news.rice.edu/news/2025/mayor-whitmire-provides-houston-update-rices-baker-institute",
      "news.rice.edu/news/2026/dateline-rice-april-1-2026",
      "news.yahoo.com/harris-proposes-property-tax-3-174157041.html?fr=sycsrp_catchall",
      "oertx.highered.texas.gov/courseware/lesson/1075/overview",
      "salaries.texastribune.org/",
      "salaries.texastribune.org/departments/house-of-representatives/positions/elected-official",
      "texasscorecard.com/local/constable-salaries-reach-305000-as-harris-county-faces-growing-deficit",
      "texasscorecard.com/local/harris-county-departments-brace-for-cuts-amid-nine-figure-budget-deficit",
      "twptg.com/harris-county",
      "www.aol.com/articles/learn-more-ramsey-county-proposed-113700068.html",
      "www.appealdesk.com/appeals/texas/harris",
      "www.bakerinstitute.org/",
      "www.bakerinstitute.org/center/center-tax-and-budget-policy",
      "www.bakerinstitute.org/research/harris-county-faces-growing-budgetary-headwinds",
      "www.cbsnews.com/philadelphia/news/delaware-county-pa-property-taxes",
      "www.click2houston.com/news/local/2025/09/24/harris-county-finalizes-salary-parity-for-law-enforcement-officers",
      "www.facebook.com/HarrisCountyTACOffice",
      "www.foxnews.com/us/texas-constable-says-he-will-fight-blue-countys-defunding-his-office.print",
      "www.hctax.net/Property/Resources",
      "www.house.texas.gov/pdfs/newsletters/126/2025-Newsletter-06.30.2025.pdf",
      "www.houstonpublicmedia.org/articles/news/harris-county/2026/08/07/558886/harris-county-constables-pay-raises",
      "www.khou.com/article/news/local/2027-harris-county-budget/285-a7524918-915c-47f6-90cb-c21c932c058c",
      "www.linkedin.com/company/bakerinstitute",
      "www.msn.com/en-us/money/economy/harris-county-budget-could-top-3b-for-the-first-time-next-year-with-a-more-than-100m-deficit/ar-AA23fiOp",
      "www.poconnor.com/harris-county",
      "www.senate.texas.gov/members/d07/press/en/p20170207a.pdf",
      "www.senate.texas.gov/members/d17/press/en/p20230210b.pdf",
      "www.texaspolicyresearch.com/legislative-directory-texas-house-of-representatives/texas-house-of-representatives/state-rep-sam-harless",
      "www.texaspolicyresearch.com/texas-house-bill-901-capping-public-sector-salaries",
      "www.texastribune.org/?p=136043",
      "www.tshaonline.org/handbook/entries/salaries-of-state-executive-officers",
      "www.yahoo.com/news/politics/articles/harris-county-commissioner-warns-homeowners-003239737.html",
      "www.yahoo.com/news/politics/articles/harris-county-constables-earn-305k-000244897.html"
    ],
    "model": "claude-sonnet-4-6",
    "ms": 60041,
    "capturedOn": "2026-08-11"
  }
];
