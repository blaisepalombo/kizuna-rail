import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const query = req.query || {};

    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();
    let routes = await getAllRoutes();

    // Apply region filter if provided and not 'all'
    if (query.region && query.region !== 'all') {
        routes = routes.filter(r => r.region.toLowerCase() === String(query.region).toLowerCase());
    }

    // Apply season filter if provided and not 'all'
    if (query.season && query.season !== 'all') {
        routes = routes.filter(r => r.bestSeason.toLowerCase() === String(query.season).toLowerCase());
    }

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query
    });
};
