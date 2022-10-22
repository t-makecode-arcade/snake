function fillBlock (x: number, y: number, color: number) {
    screenBuf.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, color)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (snake_vx != 0 && !(changed_dir)) {
        snake_vx = 0
        snake_vy = -1
        changed_dir = 1
    }
})
function deleteSnakeTail () {
    snake_blocks_x.shift()
    snake_blocks_y.shift()
}
function isBlockInBounds (x: number, y: number) {
    if (x < 0 || x >= WIDTH_BLOCKS) {
        return 0
    }
    if (y < 0 || y >= HEIGHT_BLOCKS) {
        return 0
    }
    return 1
}
function appendSnakeBlock (x: number, y: number) {
    snake_blocks_x.push(x)
    snake_blocks_y.push(y)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (snake_vy != 0 && !(changed_dir)) {
        snake_vx = -1
        snake_vy = 0
        changed_dir = 1
    }
})
function renderSnake () {
    for (let block_idx = 0; block_idx <= snake_blocks_x.length - 2; block_idx++) {
        fillBlock(snake_blocks_x[block_idx], snake_blocks_y[block_idx], SNAKE_BODY_COLOR)
    }
    fillBlock(getLastValue(snake_blocks_x), getLastValue(snake_blocks_y), SNAKE_HEAD_COLOR)
}
function initSnake () {
    snake_blocks_x = []
    snake_blocks_y = []
    for (let block_idx = 0; block_idx <= INIT_SNAKE_BLOCKS_X.length - 1; block_idx++) {
        appendSnakeBlock(INIT_SNAKE_BLOCKS_X[block_idx], INIT_SNAKE_BLOCKS_Y[block_idx])
    }
    snake_vx = 1
    snake_vy = 0
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (snake_vy != 0 && !(changed_dir)) {
        snake_vx = 1
        snake_vy = 0
        changed_dir = 1
    }
})
function placeApple () {
    apple_x = randint(0, WIDTH_BLOCKS - 1)
    apple_y = randint(0, HEIGHT_BLOCKS - 1)
    while (isBlockInSnake(apple_x, apple_y)) {
        apple_x = randint(0, WIDTH_BLOCKS - 1)
        apple_y = randint(0, HEIGHT_BLOCKS - 1)
    }
    fillBlock(apple_x, apple_y, APPLE_COLOR)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (snake_vx != 0 && !(changed_dir)) {
        snake_vx = 0
        snake_vy = 1
        changed_dir = 1
    }
})
function getLastValue (list: number[]) {
    return list[list.length - 1]
}
function isBlockInSnake (x: number, y: number) {
    for (let block_idx = 0; block_idx <= snake_blocks_x.length - 1; block_idx++) {
        if (x == snake_blocks_x[block_idx] && y == snake_blocks_y[block_idx]) {
            return 1
        }
    }
    return 0
}
function updateSnake () {
    snake_head_x = getLastValue(snake_blocks_x)
    snake_head_y = getLastValue(snake_blocks_y)
    new_head_x = snake_head_x + snake_vx
    new_head_y = snake_head_y + snake_vy
    if (isBlockInBounds(new_head_x, new_head_y)) {
        if (isBlockInSnake(new_head_x, new_head_y)) {
            game.over(false)
        } else {
            appendSnakeBlock(new_head_x, new_head_y)
            if (new_head_x == apple_x && new_head_y == apple_y) {
                info.changeScoreBy(1)
                placeApple()
            } else {
                deleteSnakeTail()
            }
        }
    }
    changed_dir = 0
}
function clearSnake () {
    for (let block_idx = 0; block_idx <= snake_blocks_x.length - 1; block_idx++) {
        fillBlock(snake_blocks_x[block_idx], snake_blocks_y[block_idx], 0)
    }
}
let new_head_y = 0
let new_head_x = 0
let snake_head_y = 0
let snake_head_x = 0
let apple_y = 0
let apple_x = 0
let snake_blocks_y: number[] = []
let snake_blocks_x: number[] = []
let snake_vy = 0
let changed_dir = 0
let snake_vx = 0
let screenBuf: Image = null
let APPLE_COLOR = 0
let SNAKE_HEAD_COLOR = 0
let SNAKE_BODY_COLOR = 0
let INIT_SNAKE_BLOCKS_Y: number[] = []
let INIT_SNAKE_BLOCKS_X: number[] = []
let HEIGHT_BLOCKS = 0
let WIDTH_BLOCKS = 0
let BLOCK_SIZE = 0
BLOCK_SIZE = 5
WIDTH_BLOCKS = scene.screenWidth() / BLOCK_SIZE
HEIGHT_BLOCKS = scene.screenHeight() / BLOCK_SIZE
INIT_SNAKE_BLOCKS_X = [2, 3, 4]
INIT_SNAKE_BLOCKS_Y = [5, 5, 5]
let GAME_COLORS = assets.image`snake_colors`
SNAKE_BODY_COLOR = GAME_COLORS.getPixel(0, 0)
SNAKE_HEAD_COLOR = GAME_COLORS.getPixel(1, 0)
APPLE_COLOR = GAME_COLORS.getPixel(2, 0)
screenBuf = image.create(scene.screenWidth(), scene.screenHeight())
screenBuf.fill(15)
scene.setBackgroundImage(screenBuf)
info.setScore(0)
initSnake()
renderSnake()
placeApple()
game.onUpdateInterval(250, function () {
    clearSnake()
    updateSnake()
    renderSnake()
})
