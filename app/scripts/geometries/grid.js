var instance, maker

/**
 * @singleton
 * @example
 *
 * GridMaker(100, 100, 0)
 */
class GridMaker {

    constructor() {
        if (!instance) {
            instance = this
        }

        return instance
    }

    create(xAxisCount, yAxisCount, value) {
        var grid = []

        for (var i = 0; i < yAxisCount; i++) {
            grid[i] = []
            for (var j = 0; j < xAxisCount; j++) {
                grid[i][j] = value
            }
        }

        return grid
    }

}

maker = new GridMaker()


module.exports = maker
