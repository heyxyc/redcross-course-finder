export interface Course {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  duration: string;
  hours: number;
  validity: string;
  cprComponent: string;
  targetAudience: string;
  ageGroups: string;
  curriculum: string[];
  prerequisites: string;
  minEducation: string;
  bestFor: string;
  practicalAssessment: boolean;
  type: 'individual' | 'group' | 'both';
  goal: 'compliance' | 'pediatric' | 'sports' | 'cardiac' | 'basic' | 'public' | 'pet';
  audienceGroup: 'workplace' | 'educator' | 'coach' | 'nurse' | 'general' | 'pet-owners';
  image: string;
  fullFee: string;
  refresherFee?: string;
  refresherDuration?: string;
  languages?: string;
  writtenAssessmentDesc?: string;
  practicalAssessmentDesc?: string;
  ratio?: string;
}

export const COURSES_DATA: Course[] = [
  {
    id: "sfa",
    code: "SFAC",
    name: "Standard First Aid with AED (TGS-2021010208)",
    subtitle: "SFA Certification & Refresher (RSFAC)",
    duration: "16 Hours",
    refresherDuration: "12 Hours",
    hours: 16,
    validity: "2 Years",
    cprComponent: "Adult Hands-Only CPR + AED",
    targetAudience: "Community members; available in English & Mandarin.",
    ageGroups: "Adults only",
    languages: "English & Mandarin",
    fullFee: "$185.00",
    refresherFee: "$160.00",
    ratio: "Lecture 1:16; Practical 1:4 (max 4 facilitators per class)",
    writtenAssessmentDesc: "30 MCQs (80% passing mark / 24 correct)",
    practicalAssessmentDesc: "Includes CPR(HO)+AED (with QCPR), Bandaging (1x Bleeding, 1x Fracture), Tourniquet application, Conscious/Unconscious FBAO, EpiPen, and MDI with Spacer administration",
    curriculum: [
      "Essentials of First Aid: Definition, Aims, Roles/Limitations, Universal Precautions, First Aid Kit Contents/Maintenance, Primary Survey (DRSABC), Secondary Survey, Record/Report, SCDF myResponder App",
      "Unconscious Casualty (Non-Cardiac Arrest): Head/Spinal Injuries, Heat Disorders, Fits, Fainting, Low Blood Sugar, Stroke, Recovery Position",
      "Respiratory Problems: Adult Foreign Body Airway Obstruction (FBAO), Asthma (MDI & Spacers), Hyperventilation, Fumes Inhalation, Allergic Reaction (EpiPen)",
      "Shock, Bleeding & Wounds: Management of Shock/Bleeding, Wounds (Bruises, Laceration, Incision, Abrasion, Amputation, Bites & Stings), Bandaging (Crepe/Roller, Scalp, Eyelid, Arms/Legs, Torso, Tourniquet)",
      "Musculoskeletal Injuries: Fractures/Dislocations (Skull, Jaw, Collarbone, Shoulder, Rib, Arms, Legs), Soft Tissue Injuries, Immobilization/Bandaging (Arm, Wrist, Leg, Ankle Figure of Eight)",
      "Burn Injuries: Depth/Severity, Classification, and Treatment (Scalding, Radiation/Sunburn, Chemical, Electrical, Thermal)",
      "Other First Aid Knowledge: Eye Injuries (Chemical, Foreign Bodies, Blunt-force), Epistaxis (Nose Bleeding), Poisoning, Transportation of Casualty (One/Two Rescuer carry, Improvised methods)",
      "CPR(Hands-Only) + AED: Theory and Practice"
    ],
    prerequisites: "General Prerequisites (P1-P5):\n• P1: Prior reading of the SRFAC Standard First Aid Provider Manual.\n• P2: Recommended attainment of Secondary Two education or ESS Workplace Literacy and Numeracy Level 5.\n• P3: Physically fit to render help during emergencies.\n• P4: Medically fit with no pre-existing knee, spinal, or joint injuries.\n• P5: Pregnant participants are discouraged from CPR practice and should defer training until at least 6 weeks post-delivery.\n\nRefresher Requirements (RP1-RP3):\n• RP1: Prior reading of the SRFAC manual.\n• RP2: Possession of a valid (unexpired) SRFAC-accredited SFA Provider Certification.\n• RP3: Registration is recommended three months before expiry.",
    minEducation: "Secondary Two or ESS Level 5 recommended",
    bestFor: "Coaches, teachers, sports instructors, community responders Require SFA points (NROC)",
    practicalAssessment: true,
    type: "both",
    goal: "sports",
    audienceGroup: "coach",
    image: "https://redcross.sg/images/srca/ad%20landing%20page%20media/3_sfa.png"
  },
  {
    id: "bfa",
    code: "BFA+AED",
    name: "Basic First Aid + AED (CERT First Aider with CPR+AED) TGS-2022015644",
    subtitle: "BFA + AED Certification",
    duration: "8 Hours",
    hours: 8,
    validity: "2 Years",
    cprComponent: "Adult CPR + AED",
    targetAudience: "CERT, organizations, schools, families, individuals; available in English & Mandarin.",
    ageGroups: "Adults only",
    languages: "English & Mandarin",
    fullFee: "$220.00",
    writtenAssessmentDesc: "20 MCQs total (80% passing mark, min 8/10 for CPR+AED and 8/10 for Basic First Aid)",
    practicalAssessmentDesc: "CPR+AED and BFA skills (Fainting, Forehead/Forearm Bleeding, Sprained Wrist, Forearm Fracture, Choking)",
    curriculum: [
      "Module 1 & 2 (4 Hours): CPR Theory/Practical (Adult 1-man) and AED (Features, safety, and troubleshooting)",
      "Module 3: Intro to First Aid & First Aid Kit",
      "Module 4: Common Medical Conditions: Fainting, Heat Injuries, Burns, Bleeding, Sprains, Fractures & Dislocations, Breathing Emergencies & Stroke",
      "Module 5: Improvised Carrying Techniques: Dragging, Cradle Carry, Pick-A-Back, human stretcher, rolled blankets, materials with 2 poles stretcher"
    ],
    prerequisites: "• Literacy: Recommended Secondary Two or ESS Level 5.\n• Fitness: Physically and medically fit. Those with bronchial asthma, upper respiratory tract infections, or orthopedic problems (e.g., slipped disc, spinal, or joint injuries) should consult a doctor.",
    minEducation: "Recommended Secondary Two or ESS Level 5",
    bestFor: "Workplaces, CERT teams, schools, and families desiring first-line life-saving competence",
    practicalAssessment: true,
    type: "both",
    goal: "basic",
    audienceGroup: "workplace",
    image: "https://redcross.sg/images/srca/ad%20landing%20page%20media/cert_first.png"
  },
  {
    id: "ofac",
    code: "OFAC",
    name: "Occupational First Aid Course (OFAC) TGS-2020500028",
    subtitle: "OFAC Certification & Refresher (ROFAC)",
    duration: "23.5 Hours",
    refresherDuration: "17.5 Hours",
    hours: 23.5,
    validity: "2 Years",
    cprComponent: "CPR(HO) + AED",
    targetAudience: "Designated Workplace Occupational First Aiders; available in English only.",
    ageGroups: "Adults only",
    languages: "English only",
    fullFee: "$320.00",
    refresherFee: "$280.00",
    ratio: "Lecture 1:16; Practical 1:4",
    writtenAssessmentDesc: "40 MCQs total (Candidates must pass Paper 1 [70% / 14 correct] and Paper 2 [80% / 16 correct])",
    practicalAssessmentDesc: "CPR(HO)+AED (with QCPR), Bandaging (Head, Trunk, Limbs), and Oral Questioning",
    curriculum: [
      "Modules 1–5 (Principles/Practices, Medical Emergency Management (DRSABC), Wounds/Bleeding/Shock, Fractures/Soft Tissue, Handling/Transportation)",
      "Modules 6–10 (Occupational Eye Injuries, Burn Injuries, Breathing Difficulties (Heimlich Maneuver), The Unconscious Patient (Heat disorders, Diabetic emergencies), WSH Act Requirements)",
      "Module 11 (Industrial Toxicology: Routes of chemical entry, SDS importance, hazardous exposure scenarios, preventive measures, and treatment including amyl nitrite ampoules for cyanide rescue)",
      "Module 12 (Safety & Accident Prevention: WSH Act provisions, safe work measures, and the role of the first aider in accident prevention)",
      "Module 13 (CPR & AED: Chain of survival, resuscitation sequence, AED troubleshooting)"
    ],
    prerequisites: "• Documentation: Submission of a digital passport-sized photo (.jpeg).\n• Education: Secondary Two or ESS Level 5 (MOM requirement).\n• Fitness: Physically fit; pregnant participants must defer practice until 6 weeks post-delivery.",
    minEducation: "Secondary Two or ESS Level 5 (MOM requirement)",
    bestFor: "Designated Workplace Occupational First Aiders, company safety coordinators under WSH Act",
    practicalAssessment: true,
    type: "group",
    goal: "compliance",
    audienceGroup: "workplace",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "bcls",
    code: "BCLS+AED",
    name: "Basic Cardiac Life Support + AED Provider Course (TGS-2022015359)",
    subtitle: "BCLS & AED Certification",
    duration: "9 Hours",
    hours: 9,
    validity: "2 Years",
    cprComponent: "Adult & Infant CPR and choking, AED (Adult & Infant 1 & 2-Man)",
    targetAudience: "Individuals managing adult and infant unconscious casualties.",
    ageGroups: "Adults & Infants",
    languages: "English & Mandarin",
    fullFee: "$140.00",
    writtenAssessmentDesc: "Theory evaluation on cardiac guidelines and safety procedures",
    practicalAssessmentDesc: "Adult CPR, Infant CPR (1 & 2-man), AED skills, and Choking relief for Adult & Infant",
    curriculum: [
      "Duties and responsibilities of a BCLS+AED Provider",
      "Effective CPR on adult unconscious casualties",
      "Effective AED use on adult unconscious casualties",
      "Relief of Foreign Body Airway Obstruction (FBAO) in conscious/unconscious casualties",
      "Effective CPR on infant unconscious casualties",
      "Infant AED use and resuscitation sequences",
      "Management of general medical emergencies"
    ],
    prerequisites: "General physical readiness. Recommended Secondary Two / ESS Level 5 or clinical foundation.",
    minEducation: "General physical readiness",
    bestFor: "Healthcare staff, clinic nurses, dentists, and childcare roles requiring CPR competency",
    practicalAssessment: true,
    type: "both",
    goal: "cardiac",
    audienceGroup: "nurse",
    image: "https://redcross.sg/images/srca/ad%20landing%20page%20media/2_bcls.png"
  },
  {
    id: "cfa",
    code: "CFAC",
    name: "Child First Aid Course (CFAC) TGS-2020500066",
    subtitle: "ECDA Childcare Compliant Provider Course",
    duration: "20 Hours",
    hours: 20,
    validity: "2 Years",
    cprComponent: "Adult & Infant CPR + AED",
    targetAudience: "Preschools, ECDA-required staff, parents, caregivers.",
    ageGroups: "Adults, Children & Infants",
    languages: "English & Mandarin",
    fullFee: "$220.00",
    refresherFee: "$185.00",
    writtenAssessmentDesc: "Written test focusing on common childhood illnesses and wound management",
    practicalAssessmentDesc: "Paediatric CPR, Airway block release, Infant/child wounds wrap and EpiPen simulated triggers",
    curriculum: [
      "SFA + child-specific care + full BCLS skills",
      "Child medical conditions (asthma, fever, vomiting, diarrhea)",
      "ENT foreign bodies, rashes, fever, adult & infant CPR and unconsciousness care",
      "Legal requirements for childcare centres"
    ],
    prerequisites: "Prior reading of SFA & BCLS manuals required. Secondary Two or ESS Level 5 recommended.",
    minEducation: "Secondary Two or ESS Level 5 recommended",
    bestFor: "Preschools, ECDA-required staff, operators, parents, and infant caregivers",
    practicalAssessment: true,
    type: "both",
    goal: "pediatric",
    audienceGroup: "educator",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cpr_ho",
    code: "CPR(HO)+AED",
    name: "CPR(Hands-Only)+AED Provider",
    subtitle: "Community Hands-Only CPR",
    duration: "4 Hours",
    hours: 4,
    validity: "2 Years",
    cprComponent: "Adult Hands-Only CPR + AED",
    targetAudience: "General public, safety volunteers, home guardians.",
    ageGroups: "Adults only",
    languages: "English & Mandarin",
    fullFee: "$75.00",
    writtenAssessmentDesc: "Simple theory check on cardiac arrest emergency calling steps",
    practicalAssessmentDesc: "Chest compressions execution on manikins and AED pad setup",
    curriculum: [
      "Continuous Hands-Only compressions & basic AED troubleshooting",
      "Activating 995 rescue lines and aligning SCDF responder alerts",
      "Correct execution of high-quality chest compressions"
    ],
    prerequisites: "None. Open to any member of the public.",
    minEducation: "No academic constraint",
    bestFor: "Home caregivers, general public, service staff, and volunteer teams",
    practicalAssessment: true,
    type: "individual",
    goal: "public",
    audienceGroup: "general",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cdbfaw",
    code: "CDBFAW",
    name: "Cats and Dogs Basic First Aid",
    subtitle: "Canine & Domestic Pet First Aid",
    duration: "8 Hours",
    hours: 8,
    validity: "2 Years",
    cprComponent: "Animal CPR analogs",
    targetAudience: "Pet parents, canine groomers, handlers, and rescue champions.",
    ageGroups: "Domestic Pets (Cats & Dogs)",
    languages: "English only",
    fullFee: "$120.00",
    writtenAssessmentDesc: "Basic quiz on canine/feline injury evaluation and poisoning",
    practicalAssessmentDesc: "Simulated muzzle tie-up, paw wrap, and animal choking release actions",
    curriculum: [
      "Pet choking, bandaging animal legs, domestic poisoning hazards",
      "Evaluating pet health indicators (temperature, gums, heart rate)",
      "Animal CPR mock procedures and safety handling guides"
    ],
    prerequisites: "None. Animal lovers welcome.",
    minEducation: "No academic constraint",
    bestFor: "Pet parents, dog trainers, groomers, and rescue workers",
    practicalAssessment: true,
    type: "individual",
    goal: "pet",
    audienceGroup: "pet-owners",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80"
  }
];
