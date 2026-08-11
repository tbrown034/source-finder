/* Recorded results for sample mode — captured verbatim from the live
 * Anthropic API on Aug 11, 2026 by scripts/record-sample.mjs, using the
 * exact prompt and grounding gate the serverless function uses. Replayed
 * so the demo works instantly, free, and offline. Labels on the page
 * never blur recorded vs live.
 *
 * searchUrlsNormalized holds every URL the run's web searches returned
 * (normalized by lib/grounding.normalizeUrl) so the fixture-integrity
 * test can re-run the gate over this exact data. */

import type { Suggestion } from "./grounding.js";

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
    "sampleId": "faded-roads",
    "mode": "draft",
    "suggestions": [
      {
        "category": "affected",
        "who_or_what": "BikeHouston — Houston-based cyclist and pedestrian safety nonprofit",
        "why_needed": "The draft has no voice from pedestrians or cyclists, the road users most endangered by faded crosswalks and lane markings at night; BikeHouston actively directs members to file 311 reports about exactly these conditions and can connect the reporter to people with firsthand experience.",
        "url": "https://www.bikehouston.org/take-action",
        "source_title": "Take Action — BikeHouston",
        "why_good": "BikeHouston actively tracks pavement-marking complaints through 311 and works with Houston Public Works on street safety, giving it direct proximity to the complaint data the story is built on.",
        "contact": "Contact page at bikehouston.org/about",
        "contact_url": "https://www.bikehouston.org/about"
      },
      {
        "category": "affected",
        "who_or_what": "Houston-Galveston Area Council (H-GAC) Pedestrian-Bicyclist Program — regional planning body tracking ped/bike safety across 13 counties",
        "why_needed": "The story lacks any voice from people whose daily commutes on foot or by bike are directly shaped by faded markings; H-GAC's planners have contact with community groups across the region who can provide those voices and speak to which neighborhoods are most underserved.",
        "url": "https://www.h-gac.com/pedestrian-bicyclist-planning",
        "source_title": "Pedestrian-Bicyclist Program | Houston-Galveston Area Council (H-GAC)",
        "why_good": "H-GAC is an independent regional planning council, not a city agency, giving it credibility to speak across jurisdictional lines that the story identifies as a core problem.",
        "contact": "Brian D. Smith II, Principal Planner: bsmith@h-gac.com, 832-681-2670; Chris Whaley, Senior Planner: cwhaley@h-gac.com, 713-993-2439",
        "contact_url": "https://www.h-gac.com/pedestrian-bicyclist-planning"
      },
      {
        "category": "opposing",
        "who_or_what": "TxDOT's own Pavement Marking Management Program documentation — agency records showing TxDOT currently lacks a statewide objective marking-management program",
        "why_needed": "The draft quotes a TxDOT spokesperson about FIFA sign replacement but does not press on whether TxDOT's inspection regime is actually objective; TxDOT's own handbook acknowledges that most districts rely on visual observations rather than measured retroreflectivity, which is the strongest skeptical check on the agency's self-reported practices.",
        "url": "https://www.txdot.gov/manuals/trf/pmh/visibility_and_retroreflectivity/pavement_marking_management_programs-i1000035.html",
        "source_title": "Section 5: Pavement Marking Management Programs",
        "why_good": "This is TxDOT's own published standard — an on-the-record admission from the agency itself, not a secondhand critique."
      },
      {
        "category": "opposing",
        "who_or_what": "Houston Public Works — the city agency that receives and closes 311 lane-marking reports",
        "why_needed": "The draft cites the surge in 311 reports as evidence of a problem but never asks Houston Public Works how many of those reports were converted to completed work orders, or what the average response time is — without that, the complaint count cannot be evaluated as a measure of actual unmet need.",
        "url": "https://houstontx.gov/311/servicerequestdata.html",
        "source_title": "311 Service Request Data",
        "why_good": "Houston Public Works is the sole city agency named in the draft as responsible for city-street markings, making it the only party that can supply the work-order completion data needed to test the story's implicit claim.",
        "contact": "Houston 311: 713.837.0311 / 311@houstontx.gov",
        "contact_url": "https://houstontx.gov/311/servicerequestdata.html"
      },
      {
        "category": "data",
        "who_or_what": "City of Houston Open Data Portal — full 311 service-request dataset with location, category, open/close dates, and status",
        "why_needed": "The draft cites aggregate complaint counts but does not show which streets or neighborhoods generated the most reports, whether reports were resolved, or how long they stayed open — the full dataset would let the reporter map the complaints geographically and calculate closure rates.",
        "url": "https://data.houstontx.gov/",
        "source_title": "Welcome - City of Houston Open Data",
        "why_good": "This is the primary, city-published, machine-readable source for the numbers already cited in the draft; it is FOIA-free and updated continuously."
      },
      {
        "category": "data",
        "who_or_what": "TxDOT CRIS (Crash Records Information System) — crash data showing Houston 2025 fatal crashes by contributing factor and road jurisdiction",
        "why_needed": "The draft asserts that faded markings are dangerous at night and in rain but cites no crash data linking marking failures to collisions; CRIS data already shows that 'failed to drive in a single lane' was the top contributing factor in Houston's 2025 fatal crashes, which could directly support or complicate the story's safety premise.",
        "url": "https://www.axios.com/local/houston/2026/04/08/houston-traffic-deaths-2025",
        "source_title": "Houston traffic deaths down in 2025 but still above pre-pandemic levels",
        "why_good": "CRIS is the official Texas statewide crash database, compiled by TxDOT from law-enforcement reports — the same source cited by Axios and Houston Public Media in their traffic-death coverage."
      },
      {
        "category": "data",
        "who_or_what": "TxDOT retroreflectivity minimum in-service guidelines and Special Specification 8975 — the enforceable federal/state standards for when markings must be replaced",
        "why_needed": "The draft describes worn markings as a safety problem but never reports what the legal threshold for 'too faded' is or whether any of the 287 reported locations were measured against that standard; TxDOT's own 80–100 mcd/m²/lux rule-of-thumb is the checkable benchmark missing from the story.",
        "url": "https://www.txdot.gov/manuals/trf/pmh/installation_and_inspection/section-6--determining-when-to-restripe/minimum_inservice_retroreflectivity_guidelines.html",
        "source_title": "Minimum In-Service Retroreflectivity Guidelines",
        "why_good": "These are TxDOT's published technical specifications — primary regulatory documents that define the line between compliant and non-compliant markings."
      },
      {
        "category": "experts",
        "who_or_what": "Texas A&M Transportation Institute (TTI) — state-funded research body that has conducted TxDOT-commissioned pavement-marking research",
        "why_needed": "The draft quotes agency spokespeople on why markings wear out but has no independent expert who can assess whether Houston's agencies' inspection cycles and materials choices are adequate by research standards; TTI researchers have published on retroreflectivity performance for TxDOT specifically.",
        "url": "https://static.tti.tamu.edu/conferences/traffic-safety14/presentations/breakout-07/miller.pdf",
        "source_title": "TXDOT SIGNING AND MARKINGS REVIEW OF MATERIALS & PRACTICES",
        "why_good": "TTI is a state-funded but editorially independent research institution at Texas A&M; its pavement-marking work is cited in TxDOT's own handbook, giving it direct relevance without the conflict of being a regulated party."
      },
      {
        "category": "experts",
        "who_or_what": "FHWA Office of Safety — federal agency that sets nighttime visibility research priorities and documents the link between pavement marking failures and pedestrian/roadway departure crashes",
        "why_needed": "The draft makes a safety claim — that worn markings endanger drivers — without citing any study or federal standard that quantifies the risk; FHWA's roadway visibility research directly addresses the pedestrian and lane-departure crash dimensions relevant to this story.",
        "url": "https://highways.dot.gov/safety/other/visibility/nighttime-visibility-overview",
        "source_title": "Nighttime Visibility Overview | FHWA",
        "why_good": "FHWA is the federal regulatory authority over highway safety standards, making it the most credible independent arbiter of whether the safety risk the story asserts is empirically established."
      },
      {
        "category": "designed-out",
        "who_or_what": "Spanish-speaking Houstonians who use 311 — the system's Spanish-language interface exists but the story's sourcing does not include any Spanish-dominant neighborhoods where complaint rates may differ",
        "why_needed": "The draft's 311 data is reported as a citywide aggregate with no geographic or demographic breakdown; Houston's large Spanish-speaking population in neighborhoods like Gulfton, Alief, and East End may face higher exposure to faded markings on heavily trafficked arterials but lower rates of 311 reporting due to language or awareness barriers — a gap the aggregate count conceals.",
        "url": "https://houstontx.gov/311/servicerequestdata.html",
        "source_title": "311 Service Request Data",
        "why_good": "The 311 system itself offers a Spanish interface, confirming the city acknowledges this population as a user group; the H-GAC and BikeHouston both have community contacts in these neighborhoods."
      },
      {
        "category": "designed-out",
        "who_or_what": "Blind and low-vision pedestrians — users for whom faded tactile and visual crosswalk markings pose the greatest hazard but who are entirely absent from the draft",
        "why_needed": "The story frames faded markings as a driver visibility problem; it never addresses pedestrians who rely on marked crosswalks as the only safe crossing point, particularly blind and low-vision residents for whom a missing or faded crosswalk is a mobility and safety barrier, not just an inconvenience.",
        "url": "https://houstonbikeplan.org/bac/",
        "source_title": "Bicycle Advisory Committee – Houston Bikeways",
        "why_good": "The Houston Bicycle Advisory Committee's Infrastructure Subcommittee includes accessibility representatives and has a public contact line, making this a reachable community from within the story's existing institutional universe.",
        "contact": "Bicycle Advisory Committee: bac@houstontx.gov / Bikeways Hotline: 832.395.2700",
        "contact_url": "https://houstonbikeplan.org/bac/"
      }
    ],
    "droppedCount": 0,
    "searchesRun": 5,
    "searchUrlsNormalized": [
      "andrew-friedman.github.io/jkan/datasets/311-City-of-Houston",
      "cohgis-mycity.opendata.arcgis.com/datasets/MyCity::feature-layer-houston-311-weekly-cases-layer/about",
      "data.houstontx.gov/",
      "en.wikipedia.org/wiki/Open_data_portal",
      "ftp.txdot.gov/pub/txdot-info/cmd/cserve/specs/2014/standard/s666.pdf",
      "geohub.houstontx.gov/datasets/311-service-map/about",
      "highways.dot.gov/safety/other/visibility/nighttime-visibility-overview",
      "highways.dot.gov/safety/other/visibility/roadway-visibility-research-needs-assessment/2-current-research-and",
      "highways.dot.gov/safety/other/visibility/roadway-visibility-research-needs-assessment/5-current-gaps-practice-and",
      "hoodline.com/2026/04/slight-dip-still-deadly-houston-streets-claim-300-lives-in-2025",
      "houstonbikeplan.org/bac",
      "houstonbikeplan.org/implementation",
      "houstonpotholes.org/",
      "houstontx.gov/311/servicerequestdata.html",
      "image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/9656602",
      "journalofroadsafety.org/article/32861-cyclist-visibility-at-night.pdf",
      "mycity.houstontx.gov/",
      "onlinemanuals.txdot.gov/TxDOTOnlineManuals/txdotmanuals/pmh/appendix_a.htm",
      "onlinemanuals.txdot.gov/txdotmanuals/pmh/retroreflectivity_performance_specifications_for_contracts.htm",
      "personalinjurylawyersaustintx.com/blog/pedestrian-accident-statistics",
      "pmc.ncbi.nlm.nih.gov/articles/PMC8713592",
      "static.tti.tamu.edu/conferences/traffic-safety14/presentations/breakout-07/miller.pdf",
      "ulg.law/fatal-pedestrian-accident-what-to-do-next",
      "us-city.census.okfn.org/dataset/service-requests.html",
      "www.832law.com/texas-car-accident-statistics",
      "www.a2xlaw.com/houston-car-crash-statistics",
      "www.axios.com/local/houston/2025/07/23/by-the-numbers-houston-traffic-deaths-so-far-in-2025",
      "www.axios.com/local/houston/2026/04/08/houston-traffic-deaths-2025",
      "www.bikehouston.org/about",
      "www.bikehouston.org/take-action",
      "www.dmv.ca.gov/portal/driver-education-and-safety/special-interest-driver-guides/bicyclists-pedestrians",
      "www.guidestar.org/profile/shared/5e3d2fdb-8039-4130-adff-28b579c35d24",
      "www.h-gac.com/pedestrian-bicyclist-planning",
      "www.h-gac.com/pedestrian-bicyclist-planning/helpful-links",
      "www.houstonpublicmedia.org/articles/news/transportation/2025/02/03/512816/houston-traffic-fatalities-rose-to-record-numbers-in-2024-as-city-lags-on-pervious-vision-zero-goals",
      "www.houstontx.gov/housing/research.html",
      "www.influencewatch.org/non-profit/bikehouston",
      "www.onrec.com/news/news-archive/what-houston-drivers-need-to-know-about-car-accident-risks-in-2025-critical",
      "www.sciencedirect.com/science/article/abs/pii/S1369847822002017",
      "www.simmonsandfletcher.com/blog/houston-bicycle-laws-safety",
      "www.tandfonline.com/doi/full/10.1080/08164622.2023.2174001",
      "www.txdot.gov/content/dam/txdotoms/trf/pmh/pmh.pdf",
      "www.txdot.gov/manuals/trf/pmh/installation_and_inspection/section-6--determining-when-to-restripe/minimum_inservice_retroreflectivity_guidelines.html",
      "www.txdot.gov/manuals/trf/pmh/material_selection/pavement_marking_material_descriptions-i1020814/retroreflective_raised_pavement_markings.html",
      "www.txdot.gov/manuals/trf/pmh/specifications_test_methods_and_standard_sheets.html",
      "www.txdot.gov/manuals/trf/pmh/visibility_and_retroreflectivity.html",
      "www.txdot.gov/manuals/trf/pmh/visibility_and_retroreflectivity/pavement_marking_management_programs-i1000035.html"
    ],
    "model": "claude-sonnet-4-6",
    "ms": 67922,
    "capturedOn": "2026-08-11"
  },
  {
    "sampleId": "hs-football",
    "mode": "draft",
    "suggestions": [
      {
        "category": "affected",
        "who_or_what": "Milby Buffaloes head coach Matthew Puente",
        "why_needed": "The draft names two Milby players (Davis, Gutierrez) with no quote or context about the program; Puente is the on-the-record voice for what these numbers mean for a school that has not had a winning season since 1999.",
        "url": "https://www.texasfootball.com/article/2025/10/16/how-milby-s-artavion-davis-became-the-state-s-leading-receiver",
        "source_title": "How Milby's Artavion Davis Became TXHSFB's Leading Receiver",
        "why_good": "Puente is a named public official in his coaching role; search results show him already speaking on record about the program's identity and its inner-city Houston context, making him the closest credible source for the Milby angle."
      },
      {
        "category": "affected",
        "who_or_what": "Willis head coach Trent Miller",
        "why_needed": "The draft frames Lincoln Frazier as the area's top returning passer but includes no coach's voice about managing expectations for a sophomore who was a freshman starter — the most consequential player-development question in the piece.",
        "url": "https://www.texasfootball.com/article/2025/12/05/elite-freshman-qb-with-texas-a-m-ties-leads-willis-to-history",
        "source_title": "A Freshman QB With Texas A&M Ties Leads Willis to History",
        "why_good": "Miller is already on record in multiple outlets about Frazier's development trajectory; as the coach who handed him the starting job as a 15-year-old, his perspective is irreplaceable and he is directly reachable through the school's athletic department."
      },
      {
        "category": "affected",
        "who_or_what": "Randle head coach (Randle Lions football program, Richmond TX)",
        "why_needed": "Landen Williams-Callis is chasing the all-time Texas career rushing record — a story-within-the-story the draft ignores entirely — and the coach is the only on-record source who can speak to how that record chase will shape the team's season.",
        "url": "https://247sports.com/player/landen-williams-callis-46138250/",
        "source_title": "Landen Williams-Callis, Richmond Randle, Running Back",
        "why_good": "The Randle program is a named public institution; 247Sports confirms Williams-Callis needs only 3,828 yards to break the state career record, a concrete, checkable milestone that demands a coaching voice."
      },
      {
        "category": "opposing",
        "who_or_what": "Coaches or coordinators of opposing defenses that held the listed players below their season averages",
        "why_needed": "The draft presents each player's season-long numbers as a promise of future production, but no skeptical voice asks whether last year's numbers were inflated by weak opposition or specific matchups — a basic editorial check missing from the piece.",
        "url": "https://www.maxpreps.com/tx/richmond/randle-lions/athletes/landen-williams-callis/bio/?careerid=tvjal7l15rih1",
        "source_title": "Landen Williams-Callis' Randle High School Bio",
        "why_good": "Opposing coaches are independent observers with direct game-planning knowledge; they can speak to scheme vulnerabilities and provide the counterweight that makes a statistical preview story credible rather than promotional."
      },
      {
        "category": "opposing",
        "who_or_what": "Barbers Hill head coach Cody Simper",
        "why_needed": "The draft mentions Luke Babin parenthetically under 'others worth tracking' but omits that Barbers Hill is moving up to 6A for the first time in school history — a structural challenge that complicates any prediction about Babin's numbers and deserves a skeptical framing.",
        "url": "https://texashsfootball.com/barbers-hill-eagles-2026-season-preview/",
        "source_title": "Barbers Hill Eagles 2026 Season Preview | Texas HS Football",
        "why_good": "Simper is a named public official already on record about the 6A jump; as the head coach managing that transition, he is the most credible voice to complicate the rosy statistical outlook for Babin."
      },
      {
        "category": "data",
        "who_or_what": "Dave Campbell's Texas Football Record Book (texasfootball.com/records)",
        "why_needed": "The draft makes implicit comparisons ('numbers that would have topped most area seasons outright') with no reference to official state or area records — readers cannot check whether any of these season totals are historically significant or merely good.",
        "url": "https://www.texasfootball.com/records/",
        "source_title": "Texas High School Football Record Book",
        "why_good": "Dave Campbell's Texas Football is described in search results as maintaining 'the state's most widely respected and cited UIL Texas High School Football record book,' giving it independent standing as the standard for statistical comparison."
      },
      {
        "category": "data",
        "who_or_what": "MaxPreps season statistics pages for all named players",
        "why_needed": "The draft notes that coaches should send corrections to the sports desk, signaling the numbers are unverified; MaxPreps game-by-game logs would let the reporter independently check each season total before publication.",
        "url": "https://www.maxpreps.com/tx/richmond/randle-lions/athletes/landen-williams-callis/bio/?careerid=tvjal7l15rih1",
        "source_title": "Landen Williams-Callis' Randle High School Career Home",
        "why_good": "MaxPreps is the standard public-facing database for Texas high school statistics and is independently maintained; search results show it tracks game-by-game entries for Frazier, Williams-Callis, Davis, and Gutierrez, making verification granular and checkable."
      },
      {
        "category": "data",
        "who_or_what": "UIL Athletics Champions Archives and Records (uiltexas.org)",
        "why_needed": "The draft has no reference to UIL district or classification context for any player's stats — a 3,500-yard rusher in 5A means something different than in 6A, and the UIL's own public records portal is the authoritative source for classification-level comparisons.",
        "url": "https://www.uiltexas.org/historical-archives/athletics/archives/",
        "source_title": "UIL: Athletics - Champions Archives and Records",
        "why_good": "UIL is the governing body for Texas high school athletics and its archives are a primary public record; the contact page and records are publicly accessible at no cost."
      },
      {
        "category": "experts",
        "who_or_what": "Lone Star Gridiron (lonestargridiron.com) — Texas high school football statistical historians",
        "why_needed": "The draft's claim that these numbers 'would have topped most area seasons outright' needs a benchmark; Lone Star Gridiron maintains what it describes as the most extensive Texas high school football database and is an independent, non-commercial reference point.",
        "url": "https://lonestargridiron.com/history-records/",
        "source_title": "Texas High School Football History and Records - Lone Star Gridiron",
        "why_good": "Lone Star Gridiron is an independent historical database without a stake in any school or player; it is the go-to resource cited by Texas sports journalists for historical context.",
        "contact": "info@lonestargridiron.com",
        "contact_url": "https://lonestargridiron.com/history-records/"
      },
      {
        "category": "experts",
        "who_or_what": "Dave Campbell's Texas Football editor-in-chief Greg Tepper",
        "why_needed": "The draft lacks any independent expert framing for whether this is a historically unusual concentration of statistical talent returning to one area — Tepper, who oversees the state's definitive record book, can answer that question without a stake in any program.",
        "url": "https://www.texasfootball.com/records/",
        "source_title": "Texas High School Football Record Book",
        "why_good": "Tepper is named publicly as the editor-in-chief of Dave Campbell's Texas Football and is listed as the direct contact for record corrections, giving him both expertise and independence.",
        "contact": "Contact via texasfootball.com/records (listed as corrections contact for the record book)",
        "contact_url": "https://www.texasfootball.com/records/"
      },
      {
        "category": "designed-out",
        "who_or_what": "North Forest and Wheatley — under-resourced HISD schools whose defensive stars (Javeon Taylor, Da'Veon Perkins, Peter Dorsey) receive no program context",
        "why_needed": "The draft lists defensive standouts from North Forest and Wheatley with zero context about those schools' resource levels, playoff histories, or community significance; readers outside the area have no way to understand what producing a 26-sack defender or a 9-interception defensive back means for programs that have historically operated with far less than their suburban counterparts.",
        "url": "https://texashsfootball.com/houston-heights-bulldogs-2026-season-preview/",
        "source_title": "Houston Heights Bulldogs 2026 Season Preview",
        "why_good": "North Forest and Wheatley are HISD schools serving predominantly Black, lower-income neighborhoods in northeast Houston; omitting school context systematically disadvantages the stories of players at under-resourced programs compared to the detailed narrative given to Willis and Randle."
      }
    ],
    "droppedCount": 0,
    "searchesRun": 5,
    "searchUrlsNormalized": [
      "247sports.com/player/landen-williams-callis-46138250",
      "bleacherreport.com/articles/25460641-5-star-rb-landen-williams-callis-announces-cfb-commitment-between-texas-texas-am-missouri-more",
      "defendernetwork.com/sports/high-school/artavion-davis-junior-wide-receiver-milby",
      "en.wikipedia.org/wiki/Lincoln_High_School_(Ypsilanti,_Michigan)",
      "en.wikipedia.org/wiki/Zah_Frazier",
      "lonestargridiron.com/history-records",
      "prepredzone.com/player/lincoln-frazier-2",
      "sports.yahoo.com/articles/randle-superstar-texas-commit-landen-150203619.html",
      "sports.yahoo.com/articles/texas-high-school-football-preview-135419874.html",
      "texashsfootball.com/alief-elsik-rams-2026-season-preview",
      "texashsfootball.com/barbers-hill-eagles-2026-season-preview",
      "texashsfootball.com/houston-heights-bulldogs-2026-season-preview",
      "wildkats.org/2025/10/27/freshman-quarterback-leads-wildkats",
      "www.deseret.com/sports/2026/07/25/houston-cougars-2026-football-preview",
      "www.espn.com/college-sports/football/recruiting/player/_/id/261455/landen-williams-callis",
      "www.hudl.com/profile/25858534",
      "www.laynemcdonald.com/post/memphis-news-houston-high-school-football-prepares-for-championship-push-in-2026-tssaa-season",
      "www.maxpreps.com/news/VQ3xP8t6I0CVdp0LedRJEw/landen-williams-callis-named-2025-maxpreps-texas-high-school-football-player-of-the-year.htm",
      "www.maxpreps.com/tx/houston/milby-buffaloes/athletes/artavion-davis?careerid=bnb7a0apdma77",
      "www.maxpreps.com/tx/houston/milby-buffaloes/athletes/gabriel-gutierrez?careerid=nsh7s3hbvb5aa",
      "www.maxpreps.com/tx/houston/milby-buffaloes/football",
      "www.maxpreps.com/tx/houston/milby-buffs/athletes/artavion-davis/football/stats?careerid=bnb7a0apdma77",
      "www.maxpreps.com/tx/houston/milby-buffs/football/roster",
      "www.maxpreps.com/tx/houston/milby-buffs/football/roster/all-time",
      "www.maxpreps.com/tx/richmond/randle-lions/athletes/landen-williams-callis/bio?careerid=tvjal7l15rih1",
      "www.maxpreps.com/tx/richmond/randle-lions/athletes/landen-williams-callis?careerid=tvjal7l15rih1",
      "www.maxpreps.com/tx/willis/willis-wildkats/athletes/linc-frazier/bio?careerid=ijgiag0dciv55",
      "www.maxpreps.com/tx/willis/willis-wildkats/athletes/lincoln-frazier/media/videos?careerid=ijgiag0dciv55",
      "www.on3.com/high-school/willis-willis-tx-5761/football/roster",
      "www.on3.com/rivals/landen-williams-callis-157919",
      "www.ozarkssportszone.com/2026/08/07/2026-fall-preview-houston-football",
      "www.ozarkssportszone.com/2026/08/09/video-houstons-eric-sloan-previews-upcoming-season",
      "www.si.com/high-school/national/randle-s-landen-williams-callis-named-2025-high-school-football-offensive-player-of-the-year-01ke81yda8fq",
      "www.si.com/high-school/texas/all-southeast-texas-high-school-football-2024-teams-awards-01jjjhvxxg25",
      "www.si.com/high-school/texas/texas-state-high-school-football-finals-notebook-191k-fans-record-viewership-multiple-arrests-at-at-t-stadium-01kdc6rr85ex",
      "www.texasfootball.com/article/2025/10/16/how-milby-s-artavion-davis-became-the-state-s-leading-receiver",
      "www.texasfootball.com/article/2025/12/05/elite-freshman-qb-with-texas-a-m-ties-leads-willis-to-history",
      "www.texasfootball.com/records",
      "www.texasfootball.com/team/houston-sam-houston-tigers",
      "www.uiltexas.org/100/football",
      "www.uiltexas.org/100/football-players",
      "www.uiltexas.org/historical-archives/athletics/archives",
      "x.com/lincdalion"
    ],
    "model": "claude-sonnet-4-6",
    "ms": 65465,
    "capturedOn": "2026-08-11"
  },
  {
    "sampleId": "cdl-english",
    "mode": "draft",
    "suggestions": [
      {
        "category": "affected",
        "who_or_what": "League of United Latin American Citizens (LULAC) — specifically the Galveston County Council, whose president Robert Quintero is already on record about this exact policy",
        "why_needed": "The draft has no voice for the Latino workers most directly stripped of income by the testing change; LULAC's Galveston County president has publicly called the shift 'more than a civil rights issue — it is a common-sense issue,' a perspective absent from the draft.",
        "url": "https://www.galvnews.com/news/new-licensing-rules-collide-with-texas-growing-need-for-truck-drivers/article_aab5a93c-afed-4b35-9776-efbc2b617611.html",
        "source_title": "New licensing rules collide with Texas' growing need for truck drivers | The Daily News",
        "why_good": "LULAC is an independent, non-partisan civil rights organization with deep roots in the Texas trucking workforce community and no financial stake in CDL school outcomes."
      },
      {
        "category": "affected",
        "who_or_what": "DACA recipients and refugee truckers whose CDL applications Texas terminated under the September 2025 DPS policy — a distinct population from Spanish-dominant test-takers",
        "why_needed": "The draft mentions this population in a single sentence with no sourcing and no affected voice; the Texas Tribune documented that refugees are roughly 1.2% of all Texas truck drivers and DACA recipients another 1.1%, making them a quantifiable group the draft treats as a footnote.",
        "url": "https://www.texastribune.org/2025/09/30/texas-commercial-drivers-license-ban-daca-immigrants/",
        "source_title": "Texas commercial drivers license ban DACA immigrants – Texas Tribune",
        "why_good": "The Texas Tribune story cites American Immigration Council data and DPS figures, giving the reporter specific numbers to pursue and organizations to contact for affected individuals."
      },
      {
        "category": "opposing",
        "who_or_what": "The trucking schools under AG investigation — specifically Fast Track CDL owner Zachary Delgado (Garland) and EP Trucking owner Rivera — who dispute Paxton's characterization",
        "why_needed": "The draft uncritically accepts Paxton's framing of the school investigations as fact; both school operators are already on record denying wrongdoing and saying DPS itself administered the final CDL tests — a direct challenge to the draft's implicit narrative.",
        "url": "https://www.ccjdigital.com/regulations/safety-compliance/article/15823686/texas-trucking-schools-respond-to-attorney-general-investigation",
        "source_title": "Texas Trucking Schools Respond to Attorney General Investigation | Commercial Carrier Journal",
        "why_good": "These are the named parties in a live civil investigative demand proceeding; their on-record denial is the strongest opposing view to the AG's allegations and is documented in multiple news outlets."
      },
      {
        "category": "opposing",
        "who_or_what": "FreightWaves analysis citing FMCSA and NTSB studies that failed to demonstrate a causal link between English deficiency and crash risk — and noting hours-of-service fatigue as the leading violation category",
        "why_needed": "The draft accepts DPS's road-safety rationale without challenge; independent analysis finds the earlier 2016 guidance dropping out-of-service status for ELP violations was itself backed by federal safety research showing weak causal evidence.",
        "url": "https://www.freightwaves.com/news/is-english-proficiency-enforcement-the-right-focus-for-safer-roads",
        "source_title": "Is English proficiency enforcement the right focus for safer roads? – FreightWaves",
        "why_good": "FreightWaves is an independent industry publication with no stake in the policy outcome; the analysis cites FMCSA and ATRI crash-predictor data, making it a checkable, credible counterweight to the official safety claim."
      },
      {
        "category": "data",
        "who_or_what": "FMCSA Motor Carrier Management Information System (MCMIS) — the federal crash and inspection database that tracks ELP out-of-service violations by state",
        "why_needed": "The draft makes a road-safety claim on behalf of DPS with no data; FMCSA's own records show 8,953 ELP out-of-service violations nationwide and that Texas-plated trucks account for 16% of all ELP violations — figures that let readers assess the scale and whether the policy matches the problem.",
        "url": "https://www.freightwaves.com/news/is-english-proficiency-enforcement-the-right-focus-for-safer-roads",
        "source_title": "Is English proficiency enforcement the right focus for safer roads? – FreightWaves",
        "why_good": "This is the primary federal dataset for commercial vehicle safety enforcement; it is public, searchable, and the authoritative source all parties cite."
      },
      {
        "category": "data",
        "who_or_what": "Texas DPS enforcement action records — the governor's office has already published that DPS took action against ~445 drivers since June 25, 2025, of whom only 28 held Texas licenses",
        "why_needed": "The draft asserts the policy is about safety on Texas roads, but public data shows the overwhelming majority of enforcement targets hold Mexican licenses — a fact that reframes who the rule actually affects and is missing from the story.",
        "url": "https://gov.texas.gov/news/post/governor-abbott-directs-texas-dps-to-strictly-enforce-english-proficiency-requirements-for-commercial-drivers",
        "source_title": "Governor Abbott Directs Texas DPS To Strictly Enforce English Proficiency Requirements For Commercial Drivers",
        "why_good": "This figure comes directly from Governor Abbott's official press release and is a public record any reporter can FOIA or confirm through DPS's Commercial Vehicle Enforcement division."
      },
      {
        "category": "data",
        "who_or_what": "FMCSA's own commissioned research — 'A Preliminary Review of English Proficiency and Safe Commercial Motor Vehicle Operation' (Volpe National Transportation Systems Center, 2008) and FMCSA's research page listing a follow-on study on ELP and CMV safety",
        "why_needed": "The draft's safety rationale is asserted, not evidenced; FMCSA itself commissioned studies specifically to determine whether a causal link exists between limited English proficiency and crash risk — the reporter should know what those studies found before reprinting the agency's safety claim.",
        "url": "https://rosap.ntl.bts.gov/view/dot/9462",
        "source_title": "A Preliminary Review of English Proficiency and Safe Commercial Motor Vehicle Operation – National Transportation Library",
        "why_good": "These are peer-reviewed government-commissioned studies, publicly available through the National Transportation Library, with no stake in current enforcement politics."
      },
      {
        "category": "experts",
        "who_or_what": "Researchers at the American Transportation Research Institute (ATRI) — an independent, non-profit trucking safety research arm whose 2022 Crash Predictor study analyzed 583,000+ drivers",
        "why_needed": "The draft has no independent researcher voice; ATRI has published the most comprehensive existing crash-predictor analysis of the driver population affected by this policy and can speak to whether ELP is a statistically significant safety factor versus other violations.",
        "url": "https://www.freightwaves.com/news/is-english-proficiency-enforcement-the-right-focus-for-safer-roads",
        "source_title": "Is English proficiency enforcement the right focus for safer roads? – FreightWaves",
        "why_good": "ATRI is the research arm of the American Trucking Associations but publishes peer-reviewed, publicly available data; its crash-predictor work is cited by both sides of the ELP debate, making it a credible neutral reference point."
      },
      {
        "category": "experts",
        "who_or_what": "Transportation law scholars or employment law professors at Texas law schools who study federal preemption and civil rights implications of state CDL eligibility rules",
        "why_needed": "The draft notes a federal court temporarily blocked a parallel national policy for failing to explain how the rule promotes safety — a legal vulnerability in the Texas policy the draft does not explore and which an academic with no client in the case could assess independently.",
        "url": "https://www.texastribune.org/2026/04/02/texas-immigration-crackdown-regulatory-legal-changes-undocumented-immigrants-daca/",
        "source_title": "Texas upends life for undocumented immigrants, DACA recipients – Texas Tribune",
        "why_good": "A federal court ruling (cited by the Texas Tribune) already questioned the safety rationale; a transportation or administrative law professor can explain the legal exposure without the advocacy stake of a litigating civil rights organization."
      },
      {
        "category": "designed-out",
        "who_or_what": "Spanish-dominant CDL applicants who are U.S. citizens or legal permanent residents — not undocumented workers — whose path to economic mobility through trucking is closed by the testing change",
        "why_needed": "The draft conflates the English-only test with immigration enforcement; many affected test-takers are U.S.-born or naturalized citizens whose primary language is Spanish — a population the framing erases by treating the policy as exclusively an immigration story.",
        "url": "https://www.houstonpublicmedia.org/articles/news/politics/immigration/2026/05/11/551453/texas-cdl-cancel-noncitizen-truck-drivers-struggle/",
        "source_title": "Texas took their licenses. Now these immigrant truckers face lost livelihoods, sense of betrayal – Houston Public Media",
        "why_good": "Houston Community College's CDL program and similar workforce programs in Houston's majority-Hispanic east and southeast corridors serve this citizen population and can connect reporters to affected students without crossing into immigration politics."
      },
      {
        "category": "designed-out",
        "who_or_what": "Deaf and hard-of-hearing CDL holders — FMCSA regulations carve out an exemption from the spoken portion of ELP testing for drivers with FMCSA hearing exemptions, a group the draft's framing makes invisible",
        "why_needed": "The draft presents the English-only rule as a single uniform standard; federal rules already require individualized accommodation for deaf drivers, and whether DPS's new testing regime correctly implements that exemption is an unasked and uncheckable question in the current draft.",
        "url": "https://www.eskill.com/resources/blog/employers-how-to-prepare-for-reinforced-fmcsa-english-language-requirements",
        "source_title": "How to Prepare for FMCSA English Requirements (2025) – eSkill",
        "why_good": "The FMCSA exemption is codified in federal regulation and noted by industry compliance sources; the National Association of the Deaf or the FMCSA's Medical Programs office can confirm how Texas's new testing procedures handle this carve-out."
      }
    ],
    "droppedCount": 0,
    "searchesRun": 5,
    "searchUrlsNormalized": [
      "abc3340.com/news/nation-world/nearly-9500-truck-drivers-sidelined-as-dot-ramps-up-english-language-enforcement",
      "cogoinsurance.com/non-domiciled-cdl-drivers",
      "cvsa.org/news/elp-oosc",
      "cvsa.org/news/elp-oosc-06252025",
      "dentonrc.com/news/state/texas-removes-spanish-language-option-for-commercial-driver-s-license-tests/article_9e7651b6-4a1b-4560-9e13-f7831f74b1c3.html",
      "disa.com/news/fmcsa-english-language-proficiency-rule-guide",
      "elpasomatters.org/2026/05/12/texas-immigrant-trucker-licenses-revoked-as-safety-measure",
      "gov.texas.gov/news/post/governor-abbott-directs-texas-dps-to-strictly-enforce-english-proficiency-requirements-for-commercial-drivers",
      "grahamlpa.com/blog/non-citizen-truck-drivers",
      "kvia.com/news/2026/06/01/cdl-and-permit-knowledge-tests-change-to-be-in-english-only-texas-dps",
      "lulac.org/advocacy/issues/immigration",
      "myparistexas.com/attorney-general-ken-paxton-launches-statewide-investigation-into-texas-trucking-schools-for-certifying-unqualified",
      "rosap.ntl.bts.gov/view/dot/9462",
      "sambasafety.com/blog/fmcsa-english-proficiency-enforcement",
      "san.com/cc/study-english-deficient-truckers-pose-greater-safety-risk-than-drugs-speeding",
      "texasscorecard.com/state/texas-dps-now-requires-english-only-testing-for-commercial-drivers",
      "thetexan.news/issues/immigration-border-issues/texas-dps-transitions-commercial-drivers-license-exams-to-english-only/article_031fef1a-6a2b-4d83-b9ce-c0edec2b1cbe.html",
      "trucksafe.com/post/fmcsa-issues-enforcement-policy-on-english-proficiency",
      "www.ccjdigital.com/regulations/safety-compliance/article/15823503/texas-ag-ken-paxton-investigates-trucking-schools-over-cdl-fraud",
      "www.ccjdigital.com/regulations/safety-compliance/article/15823686/texas-trucking-schools-respond-to-attorney-general-investigation",
      "www.ckflaw.com/blog/are-foreign-truckers-making-the-roads-unsafe",
      "www.click2houston.com/news/local/2026/04/29/texas-ag-investigates-trucking-schools-over-unsafe-cdl-training-including-houston-area-company",
      "www.click2houston.com/news/texas/2026/05/11/texas-took-their-licenses-now-these-immigrant-truckers-face-lost-livelihoods-sense-of-betrayal",
      "www.crossroadstoday.com/news/texas-news/texas-dps-requires-english-only-cdl-knowledge-test-for-commercial-drivers/article_901a7e62-097c-45d1-a781-6badaf65a560.html",
      "www.dps.texas.gov/news/dps-announces-changes-cdl-knowledge-testing",
      "www.dps.texas.gov/section/driver-license/how-do-i-apply-commercial-driver-license",
      "www.dps.texas.gov/section/driver-license/testing-other-languages",
      "www.eskill.com/resources/blog/employers-how-to-prepare-for-reinforced-fmcsa-english-language-requirements",
      "www.fmcsa.dot.gov/taxonomy/term/401?page=7",
      "www.freightwaves.com/news/is-english-proficiency-enforcement-the-right-focus-for-safer-roads",
      "www.freightwaves.com/news/study-links-elp-violations-to-unsafe-motor-carriers",
      "www.freightwaves.com/news/texas-stops-issuing-cdls-to-non-citizens-to-comply-with-feds",
      "www.galvnews.com/news/new-licensing-rules-collide-with-texas-growing-need-for-truck-drivers/article_aab5a93c-afed-4b35-9776-efbc2b617611.html",
      "www.hansonbridgett.com/publication/251013_6009_driving-compliance",
      "www.houstonpublicmedia.org/articles/news/politics/immigration/2026/05/11/551453/texas-cdl-cancel-noncitizen-truck-drivers-struggle",
      "www.jdsupra.com/topics/fmcsa/executive-orders/enforcement-actions",
      "www.jdsupra.com/topics/motor-carriers/fmcsa/new-regulations",
      "www.kens5.com/article/news/local/texas/paxton-texas-truck-driving-schools-certification/273-64f14fa4-4c91-4c09-8739-d6204fd18b15",
      "www.khou.com/article/news/local/texas/texas-cdl-english-only-no-spanish/285-54de1599-4464-4ff9-b348-10e1f23b0e82",
      "www.newswest9.com/article/news/local/texas/paxton-texas-truck-driving-schools-certification/273-64f14fa4-4c91-4c09-8739-d6204fd18b15",
      "www.setlifflaw.com/new-executive-order-prompts-closer-look-at-english-proficiency-requirements-for-commercial-drivers",
      "www.texasattorneygeneral.gov/news/releases/attorney-general-ken-paxton-launches-statewide-investigation-texas-trucking-schools-certifying",
      "www.texastribune.org/2025/09/30/texas-commercial-drivers-license-ban-daca-immigrants",
      "www.texastribune.org/2026/04/02/texas-immigration-crackdown-regulatory-legal-changes-undocumented-immigrants-daca",
      "www.texastribune.org/2026/05/11/texas-cdl-cancel-noncitizen-truck-drivers-struggle",
      "www.texastribune.org/tag/ken-paxton/page/103",
      "www.thetrucker.com/trucking-news/truck-driving-jobs-news/texas-ag-opens-investigations-on-several-truck-driving-schools",
      "www.wfaa.com/article/news/investigations/trucking-investigation/ag-ken-paxton-targets-trucking-schools-in-statewide-investigation-garland-trucking-school-owner-says-i-dont-understand-why-we-would-be-targeted/287-106486a3-d268-4835-b7d9-d4b6ec6a5c8d",
      "www.yahoo.com/news/articles/abbott-texas-dps-cracking-down-212100041.html"
    ],
    "model": "claude-sonnet-4-6",
    "ms": 75223,
    "capturedOn": "2026-08-11"
  },
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
    "sampleId": "storm-readiness",
    "mode": "idea",
    "suggestions": [
      {
        "category": "affected",
        "who_or_what": "Lower-income Houston-area households still recovering from Hurricane Beryl, reachable via Greater Houston Disaster Alliance nonprofit grantee network",
        "why_needed": "Research shows recovery from Beryl is starkly unequal — these are the residents whose experience will test whether grid and drainage fixes actually worked for the most vulnerable, not just average customers.",
        "url": "https://kinder.rice.edu/research/hurricane-beryl-disruptions-nearly-18-months-after-storm",
        "source_title": "Hurricane Beryl: Disruptions Nearly 18 Months After the Storm | Kinder Institute for Urban Research",
        "why_good": "The Kinder Institute's Houston Population Research Center found that households earning under $25,000 were least likely to be fully recovered from Beryl even a year later, making this demographic the sharpest accountability lens for promised improvements.",
        "contact": "Angel Harris, United Way of Greater Houston | Kevin Pickett, Greater Houston Community Foundation",
        "contact_url": "https://disasteralliance.org/past-disasters/beryl/"
      },
      {
        "category": "affected",
        "who_or_what": "People with disabilities and medical-equipment-dependent residents registered on the State of Texas Emergency Assistance Registry (STEAR)",
        "why_needed": "Houston OEM's own guidance instructs medically vulnerable residents to register with STEAR and plan for backup power — this population bears disproportionate risk if shelter and power fixes fall short, yet is rarely quoted in infrastructure accountability stories.",
        "url": "https://houstonoem.org/hurricane-or-tropical-storm/",
        "source_title": "Hurricane/Tropical Storm - Houston OEM",
        "why_good": "STEAR is the official state registry for residents needing evacuation assistance, making registrants the most directly affected and verifiable group to gauge whether shelter improvements actually reached those most at risk."
      },
      {
        "category": "opposing",
        "who_or_what": "Texas Coalition for Affordable Power (TCCFUI) — consumer watchdog tracking CenterPoint rate and audit proceedings",
        "why_needed": "CenterPoint is simultaneously claiming grid improvements while seeking ratepayer reimbursement of nearly $1.3 billion for storm restoration costs — a consumer advocate can articulate whether promised fixes are being paid for fairly or passed on to customers who already suffered.",
        "url": "https://tccfui.org/audit-commissioned-by-puc-finds-fault-with-centerpoint-hurricane-response/",
        "source_title": "Audit Commissioned by Texas Public Utility Commission Faults CenterPoint Hurricane Response | TCCFUI",
        "why_good": "TCCFUI reported on the Moss Adams audit findings and CenterPoint's securitization requests, giving it standing to critique both the utility's self-reported progress and the PUC's oversight record — with no financial stake in CenterPoint's success."
      },
      {
        "category": "opposing",
        "who_or_what": "Public Utility Commission of Texas (PUCT) — regulator that commissioned the Moss Adams management audit of CenterPoint",
        "why_needed": "The PUCT audit found CenterPoint did not adequately assess risks before an $800 million mobile generator lease that went largely unused during Beryl — the reporter needs the regulator's current view on whether audit recommendations have been implemented before the next storm.",
        "url": "https://www.houstonpublicmedia.org/articles/news/business/2025/05/19/521749/centerpoint-found-to-have-inadequacies-in-controversial-generator-procurement-process-audit-finds/",
        "source_title": "CenterPoint had inadequacies in generator procurement process, state-commissioned audit finds – Houston Public Media",
        "why_good": "As the independent state body that commissioned the audit and has authority over CenterPoint's rates and conduct, PUCT is the single most credible institutional check on whether utility self-reporting about grid improvements is accurate."
      },
      {
        "category": "data",
        "who_or_what": "Moss Adams LLP / PUCT CenterPoint Management Audit Final Report (May 8, 2025) — publicly filed at PUCT interchange",
        "why_needed": "This is the primary independent audit document detailing specific failures in CenterPoint's procurement, emergency management, and generator deployment — it is the baseline document for checking whether corrective actions have since been taken.",
        "url": "https://interchange.puc.texas.gov/Documents/58049_2_1497095.PDF",
        "source_title": "PUCT CenterPoint Management Audit Final Report — Moss Adams LLP, May 2025",
        "why_good": "It is a PUCT-commissioned, publicly filed audit report by an independent consulting firm, covering procurement, conflict-of-interest controls, and emergency operations — directly checkable and not reliant on company self-reporting."
      },
      {
        "category": "data",
        "who_or_what": "Harris County Flood Control District Active Construction Projects map and CDBG-DR/CDBG-MIT expenditure tracker",
        "why_needed": "HCFCD was allocated $541 million in federal mitigation funds and $325 million in disaster-recovery funds for drainage infrastructure — the reporter needs to check actual draw rates and completed project counts against promises made after Harvey and Beryl.",
        "url": "https://www.hcfcd.org/Resources/Interactive-Mapping-Tools/Active-Construction-Projects",
        "source_title": "Active Construction Projects — Harris County Flood Control District",
        "why_good": "The district's own interactive map and federal expenditure benchmarks (publicly tracked) allow a reporter to compare planned vs. completed projects by neighborhood with no reliance on agency press releases."
      },
      {
        "category": "data",
        "who_or_what": "City of Houston Fiscal Year 2025–2029 Storm Drainage Capital Improvement Plan (CIP)",
        "why_needed": "The city's own CIP document lists specific drainage projects, funding sources (including HUD CDBG-DR grants), and delivery timelines — it is the primary public record for verifying whether promised drainage fixes are on schedule or have slipped.",
        "url": "https://www.houstontx.gov/cip/25cipadopt/e_storm.pdf",
        "source_title": "City of Houston FY 2025–2029 Capital Improvement Plan — Storm Drainage System",
        "why_good": "This is a city government budget document, not a press release, making it the most checkable and authoritative record of what was committed and how much has been spent."
      },
      {
        "category": "data",
        "who_or_what": "Houston Stormwater Master Plan — City of Houston Public Works watershed-level flood risk analysis",
        "why_needed": "The master plan provides a neighborhood-by-neighborhood assessment of drainage infrastructure and flood risk that can be used to check whether capital investment is going to the highest-risk areas or is being distributed inequitably.",
        "url": "https://www.houstonpublicworks.org/houston-stormwater-master-plan",
        "source_title": "Houston Stormwater Master Plan | City of Houston – Houston Public Works",
        "why_good": "Produced by Houston Public Works, it is a technical planning document — not advocacy material — that gives reporters a data-grounded baseline to compare against infrastructure spending maps."
      },
      {
        "category": "experts",
        "who_or_what": "Kinder Institute for Urban Research, Houston Population Research Center — Daniel Potter, co-director",
        "why_needed": "The center has conducted multiple longitudinal surveys of Beryl recovery, including income-stratified data on who is still not back to normal — their data can ground the story's accountability frame with independent, peer-reviewed resident-level evidence.",
        "url": "https://news.rice.edu/news/2025/one-year-after-hurricane-beryl-1-10-houston-area-residents-still-need-help",
        "source_title": "One year after Hurricane Beryl, 1 in 10 Houston-area residents still need help | Rice News",
        "why_good": "The Kinder Institute is a non-partisan university research center with no financial interest in CenterPoint or city government; it has already published the most comprehensive post-Beryl recovery dataset available.",
        "contact": "kinder-udp@rice.edu",
        "contact_url": "http://harveyudp.rice.edu/"
      },
      {
        "category": "experts",
        "who_or_what": "SSPEED Center (Severe Storm Prediction, Education, and Evacuation from Disasters) at Rice University — flood mitigation and hurricane forecasting researchers",
        "why_needed": "The SSPEED Center has independently convened experts and officials on Houston flood infrastructure since Harvey — its researchers can assess whether CenterPoint's grid upgrades and HCFCD drainage projects actually match the engineering challenge posed by a major storm.",
        "url": "https://kinder.rice.edu/urbanedge/houston-area-officials-experts-push-action-flooding",
        "source_title": "Houston-Area Officials, Experts Push For Action on Flooding | Kinder Institute for Urban Research",
        "why_good": "The center was created specifically to study Houston-area storm risk and has no regulatory or utility interests, making it the most credible independent technical voice on whether promised fixes are engineered to the right standard."
      },
      {
        "category": "experts",
        "who_or_what": "Houston-Galveston Area Council (H-GAC) — 13-county regional emergency and evacuation planning body",
        "why_needed": "H-GAC coordinates regional hurricane evacuation planning across 13 counties and publishes the official evacuation zone maps — they can speak to whether shelter capacity and evacuation logistics have actually improved at the regional level, not just within city limits.",
        "url": "http://www.h-gac.com/hurricane",
        "source_title": "Hurricane Preparedness and Evacuation Planning for the Texas Gulf Coast Region | H-GAC",
        "why_good": "As the federally recognized metropolitan planning organization and regional disaster coordination body, H-GAC has direct, non-partisan knowledge of whether inter-agency emergency planning has improved since Beryl."
      },
      {
        "category": "designed-out",
        "who_or_what": "Spanish-speaking and immigrant communities in Houston — reachable via Houston in Action coalition and 211 Texas bilingual helpline",
        "why_needed": "The City of Houston's disaster recovery plan and CenterPoint's outreach are documented primarily in English; the story should check whether preparedness improvements, shelter locations, and power-outage alerts are reaching the large Spanish-speaking population that has fewer redundant resources during outages.",
        "url": "https://ghcf.org/news/greater-houston-disaster-alliance-invests-3-15-million-in-grants-to-nonprofits-serving-low-income-vulnerable-households-impacted-by-hurricane-beryl/",
        "source_title": "Greater Houston Disaster Alliance Invests $3.15 Million in Grants — Greater Houston Community Foundation",
        "why_good": "211 Texas logged over 29,000 Beryl-related calls, indicating the helpline is a primary touchpoint for under-resourced communities — organizations plugged into this network can speak to communication gaps that official agencies are unlikely to volunteer."
      },
      {
        "category": "designed-out",
        "who_or_what": "Residents living outside FEMA-designated floodplains but in high-risk areas identified by Rice University's updated flood maps",
        "why_needed": "Kinder Institute research shows FEMA's floodplain maps are being revised to reflect actual risk, meaning many homeowners outside official zones face flood danger that drainage CIP investments may not address — this framing is entirely absent from utility and city press releases.",
        "url": "https://kinder.rice.edu/",
        "source_title": "When Floodplains Move: A Story of Harris County, TX | Kinder Institute for Urban Research",
        "why_good": "The Kinder Institute's StoryMap on shifting Harris County floodplains provides independent, spatial data on which communities are newly at risk, offering a geographic equity angle that official planning documents do not surface."
      }
    ],
    "droppedCount": 0,
    "searchesRun": 7,
    "searchUrlsNormalized": [
      "bkvenergy.com/blog/centerpoint-greater-houston-resiliency-initiative",
      "communityimpact.com/houston/bay-area/government/2024/11/18/public-utility-commission-of-texas-to-audit-centerpoint-energy",
      "communityimpact.com/houston/bellaire-meyerland-west-university/government/2025/11/05/preview-harris-county-flood-district-to-provide-updates-on-maintenance-projects",
      "communityimpact.com/houston/cypress/government/2025/11/03/see-the-planned-410m-flood-control-projects-going-up-for-construction-bids-in-2026",
      "communityimpact.com/houston/spring-klein/government/2025/09/26/harris-county-flood-control-district-seeks-public-input-on-flood-resilience-plan",
      "cw39.com/weather/severe-weather/hurricane/hurricane-preparation-texas-safety",
      "defendernetwork.com/news/local-state/houston-city-council-disaster-recovery",
      "disasteralliance.org/past-disasters/beryl",
      "finviz.com/news/47175/hurricane-preparedness-week-centerpoint-energy-continues-significant-preparations-to-get-ready-for-2025-storm-season",
      "finviz.com/news/50265/greater-houston-resiliency-initiative-phase-two-update-centerpoint-energy-completes-nearly-90-of-critical-resiliency-actions-to-strengthen-the-grid-ahead-of-2025-hurricane-season",
      "finviz.com/news/72687/2025-atlantic-hurricane-season-centerpoint-energy-emphasizes-preparedness-with-critical-resiliency-efforts-completed-before-june-1-urges-customers-to-have-an-emergency-plan-and-practice-that-plan",
      "ghcf.org/news/greater-houston-disaster-alliance-invests-3-15-million-in-grants-to-nonprofits-serving-low-income-vulnerable-households-impacted-by-hurricane-beryl",
      "harveyudp.rice.edu/",
      "houstonemergency.org/preparing-for-disasters",
      "houstonoem.org/hurricane-or-tropical-storm",
      "interchange.puc.texas.gov/Documents/58049_2_1497095.PDF",
      "kinder.rice.edu/",
      "kinder.rice.edu/houston-solutions-lab",
      "kinder.rice.edu/media",
      "kinder.rice.edu/research",
      "kinder.rice.edu/research/hurricane-beryl-disruptions-nearly-18-months-after-storm",
      "kinder.rice.edu/urbanedge/houston-area-officials-experts-push-action-flooding",
      "kinder.rice.edu/urbanedge/hurricane-beryl-remains-disruptive-force-some-harris-county-residents-survey-shows",
      "kinderfoundation.org/major-gifts/education/kinder-institute-for-urban-research",
      "news.rice.edu/news/2025/hurricane-beryl-year-review-key-statistics-preparedness-recovery-and-community-resilience",
      "news.rice.edu/news/2025/one-year-after-hurricane-beryl-1-10-houston-area-residents-still-need-help",
      "patch.com/texas/houston/houston-fema-awards-fourth-grant-flood-mitigation-projects",
      "reduceflooding.com/wp-content/uploads/2025/10/251003_HCFCD_OnePgrRprt.pdf",
      "research.rice.edu/opd/kinder-institute-urban-research",
      "rrc.texas.gov/media/ee1ir2n2/1251bu.pdf",
      "tccfui.org/audit-commissioned-by-puc-finds-fault-with-centerpoint-hurricane-response",
      "www.click2houston.com/news/local/2025/06/03/centerpoint-energy-prepares-for-active-hurricane-season-with-major-infrastructure-upgrades",
      "www.click2houston.com/plan-and-prepare",
      "www.click2houston.com/topic/Public_Utility_Commission",
      "www.click2houston.com/topic/Public_Utility_Commission_of_Texas",
      "www.h-gac.com/hurricane",
      "www.harriscountyfemt.org/",
      "www.harriscountyfemt.org/cb",
      "www.hcde-texas.org/about/emergency-preparedness/hurricanes-tropical-storms",
      "www.hcfcd.org/",
      "www.hcfcd.org/Activity/Projects",
      "www.hcfcd.org/Resources/Interactive-Mapping-Tools/Active-Construction-Projects",
      "www.houstonhabitat.org/2025/06/10/houston-hurricane-season-prep-stay-safe-stay-ready",
      "www.houstonpublicmedia.org/articles/news/business/2025/05/19/521749/centerpoint-found-to-have-inadequacies-in-controversial-generator-procurement-process-audit-finds",
      "www.houstonpublicmedia.org/articles/news/harris-county/2025/01/08/510122/houston-harris-county-awarded-382-million-federal-grant-for-hurricane-beryl-recovery",
      "www.houstonpublicworks.org/houston-stormwater-master-plan",
      "www.houstontx.gov/cip/21cipadopt/e_storm.pdf",
      "www.houstontx.gov/cip/25cipadopt/e_storm.pdf",
      "www.houstontx.gov/cip/25cipadopt/storm.pdf",
      "www.houstontx.gov/council/5/flood-mitigation.html",
      "www.jrhengineering.net/post/houston-design-and-construction-standards-update-2025",
      "www.khou.com/article/weather/hurricane/2025-hurricane-preparedness-guide/285-081d1d95-7138-4ba9-b15b-4a7c3c412a63",
      "www.positivecurrent.com/houstons-grid-gets-a-hurricane-ready-68cbb5d5f5b5ff001b80e1c8",
      "www.prnewswire.com/news-releases/greater-houston-resiliency-initiative-phase-two-update-centerpoint-energy-completes-nearly-90-of-critical-resiliency-actions-to-strengthen-the-grid-ahead-of-2025-hurricane-season-302448921.html",
      "www.rice.edu/node/226",
      "www.smartcitiesdive.com/news/centerpoint-completes-houston-grid-upgrade-ahead-of-hurricane-season/749006",
      "www.spartnerships.com/harris-county-flood-control-projects",
      "www.tdworld.com/electric-utility-operations/news/55341874/centerpoint-energy-reports-2025-progress-on-greater-houston-grid-resiliency-efforts",
      "www.texasstandard.org/stories/houston-public-utility-commission-report-puc-texas-centerpoint-hurricane-beryl-audit",
      "www.txdot.gov/nhhip/about/segment-3.html",
      "www.utilitydive.com/news/centerpoint-completes-houston-grid-upgrade-ahead-of-hurricane-season/748959",
      "www.weather.gov/media/hgx/hurricanes/2025HurricaneGuide/HGX%20HG2025_English.pdf",
      "www.westhouston.org/2025/07/24/building-resilience-the-future-of-flood-control-in-a-growing-region"
    ],
    "model": "claude-sonnet-4-6",
    "ms": 75649,
    "capturedOn": "2026-08-11"
  },
  {
    "sampleId": "uil-heat-rules",
    "mode": "idea",
    "suggestions": [
      {
        "category": "affected",
        "who_or_what": "Marching band directors and band parents at Houston-area high schools",
        "why_needed": "The story idea names band parents but the reporting plan has no specific contacts — marching band members face the same WBGT cancellation thresholds as athletes while carrying instruments in full uniforms, yet their experience is almost entirely absent from current coverage.",
        "url": "https://www.click2houston.com/news/local/2026/08/03/new-uil-heat-rules-are-now-in-effect-heres-what-they-mean-for-texas-football-players-and-marching-bands/",
        "source_title": "New UIL heat rules are now in effect. Here's what they mean for Texas football players and marching bands",
        "why_good": "Band directors are the on-the-ground decision-makers who must enforce WBGT rules during summer band camps; band booster organizations can surface parent concerns about shortened rehearsal time ahead of competitive season."
      },
      {
        "category": "affected",
        "who_or_what": "Houston ISD Executive Athletics Director Andre Walker",
        "why_needed": "HISD oversees roughly 30,000 student-athletes — the largest district footprint in the state — and has adopted a stricter district-wide WBGT trigger policy, making Walker a key voice on how the mandate lands on low-income urban campuses that may lack redundant cooling infrastructure.",
        "url": "https://www.houstonpublicmedia.org/articles/education/2026/08/03/558445/high-school-football-houston-texas-uil-heat-safety-rule/",
        "source_title": "Texas schools must tailor outdoor athletic practices based on heat readings in new statewide safety measure – Houston Public Media",
        "why_good": "Walker is a named, public-facing official in his institutional role; HISD's district-wide trigger policy is already more aggressive than UIL minimums, giving him concrete implementation data to share."
      },
      {
        "category": "affected",
        "who_or_what": "Katy ISD Athletics Executive Director Lance Carter",
        "why_needed": "Carter was observed deploying rapid-cooling infrastructure at the first week of mandatory-rule practices and can speak to capital and logistical costs suburban districts are absorbing — a concrete contrast to what under-resourced districts face.",
        "url": "https://www.houstonpublicmedia.org/articles/education/2026/08/03/558445/high-school-football-houston-texas-uil-heat-safety-rule/",
        "source_title": "Texas schools must tailor outdoor athletic practices based on heat readings in new statewide safety measure – Houston Public Media",
        "why_good": "Carter is a named official whose district was on the ground floor of compliance; Katy ISD is a large suburban program whose experience can anchor the suburban side of the Houston-area comparison."
      },
      {
        "category": "opposing",
        "who_or_what": "Houston-area high school football head coaches (via Houston Chronicle survey data)",
        "why_needed": "The story cannot present the new rules as unambiguously positive without engaging the coach skepticism on record: a Chronicle survey found roughly 77% of respondents called WBGT requirements too restrictive, and coaches have flagged that readings vary block-to-block, making uniform enforcement feel arbitrary.",
        "url": "https://hoodline.com/2026/07/friday-night-lights-on-ice-texas-schools-hit-with-tough-new-heat-rules/",
        "source_title": "Texas UIL WBGT Mandate Forces New Heat Rules",
        "why_good": "Coach objections are the best-informed skeptical perspective because coaches are the ones modifying practice in real time; their concerns about competitive disadvantage and scheduling compression are concrete and checkable."
      },
      {
        "category": "opposing",
        "who_or_what": "UIL Athletics Director Ray Zepeda",
        "why_needed": "The story needs the rule-maker's rebuttal to coach skepticism on record — Zepeda has already defended the mandate publicly and can explain what compliance enforcement looks like and whether schools that don't yet own WBGT devices face sanctions.",
        "url": "https://hoodline.com/2026/07/friday-night-lights-on-ice-texas-schools-hit-with-tough-new-heat-rules/",
        "source_title": "Texas UIL WBGT Mandate Forces New Heat Rules",
        "why_good": "Zepeda is the named UIL official responsible for athletics policy and has spoken on the record about the transition from recommendation to mandate; he can speak to the Medical Advisory Committee's reasoning."
      },
      {
        "category": "data",
        "who_or_what": "UIL 2026-2027 Heat Stress & Athletic Participation Required Plan (official policy document)",
        "why_needed": "The story needs the primary regulatory text to verify exactly what is required versus recommended, what the WBGT thresholds are for the Houston (Class 3) region, and what the enforcement mechanism is — claims in coverage vary and need grounding in the source document.",
        "url": "https://www.uiltexas.org/health/info/heat-stress-and-athletic-participation",
        "source_title": "2026-2027 Heat Stress & Athletic Participation REQUIRED Plan — Health & Safety — University Interscholastic League (UIL)",
        "why_good": "This is the official UIL policy document; it is public, free, and the authoritative record of what the mandate actually requires."
      },
      {
        "category": "data",
        "who_or_what": "Perry Weather's regional WBGT tracking data for the Houston region (Texas High School Athletic Directors Association zones)",
        "why_needed": "The story needs actual Houston-region WBGT frequency data to show readers how many practice days are affected — Perry Weather's tracking found the Houston region hit the no-outdoor-workout benchmark 8 days, the 1-hour limit 13 days, and the 2-hour limit 23 days last year.",
        "url": "https://perryweather.com/texas-uil-weather-policy-guide/",
        "source_title": "2026/2027 UIL Weather Policies for Texas Schools",
        "why_good": "Perry Weather is a commercial weather service that has been tracking UIL-relevant WBGT readings by region and publishing the data; its Houston-region figures are the only publicly cited dataset quantifying local impact of the new thresholds."
      },
      {
        "category": "data",
        "who_or_what": "National Weather Service Houston/Galveston office — historical August WBGT averages",
        "why_needed": "NWS meteorologist Jimmy Fowler is already on record saying Houston's average August WBGT runs 85–95, meaning most early-season practices will trigger some restriction — the reporter needs the underlying climatological data to show how structural, not exceptional, this burden is.",
        "url": "https://www.keranews.org/texas-news/2026-08-03/texas-schools-must-tailor-outdoor-athletic-practices-based-on-heat-readings-in-new-statewide-safety-measure",
        "source_title": "Texas schools must tailor outdoor athletic practices based on heat readings in new statewide safety measure | KERA News",
        "why_good": "NWS is an independent federal agency; its Houston/Galveston office produces the authoritative local climate record and has a public affairs contact for reporters."
      },
      {
        "category": "data",
        "who_or_what": "Texas Legislature HB 395 (88th Session) — statutory text requiring WBGT use in public schools",
        "why_needed": "The story needs to establish whether the UIL mandate sits on a statutory foundation or solely on UIL rulemaking authority — the bill text shows the legislative intent and which schools are covered, including charter schools.",
        "url": "https://capitol.texas.gov/tlodocs/88R/billtext/html/HB00395I.htm",
        "source_title": "88R2183 CXP-D — Texas HB 395",
        "why_good": "This is primary source legislation available through the Texas Legislature Online; it establishes the legal basis for any enforcement and is freely FOIA-exempt public record."
      },
      {
        "category": "experts",
        "who_or_what": "UIL Medical Advisory Committee — the physician and trainer body that recommended mandatory WBGT adoption",
        "why_needed": "The story lacks an independent medical voice explaining why WBGT was chosen over heat index and what the science says about Class 3 (Houston) thresholds specifically — the committee's public recommendation is cited in coverage but no committee member has been quoted.",
        "url": "https://www.uiltexas.org/health/info/heat-stress-and-athletic-participation",
        "source_title": "2026-2027 Heat Stress & Athletic Participation REQUIRED Plan — Health & Safety — University Interscholastic League (UIL)",
        "why_good": "The Medical Advisory Committee is institutionally independent of UIL athletics operations; its members are clinicians and researchers whose recommendation drove the mandate, making them the most credible explainers of the medical rationale."
      },
      {
        "category": "experts",
        "who_or_what": "Korey Stringer Institute at the University of Connecticut — national research center on athlete heat stroke prevention",
        "why_needed": "The story needs an expert with no financial stake in UIL equipment sales or district compliance to assess whether the WBGT thresholds are calibrated correctly for Houston's humid conditions and whether coaches' 'too restrictive' claims hold up scientifically.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34524191/",
        "source_title": "ACSM Expert Consensus Statement on Exertional Heat Illness: Recognition, Management, and Return to Activity - PubMed",
        "why_good": "KSI is the nation's leading independent research center on exertional heat stroke in sport; it has published extensively on WBGT policy and has no commercial stake in Texas school compliance."
      },
      {
        "category": "designed-out",
        "who_or_what": "Under-resourced Houston-area districts without full-time athletic trainers — the compliance equity gap",
        "why_needed": "The story's framing assumes every school can afford WBGT devices, cold-water immersion tubs, and on-site athletic trainers — but roughly one-third of exertional heat illnesses nationally occur when no medical professional is present, and the UIL does not require districts to purchase WBGT meters, leaving that burden on individual campuses.",
        "url": "https://www.ajpmonline.org/article/S0749-3797(12)00742-8/pdf",
        "source_title": "Epidemiology of Exertional Heat Illness Among U.S. High School Athletes",
        "why_good": "National epidemiological data shows that the schools least equipped to comply are the ones where heat illness is most likely to go undetected; Houston's smaller, lower-income districts (many in Harris County's northern and eastern corridors) face this gap most acutely and have no spokesperson in current coverage."
      }
    ],
    "droppedCount": 0,
    "searchesRun": 5,
    "searchUrlsNormalized": [
      "abc13.com/story/texas-hot-temperatures-uil-issues-new-heat-safety-guidelines-high-school-athletes-marching-bands/19591896?userab=kfsn_content_recs-582*variant_b_trending_kfsn-2513%2Ckabc_content_recs-577*variant_a_control-2480%2Cwls_content_recs-584*variant_a_control_wls-2516%2Cwtvd_content_recs-585*variant_a_control_wtvd-2518%2Cktrk_content_recs-587*variant_a_control_ktrk-2522%2Cwpvi_content_recs-586*variant_b_trending_wpvi-2521%2Cotv_web_content_rec-539*variant_c_trending-2268%2Cotv_web_topic-580*variant_a_topic-2508%2Cotv_search_page_design_unification-546*variant_b_search_redesign-2300%2Ckgo_content_recs-583*variant_b_trending_kgo-2515%2Cabcn_popular_reads_exp-542*variant_b_7days_filter-2288%2Cotvlink_abcnnav-576*variant_a_control-2478",
      "blog.healthyroster.com/blog/texas-uil-makes-wet-bulb-globe-temperature-monitoring-mandatory-for-outdoor-practices?hs_amp=true",
      "capitol.texas.gov/tlodocs/88R/billtext/html/HB00395I.htm",
      "hoodline.com/2026/07/friday-night-lights-on-ice-texas-schools-hit-with-tough-new-heat-rules",
      "kestrelinstruments.com/blog/staying-safe-in-the-texas-heat-uil-s-2025-2026-heat-stress-guidelines-for-outdoor-athletics-and-marching-band",
      "kkam.com/ixp/156/p/uil-new-heat-rules",
      "perryweather.com/resources/2024-2025-uil-heat-stress-guidelines",
      "perryweather.com/resources/how-to-navigate-the-24-25-uil-heat-stress-policies",
      "perryweather.com/texas-uil-weather-policy-guide",
      "physoc.onlinelibrary.wiley.com/doi/10.1113/EP090686",
      "pmc.ncbi.nlm.nih.gov/articles/PMC9363732",
      "pmc.ncbi.nlm.nih.gov/articles/PMC9826288",
      "pubmed.ncbi.nlm.nih.gov/23253644",
      "pubmed.ncbi.nlm.nih.gov/29332471",
      "pubmed.ncbi.nlm.nih.gov/34524191",
      "sports.yahoo.com/articles/heat-monitoring-requirements-set-effect-225318037.html",
      "sports.yahoo.com/articles/uil-heat-safety-rules-using-230503419.html",
      "www.ajpmonline.org/article/S0749-3797(12)00742-8/pdf",
      "www.aol.com/east-texas-football-practices-heat-033058827.html",
      "www.audacy.com/krld/news/local/uil-mandates-wet-bulb-globe-temperature-monitoring-for-texas-school-outdoor-activities",
      "www.click2houston.com/news/local/2025/05/12/houston-area-schools-adjusting-outdoor-activities-as-early-summer-heat-surges",
      "www.click2houston.com/news/local/2026/08/03/new-uil-heat-rules-are-now-in-effect-heres-what-they-mean-for-texas-football-players-and-marching-bands",
      "www.fox4news.com/news/texas-high-schools-face-mandatory-heat-safety-rules-outdoor-activities-starting-aug-1",
      "www.gssiweb.org/docs/default-source/sse-docs/bergeron_sse_158.pdf?sfvrsn=2",
      "www.houstonpublicmedia.org/articles/education/2026/08/03/558445/high-school-football-houston-texas-uil-heat-safety-rule",
      "www.kbtx.com/2026/07/28/new-heat-safety-guidelines-outdoor-activities-go-into-effect-august-1",
      "www.kbtx.com/2026/08/04/new-heat-safety-guidelines-outdoor-activities-effect-august-1",
      "www.kcbd.com/2026/07/24/uil-require-wet-bulb-globe-temperature-metric-texas-school-outdoor-activities",
      "www.keranews.org/texas-news/2026-08-03/texas-schools-must-tailor-outdoor-athletic-practices-based-on-heat-readings-in-new-statewide-safety-measure",
      "www.kgns.tv/2026/08/03/uil-now-requires-heat-safety-protocols-student-athletes-across-texas",
      "www.ktep.org/2026-08-03/texas-schools-must-tailor-outdoor-athletic-practices-based-on-heat-readings-in-new-statewide-safety-measure",
      "www.ncbi.nlm.nih.gov/pmc/articles/PMC9826288",
      "www.newschannel6now.com/2026/07/28/uil-requires-wetbulb-globe-temperature-guidelines-outdoor-activities-beginning-august",
      "www.ovid.com/jnls/acsm-csmr/fulltext/10.1249/jsr.0000000000001058~acsm-expert-consensus-statement-on-exertional-heat-illness",
      "www.tpr.org/news/2026-08-03/texas-schools-must-tailor-outdoor-athletic-practices-based-on-heat-readings-in-new-statewide-safety-measure",
      "www.uiltexas.org/health/info/heat-stress-and-athletic-participation"
    ],
    "model": "claude-sonnet-4-6",
    "ms": 69415,
    "capturedOn": "2026-08-11"
  },
  {
    "sampleId": "gulfton-rebuild",
    "mode": "idea",
    "suggestions": [
      {
        "category": "affected",
        "who_or_what": "Gulfton Citizens Advisory Council (president Tammy Rodriguez)",
        "why_needed": "Rodriguez is on record saying these infrastructure improvements were requested as far back as 2003 — the draft needs her account of whether the current outreach process actually reached the renters and pedestrians who waited 21 years, not just officials.",
        "url": "https://abc13.com/post/houston-infrastructure-44-million-dollar-grant-given-to-bring-new-sidewalks-bike-lanes-gufton-area/14612933/",
        "source_title": "Gulfton community awarded $43 million federal grant for infrastructure improvements - ABC13 Houston",
        "why_good": "She walked the project area with Congresswoman Fletcher at the grant announcement, making her the closest community voice already tethered to the public record of this project."
      },
      {
        "category": "affected",
        "who_or_what": "Gulfton Area Neighborhood Organization (GANO) / CARECEN Houston office",
        "why_needed": "With over 50 languages spoken in Gulfton, GANO/CARECEN is the street-level organization serving immigrant residents who are least likely to have seen or understood English-only public notices — a gap the story is built around.",
        "url": "https://www.yellowpages.com/houston-tx/mip/gulfton-area-neighborhood-organization-1504757",
        "source_title": "Gulfton Area Neighborhood Organization - Houston, TX 77081",
        "why_good": "GANO has operated out of Gulfton for 30+ years providing services to low-income immigrants, making it a credible bridge to renters and pedestrians who are the project's primary beneficiaries but unlikely to appear in public meeting sign-in sheets.",
        "contact": "(713) 665-1284, 6006 Bellaire Blvd, Houston, TX 77081",
        "contact_url": "https://www.yellowpages.com/houston-tx/mip/gulfton-area-neighborhood-organization-1504757"
      },
      {
        "category": "affected",
        "who_or_what": "LINK Houston (transportation equity advocacy organization)",
        "why_needed": "The story's core question is whether outreach reached carless, transit-dependent residents — LINK Houston has documented Gulfton-area dangerous intersections and advocates specifically for equity in pedestrian infrastructure, making them a ready source of affected-community perspective and existing audit data.",
        "url": "https://kinder.rice.edu/urbanedge/its-time-fix-houstons-dangerous-pedestrian-and-bicycle-infrastructure",
        "source_title": "It's Time to Fix Houston's Dangerous Pedestrian and Bicycle Infrastructure | Kinder Institute for Urban Research",
        "why_good": "LINK Houston is an independent advocacy organization, not a city contractor, and has already conducted field work at Gulfton-adjacent intersections on the pedestrian safety problem this project addresses."
      },
      {
        "category": "data",
        "who_or_what": "EngageHouston.org project page and community-meeting records for the Gulfton and Kashmere Gardens Resilient Sidewalks Project",
        "why_needed": "The city directed the public to EngageHouston.org for project information; the reporter needs to pull the actual meeting notices, dates, languages used, and attendance logs to verify whether outreach was multilingual and reached non-English-speaking residents.",
        "url": "https://www.engagehouston.org/construction",
        "source_title": "Projects in Construction | Engage Houston",
        "why_good": "EngageHouston is Houston Public Works' official public-engagement portal — any outreach the city conducted for this project should be documented or FOIA-able through it.",
        "contact": "engage@houstontx.gov or call 311",
        "contact_url": "https://www.engagehouston.org/construction"
      },
      {
        "category": "data",
        "who_or_what": "City of Houston Language Assistance Plan (Houston Housing and Community Development Department) and Houston Public Works Title VI records",
        "why_needed": "Federal recipients using DOT funds are legally required to provide meaningful language access to limited-English-proficient residents — the reporter should obtain HPW's Title VI compliance plan and any LEP outreach documentation for this specific grant to check whether legal obligations were met.",
        "url": "https://www.houstontx.gov/ispeakhouston/dlap/Housing.pdf",
        "source_title": "CITY OF HOUSTON Language Assistance Plan",
        "why_good": "The city's own Language Assistance Plan framework establishes the standard against which outreach can be measured; it is a public document and the baseline for a checkable accountability story."
      },
      {
        "category": "data",
        "who_or_what": "Houston Complete Communities Data Discovery Portal — Gulfton neighborhood profile",
        "why_needed": "The portal aggregates census-level data on Gulfton's languages, income, and housing stock — the reporter needs this baseline to quantify how many residents speak which languages at home and thus evaluate whether outreach materials covered the actual linguistic landscape.",
        "url": "https://discovery.houstoncc.org/gulfton/",
        "source_title": "Gulfton | Houston Complete Communities Data Discovery Portal",
        "why_good": "City-maintained, census-sourced, publicly accessible, and Gulfton-specific — it is the checkable record behind the '50 languages' claim in every press release."
      },
      {
        "category": "data",
        "who_or_what": "Reconnecting Communities and Neighborhoods (RCN) grant application filed by the City of Houston with USDOT",
        "why_needed": "The grant application would contain the city's own community-engagement plan, equity commitments, and language-access promises made to win the federal award — these are the specific promises to hold the project against.",
        "url": "https://4273298.fs1.hubspotusercontent-na1.net/hubfs/4273298/Houston_RC_Planning_Grant_Applications.pdf",
        "source_title": "RECONNECTING COMMUNITIES: Gulfton and Beyond",
        "why_good": "Federal grant applications are public records; the draft application obtained from USDOT or HPW via FOIA is the authoritative document stating who the city promised to consult and how."
      },
      {
        "category": "experts",
        "who_or_what": "Mandi Chapa, lecturer at Rice School of Architecture and urban designer at Huitt-Zollars",
        "why_needed": "The story needs an expert who can assess whether the project's community engagement design was genuinely inclusive or procedurally compliant — Chapa focuses on equity, community-centered design, and Houston infrastructure and is available for press interviews.",
        "url": "https://news.rice.edu/news/2025/rice-expert-available-discuss-urban-transportation-and-street-design-texas",
        "source_title": "Rice expert available to discuss urban transportation and street design in Texas | Rice News",
        "why_good": "Rice has flagged her as a media-available expert on urban transportation and infrastructure equity in Houston; she has no disclosed stake in this specific project."
      },
      {
        "category": "experts",
        "who_or_what": "Kinder Institute for Urban Research at Rice University (Urban Development, Transportation and Placemaking program)",
        "why_needed": "The Kinder Institute published a Gulfton-specific report — 'Safe Streets, Safe Communities: Walking and Biking Infrastructure in Gulfton' — finding 59% of street segments connecting residents to transit stops have obstructions; researchers there can ground the story's infrastructure claims in independent data.",
        "url": "https://news2.rice.edu/2019/08/06/iride-helps-houston-students-solve-real-world-problems-in-their-neighborhood/",
        "source_title": "iRIDE helps Houston students solve real-world problems in their neighborhood | Rice News",
        "why_good": "The Institute has conducted original Gulfton fieldwork and is independent of the city agencies administering this grant."
      },
      {
        "category": "opposing",
        "who_or_what": "Houston Public Works Director Carol Haddock (in her official capacity) — specifically on the outreach methodology and language-access process",
        "why_needed": "Haddock is publicly on record touting equity goals for this project but the draft lacks any official account of what languages outreach materials appeared in, which meetings were held and in which languages, and what interpreter services were provided — the strongest opposing case is that the city did comply, and Haddock is the person who must make it.",
        "url": "https://www.houstonpublicworks.org/houston-awarded-43-million-grant-for-gulfton-and-kashmere-gardens-communities",
        "source_title": "Houston Awarded $43 Million Grant for Gulfton and Kashmere Gardens Communities | City of Houston - Houston Public Works",
        "why_good": "As the director of the department administering the project, she is the authoritative official voice and the one whose claims are most directly testable against the documents above.",
        "contact": "Houston Public Works public affairs: houstonpublicworks.org",
        "contact_url": "https://www.houstonpublicworks.org/"
      },
      {
        "category": "designed-out",
        "who_or_what": "Arabic- and Tigrinya-speaking East African and Middle Eastern residents of Gulfton — specifically organizations such as the local mosques or East African community associations serving Somali, Eritrean, and Ethiopian immigrants",
        "why_needed": "Gulfton's resident profile extends well beyond Spanish speakers — the neighborhood includes immigrants from Middle Eastern and East African countries speaking Arabic, Somali, Tigrinya, and Amharic; if outreach was Spanish-and-English only, these communities were designed out, and the story should name which languages were missing.",
        "url": "https://discovery.houstoncc.org/gulfton/",
        "source_title": "Gulfton | Houston Complete Communities Data Discovery Portal",
        "why_good": "The Houston Complete Communities profile explicitly notes Gulfton's shift toward Middle Eastern immigrants alongside its traditionally Central American base — making non-Spanish language communities the most likely gap in a project whose press materials mention no specific language access plan."
      },
      {
        "category": "designed-out",
        "who_or_what": "Residents with mobility disabilities and wheelchair users — specifically disability rights organizations such as ADAPT of Texas or the Houston Mayor's Office for People with Disabilities",
        "why_needed": "A sidewalk and drainage project in a neighborhood where pedestrian infrastructure is almost entirely absent has direct ADA compliance implications; no source in the available record has spoken to whether the design process included input from wheelchair users or people with mobility impairments who depend on these sidewalks daily.",
        "url": "https://news.rice.edu/news/2025/rice-expert-available-discuss-urban-transportation-and-street-design-texas",
        "source_title": "Rice expert available to discuss urban transportation and street design in Texas | Rice News",
        "why_good": "Mandi Chapa's Rice profile notes she helped develop Disability-Inclusive Parks Guidelines for the Houston Parks Board, confirming this is a live, locally documented gap in Houston infrastructure planning — and an independent disability-rights organization would have no stake in the project outcome."
      }
    ],
    "droppedCount": 0,
    "searchesRun": 5,
    "searchUrlsNormalized": [
      "4273298.fs1.hubspotusercontent-na1.net/hubfs/4273298/Houston_RC_Planning_Grant_Applications.pdf",
      "abc13.com/post/houston-infrastructure-44-million-dollar-grant-given-to-bring-new-sidewalks-bike-lanes-gufton-area/14612933",
      "cee.rice.edu/news/rice-workshop-examines-resilience-equity-houston",
      "discovery.houstoncc.org/gulfton",
      "en.wikipedia.org/wiki/Gulfton,_Houston",
      "en.wikipedia.org/wiki/Houston-Galveston_Area_Council_2035_Regional_Transportation_Plan",
      "fletcher.house.gov/news/documentsingle.aspx?DocumentID=5280",
      "greatnonprofits.org/org/gulfton-area-neighborhood-organization-inc",
      "homelessresources.networkofcare.org/Texas/Share?url=https://homelessresources.networkofcare.org/Texas/Services/Agency/?pid%3DGulftonAreaNeighborhoodAssociationGANOCARECENNaturalizationSupportLegalServices_21_1756_1&title=Gulfton+Area+Neighborhood+Association+(GANO/CARECEN):+Naturalization+Support/Legal+Services&type=email",
      "homelessresources.networkofcare.org/Texas/services/agency?pid=GulftonAreaNeighborhoodAssociationGANOCARECENNaturalizationSupportLegalServices_21_1756_1",
      "houstoncompletecommunities.org/our_communities/gulfton/index.php",
      "kinder.rice.edu/issues/transportation",
      "kinder.rice.edu/urban-development-transportation-and-placemaking",
      "kinder.rice.edu/urbanedge/its-time-fix-houstons-dangerous-pedestrian-and-bicycle-infrastructure",
      "kinder.rice.edu/urbanedge/no-houston-isnt-walkable-city-you-have-start-somewhere",
      "mentalhealthtx.org/facilities/gulfton-area-neighborhood-association-gano-carecen-main-office",
      "news.rice.edu/news/2025/rice-expert-available-discuss-urban-transportation-and-street-design-texas",
      "news2.rice.edu/2019/08/06/iride-helps-houston-students-solve-real-world-problems-in-their-neighborhood",
      "pactman.org/profile/nonprofit/gulfton-area-neighborhood-organization-inc-xQ19F78Jc0",
      "placesjournal.org/article/superneighborhood-27-a-brief-history-of-change",
      "remezcla.com/features/culture/central-american-business-organizations-to-support-in-gulfton-houston",
      "subcusa.com/houston-awarded-43-million-grant-for-gulfton-and-kashmere-gardens-communities",
      "sustainability.rice.edu/rice-urbanists",
      "www.bakerinstitute.org/research/safer-more-walkable-houston-starts-here",
      "www.buildhoustonforward.org/src/aboutus.html",
      "www.charitynavigator.org/ein/760156565",
      "www.engagehouston.org/construction",
      "www.engagehouston.org/houston-public-works-initiatives",
      "www.gudsy.org/nonprofits/gulfton-area-neighborhood-organization-inc-houston-tx",
      "www.guidestar.org/profile/76-0156565",
      "www.houstonpublicmedia.org/articles/news/transportation/2024/11/08/505534/houston-metro-receives-1-2-million-in-federal-funding-for-gulfton-corridor-project",
      "www.houstonpublicworks.org/",
      "www.houstonpublicworks.org/capital-projects",
      "www.houstonpublicworks.org/find-out-about-project",
      "www.houstonpublicworks.org/houston-awarded-43-million-grant-for-gulfton-and-kashmere-gardens-communities",
      "www.houstonpublicworks.org/office-business-opportunity",
      "www.houstonpublicworks.org/project-delivery",
      "www.houstonpublicworks.org/project-development",
      "www.houstontx.gov/ispeakhouston/dlap/Housing.pdf",
      "www.letstalkhouston.org/gulfton",
      "www.niche.com/places-to-live/n/gulfton-houston-tx/residents",
      "www.ridemetro.org/newsletters/metro-connections/2024/october/METRO-Awarded-1-2-million-in-Funding-for-Gulfton-Revitalization-Project",
      "www.themoodmeter.com/top-10-languages-spoken-in-houston-today",
      "www.yellowpages.com/houston-tx/mip/gulfton-area-neighborhood-organization-1504757"
    ],
    "model": "claude-sonnet-4-6",
    "ms": 67860,
    "capturedOn": "2026-08-11"
  },
  {
    "sampleId": "hisd-takeover",
    "mode": "idea",
    "suggestions": [
      {
        "category": "affected",
        "who_or_what": "Families and students from the 12 closing campuses — particularly those in Pleasantville and other predominantly Black and Latino neighborhoods",
        "why_needed": "The draft names the closures as a key fact but lacks any voice from the families most directly displaced; the story needs parents who experienced the school-closure process, not just officials describing it.",
        "url": "https://www.khou.com/article/news/local/hisd-campuses-closing-last-day/285-816b1140-bfe6-4bc0-937d-510ba22d4720",
        "source_title": "'It's just sad' | Last bell rings for 12 Houston ISD campuses as students, parents say goodbye",
        "why_good": "KHOU documented a 'final bell walkout' at Port Houston Elementary, showing organized parent communities who spoke publicly and are reachable through the school's neighborhood networks."
      },
      {
        "category": "affected",
        "who_or_what": "Immigrant and refugee families formerly served by Las Americas Newcomer School",
        "why_needed": "HISD has lost nearly 4,000 immigrant students in a single year and shuttered its dedicated newcomer campus — a population invisible in any campus-rating metric, but whose disappearance from the district is a major unreported consequence of the takeover.",
        "url": "https://www.yahoo.com/news/articles/houston-isd-close-12-schools-024434301.html",
        "source_title": "Houston ISD to close 12 schools starting in fall 2026, Superintendent Miles says",
        "why_good": "Interfaith Ministries for Greater Houston runs refugee resettlement services and has historically referred families to Las Americas, giving them direct knowledge of what happened to this student population."
      },
      {
        "category": "affected",
        "who_or_what": "Houston ISD teachers who left the district during the takeover, reachable through the Houston Federation of Teachers",
        "why_needed": "The story claims the takeover changed conditions for teachers, but without former teachers on the record, the 32% turnover rate is a number without a human story explaining what drove it.",
        "url": "https://www.texasaft.org/government/tea/tea-extends-houston-isd-takeover-through-2027-sparking-outrage-from-educators/",
        "source_title": "Texas AFT: TEA Extends Houston ISD Takeover Through 2027, Sparking Outrage from Educators",
        "why_good": "Texas AFT and the Houston Federation of Teachers have been the primary organized voice for departing educators and have media contacts who can connect reporters to former HISD teachers."
      },
      {
        "category": "opposing",
        "who_or_what": "Scholars Strategy Network researchers who analyzed school-by-school STAAR data showing widening gaps for economically disadvantaged students",
        "why_needed": "The strongest opposing case is not a political objection but a data-driven one: district-level score gains may mask growing inequality within schools — a claim the draft does not yet have a source to evaluate.",
        "url": "https://scholars.org/contribution/protecting-texas-students-flawed-state",
        "source_title": "Protecting Texas Students from Flawed State Takeover Policies | Scholars Strategy Network",
        "why_good": "The Scholars Strategy Network piece is an independent policy analysis showing that economically disadvantaged students struggled more in 2024, especially in historically higher-performing schools — a direct complication of the district's headline gains narrative."
      },
      {
        "category": "opposing",
        "who_or_what": "Community Voices for Public Education (co-founded by Ruth Kravetz), cited in ABC13 coverage as a public education advocacy group opposing the extension",
        "why_needed": "The draft needs an organized community opposition voice that can speak to the democratic-accountability argument — that the takeover removed elected governance — separate from the union critique.",
        "url": "https://abc13.com/post/texas-education-agency-announces-extension-houston-isd-takeover-june-2027-comprehensive-evaluation/16633530/",
        "source_title": "Texas Education Agency announces extension of Houston ISD takeover until June 2027 after 'comprehensive evaluation'",
        "why_good": "Ruth Kravetz was quoted by ABC13 reacting directly to the 2025 takeover extension, making this organization an on-record, Houston-based group with standing to articulate the governance critique."
      },
      {
        "category": "data",
        "who_or_what": "University of Houston Institute for Education Policy Research and Evaluation — January 2026 report on enrollment, teacher certification, and workforce shifts under the takeover",
        "why_needed": "The draft's claim that 'things have changed for teachers' needs to be grounded in verifiable data; this UH report provides the pre/post numbers on uncertified teachers, first-year teacher share, and enrollment decline that the story's framing depends on.",
        "url": "https://www.houstonpublicmedia.org/articles/education/2026/01/15/540871/university-of-houston-report-shows-major-enrollment-decline-workforce-shifts-under-houston-isd-takeover/",
        "source_title": "Houston ISD has seen sharper enrollment decline, workforce shifts under state takeover, UH report shows – Houston Public Media",
        "why_good": "Authored by Toni Templeton, Blake Heller, and Willa Friedman — academic researchers at a Houston institution with no stated stake in the outcome — and published in January 2026, making it the most current independent analysis available."
      },
      {
        "category": "data",
        "who_or_what": "TEA's own campus-level A-F accountability data and STAAR school-by-school results, publicly searchable via the TEA website",
        "why_needed": "The district's headline gains are contested; the reporter needs campus-by-campus STAAR data to independently verify whether improvements are evenly distributed or concentrated in magnet/non-NES schools — a claim no official source will volunteer.",
        "url": "https://www.thecentersquare.com/texas/article_9b2f0c93-9d4e-4c8f-bd99-4d45cdab1040.html",
        "source_title": "Outcomes at Houston schools improve after state takeover | Texas | thecentersquare.com",
        "why_good": "TEA publishes accountability ratings and STAAR disaggregated data as public records, allowing independent verification of the district's claimed improvement without relying on HISD or TEA press releases."
      },
      {
        "category": "data",
        "who_or_what": "TEA's special education compliance records for HISD, flagged in Commissioner Morath's own extension conditions",
        "why_needed": "Morath's extension letter listed special education compliance as an unmet requirement — meaning there are federal and state compliance records that could show whether students with disabilities were harmed during the takeover, a claim unaddressed in the story idea.",
        "url": "https://www.the74million.org/article/houston-trumpets-historic-gains-from-schools-takeover-but-doubters-remain/",
        "source_title": "Houston Trumpets 'Historic' Gains from Schools Takeover, But Doubters Remain",
        "why_good": "These are FOIA-able or publicly posted state compliance documents; The 74 Million separately flagged that alternative assessment usage grew 39% — more than twice the growth in students identified as having a disability — suggesting checkable irregularities."
      },
      {
        "category": "experts",
        "who_or_what": "Toni Templeton, Blake Heller, and Willa Friedman — education policy researchers at the UH Institute for Education Policy Research and Evaluation",
        "why_needed": "The story needs an expert who has already done the quantitative pre/post analysis of HISD's teacher workforce and enrollment and can explain what the numbers do and don't prove about student outcomes.",
        "url": "https://www.houstonpublicmedia.org/articles/education/2026/01/15/540871/university-of-houston-report-shows-major-enrollment-decline-workforce-shifts-under-houston-isd-takeover/",
        "source_title": "Houston ISD has seen sharper enrollment decline, workforce shifts under state takeover, UH report shows – Houston Public Media",
        "why_good": "They are Houston-based, published the most comprehensive independent workforce analysis of the takeover in January 2026, and have no stated financial or political stake in the takeover's outcome."
      },
      {
        "category": "experts",
        "who_or_what": "Kinder Institute for Urban Research at Rice University — Houston Education Research Consortium",
        "why_needed": "The story needs an expert who can contextualize HISD's trajectory against peer urban districts and assess whether STAAR gains are attributable to the takeover's specific interventions or other factors like demographic change.",
        "url": "https://kinder.rice.edu/urbanedge/houston-newcomer-students",
        "source_title": "Who are Houston's newcomer students, and how can schools help them succeed? | Kinder Institute for Urban Research | Rice University",
        "why_good": "The Kinder Institute has conducted independent longitudinal research on HISD schools — including newcomer campuses — and is Houston-based with a public-facing research agenda and no operational stake in the takeover."
      },
      {
        "category": "experts",
        "who_or_what": "Researchers at the Brookings Institution who have studied state school-district takeover outcomes nationally",
        "why_needed": "The draft frames this as a local story, but the Scholars Strategy Network piece notes that Brookings research shows takeovers 'do not always improve student academic performance' — a national comparative baseline the story needs to evaluate HISD's claims.",
        "url": "https://scholars.org/contribution/protecting-texas-students-flawed-state",
        "source_title": "Protecting Texas Students from Flawed State Takeover Policies | Scholars Strategy Network",
        "why_good": "Brookings is an independent research institution with published peer-reviewed work on state takeovers, giving the reporter an expert with no Texas political stake who can place HISD in national context."
      },
      {
        "category": "designed-out",
        "who_or_what": "Spanish-speaking and multilingual families in Gulfton, Sharpstown, and Alief whose children attended the closed campuses or Las Americas — and whose community input at board meetings was delivered in languages other than English",
        "why_needed": "The board closure vote was unanimous and held after public comment, but the story idea does not address whether non-English-speaking parents had meaningful access to the process; the 12 closing schools all had predominantly Black or brown student bodies, and the district's Spanish-dominant communities are structurally underrepresented in English-language coverage.",
        "url": "https://kinder.rice.edu/research/newcomer-schools-houston-isd-examining-student-enrollment-and-outcomes-briefs-1-6",
        "source_title": "Newcomer Schools in Houston ISD: Examining Student Enrollment and Outcomes | Kinder Institute for Urban Research",
        "why_good": "The Kinder Institute's research on newcomer enrollment shows the Gulfton and Sharpstown areas have high concentrations of immigrant residents directly affected by both the Las Americas closure and the broader campus closures — making Spanish-language outreach to these specific ZIP codes essential, not optional."
      }
    ],
    "droppedCount": 0,
    "searchesRun": 5,
    "searchUrlsNormalized": [
      "abc13.com/post/texas-education-agency-announces-extension-houston-isd-takeover-june-2027-comprehensive-evaluation/16633530",
      "abc13.com/post/what-hisd-schools-are-closing-houston-independent-school-district-moves-forward-plan-close-12-campuses/18655336",
      "communityimpact.com/houston/bellaire-meyerland-west-university/education/2025/06/03/houston-isd-state-takeover-extended-by-2-years-tea-commissioner-confirms",
      "en.wikipedia.org/wiki/Houston_Independent_School_District_takeover",
      "en.wikipedia.org/wiki/Las_Am%C3%A9ricas_Newcomer_School",
      "hisdnow.houstonisd.org/p/~board/district-news/post/hisd-moves-forward-with-school-closures-to-address-underutilization-and-sustain-progres",
      "kinder.rice.edu/research/newcomer-schools-houston-isd-examining-student-enrollment-and-outcomes-briefs-1-6",
      "kinder.rice.edu/urbanedge/houston-newcomer-students",
      "lege-lookup.texastribune.org/districts/houston-isd/las-americas",
      "midwesterncitizen.substack.com/p/houstons-takeover-experiment",
      "scholars.org/contribution/protecting-texas-students-flawed-state",
      "sentinelksmo.org/houston-new-education-system",
      "texasscorecard.com/local/houston-isd-ties-deportation-crackdowns-to-school-closure",
      "www.click2houston.com/news/local/2025/06/02/texas-education-agency-extends-hisds-takeover-through-2027",
      "www.click2houston.com/news/local/2026/02/27/info-hisd-reveals-details-for-school-reassignments-transportation-plans-after-voting-to-close-12-houston-schools",
      "www.fox26houston.com/news/houston-isd-considers-closing-12-schools",
      "www.fox26houston.com/news/tea-extends-takeover-houston-isd-until-2027",
      "www.houstonpress.com/news/its-closing-time-for-12-schools-in-houston-isd",
      "www.houstonpublicmedia.org/articles/education/2026/01/15/540871/university-of-houston-report-shows-major-enrollment-decline-workforce-shifts-under-houston-isd-takeover",
      "www.houstonpublicmedia.org/articles/news/education-news/hisd/2025/06/02/522802/houston-isd-takeover-by-state-will-continue-through-2027-tea-announces",
      "www.k12dive.com/news/texas-education-agency-mike-morath-miles-extends-houston-isd--takeover-2027/749600",
      "www.khou.com/article/news/education/houston-isd-takeover-tea-extension-2027/285-cb9ac1c5-97c0-4cbb-b4cb-86b6bdf7f0ae",
      "www.khou.com/article/news/local/hisd-campuses-closing-last-day/285-816b1140-bfe6-4bc0-937d-510ba22d4720",
      "www.pbs.org/newshour/classroom/daily-videos/2015/11/providing-support-and-education-for-refugee-children",
      "www.pbs.org/newshour/show/for-young-newcomers-school-offers-a-stepping-stone-to-life-in-america",
      "www.pressreader.com/usa/houston-chronicle-sunday/20221113/281582359613712",
      "www.texasaft.org/government/tea/tea-extends-houston-isd-takeover-through-2027-sparking-outrage-from-educators",
      "www.texasaft.org/post/texas-schools-are-losing-students-and-teachers-the-numbers-are-starting-to-catch-up",
      "www.texasobserver.org/state-school-district-takeovers-results",
      "www.texasstandard.org/stories/hisd-state-takeover-extended-2027",
      "www.texastribune.org/2023/03/15/houston-isd-tea-takeover-families",
      "www.texastribune.org/2025/06/02/texas-houston-isd-takeover-3",
      "www.the74million.org/article/houston-trumpets-historic-gains-from-schools-takeover-but-doubters-remain",
      "www.thecentersquare.com/texas/article_9b2f0c93-9d4e-4c8f-bd99-4d45cdab1040.html",
      "www.yahoo.com/news/articles/houston-isd-close-12-schools-024434301.html",
      "www.yahoo.com/news/texas-education-agency-extends-houston-123000818.html",
      "www.yahoo.com/news/texas-education-agency-extends-houston-153606267.html"
    ],
    "model": "claude-sonnet-4-6",
    "ms": 70017,
    "capturedOn": "2026-08-11"
  },
];
