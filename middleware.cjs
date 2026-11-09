/**
 * json-server middleware for Paw-Finder.
 *
 * Bridges the gap between the instructor's API contract and json-server's
 * built-in query params:
 *
 *   Contract:     ?page=1&limit=12&search=fluffy&type=lost&petType=cat&sort=asc
 *   json-server:  ?_page=1&_limit=12&_sort=createdAt&_order=asc&type=lost&petType=cat
 *
 * Two things json-server cannot do alone:
 *   1. `search` must match petName OR location OR details (its `q=` searches
 *      every field, including contact and photoUrl, producing false matches).
 *   2. The response must be { data, total, page }, not a bare array with the
 *      count in an X-Total-Count header.
 */

module.exports = (req, res, next) => {
    if (!req.path.startsWith('/reports') || req.method !== 'GET') {
        return next()
    }

    // Single-resource requests (/reports/3) pass straight through.
    if (/^\/reports\/.+/.test(req.path)) {
        return next()
    }

    const { search, type, petType, sort, page, limit } = req.query

    const pageNum = Math.max(1, parseInt(page, 10) || 1)
    const limitNum = Math.max(1, parseInt(limit, 10) || 12)
    const sortOrder = sort === 'asc' ? 'asc' : 'desc'

    // Read straight from the lowdb instance so we can filter and paginate
    // ourselves rather than letting json-server's router do it.
    let reports = req.app.db.get('reports').value()

    if (type && type !== 'all') {
        reports = reports.filter((r) => r.type === type)
    }

    if (petType && petType !== 'all') {
        reports = reports.filter((r) => r.petType === petType)
    }

    if (search && search.trim()) {
        const needle = search.trim().toLowerCase()
        reports = reports.filter(
            (r) =>
                r.petName.toLowerCase().includes(needle) ||
                r.location.toLowerCase().includes(needle) ||
                r.details.toLowerCase().includes(needle)
        )
    }

    reports = [...reports].sort((a, b) => {
        const diff = new Date(a.createdAt) - new Date(b.createdAt)
        return sortOrder === 'asc' ? diff : -diff
    })

    const total = reports.length
    const start = (pageNum - 1) * limitNum
    const data = reports.slice(start, start + limitNum)

    res.jsonp({ data, total, page: pageNum })
}