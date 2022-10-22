def fillBlock(x: number, y: number, color: number):
    screenBuf.fill_rect(x * BLOCK_SIZE,
        y * BLOCK_SIZE,
        BLOCK_SIZE,
        BLOCK_SIZE,
        color)
def deleteSnakeTail():
    snake_blocks_x.shift()
    snake_blocks_y.shift()
def appendSnakeBlock(x2: number, y2: number):
    snake_blocks_x.append(x2)
    snake_blocks_y.append(y2)
def renderSnake():
    block_idx = 0
    while block_idx <= len(snake_blocks_x) - 2:
        fillBlock(snake_blocks_x[block_idx],
            snake_blocks_y[block_idx],
            SNAKE_BODY_COLOR)
        block_idx += 1
    fillBlock(getLastValue(snake_blocks_x),
        getLastValue(snake_blocks_y),
        SNAKE_HEAD_COLOR)
def initSnake():
    global snake_blocks_x, snake_blocks_y, snake_vx, snake_vy
    snake_blocks_x = []
    snake_blocks_y = []
    block_idx2 = 0
    while block_idx2 <= len(INIT_SNAKE_BLOCKS_X) - 1:
        appendSnakeBlock(INIT_SNAKE_BLOCKS_X[block_idx2],
            INIT_SNAKE_BLOCKS_Y[block_idx2])
        block_idx2 += 1
    snake_vx = 1
    snake_vy = 0
def getLastValue(list2: List[any]):
    return list2[len(list2) - 1]
def updateSnake():
    global snake_head_x, snake_head_y, new_head_x, new_head_y
    snake_head_x = getLastValue(snake_blocks_x)
    snake_head_y = getLastValue(snake_blocks_y)
    new_head_x = snake_head_x + snake_vx
    new_head_y = snake_head_y + snake_vy
    deleteSnakeTail()
    appendSnakeBlock(new_head_x, new_head_y)
def clearSnake():
    block_idx3 = 0
    while block_idx3 <= len(snake_blocks_x) - 1:
        fillBlock(snake_blocks_x[block_idx3], snake_blocks_y[block_idx3], 0)
        block_idx3 += 1
new_head_y = 0
new_head_x = 0
snake_head_y: any = None
snake_head_x: any = None
snake_vy = 0
snake_vx = 0
snake_blocks_y: List[number] = []
snake_blocks_x: List[number] = []
screenBuf: Image = None
SNAKE_HEAD_COLOR = 0
SNAKE_BODY_COLOR = 0
INIT_SNAKE_BLOCKS_Y: List[number] = []
INIT_SNAKE_BLOCKS_X: List[number] = []
BLOCK_SIZE = 0
BLOCK_SIZE = 10
WIDTH_BLOCKS = scene.screen_width() / BLOCK_SIZE
HEIGHT_BLOCKS = scene.screen_height() / BLOCK_SIZE
INIT_SNAKE_BLOCKS_X = [2, 3, 4]
INIT_SNAKE_BLOCKS_Y = [5, 5, 5]
SNAKE_COLORS = assets.image("""
    snake_colors
""")
SNAKE_BODY_COLOR = SNAKE_COLORS.get_pixel(0, 0)
SNAKE_HEAD_COLOR = SNAKE_COLORS.get_pixel(1, 0)
screenBuf = image.create(scene.screen_width(), scene.screen_height())
screenBuf.fill(15)
scene.set_background_image(screenBuf)
initSnake()
renderSnake()

def on_update_interval():
    clearSnake()
    updateSnake()
    renderSnake()
game.on_update_interval(500, on_update_interval)
