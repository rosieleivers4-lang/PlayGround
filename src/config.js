// East Midlands, UK — a stylised, compressed 3D map.
// World units are metres. x = east, z = south.

export const WORLD = {
  minX: -1750,
  maxX: 1750,
  minZ: -1400,
  maxZ: 1400,
  groundY: 0,
};

export const TOWNS = {
  nottingham: { name: 'Nottingham', x: -420, z: -60, radius: 165, limit: 30, landmark: 'castle' },
  derby: { name: 'Derby', x: -980, z: 80, radius: 150, limit: 30, landmark: 'cathedral' },
  leicester: { name: 'Leicester', x: 250, z: 720, radius: 165, limit: 30, landmark: 'clock' },
  loughborough: { name: 'Loughborough', x: -230, z: 370, radius: 115, limit: 30, landmark: 'spire' },
  mansfield: { name: 'Mansfield', x: -520, z: -620, radius: 125, limit: 30, landmark: 'spire' },
  chesterfield: { name: 'Chesterfield', x: -930, z: -600, radius: 125, limit: 30, landmark: 'crooked' },
  newark: { name: 'Newark', x: 520, z: -260, radius: 120, limit: 30, landmark: 'castle' },
  lincoln: { name: 'Lincoln', x: 1030, z: -330, radius: 145, limit: 30, landmark: 'cathedral' },
  grantham: { name: 'Grantham', x: 760, z: 880, radius: 115, limit: 30, landmark: 'spire' },
  melton: { name: 'Melton Mowbray', x: 480, z: 560, radius: 105, limit: 30, landmark: 'market' },
  retford: { name: 'Retford', x: 420, z: -820, radius: 95, limit: 30, landmark: 'market' },
  worksop: { name: 'Worksop', x: -180, z: -800, radius: 100, limit: 30, landmark: 'spire' },
};

export const NODES = {
  nott: [-420, -60],
  derb: [-980, 80],
  leic: [250, 720],
  lough: [-230, 370],
  mans: [-520, -620],
  ches: [-930, -600],
  newark: [520, -260],
  linc: [1030, -330],
  gran: [760, 880],
  melton: [480, 560],
  retford: [420, -820],
  worksop: [-180, -800],
  airport: [-650, 330],

  a52_w: [-690, 20],
  a52_e1: [-150, 40],
  a52_e2: [120, 180],
  a52_e3: [380, 430],
  a52_e4: [620, 660],
  a6_1: [-750, 250],
  a6_2: [0, 520],
  a60_1: [-330, 160],
  a50_1: [-800, 350],
  a50_2: [-600, 620],
  a50_3: [-250, 740],
  a46_1: [330, 470],
  a46_2: [380, 240],
  a46_3: [430, 0],
  a46_4: [680, -320],
  a46_5: [850, -350],
  a1_1: [650, 200],
  a1_2: [700, 520],
  a1_3: [820, 1250],
  a617_1: [-350, -450],
  a617_2: [-200, -350],
  a38_1: [-700, -400],
  a38_2: [-880, -150],
  a61_1: [-700, -300],
  a57_1: [100, -880],
  a606_1: [0, 200],
  a606_2: [300, 450],
  a453_1: [-520, 150],
  m1_1: [-700, -1200],
  m1_2: [-720, -900],
  m1_3: [-660, -620],
  m1_4: [-620, -400],
  m1_5: [-580, -180],
  m1_6: [-520, 80],
  m1_7: [-420, 320],
  m1_8: [-300, 540],
  m1_9: [-150, 780],
  m1_10: [0, 1020],
  m1_11: [120, 1280],
};

