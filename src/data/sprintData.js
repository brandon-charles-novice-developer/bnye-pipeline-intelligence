// Sprint cycle data — mirrors real autonomous sprint system

const sprintData = {
  today: {
    date: '2026-04-11',
    phase: 'execute',
    huntResults: { found: 23, scored: 18, qualified: 6, rejected: 12 },
    packagesBuilt: { total: 8, coverLetters: 8, inMails: 8, hmResearch: 5 },
    executed: { applied: 5, skipped: 2, carried: 1 },
    learningSignals: { updated: 3, newRules: 1, weightAdjustments: 2 },
  },

  scoringCriteria: [
    { name: 'Track Match', weight: 0.20, description: 'AdTech/MarTech vs Platform/AI alignment' },
    { name: 'Role Fit', weight: 0.18, description: 'SE/Technical Sales vs pure AE match' },
    { name: 'Comp Band', weight: 0.15, description: '$200K-$350K OTE range alignment' },
    { name: 'Location', weight: 0.12, description: 'NYC/Remote preference match' },
    { name: 'Company Stage', weight: 0.10, description: 'Growth-stage to enterprise preference' },
    { name: 'Tech Depth', weight: 0.08, description: 'Technical complexity of role' },
    { name: 'Agency Overlap', weight: 0.07, description: 'Buy-side or agency-facing components' },
    { name: 'Network Proximity', weight: 0.05, description: 'Warm connection availability' },
    { name: 'Posting Freshness', weight: 0.05, description: 'Days since job posted' },
  ],

  recentSprints: [
    { date: '2026-04-11', applied: 5, found: 23, topScore: 9.2, bottomScore: 5.8 },
    { date: '2026-04-10', applied: 3, found: 18, topScore: 8.7, bottomScore: 6.1 },
    { date: '2026-04-09', applied: 3, found: 15, topScore: 8.5, bottomScore: 5.5 },
    { date: '2026-04-08', applied: 7, found: 28, topScore: 9.0, bottomScore: 4.8 },
    { date: '2026-04-07', applied: 10, found: 35, topScore: 8.8, bottomScore: 5.2 },
    { date: '2026-04-06', applied: 0, found: 0, topScore: 0, bottomScore: 0 },
    { date: '2026-04-05', applied: 4, found: 20, topScore: 8.3, bottomScore: 5.9 },
  ],

  learningEngine: {
    totalRules: 42,
    lastUpdated: '2026-04-11T17:00:00Z',
    recentAdjustments: [
      { criterion: 'Role Fit', oldWeight: 0.15, newWeight: 0.18, reason: 'SE/Solutions roles converting at 3x rate of pure AE' },
      { criterion: 'Track Match', oldWeight: 0.22, newWeight: 0.20, reason: 'Platform/AI with transferability signals now viable' },
      { criterion: 'Tech Depth', oldWeight: 0.06, newWeight: 0.08, reason: 'Technical roles showing higher interview conversion' },
      { criterion: 'Agency Overlap', oldWeight: 0.09, newWeight: 0.07, reason: 'Agency-facing not differentiating at current volume' },
    ],
  },
}

export default sprintData
