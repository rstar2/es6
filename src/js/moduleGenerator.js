function* expandSpan(xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
            yield { x, y };
        }
    }
}

function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);

    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(xStart, xLen, yStart, 1);

    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    }
    throw new Error(`Unsupported range params length ${range.length}`);
}

export function* expandRanges(ranges) {
    // for (const range of ranges) {
    //     for (const item of expandRange(range)) {
    //         yield item;
    //     }
    // }

    // this is the same but with Yield Delegation construct
    for (const range of ranges) {
        yield* expandRange(range);
    }
}


export function* expandTiles(tiles, patterns) {

    function* walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                // take in mind the 'offset'
                const realX = x + offsetX;
                const realY = y + offsetY;

                // check if want to draw a pattern (a block of predefined tiles)
                // e.g. like "little" backgrounds over the main
                const patternName = tile.pattern;
                if (patternName) {
                    const patternSpec = patterns[patternName];
                    if (patternSpec) {
                        // Note - patterns can have patterns - e.g. recursion
                        yield* walkTiles(patternSpec.tiles, realX, realY);
                    } else {
                        logger.logWarn(`No pattern defined with name ${patternName}`);
                    }
                } else {
                    yield {
                        x: realX, y: realY, tile: new Tile(tile)
                    };
                }
            }
        }
    }

    yield* walkTiles(tiles, 0, 0);
}