// a/b are node ids. kind controls width and default speed limit.
export const EDGES = [
  // M1 — Chesterfield / Nottingham / Loughborough / Leicester corridor
  ['m1_1', 'm1_2', 'motorway', 70, 'M1'],
  ['m1_2', 'm1_3', 'motorway', 70, 'M1'],
  ['m1_3', 'm1_4', 'motorway', 70, 'M1'],
  ['m1_4', 'm1_5', 'motorway', 70, 'M1'],
  ['m1_5', 'm1_6', 'motorway', 70, 'M1'],
  ['m1_6', 'm1_7', 'motorway', 70, 'M1'],
  ['m1_7', 'm1_8', 'motorway', 70, 'M1'],
  ['m1_8', 'm1_9', 'motorway', 70, 'M1'],
  ['m1_9', 'm1_10', 'motorway', 70, 'M1'],
  ['m1_10', 'm1_11', 'motorway', 70, 'M1'],

  // A52 — Derby / Nottingham / Grantham
  ['nott', 'a52_w', 'aroad', 60, 'A52'],
  ['a52_w', 'derb', 'aroad', 60, 'A52'],
  ['a52_w', 'm1_6', 'aroad', 60, 'A52'],
  ['nott', 'a52_e1', 'aroad', 60, 'A52'],
  ['a52_e1', 'a52_e2', 'aroad', 60, 'A52'],
  ['a52_e2', 'a52_e3', 'aroad', 60, 'A52'],
  ['a52_e3', 'a52_e4', 'aroad', 60, 'A52'],
  ['a52_e4', 'gran', 'aroad', 60, 'A52'],

  // A6 / A60 — Derby, Loughborough, Leicester, Nottingham
  ['derb', 'a6_1', 'aroad', 60, 'A6'],
  ['a6_1', 'lough', 'aroad', 60, 'A6'],
  ['lough', 'a6_2', 'aroad', 60, 'A6'],
  ['a6_2', 'leic', 'aroad', 60, 'A6'],
  ['nott', 'a60_1', 'aroad', 50, 'A60'],
  ['a60_1', 'lough', 'aroad', 50, 'A60'],
  ['a6_1', 'airport', 'aroad', 50, 'A6'],

  // A50 — Derby to Leicester
  ['derb', 'a50_1', 'aroad', 60, 'A50'],
  ['a50_1', 'a50_2', 'aroad', 60, 'A50'],
  ['a50_2', 'a50_3', 'aroad', 60, 'A50'],
  ['a50_3', 'leic', 'aroad', 60, 'A50'],

  // A46 — Leicester / Newark / Lincoln
  ['leic', 'a46_1', 'aroad', 60, 'A46'],
  ['a46_1', 'a46_2', 'aroad', 60, 'A46'],
  ['a46_2', 'a46_3', 'aroad', 60, 'A46'],
  ['a46_3', 'newark', 'aroad', 60, 'A46'],
  ['newark', 'a46_4', 'aroad', 60, 'A46'],
  ['a46_4', 'a46_5', 'aroad', 60, 'A46'],
  ['a46_5', 'linc', 'aroad', 60, 'A46'],

  // A1 — Retford / Newark / Grantham
  ['retford', 'newark', 'trunk', 70, 'A1'],
  ['newark', 'a1_1', 'trunk', 70, 'A1'],
  ['a1_1', 'a1_2', 'trunk', 70, 'A1'],
  ['a1_2', 'gran', 'trunk', 70, 'A1'],
  ['gran', 'a1_3', 'trunk', 70, 'A1'],

  // Cross-country A-roads
  ['mans', 'a617_1', 'aroad', 60, 'A617'],
  ['a617_1', 'a617_2', 'aroad', 60, 'A617'],
  ['a617_2', 'newark', 'aroad', 60, 'A617'],
  ['mans', 'a38_1', 'aroad', 60, 'A38'],
  ['a38_1', 'a38_2', 'aroad', 60, 'A38'],
  ['a38_2', 'derb', 'aroad', 60, 'A38'],
  ['derb', 'a61_1', 'aroad', 60, 'A61'],
  ['a61_1', 'ches', 'aroad', 60, 'A61'],
  ['worksop', 'mans', 'aroad', 50, 'A57'],
  ['worksop', 'a57_1', 'aroad', 60, 'A57'],
  ['a57_1', 'retford', 'aroad', 60, 'A57'],
  ['leic', 'melton', 'aroad', 60, 'A607'],
  ['melton', 'gran', 'aroad', 60, 'A607'],
  ['nott', 'a606_1', 'aroad', 60, 'A606'],
  ['a606_1', 'a606_2', 'aroad', 60, 'A606'],
  ['a606_2', 'melton', 'aroad', 60, 'A606'],
  ['nott', 'a453_1', 'aroad', 50, 'A453'],
  ['a453_1', 'airport', 'aroad', 50, 'A453'],
  ['airport', 'm1_7', 'aroad', 60, 'A453'],

  // M1 / town connectors
  ['ches', 'm1_3', 'aroad', 60, 'A632'],
  ['lough', 'm1_7', 'aroad', 60, 'A512'],
  ['leic', 'm1_9', 'aroad', 60, 'A512'],
  ['mans', 'm1_4', 'aroad', 60, 'A619'],
  ['worksop', 'm1_2', 'aroad', 60, 'A619'],
];

export const KIND = {
  motorway: { width: 18, limit: 70, lane: 4.1, traffic: 0.95 },
  trunk: { width: 15, limit: 70, lane: 3.5, traffic: 0.9 },
  aroad: { width: 11.5, limit: 60, lane: 2.7, traffic: 0.82 },
  town: { width: 8, limit: 30, lane: 0, traffic: 0 },
};

// Stations are positioned relative to a road. t is 0..1 along that edge,
// side +1 / -1 picks the left or right verge.
export const STATIONS = [
  { name: 'TRENT FUEL', edge: ['nott', 'a52_e1'], t: 0.72, side: 1, town: 'Nottingham' },
  { name: 'DERWENT FUEL', edge: ['derb', 'a6_1'], t: 0.55, side: -1, town: 'Derby' },
  { name: 'SOAR FUEL', edge: ['leic', 'a46_1'], t: 0.48, side: 1, town: 'Leicester' },
  { name: 'TRENT NORTH', edge: ['newark', 'a1_1'], t: 0.42, side: -1, town: 'Newark' },
  { name: 'SHERWOOD FUEL', edge: ['mans', 'a617_1'], t: 0.5, side: 1, town: 'Mansfield' },
  { name: 'A1 CARROT STOP', edge: ['gran', 'a1_2'], t: 0.4, side: -1, town: 'Grantham' },
  { name: 'WOLDS FUEL', edge: ['melton', 'gran'], t: 0.55, side: 1, town: 'Melton Mowbray' },
];

export const PLAYER_START = {
  edge: ['nott', 'a52_e1'],
  t: 0.34,
  laneSide: 1,
};

export const CAMERA = {
  distance: 7.4,
  height: 3.15,
  lookAhead: 7.5,
  fov: 62,
  speedFov: 9,
};

export const RULES = {
  maxLife: 100,
  startLife: 100,
  maxFuel: 100,
  startFuel: 72,
  speedingGrace: 6, // mph over the limit before the police care
  speedingAlarm: 1.8, // seconds over the limit before wanted level rises
  calmTime: 7.5, // seconds obeying the limit before losing a wanted star
  carrotLife: 4,
  carrotFuelValue: 18,
  emergencyCarrots: 5,
  emergencyFuel: 22,
  refuelMin: 3,
};
