const test = require('ava')
const G = require('../_scripts')

test.beforeEach(t => {
    t.context.point = G.point(13, 7)
})

test('G point constructor', t => {
    t.is(G.point(13, 7).x, 13)
    t.is(G.point([13, 7]).x, 13)
    t.is(G.point(G.point(13, 7)).x, 13)
    t.is(G.point(13, 7).y, 7)
    t.is(G.point([13, 7]).y, 7)
    t.is(G.point(G.point(13, 7)).y, 7)
})

test('add', t => {
    t.context.point.add(3, 3)
    t.is(t.context.point.x, 13 + 3)
    t.is(t.context.point.y, 7 + 3)
})

test('addX', t => {
    t.context.point.addX(3)
    t.is(t.context.point.x, 13 + 3)
})

test('addY', t => {
    t.context.point.addY(3)
    t.is(t.context.point.y, 7 + 3)
})
