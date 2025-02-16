import { loadAndRenderRewards } from './rewards.js';

//Incluimos la información más detallada con imágenes
loadAndRenderRewards('../data/rewards.json', { includeImage: true, includeExtraInfo: false });