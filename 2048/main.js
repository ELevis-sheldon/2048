// 定义一个数组 
var board = new Array();
var hasConflicted = new Array();
var score = 0;


$(function() {
    newgame();
});

function newgame() {
    // 初始化 棋盘和数字格
    init();
    // 随机生成数字
    generateOneNumber();
    generateOneNumber();
}

function restartgame() {
    $("#gameover").remove();
    updateScore(0);
    newgame();
}
// 初始化棋盘 
function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
}

//初始化数字格
function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $(".grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numberCell = $("#number-cell-" + i + "-" + j);
            // 如果棋盘格的值为0时,设置数字格的高宽都为0
            if (board[i][j] == 0) {
                // numberCell.css({
                //     "width": 0,
                //     "height": 0,
                //     "top": getPosTop(i, j) + 50,
                //     "left": getPosLeft(i, j) + 50
                // })
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + 50);
                numberCell.css("left", getPosLeft(i, j) + 50);
            }
            // 如果棋盘格不为0的话,设置数字格的高宽为75并设置背景色和数值
            else {
                // numberCell.css({
                //     // "width": 100 + "px",
                //     // "height": 100 + "px",
                //     // "top": getPosTop(i, j),
                //     // "left": getPosLeft(i, j),
                //     // "background": getNumberBackgroundColor(board[i][j]),
                //     // "color": getNumberColor(board[i][j])

                // });
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
                numberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }

    $(".number-cell").css("line-height", "100px");
    $(".number-cell").css("font-size", "60px");
}
// 随机 数字

function generateOneNumber() {
    // 判断 
    if (nospace(board)) {
        return false;
    }
    // 1 生成随机位置
    var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4));
    // 定义一个死循环 完成生成随机空格子
    while (true) {
        //当格子的值为0时,满足条件
        if (board[randX][randY] == 0) {
            break;
        }
        //否则重新生成 一个随机位置
        var randX = parseInt(Math.floor(Math.random() * 4));
        var randY = parseInt(Math.floor(Math.random() * 4));
    }
    // 2 生成随机数字
    //根据2048游戏规则  新生成的数字为2或4
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    // 3 在随机位置显示随机数字
    //在随机位置上显示随机数字
    board[randX][randY] = randNumber;
    //实现随机数字显示动画效果
    ShowNumberWithAnimation(randX, randY, randNumber);
    return true;

}