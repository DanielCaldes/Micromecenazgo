import { loadAndRenderRewards } from './rewards.js';

//Incluimos la información reducida solo como resumen
loadAndRenderRewards('./data/rewards.json', { includeImage: false, includeExtraInfo: false });